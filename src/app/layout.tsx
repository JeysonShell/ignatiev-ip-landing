import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { fontClassName } from "@/lib/fonts";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Менеджер по продаже билетов — Москва, без опыта",
    template: `%s — ${SITE.name}`,
  },
  description:
    "Офис в Москве: продажа билетов на концерты и спектакли. Без опыта, личный наставник, ставка за выход и процент с продаж, выплаты каждый день, график 5/2 с 08:00 до 18:30.",
  applicationName: SITE.name,
  keywords: [
    "вакансия менеджер по продажам",
    "работа в Москве без опыта",
    "продажа билетов вакансия",
    "работа в офисе 5/2",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: "Менеджер по продаже билетов — Москва, без опыта",
    description:
      "Офис, график 5/2. Личный наставник, выплаты каждый день после смены. Опыт не обязателен.",
    images: [
      {
        url: "/brand/logo.jpg",
        width: 1024,
        height: 571,
        alt: SITE.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale не ограничиваем: пользователь должен иметь возможность зумить.
  themeColor: "#F4EEE1",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" className={fontClassName}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only-focusable tap-safe fixed top-4 left-4 z-skip inline-flex items-center rounded-[10px] bg-brand px-5 text-sm font-semibold text-on-brand shadow-brand"
        >
          Перейти к основному содержимому
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
