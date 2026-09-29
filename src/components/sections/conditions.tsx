import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  Building2,
  Clock3,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  CONDITIONS_SECTION,
  VACANCY_BENEFITS,
  type IconKey,
} from "@/lib/content/vacancy";
import { ILLUSTRATIONS } from "@/lib/media";

const BENEFIT_ICONS = {
  mentor: UserCheck,
  schedule: Clock3,
  office: Building2,
  growth: TrendingUp,
  shield: ShieldCheck,
} as const satisfies Record<IconKey, LucideIcon>;

/**
 * Лофт: текст в колонках, без рамок. Иллюстрация — рядом, не в карточке.
 */
export function Conditions() {
  const art = ILLUSTRATIONS.benefits;

  return (
    <section
      id="conditions"
      aria-labelledby="conditions-title"
      className="relative isolate border-t border-hairline"
    >
      <div className="container-page section-y">
        <SectionHeading
          id="conditions-title"
          eyebrow={CONDITIONS_SECTION.eyebrow}
          title={CONDITIONS_SECTION.title}
          lead={CONDITIONS_SECTION.lead}
        />

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
          <ul className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            {VACANCY_BENEFITS.map((benefit) => {
              const Icon = BENEFIT_ICONS[benefit.icon];

              return (
                <li key={benefit.title} className="max-w-md">
                  <Icon aria-hidden className="size-5 text-green" />
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-content md:text-xl">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-muted md:text-base">
                    {benefit.description}
                  </p>
                </li>
              );
            })}
          </ul>

          <Image
            src={art.src}
            alt={art.alt}
            width={art.width}
            height={art.height}
            sizes="(max-width: 1023px) 100vw, 22rem"
            className="mx-auto h-auto w-full max-w-md lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
