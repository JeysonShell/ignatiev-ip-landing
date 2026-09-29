import Image from "next/image";

import { cn } from "@/lib/utils";

type PhotoBackdropProps = {
  readonly src: string;
  readonly className?: string;
};

/**
 * Полноэкранное фото под текстом. Бумажная вуаль слева и снизу держит
 * контраст заголовка ≥ 4.5:1; справа на десктопе интерьер читается сильнее.
 * alt пустой: кадр декоративный, смысл страницы в H1.
 */
export function PhotoBackdrop({ src, className }: PhotoBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover object-[center_42%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/75 via-paper/40 to-paper md:bg-gradient-to-r md:from-paper md:via-paper/55 md:to-paper/20" />
    </div>
  );
}
