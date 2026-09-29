import { MessageCircle, Phone } from "lucide-react";

import { ApplyForm } from "@/components/sections/apply-form";
import {
  TelegramButton,
  WhatsAppButton,
  telegramApplyHref,
} from "@/components/ui/cta";
import { ExternalLink } from "@/components/ui/external-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { APPLY_ID, CONTACTS, EXTERNAL_LINKS } from "@/lib/constants";
import { APPLY_SECTION } from "@/lib/content/vacancy";
import { formatPhone } from "@/lib/utils";

export function Apply() {
  return (
    <section
      id={APPLY_ID}
      aria-labelledby="apply-title"
      className="relative isolate border-t border-hairline"
    >
      <div className="container-page section-y">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-12">
            <aside className="lg:col-span-2 lg:sticky lg:top-28">
            <SectionHeading
              id="apply-title"
              eyebrow={APPLY_SECTION.eyebrow}
              title={APPLY_SECTION.title}
              lead={APPLY_SECTION.lead}
            />

            <p className="mt-8 font-display text-xl font-bold tracking-tight">
              {APPLY_SECTION.asideTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-content-muted md:text-base">
              {APPLY_SECTION.asideLead}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <TelegramButton fullWidth />
              <WhatsAppButton variant="secondary" fullWidth />
            </div>

            <ul className="mt-6 flex flex-col gap-3 text-sm text-content-muted">
              <li className="flex gap-3">
                <Phone
                  aria-hidden
                  className="mt-2.5 size-4 shrink-0 text-green"
                />
                <a
                  href={EXTERNAL_LINKS.phone}
                  className="tap-safe inline-flex items-center font-medium text-content hover:text-accent-dark"
                >
                  {formatPhone(CONTACTS.phone)}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle
                  aria-hidden
                  className="mt-2.5 size-4 shrink-0 text-green"
                />
                <ExternalLink
                  href={telegramApplyHref}
                  className="tap-safe inline-flex items-center font-medium text-content hover:text-accent-dark"
                >
                  @{CONTACTS.telegram}
                </ExternalLink>
              </li>
            </ul>
          </aside>

          <div className="lg:col-span-3">
            <p className="font-display text-xl font-bold tracking-tight">
              {APPLY_SECTION.formTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-content-muted md:text-base">
              {APPLY_SECTION.formLead}
            </p>
            <div className="mt-6">
              <ApplyForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
