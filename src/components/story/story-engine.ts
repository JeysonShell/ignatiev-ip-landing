/**
 * Движок скроллтеллинга: кадры на canvas сменяются по ходу прокрутки,
 * как будто листаешь видео, а текст сцен проявляется и гаснет на месте.
 *
 * Принципы, из-за которых ничего не дрожит:
 *  - текст не двигается вместе со скроллом, меняется только opacity;
 *  - прокрутка сглаживается по времени (не по кадрам), поэтому на экранах
 *    60 и 120 Гц картинка едет одинаково;
 *  - canvas перерисовывается только пока есть что догонять;
 *  - размер canvas пересчитывается лишь при смене ширины или заметной смене
 *    высоты — адресная строка мобильного браузера его не дёргает.
 *
 * Разметка и тексты — в ScrollStory (серверный компонент), здесь только DOM
 * по data-атрибутам: data-story-stage / -canvas / -scene / -spacer / -dot /
 * -progress / -rail.
 */

export type StoryFrame = {
  readonly src: string;
  /** Где в кадре главное по горизонтали, 0..1. */
  readonly focalX: number;
};

export type StoryOptions = {
  readonly frames: readonly StoryFrame[];
  /** Индексы сцен, перед которыми меняется кадр. */
  readonly cuts: readonly number[];
};

type Parts = {
  readonly stage: HTMLElement;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly scenes: readonly HTMLElement[];
  readonly spacers: readonly HTMLElement[];
  readonly dots: readonly HTMLElement[];
  readonly rail: HTMLElement | null;
  readonly progress: HTMLElement | null;
};

type LoadedFrame = {
  readonly image: HTMLImageElement;
  readonly focalX: number;
  ready: boolean;
};

/** Фон сцены, пока кадр не загрузился. Совпадает с --navy. */
const BACKDROP = "#13223a";
/** Длина проявления и угасания текста, в долях высоты сцены. */
const FADE_VH = 0.2;
/** Постоянная времени сглаживания прокрутки, мс. */
const SMOOTHING_MS = 130;
/** Наезд камеры при смене кадра. */
const CUT_ZOOM = 0.06;
/** Медленный наезд на протяжении всей истории. */
const DRIFT_ZOOM = 0.05;
/** Порог, ниже которого сглаживание считается догнавшим цель, px. */
const SETTLE_PX = 0.4;

const noop = () => undefined;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Smoothstep: плавный вход и выход без рывка на границах. */
function ease(value: number): number {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

function collectParts(root: HTMLElement): Parts | null {
  const stage = root.querySelector<HTMLElement>("[data-story-stage]");
  const canvas = root.querySelector<HTMLCanvasElement>("[data-story-canvas]");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const scenes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-story-scene]"),
  );
  const spacers = Array.from(
    root.querySelectorAll<HTMLElement>("[data-story-spacer]"),
  );

  if (!stage || !canvas || !ctx) return null;
  if (scenes.length === 0 || scenes.length !== spacers.length) return null;

  return {
    stage,
    canvas,
    ctx,
    scenes,
    spacers,
    dots: Array.from(
      document.querySelectorAll<HTMLElement>("[data-story-dot]"),
    ),
    rail: document.querySelector<HTMLElement>("[data-story-rail]"),
    progress: document.querySelector<HTMLElement>("[data-story-progress]"),
  };
}

/**
 * Запускает историю и возвращает функцию остановки.
 * Если разметки нет (или canvas не поддерживается) — ничего не делает,
 * текст первой сцены остаётся виден по CSS.
 */
