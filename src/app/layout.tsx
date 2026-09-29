import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { MetrikaGoals } from "@/components/analytics/metrika-goals";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { fontClassName } from "@/lib/fonts";
import { ROOT_METADATA } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = ROOT_METADATA;

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
        <YandexMetrika />
        <MetrikaGoals />
      </body>
    </html>
  );
}
