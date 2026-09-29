/* ============================================================================
   ОРГАНИЗАЦИЯ И КОНТАКТЫ
   Реквизиты из открытых реестров (ЕГРИП / Rusprofile, актуально на 28.09.2026).
   Телефон, WhatsApp и почта — рабочие контакты.
   Контент вакансии — в src/lib/content/vacancy.ts.
   ========================================================================= */

export const SITE = {
  name: "Игнатьев",
  legalName: "ИП Игнатьев Павел Александрович",
  inn: "971505195899",
  ogrnip: "321774600039047",
  tagline: "Работа в шоу-бизнесе Москвы",
  locale: "ru_RU",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://jeysonshell.github.io/ignatiev-ip-landing",
  /** Лет на рынке — цифра из текста вакансии, не дата регистрации ИП (2021). */
  yearsOnMarket: 10,
} as const;

export const CONTACTS = {
  /** E.164 — единственный источник правды. Показ форматирует formatPhone(). */
  phone: "+79779960439",
  telegram: "Dasha_hr01", // без @
  whatsapp: "79779960439",
  email: "pavel.vnt@mail.ru",
} as const;

export const PATHS = {
  home: "/",
  privacy: "/privacy",
} as const;

export const EXTERNAL_LINKS = {
  telegram: `https://t.me/${CONTACTS.telegram}`,
  whatsapp: `https://wa.me/${CONTACTS.whatsapp}`,
  phone: `tel:${CONTACTS.phone}`,
  email: `mailto:${CONTACTS.email}`,
} as const;

/**
 * Разделы одностраничника. `id` совпадает с id секции в DOM —
 * из этого массива собирается хедер, мобильное меню и футер.
 */
export const NAV_SECTIONS = [
  { id: "conditions", label: "Условия" },
  { id: "venues", label: "Залы" },
  { id: "duties", label: "Работа" },
  { id: "trust", label: "Оформление" },
  { id: "reviews", label: "Команда" },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];

/** id секции отклика и якорь для всех CTA. Два значения из одного ключа. */
export const APPLY_ID = "apply";
/** Со страницы политики и любых внутренних URL якорь должен вести на главную. */
export const APPLY_ANCHOR = `/#${APPLY_ID}` as const;
