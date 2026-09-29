import type { LucideIcon } from "lucide-react";
import { Ban, Clock3, FileCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { TRUST_POINTS, TRUST_SECTION } from "@/lib/content/vacancy";

const TRUST_ICONS = {
  contract: FileCheck,
  schedule: Clock3,
  ban: Ban,
} as const satisfies Record<(typeof TRUST_POINTS)[number]["icon"], LucideIcon>;

export function Trust() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="relative isolate border-t border-hairline"
    >
      <div className="container-page section-y">
        <SectionHeading
          id="trust-title"
          eyebrow={TRUST_SECTION.eyebrow}
          title={TRUST_SECTION.title}
          lead={TRUST_SECTION.lead}
        />

        <ul className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 md:mt-10 md:grid-cols-3">
          {TRUST_POINTS.map((point) => {
            const Icon = TRUST_ICONS[point.icon];

            return (
              <li key={point.title} className="max-w-md">
                <Icon aria-hidden className="size-5 text-green" />
                <h3 className="mt-3 text-lg font-bold tracking-tight text-content md:text-xl">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted md:text-base">
                  {point.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
