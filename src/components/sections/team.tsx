import Image from "next/image";

import { ApplyButton, TelegramButton } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ABOUT_COMPANY,
  ONBOARDING_STEPS,
  TEAM_SECTION,
} from "@/lib/content/vacancy";
import { ILLUSTRATIONS } from "@/lib/media";

export function Team() {
  const art = ILLUSTRATIONS.mentor;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative isolate border-t border-hairline"
    >
      <div className="container-page section-y">
        <SectionHeading
          id="reviews-title"
          eyebrow={TEAM_SECTION.eyebrow}
          title={TEAM_SECTION.title}
        />

        <ol className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-3">
          {ONBOARDING_STEPS.map((step, index) => (
            <li key={step.title} className="max-w-md">
              <span className="font-display text-sm font-bold tracking-[0.16em] text-green uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-content md:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-content-muted md:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <Image
          src={art.src}
          alt={art.alt}
          width={art.width}
          height={art.height}
          sizes="(max-width: 1023px) 100vw, 40vw"
          className="mx-auto mt-10 h-auto w-full max-w-lg"
        />

        <div className="mt-10 max-w-2xl">
          <h3 className="text-lg font-bold tracking-tight md:text-xl">
            {ABOUT_COMPANY.title}
          </h3>
          {ABOUT_COMPANY.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-content-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <TelegramButton size="lg" fullWidth className="sm:w-auto" />
          <ApplyButton
            variant="secondary"
            size="lg"
            fullWidth
            className="sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
