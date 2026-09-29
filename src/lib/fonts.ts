import { Golos_Text, Unbounded } from "next/font/google";

/**
 * next/font разбирает вызовы статически на этапе сборки, поэтому аргументы
 * обязаны быть литералами — вынести subsets в общую константу нельзя.
 * Сабсеты ограничены latin + cyrillic: остальное не грузим.
 */
export const fontSans = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
  weight: ["400", "500", "600"],
  adjustFontFallback: true,
});

export const fontDisplay = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["600", "700", "800"],
  adjustFontFallback: true,
});

export const fontClassName = `${fontSans.variable} ${fontDisplay.variable}`;
