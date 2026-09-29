import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Нативный чекбокс: 20px визуально, но кликабельная зона не меньше 44px
 * за счёт padding у подписи в форме. Не подменяем его кастомным span —
 * иначе ломается клавиатурный доступ и состояние из react-hook-form.
 */
export function Checkbox({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "mt-0.5 size-5 shrink-0 rounded-md border-ink bg-card",
        "accent-brand",
        className,
      )}
      {...props}
    />
  );
}