export function startStory(
  root: HTMLElement,
  options: StoryOptions,
): () => void {
  const parts = collectParts(root);
  if (!parts) return noop;

  const { stage, canvas, ctx, scenes, spacers, dots, rail, progress } = parts;
  const { frames, cuts } = options;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const cutZoom = reduceMotion ? 0 : CUT_ZOOM;
  const driftZoom = reduceMotion ? 0 : DRIFT_ZOOM;
  const smoothing = reduceMotion ? 0 : SMOOTHING_MS;

  const images: LoadedFrame[] = [];

  // Геометрия, пересчитывается в measure().
  let starts: number[] = [];
  let totalScroll = 1;
  let fade = 1;
  let origin = 0;
  let measuredWidth = 0;
  let measuredHeight = 0;

  // Состояние анимации.
  let current = 0;
  let target = 0;
  let rafId = 0;
  let lastTime = 0;

  // Кэш последних применённых значений, чтобы не трогать DOM зря.
  const shownOpacity: number[] = [];
  let activeDot = -1;
  let railHidden = false;

  const scrollTop = () => window.scrollY || 0;

  const measure = () => {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bitmapWidth = Math.round(width * dpr);
    const bitmapHeight = Math.round(height * dpr);
    if (canvas.width !== bitmapWidth || canvas.height !== bitmapHeight) {
      canvas.width = bitmapWidth;
      canvas.height = bitmapHeight;
    }
    measuredWidth = width;
    measuredHeight = height;

    // Сцена закреплена на top = pinTop; progress = scrollY - origin.
    const pinTop = Number.parseFloat(getComputedStyle(stage).top) || 0;
    const scrolled = scrollTop();
    const tops = spacers.map((el) => el.getBoundingClientRect().top + scrolled);
    const firstTop = tops[0] ?? 0;
    const lastIndex = spacers.length - 1;
    const lastEnd =
      (tops[lastIndex] ?? 0) + (spacers[lastIndex]?.offsetHeight ?? 0);

    origin = firstTop - pinTop;
    starts = tops.map((top) => top - firstTop);
    totalScroll = Math.max(1, lastEnd - firstTop - height);
    fade = FADE_VH * height;
  };

  const drawFrame = (index: number, alpha: number, scale: number) => {
    const frame = images[index];
    if (!frame || !frame.ready) return;

    const { image } = frame;
    if (image.naturalWidth === 0 || image.naturalHeight === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = cw / ch;

    // Cover: заполняем сцену целиком, лишнее обрезаем по бокам или сверху.
    let dw = cw;
    let dh = cw / imageRatio;
    if (imageRatio > canvasRatio) {
      dh = ch;
      dw = ch * imageRatio;
    }
    dw *= scale;
    dh *= scale;

    ctx.globalAlpha = alpha;
    ctx.drawImage(image, (cw - dw) * frame.focalX, (ch - dh) / 2, dw, dh);
  };

  const renderScenes = (y: number) => {
    let best = 0;
    let bestOpacity = -1;

    for (let i = 0; i < scenes.length; i += 1) {
      const start = starts[i] ?? 0;
      let opacity = 1;
      if (i > 0) opacity = Math.min(opacity, ease((y - start) / fade));
      if (i < scenes.length - 1) {
        const nextStart = starts[i + 1] ?? 0;
        opacity = Math.min(opacity, 1 - ease((y - (nextStart - fade)) / fade));
      } else {
        // Последняя сцена гаснет до снятия закрепления и не наезжает на хедер.
        opacity = Math.min(
          opacity,
          1 - ease((y - (totalScroll - fade)) / fade),
        );
      }

      const key = Math.round(opacity * 200);
      const scene = scenes[i];
      if (scene && shownOpacity[i] !== key) {
        shownOpacity[i] = key;
        scene.style.opacity = opacity.toFixed(3);
        scene.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      }

      if (opacity > bestOpacity) {
        bestOpacity = opacity;
        best = i;
      }
    }

    if (best !== activeDot) {
      dots.forEach((dot, k) => {
        if (k === best) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      activeDot = best;
    }

    // Навигатор нужен, пока сцена закреплена; к форме отклика он не тянется.
    const pastStory = y >= totalScroll;
    if (rail && pastStory !== railHidden) {
      if (pastStory) rail.setAttribute("data-hidden", "");
      else rail.removeAttribute("data-hidden");
      railHidden = pastStory;
    }
  };

  const renderFrames = (y: number) => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = BACKDROP;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drift = Math.exp(driftZoom * clamp(y / totalScroll, 0, 1));
    const lastFrame = frames.length - 1;

    if (lastFrame < 1) {
      drawFrame(0, 1, Math.exp(cutZoom) * drift);
    } else {
      // f — «номер кадра» с дробной частью: непрерывный счётчик смен.
      let f = 0;
      for (const cut of cuts) {
        const cutStart = (starts[cut] ?? 0) - fade;
        f += ease((y - cutStart) / (2 * fade));
      }
      f = clamp(f, 0, lastFrame);

      const from = Math.min(Math.floor(f), lastFrame - 1);
      const mix = f - from;
      drawFrame(from, 1, Math.exp(cutZoom * (f - from + 1)) * drift);
      if (mix > 0) {
        drawFrame(
          from + 1,
          mix,
          Math.exp(cutZoom * (f - (from + 1) + 1)) * drift,
        );
      }
    }
    ctx.globalAlpha = 1;
  };

  const renderProgress = () => {
    if (!progress) return;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? clamp(scrollTop() / scrollable, 0, 1) : 0;
    progress.style.transform = `scaleX(${ratio.toFixed(4)})`;
  };

  const render = (y: number) => {
    renderScenes(y);
    renderFrames(y);
    renderProgress();
  };

  const tick = (time: number) => {
    const dt = Math.min(50, time - lastTime);
    lastTime = time;

    current =
      smoothing === 0
        ? target
        : current + (target - current) * (1 - Math.exp(-dt / smoothing));
    if (Math.abs(target - current) < SETTLE_PX) current = target;

    render(current);
    rafId = current === target ? 0 : window.requestAnimationFrame(tick);
  };

  const onScroll = () => {
    target = scrollTop() - origin;
    if (rafId === 0) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(tick);
    }
  };

  const sync = () => {
    measure();
    target = scrollTop() - origin;
    current = target;
    render(current);
  };

  const onResize = () => {
    const sameWidth = stage.clientWidth === measuredWidth;
    const sameHeight = Math.abs(stage.clientHeight - measuredHeight) < 2;
    if (sameWidth && sameHeight) return;
    sync();
  };

  frames.forEach((frame) => {
    const image = new Image();
    const entry: LoadedFrame = { image, focalX: frame.focalX, ready: false };
    image.decoding = "async";
    image.onload = () => {
      entry.ready = true;
      render(current);
    };
    image.src = frame.src;
    images.push(entry);
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("load", sync);
  sync();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("load", sync);
    if (rafId !== 0) window.cancelAnimationFrame(rafId);
    images.forEach((entry) => {
      entry.image.onload = null;
    });
  };
}
