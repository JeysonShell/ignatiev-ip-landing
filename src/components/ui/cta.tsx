import { MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";
import { type ComponentProps, forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { APPLY_ANCHOR, CONTACTS, EXTERNAL_LINKS } from "@/lib/constants";
import { APPLY_MESSAGE, VACANCY_HERO } from "@/lib/content/vacancy";
import { formatPhone, withTextQuery } from "@/lib/utils";

export const telegramApplyHref = withTextQuery(
  EXTERNAL_LINKS.telegram,
  APPLY_MESSAGE,
);
export const whatsappApplyHref = withTextQuery(
  EXTERNAL_LINKS.whatsapp,
  APPLY_MESSAGE,
);

type SharedCtaProps = Omit<
  ComponentProps<typeof Button>,
  "asChild" | "children" | "isLoading"
> & {
  readonly label?: string;
  readonly href?: string | undefined;
};

type ApplyButtonProps = SharedCtaProps & {
  readonly withIcon?: boolean;
};

/**
 * Единые CTA страницы. Разметка ссылки живёт здесь, чтобы якорь, иконка
 * и подпись для скринридера не разъехались между хедером, Hero и меню.
 * asChild наружу не отдаём: слот уже занят самой ссылкой.
 * forwardRef нужен, чтобы Radix Close мог закрыть шторку по клику на CTA.
 *
 * Главный CTA для Директа — Telegram. Форма — запасной путь на #apply.
 */
export const ApplyButton = forwardRef<HTMLAnchorElement, ApplyButtonProps>(
  function ApplyButton(
    { label = VACANCY_HERO.secondaryCta, withIcon = true, ...props },
    ref,
  ) {
    return (
      <Button {...props} asChild>
        <Link ref={ref} href={APPLY_ANCHOR}>
          {withIcon ? <Send aria-hidden /> : null}
          {label}
        </Link>
      </Button>
    );
  },
);

export const TelegramButton = forwardRef<HTMLAnchorElement, SharedCtaProps>(
  function TelegramButton(
    {
      label = VACANCY_HERO.primaryCta,
      href = telegramApplyHref,
      ...props
    },
    ref,
  ) {
    return (
      <Button {...props} asChild>
        <ExternalLink ref={ref} href={href}>
          <MessageCircle aria-hidden />
          {label}
        </ExternalLink>
      </Button>
    );
  },
);

export const WhatsAppButton = forwardRef<HTMLAnchorElement, SharedCtaProps>(
  function WhatsAppButton(
    { label = "WhatsApp", href = whatsappApplyHref, ...props },
    ref,
  ) {
    return (
      <Button {...props} asChild>
        <ExternalLink ref={ref} href={href}>
          <WhatsAppIcon />
          {label}
        </ExternalLink>
      </Button>
    );
  },
);

export const PhoneButton = forwardRef<HTMLAnchorElement, SharedCtaProps>(
  function PhoneButton(
    { label = formatPhone(CONTACTS.phone), ...props },
    ref,
  ) {
    return (
      <Button {...props} asChild>
        <a ref={ref} href={EXTERNAL_LINKS.phone}>
          <Phone aria-hidden />
          {label}
        </a>
      </Button>
    );
  },
);

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.05 4.91A9.9 9.9 0 0 0 12.04 2C6.55 2 2.08 6.45 2.08 11.93c0 1.75.46 3.45 1.34 4.95L2 22l5.27-1.38a10 10 0 0 0 4.77 1.21h.01c5.49 0 9.96-4.45 9.96-9.93a9.86 9.86 0 0 0-2.96-6.99Zm-7.01 15.24h-.01a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.13.82.84-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.72-8.24 8.29-8.24 2.21 0 4.29.86 5.85 2.41a8.18 8.18 0 0 1 2.43 5.83c0 4.55-3.73 8.24-8.3 8.24Zm4.54-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.38-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.22.25-.86.83-.86 2.03 0 1.2.88 2.36 1 2.52.12.16 1.73 2.65 4.2 3.71.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
