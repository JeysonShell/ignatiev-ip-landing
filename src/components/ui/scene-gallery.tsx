import Image from "next/image";

import { SCENE_PHOTOS } from "@/lib/media";

/**
 * Три кадра офиса и зала. На телефоне — горизонтальный снэп, чтобы не
 * раздувать первый экран; с 640px — обычная сетка.
 */
export function SceneGallery() {
  return (
    <ul
      aria-label="Офис и зрительный зал"
      className="animate-rise mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible md:mt-10"
    >
      {SCENE_PHOTOS.map((photo) => (
        <li
          key={photo.src}
          className="relative aspect-[5/4] w-[min(78%,20rem)] shrink-0 snap-start overflow-hidden rounded-[2px] sm:w-auto sm:aspect-[4/3]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            quality={65}
            sizes="(max-width: 639px) 78vw, 33vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
