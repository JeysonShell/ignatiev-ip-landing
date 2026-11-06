import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/constants";
import { LOGO } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Только фирменный знак. Имя в aria-label ссылки — видимый текст
 * рядом с логотипом не дублируем.
 * Файл логотипа — широкий кадр на кремовом фоне. На тёмном хедере он читается
 * как кремовая плашка, поэтому показываем квадрат по центру (object-cover),
 * где лежит сам знак, со скруглением.
 */
export function Logo({ className }: { readonly className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — на главную`}
      className={cn("tap-safe inline-flex items-center", className)}
    >
      <Image
        src={LOGO.src}
        alt=""
        width={LOGO.width}
        height={LOGO.height}
        sizes="56px"
        priority
        className="size-12 shrink-0 rounded-[10px] object-cover md:size-14"
      />
    </Link>
  );
}
