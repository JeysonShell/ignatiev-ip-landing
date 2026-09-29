/**
 * Локальные кадры и фирменный знак (лежат в /public).
 * Не hotlink: next/image читает файлы с диска и отдаёт avif/webp.
 */
export const LOGO = {
  src: "/brand/logo.jpg",
  width: 1024,
  height: 571,
} as const;

export const HERO_BACKDROP_SRC = "/images/office-open.jpg";

export const SCENE_PHOTOS = [
  {
    src: "/images/office-lounge.jpg",
    alt: "Светлая переговорная в офисе",
  },
  {
    src: "/images/office-desks.jpg",
    alt: "Рабочее место у панорамного окна",
  },
  {
    src: "/images/opera-hall.jpg",
    alt: "Зрительный зал с красным занавесом",
  },
] as const;

export const ILLUSTRATIONS = {
  benefits: {
    src: "/images/illustration-benefits.jpg",
    alt: "Оформление, выплаты, обучение и забота о сотрудниках",
    width: 1024,
    height: 571,
  },
  mentor: {
    src: "/images/illustration-mentor.png",
    alt: "Наставник объясняет новичку",
    width: 807,
    height: 450,
  },
} as const;
