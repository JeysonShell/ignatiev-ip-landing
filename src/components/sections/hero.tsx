import { Badge } from "@/components/ui/badge";
import { ApplyButton, TelegramButton } from "@/components/ui/cta";
import { PhotoBackdrop } from "@/components/ui/photo-backdrop";
import { SceneGallery } from "@/components/ui/scene-gallery";
import { VACANCY_HERO, VACANCY_HIGHLIGHTS } from "@/lib/content/vacancy";
import { HERO_BACKDROP_SRC } from "@/lib/media";

/**
 * Первый экран. Серверный компонент без клиентского JS: заголовок попадает
 * в HTML сразу и не ждёт гидратации. H1 не анимируем с opacity: 0 — это
 * отложило бы отрисовку текста, даже если LCP заберёт фоновое фото.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate"
    >
      <div className="relative isolate">
        <PhotoBackdrop src={HERO_BACKDROP_SRC} />

        <div className="stagger container-page pt-24 pb-8 md:pt-28 md:pb-10 xl:pt-32">
          <div className="relative max-w-3xl">
            <Badge variant="accent" size="md" eyebrow className="animate-rise">
              {VACANCY_HERO.eyebrow}
            </Badge>

            <h1 id="hero-title" className="mt-4 text-display-2xl">
              {VACANCY_HERO.titleLead}
              <span className="block text-accent">
                {VACANCY_HERO.titleAccent}
              </span>
            </h1>

            <p className="animate-rise mt-4 text-lead text-content-muted">
              {VACANCY_HERO.lead}
            </p>

            <div className="animate-rise mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TelegramButton size="lg" fullWidth className="sm:w-auto" />
              <ApplyButton
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pb-10 md:pb-14 xl:pb-16">
        <HeroHighlights />
        <SceneGallery />
      </div>
    </section>
  );
}

/**
 * Пары «значение — подпись»: dl семантически вернее сетки из div.
 * flex-col-reverse даёт визуальный порядок значение → подпись,
 * сохраняя в DOM правильную последовательность dt → dd.
 * Четыре колонки только с lg: на 768px ячейки в 158px ломают длинные подписи.
 */
function HeroHighlights() {
  return (
    <dl className="animate-rise mt-6 grid grid-cols-2 gap-x-6 gap-y-5 md:mt-8 lg:grid-cols-4">
      {VACANCY_HIGHLIGHTS.map((highlight) => (
        <div
          key={highlight.label}
          className="flex flex-col-reverse gap-1.5"
        >
          <dt className="text-sm text-content-muted">{highlight.label}</dt>
          <dd className="font-display text-xl font-extrabold tracking-tight text-content md:text-2xl">
            {highlight.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
