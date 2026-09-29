import { SITE } from "@/lib/constants";

/* ============================================================================
   КОНТЕНТ ВАКАНСИИ
   Единственный источник текстов лендинга. Компоненты не содержат копирайта.
   Формулировки из текста вакансии — сроки, график, выплаты и цифры зарплаты
   не выдумываем. Реквизиты клиента живут в constants.ts.
   ========================================================================= */

/**
 * Ключи иконок вместо самих компонентов: данные остаются сериализуемыми
 * и не тянут React в контентный слой. Маппинг ключ -> иконка живёт в секции.
 */
export type IconKey =
  | "mentor"
  | "schedule"
  | "office"
  | "growth"
  | "shield";

export type VacancyBenefit = {
  readonly icon: IconKey;
  readonly title: string;
  readonly description: string;
};

export type VacancyHighlight = {
  readonly value: string;
  readonly label: string;
};

export const VACANCY_HERO = {
  eyebrow: "Вакансия · Стажер в офис",
  /**
   * Одна фраза. «Москвы» — акцентный хвост, без принудительного переноса.
   */
  titleLead: "Работай в",
  titleGlue: "шоу-бизнесе",
  titleAccent: "Москвы",
  primaryCta: "Написать в Telegram",
  secondaryCta: "Оставить номер",
  headerCta: "Написать",
} as const;

/** Короткий префилл в мессенджер — человек не думает, с чего начать. */
export const APPLY_MESSAGE =
  "Здравствуйте! Хочу откликнуться на вакансию менеджера по продаже билетов.";

export const VACANCY_HIGHLIGHTS: readonly VacancyHighlight[] = [
  { value: "Мы ходим", label: "на наши спектакли и концерты" },
  { value: "Без опыта", label: "личный наставник с первого дня" },
  { value: `${SITE.yearsOnMarket}+ лет`, label: "на рынке шоу-бизнеса Москвы" },
] as const;

/** Bento-сетка «Почему у нас». Раскладка задаётся в секции, не в данных. */
export const VACANCY_BENEFITS: readonly VacancyBenefit[] = [
  {
    icon: "mentor",
    title: "Личный наставник",
    description:
      "Обучение с нуля: за вами закрепляется опытный сотрудник. Первые звонки — рядом с ним, а не «разберётесь сами».",
  },
  {
    icon: "schedule",
    title: "График 5/2",
    description: "Строго с 08:00 до 18:30, два выходных.",
  },
  {
    icon: "office",
    title: "Офис в Москве",
    description:
      "Работа в офисе, а не на удалёнке: живая команда рядом и быстрый обмен опытом.",
  },
  {
    icon: "growth",
    title: "Карьерный рост",
    description:
      "Понятная траектория внутри компании — от менеджера до наставника и руководителя направления.",
  },
  {
    icon: "shield",
    title: "Стабильность без задержек",
    description: `За ${SITE.yearsOnMarket} лет работы — ни одной задолженности и ни одной задержки выплат сотрудникам.`,
  },
] as const;

export const CONDITIONS_SECTION = {
  eyebrow: "Условия",
  title: "Почему сюда идут работать",
  lead: "Понятный день и деньги сразу после смены — без «разберёмся на испытательном».",
} as const;

export const ROLE_SECTION = {
  eyebrow: "Работа",
  title: "Чем вы будете заниматься",
  lead: "Консультации, бронирование, сделки. Опыт не обязателен — важны речь и готовность выйти в ближайшие дни. Ищем адекватных людей, научим всему сами.",
} as const;

export const VACANCY_DUTIES = {
  title: "Что нужно делать",
  items: [
    "Консультировать клиентов по телефону и в переписке: мероприятия, даты, залы.",
    "Бронировать и продавать билеты, доводить до покупки.",
    "Вести отчётность по плану продаж.",
  ],
} as const;

