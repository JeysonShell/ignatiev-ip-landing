import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { PhoneButton, TelegramButton } from "@/components/ui/cta";
import { NAV_SECTIONS } from "@/lib/constants";
import { VACANCY_HERO } from "@/lib/content/vacancy";

/**
 * Липкий хедер без blur: непрозрачный фон, серверный компонент.
 * Клиентский JS на странице сводится к мобильному меню.
 */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-header border-b border-hairline bg-canvas">
      <div className="container-page flex h-20 items-center justify-between gap-4 md:h-24">
        <Logo />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <Link
                  href={`/#${section.id}`}
                  className="tap-safe inline-flex items-center rounded-[10px] px-3.5 text-sm font-medium text-content-muted transition-colors duration-200 hover:bg-paper-2 hover:text-content"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <PhoneButton variant="ghost" size="sm" className="hidden lg:flex" />

          {/* На 360px кнопка уступает место логотипу и меню, с 428px возвращается. */}
          <TelegramButton
            size="sm"
            label={VACANCY_HERO.headerCta}
            className="hidden xs:flex"
          />

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
