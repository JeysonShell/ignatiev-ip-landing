import Image from "next/image";
import { Check } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  FIRST_DAY,
  ROLE_SECTION,
  VACANCY_DUTIES,
  VACANCY_REQUIREMENTS,
} from "@/lib/content/vacancy";
import { ILLUSTRATIONS } from "@/lib/media";

export function Duties() {
  const art = ILLUSTRATIONS.process;

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

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
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

          <div className="relative mx-auto aspect-[3/4] w-full max-w-[16rem] overflow-hidden rounded-[2px]">
            <Image
              src={art.src}
              alt={art.alt}
              fill
              sizes="16rem"
              className="object-cover object-center"
            />
          </div>
        </div>

        <FirstDay />
      </div>
    </section>
  );
}

function FirstDay() {
  return (
    <div className="mt-10 md:mt-12">
      <h3 className="text-lg font-bold tracking-tight text-content md:text-xl">
        {FIRST_DAY.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-content-muted md:text-base">
        {FIRST_DAY.lead}
      </p>
      <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {FIRST_DAY.items.map((item) => (
          <li key={item.time} className="flex flex-col gap-1.5">
            <span className="font-display text-sm font-bold tracking-[0.16em] text-green uppercase">
              {item.time}
            </span>
            <span className="font-semibold text-content">{item.title}</span>
            <span className="text-sm leading-relaxed text-content-muted">
              {item.description}
            </span>
          </li>
        ))}
      </ol>
    </div>
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
