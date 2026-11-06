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

/**
 * Кадры скроллтеллинга по порядку: закатный лофт, дневной лофт, консультант,
 * рабочее место, зона отдыха. Закатный лофт и консультант сгенерированы,
 * остальные — фотографии офиса. Смены кадров заданы в STORY_CUTS.
 * focalX — где в кадре главное по горизонтали (0..1): на узком экране
 * кадр обрезается по бокам, и эта точка остаётся в видимой части.
 */
export const STORY_FRAMES = [
  { src: publicSrc("/images/loft-sunset.jpg"), focalX: 0.5 },
  { src: publicSrc("/images/office-open.jpg"), focalX: 0.45 },
  { src: publicSrc("/images/woman-headset.jpg"), focalX: 0.52 },
  { src: publicSrc("/images/office-desks.jpg"), focalX: 0.6 },
  { src: publicSrc("/images/office-lounge.jpg"), focalX: 0.5 },
] as const;
