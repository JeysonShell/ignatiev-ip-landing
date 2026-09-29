"use client";

import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ApplyButton, PhoneButton, TelegramButton } from "@/components/ui/cta";
import { NAV_SECTIONS } from "@/lib/constants";

/**
 * Мобильная навигация — единственный клиентский компонент на странице.
 * Построена на Radix Dialog, потому что он берёт на себя всю возню с
 * доступностью: перехват фокуса, закрытие по Escape, aria-modal, возврат
 * фокуса на триггер и блокировку скролла под шторкой.
 *
 * Состояние не храним: Close с asChild закрывает шторку по клику на пункт,
 * поэтому useState здесь был бы лишней сущностью.
 */
export function MobileMenu() {
  return (
    <Root>
      <Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Открыть меню">
          <Menu aria-hidden />
        </Button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 z-overlay bg-navy/40 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />

        <Content
          // Описание не нужно: список ссылок говорит сам за себя, а без
          // явного undefined Radix ругается на отсутствие aria-describedby.
          aria-describedby={undefined}
          // До 428px шторка занимает всю ширину: полоска оверлея в несколько
          // пикселей сбоку читается как дефект вёрстки, а не как шторка.
          className="fixed inset-y-0 right-0 z-overlay flex w-full flex-col border-l border-hairline bg-paper p-5 duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right xs:max-w-sm"
        >
          <div className="flex items-center justify-between">
            <Title className="font-display text-base font-bold text-content-muted">
              Меню
            </Title>
            <Close asChild>
              <Button variant="ghost" size="icon" aria-label="Закрыть меню">
                <X aria-hidden />
              </Button>
            </Close>
          </div>

          <nav aria-label="Разделы страницы" className="mt-6 flex-1">
            <ul className="flex flex-col">
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <Close asChild>
                    <a
                      href={`/#${section.id}`}
                      className="tap-safe flex items-center border-b border-hairline py-3 font-display text-xl font-bold tracking-tight transition-colors duration-200 hover:text-accent"
                    >
                      {section.label}
                    </a>
                  </Close>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 pt-6">
            <TelegramButton size="lg" fullWidth />

            <Close asChild>
              <ApplyButton variant="secondary" size="lg" fullWidth />
            </Close>

            <PhoneButton variant="ghost" size="lg" fullWidth />
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
