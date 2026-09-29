import Image from "next/image";

import { ExternalLink } from "@/components/ui/external-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { VENUES, VENUES_SECTION } from "@/lib/content/vacancy";

/**
 * Залы — сетка официальных логотипов. Имя зала живёт в скрытом тексте
 * ссылки; визуально остаются только знаки.
 */
export function Venues() {
  return (
    <section
      id="venues"
      aria-labelledby="venues-title"
      className="relative isolate border-t border-hairline"
    >
      <div className="container-page section-y">
        <SectionHeading
          id="venues-title"
          eyebrow={VENUES_SECTION.eyebrow}
          title={VENUES_SECTION.title}
          lead={VENUES_SECTION.lead}
        />

        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
          {VENUES.map((venue) => (
            <li key={venue.href}>
              <ExternalLink
                href={venue.href}
                className="tap-safe flex h-[4.5rem] items-center justify-center px-1.5 opacity-90 transition-opacity duration-200 hover:opacity-100 sm:h-20"
              >
                <span className="sr-only">{venue.name}</span>
                <Image
                  src={venue.logo.src}
                  alt=""
                  width={venue.logo.width}
                  height={venue.logo.height}
                  unoptimized={venue.logo.src.endsWith(".svg")}
                  className="h-10 w-auto max-h-10 max-w-full object-contain object-center sm:h-12 sm:max-h-12"
                />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
