import { publicSrc } from "@/lib/asset";

/**
 * Локальные кадры и фирменный знак (лежат в /public).
 * Префикс GitHub Pages добавляет publicSrc на этапе сборки.
 */
export const LOGO = {
  src: publicSrc("/brand/logo.jpg"),
  width: 1024,
  height: 571,
} as const;

export const HERO_BACKDROP_SRC = publicSrc("/images/office-open.jpg");

export const SCENE_PHOTOS = [
  {
    src: publicSrc("/images/office-lounge.jpg"),
    alt: "Светлая переговорная в офисе",
  },
  {
    src: publicSrc("/images/office-desks.jpg"),
    alt: "Рабочее место у панорамного окна",
  },
  {
    src: publicSrc("/images/opera-hall.jpg"),
    alt: "Зрительный зал с красным занавесом",
  },
] as const;

export const ILLUSTRATIONS = {
  benefits: {
    src: publicSrc("/images/illustration-benefits.jpg"),
    alt: "Оформление, выплаты, обучение и забота о сотрудниках",
    width: 1024,
    height: 571,
  },
  mentor: {
    src: publicSrc("/images/illustration-mentor.png"),
    alt: "Наставник объясняет новичку",
    width: 807,
    height: 450,
  },
} as const;
