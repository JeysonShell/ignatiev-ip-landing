import type { Metadata } from "next";
import Link from "next/link";

import { PATHS, SITE } from "@/lib/constants";
import { PRIVACY_PAGE } from "@/lib/content/privacy";
import { VACANCY_NAME } from "@/lib/content/vacancy";

export const metadata: Metadata = {
  title: PRIVACY_PAGE.title,
  description:
    `Как мы обрабатываем персональные данные кандидатов на вакансию «${VACANCY_NAME}»: состав сведений, цели, сроки и права по 152-ФЗ.`,
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: PRIVACY_PAGE.title,
    description:
      "Политика обработки персональных данных кандидатов. ИП Игнатьев Павел Александрович.",
    url: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1} className="container-page pt-28 pb-16 md:pt-32 md:pb-20">
      <p className="text-sm text-content-muted">
        <Link href={PATHS.home} className="hover:text-content">
          На главную
        </Link>
        <span aria-hidden> · </span>
        Обновлено {PRIVACY_PAGE.updated}
      </p>

      <h1 className="mt-6 max-w-3xl text-display-xl">{PRIVACY_PAGE.title}</h1>
      <p className="mt-5 max-w-2xl text-lead text-content-muted">
        {PRIVACY_PAGE.intro}
      </p>
      <p className="mt-3 text-sm text-content-muted">{SITE.legalName}</p>

      <div className="mt-12 flex max-w-2xl flex-col gap-10">
        {PRIVACY_PAGE.sections.map((section, index) => {
          const headingId = `privacy-section-${index + 1}`;
          return (
            <section key={section.title} aria-labelledby={headingId}>
              <h2 id={headingId} className="text-xl font-bold tracking-tight">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 leading-relaxed text-content-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          );
        })}
      </div>
    </main>
  );
}