export const VACANCY_REQUIREMENTS = {
  title: "Кого мы ищем",
  items: [
    "Готовность приступить в ближайшее время.",
    "Грамотная речь и умение находить общий язык.",
    "Опыт работы приветствуется, но не обязателен.",
  ],
} as const;

export const VENUES_SECTION = {
  eyebrow: "Площадки",
  title: "Билеты в залы, которые знает вся Москва",
  lead: "Концерты и спектакли конкретных площадок — от Кремля до Таганки. Логотип открывает официальный сайт зала.",
} as const;

export type VenueLogo = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

export type Venue = {
  readonly name: string;
  readonly href: string;
  readonly logo: VenueLogo;
};

/** Залы и театры — блок доверия. href — официальный сайт площадки. */
export const VENUES: readonly Venue[] = [
  {
    name: "Государственный Кремлёвский Дворец",
    href: "https://www.kremlinpalace.org/",
    logo: {
      src: "/venues/kremlinpalace.svg",
      width: 481,
      height: 133,
    },
  },
  {
    name: "Концертный зал Барвиха LUXURY VILLAGE",
    href: "https://blv.ru/",
    logo: { src: "/venues/barvikha-ink.png", width: 599, height: 31 },
  },
  {
    name: "Московский Международный Дом музыки",
    href: "https://www.mmdm.ru/",
    logo: { src: "/venues/mmdm.svg", width: 842, height: 437 },
  },
  {
    name: "Зал «Зарядье»",
    href: "https://zaryadyehall.ru/",
    logo: { src: "/venues/zaryadye-hall.svg", width: 115, height: 85 },
  },
  {
    name: "ВТБ Ледовый дворец",
    href: "https://icearenamsk.ru/",
    logo: { src: "/venues/ice-arena.png", width: 303, height: 45 },
  },
  {
    name: "Театр им. Вахтангова",
    href: "https://vakhtangov.ru/",
    logo: { src: "/venues/vakhtangov-bronze.png", width: 96, height: 96 },
  },
  {
    name: "Театр Эстрады",
    href: "https://teatr-estrada.ru/",
    logo: { src: "/venues/estrada-ink.png", width: 1000, height: 1000 },
  },
  {
    name: "Театр им. Пушкина",
    href: "https://teatrpushkin.ru/",
    logo: { src: "/venues/pushkin.svg", width: 304, height: 83 },
  },
  {
    name: "Театр им. Моссовета",
    href: "https://mossoveta.ru/",
    logo: { src: "/venues/mossovet.svg", width: 1202, height: 442 },
  },
  {
    name: "Театр на Таганке",
    href: "https://tagankateatr.ru/",
    logo: { src: "/venues/taganka-lockup.svg", width: 278, height: 52 },
  },
  {
    name: "Театр им. Ермоловой",
    href: "https://www.ermolova.ru/",
    logo: { src: "/venues/ermolova-cut.png", width: 958, height: 422 },
  },
  {
    name: "Московский Дворец Молодёжи",
    href: "https://mdmpalace.ru/",
    logo: { src: "/venues/mdm.svg", width: 294, height: 76 },
  },
];

export const TRUST_SECTION = {
  eyebrow: "Оформление",
  title: "Деньги, график, без серых схем",
  lead: "Кандидаты часто боятся кассы «в конверте», звонков ночью и конторы без адреса. Закрываем это прямо, без выдуманных отзывов.",
} as const;

export const TRUST_POINTS = [
  {
    icon: "contract",
    title: "Оформление по закону",
    description:
      "Работаем официально. Конкретный формат — трудовой договор, ГПХ или самозанятость — скажем на собеседовании, без сюрпризов. Юрлицо и ИНН — внизу страницы.",
  },
  {
    icon: "schedule",
    title: "После 18:30 не звоним",
    description:
      "Строго с 08:00 до 18:30. После 18:30 база закрыта, никто не побеспокоит. Два выходных, вечера ваши.",
  },
  {
    icon: "ban",
    title: "Без вложений с вашей стороны",
    description:
      "Никаких депозитов, «входных» и платного обучения. Вы приходите работать, а не платить.",
  },
] as const;

