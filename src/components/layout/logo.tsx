import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/constants";
import { LOGO } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Только фирменный знак. Имя в aria-label ссылки — видимый текст
 * рядом с логотипом не дублируем.
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
        sizes="180px"
        priority
        className="h-14 w-auto shrink-0 rounded-[2px] md:h-[4.5rem]"
      />
    </Link>
  );
}
