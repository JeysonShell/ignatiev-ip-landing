import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { ExternalLink } from "@/components/ui/external-link";
import {
  APPLY_ID,
  CONTACTS,
  EXTERNAL_LINKS,
  NAV_SECTIONS,
  PATHS,
  SITE,
} from "@/lib/constants";
import { FOOTER_CONTENT } from "@/lib/content/vacancy";
import { formatPhone } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-on-navy">
      <div className="container-page py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-on-navy" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-navy-muted">
              {SITE.tagline}. Офис в Москве, график 5/2, обучение с наставником.
            </p>
            <p className="mt-6 text-sm text-on-navy-muted">
              {SITE.legalName}
              <span className="mt-1 block">ИНН {SITE.inn}</span>
              <span className="mt-1 block">ОГРНИП {SITE.ogrnip}</span>
            </p>
          </div>

          <nav aria-label="Разделы страницы" className="lg:col-span-3">
            <p className="text-sm font-semibold tracking-wide text-on-navy uppercase">
              На странице
            </p>
            <ul className="mt-4 flex flex-col">
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/#${section.id}`}
                    className="tap-safe inline-flex items-center text-sm text-on-navy-muted transition-colors hover:text-on-navy"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/#${APPLY_ID}`}
                  className="tap-safe inline-flex items-center text-sm text-on-navy-muted transition-colors hover:text-on-navy"
                >
                  Откликнуться
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-5">
            <p className="text-sm font-semibold tracking-wide text-on-navy uppercase">
              {FOOTER_CONTENT.contactsTitle}
            </p>
            <address className="mt-4 flex flex-col items-start text-sm leading-relaxed text-on-navy-muted not-italic">
              <a
                href={EXTERNAL_LINKS.phone}
                className="tap-safe inline-flex items-center font-medium text-on-navy hover:text-accent"
              >
                {formatPhone(CONTACTS.phone)}
              </a>
              <ExternalLink
                href={EXTERNAL_LINKS.email}
                className="tap-safe inline-flex text-on-navy hover:text-accent"
              >
                {CONTACTS.email}
              </ExternalLink>
            </address>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-on-navy/20 pt-5 text-xs text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. {FOOTER_CONTENT.rights}
          </p>
          <Link
            href={PATHS.privacy}
            className="tap-safe inline-flex items-center hover:text-on-navy"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