/**
 * Слово руководителя — сильнейший элемент доверия в исходном тексте,
 * поэтому выносим его в отдельный блок, а не прячем в общий поток.
 */
export const TEAM_SECTION = {
  eyebrow: "Команда",
  title: "Кто рядом в первый день",
  lead: "За каждым новичком закрепляется наставник. Руководитель составил этот текст лично — так мы и работаем.",
} as const;

export const LEADER_MESSAGE = {
  sectionTitle: "Слово руководителя",
  quote:
    "Этот текст о вакансии я составил лично. Убеждён: для роста компании важно то, как руководитель относится к сотрудникам, — поэтому никто не расскажет вам об этой работе лучше меня.",
  authorName: "Павел Игнатьев",
  authorRole: "Индивидуальный предприниматель"
} as const;

export const ONBOARDING_STEPS = [
  {
    title: "Знакомство с продуктом",
    description:
      "Разбираем залы, афишу и как подбирать мероприятие гостю — без потока звонков в первый час.",
  },
  {
    title: "Личный наставник",
    description:
      "Рядом опытный сотрудник: подсказки по разговору и обратная связь после смены.",
  },
  {
    title: "Первые самостоятельные сделки",
    description:
      "Когда уверенность появляется, ведёте клиентов сами. Наставник остаётся на связи.",
  },
] as const;

export const ABOUT_COMPANY = {
  title: "О компании",
  paragraphs: [
    `Мы ${SITE.yearsOnMarket} лет работаем на рынке шоу-бизнеса Москвы и помогаем гостям подобрать мероприятие по жанру и уровню.`,
    "Гости возвращаются и рекомендуют друзьям — на этом держится репутация, а не на обещаниях «в интернете».",
  ],
} as const;

export const APPLY_SECTION = {
  eyebrow: "Отклик",
  title: "Напишите — ответим в рабочие часы",
  lead: "С телефона быстрее всего Telegram или WhatsApp. Если удобнее звонок — оставьте имя и номер, перезвоним с 08:00 до 18:30.",
  nameLabel: "Имя",
  namePlaceholder: "Как к вам обращаться",
  phoneLabel: "Телефон",
  phonePlaceholder: "+7 (999) 000-00-00",
  consentPrefix: "Я соглашаюсь на обработку персональных данных и принимаю",
  consentLink: "политику конфиденциальности",
  submitLabel: "Отправить в Telegram",
  successTitle: "Проверьте Telegram",
  successLead:
    "Нажмите «Отправить» в чате — заявка придёт @Dasha_hr01.",
  formTitle: "Или отправьте номер в Telegram",
  formLead: "Имя и телефон уйдут HR в Telegram.",
  asideTitle: "Написать сейчас",
  asideLead:
    "Коротко напишите, что откликаетесь на вакансию менеджера по продаже билетов — ответим с 08:00 до 18:30.",
} as const;

export const FOOTER_CONTENT = {
  contactsTitle: "Контакты",
  rights: "Все права защищены.",
} as const;

/** Schema.org JobPosting — для сниппетов в поиске, без выдуманной зарплаты. */
export const JOB_POSTING_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Менеджер по продаже билетов",
  description:
    "Продажа билетов на концерты и спектакли лучших залов Москвы. Офис, график 5/2 с 08:00 до 18:30, обучение с наставником, ставка за выход и процент с продаж, выплаты каждый день после смены. Опыт не обязателен.",
  datePosted: "2026-09-22",
  employmentType: "FULL_TIME",
  workHours: "Mo-Fr 08:00-18:30",
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
  },
  hiringOrganization: {
    "@type": "Organization",
    name: SITE.legalName,
    taxID: SITE.inn,
    identifier: SITE.ogrnip,
  },
} as const;
