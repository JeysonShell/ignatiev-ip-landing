import { Check } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  ROLE_SECTION,
  VACANCY_DUTIES,
  VACANCY_REQUIREMENTS,
} from "@/lib/content/vacancy";

export function Duties() {
  return (
    <section
      id="duties"
      aria-labelledby="duties-title"
      className="relative isolate border-t border-hairline"
    >
      <div className="container-page section-y">
        <SectionHeading
          id="duties-title"
          eyebrow={ROLE_SECTION.eyebrow}
          title={ROLE_SECTION.title}
          lead={ROLE_SECTION.lead}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:mt-10">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-content md:text-xl">
              {VACANCY_DUTIES.title}
            </h3>
            <CheckList items={VACANCY_DUTIES.items} />
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight text-content md:text-xl">
              {VACANCY_REQUIREMENTS.title}
            </h3>
            <CheckList items={VACANCY_REQUIREMENTS.items} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckList({ items }: { readonly items: readonly string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-content-muted">
          <Check aria-hidden className="mt-1 size-4 shrink-0 text-green" />
          <span className="text-sm leading-relaxed md:text-base">{item}</span>
        </li>
      ))}
    </ul>
  );
}
