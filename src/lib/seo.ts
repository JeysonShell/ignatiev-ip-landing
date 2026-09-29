import type { Metadata } from "next";

import { CONTACTS, SITE, absoluteSiteUrl } from "@/lib/constants";
import {
  VACANCY_DUTIES,
  VACANCY_NAME,
  VACANCY_REQUIREMENTS,
} from "@/lib/content/vacancy";

const PAGE_URL = absoluteSiteUrl("/");
const LOGO_URL = absoluteSiteUrl("/brand/logo.jpg");
const ORG_ID = `${PAGE_URL}#organization`;
const JOB_ID = `${PAGE_URL}#job`;

/** Заголовок вкладки и сниппета — как ищут вакансию в Яндексе. */
export const SEO_TITLE = `Вакансия «${VACANCY_NAME}» в Москве без опыта`;

export const SEO_DESCRIPTION =
  "Офис в Москве, график 5/2 с 08:00 до 18:30. Продажа билетов на концерты и спектакли, без опыта, личный наставник. Отклик в Telegram.";

export const SEO_KEYWORDS = [
  "вакансия стажер в офис Москва",
  "работа в Москве без опыта",
  "стажер в офис без опыта",
  "работа в офисе 5/2 Москва",
  "вакансия продажа билетов Москва",
  "стажировка в офисе Москва",
  "работа в шоу-бизнесе Москва",
  "вакансии без опыта работы Москва",
  "трудоустройство без опыта Москва",
] as const;

const OG_IMAGE = {
  url: LOGO_URL,
  width: 1024,
  height: 571,
  alt: `${SITE.name} — вакансия «${VACANCY_NAME}»`,
} as const;

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(PAGE_URL),
  title: {
    default: SEO_TITLE,
    template: `%s — ${SITE.name}`,
  },
  description: SEO_DESCRIPTION,
  applicationName: SITE.name,
  category: "jobs",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.legalName, url: PAGE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/" },
  },
  icons: {
    icon: [{ url: LOGO_URL, type: "image/jpeg" }],
    apple: LOGO_URL,
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: PAGE_URL,
    siteName: SITE.name,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [LOGO_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
  other: {
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
  },
};

export const ORGANIZATION_JSON_LD = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  taxID: SITE.inn,
  identifier: SITE.ogrnip,
  url: PAGE_URL,
  logo: LOGO_URL,
  email: CONTACTS.email,
  telephone: CONTACTS.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
} as const;

export const JOB_POSTING_JSON_LD = {
  "@type": "JobPosting",
  "@id": JOB_ID,
  title: VACANCY_NAME,
  description: SEO_DESCRIPTION,
  url: PAGE_URL,
  datePosted: "2026-09-29",
  validThrough: "2026-12-28T23:59:59+03:00",
  employmentType: ["INTERN", "FULL_TIME"],
  workHours: "Mo-Fr 08:00-18:30",
  industry: "Шоу-бизнес",
  occupationalCategory: "Продажи",
  jobImmediateStart: true,
  directApply: true,
  experienceRequirements: {
    "@type": "OccupationalExperienceRequirements",
    monthsOfExperience: 0,
  },
  qualifications: VACANCY_REQUIREMENTS.items.join(" "),
  responsibilities: VACANCY_DUTIES.items.join(" "),
  incentiveCompensation:
    "Ставка за выход и процент с продаж. Выплаты каждый день после смены.",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "RU",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
  },
  hiringOrganization: { "@id": ORG_ID },
  identifier: {
    "@type": "PropertyValue",
    name: SITE.legalName,
    value: "stazher-ofis-msk",
  },
} as const;

export const PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZATION_JSON_LD,
    {
      "@type": "WebSite",
      "@id": `${PAGE_URL}#website`,
      name: SITE.name,
      url: PAGE_URL,
      inLanguage: "ru-RU",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${PAGE_URL}#website` },
      about: { "@id": JOB_ID },
      primaryImageOfPage: LOGO_URL,
    },
    JOB_POSTING_JSON_LD,
  ],
} as const;
