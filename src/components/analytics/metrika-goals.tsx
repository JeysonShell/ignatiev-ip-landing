"use client";

import { useEffect } from "react";

import { reachGoal } from "@/lib/metrika";

/**
 * Клики по Telegram, WhatsApp и телефону с data-metrika-goal считаются откликом.
 * Форма бьёт цель сама — повторный клик на экране успеха не дублируем в кнопках.
 */
export function MetrikaGoals() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const node = target.closest("[data-metrika-goal]");
      if (!(node instanceof HTMLElement)) return;

      const goal = node.dataset.metrikaGoal;
      if (!goal) return;

      const source = node.dataset.metrikaSource;
      reachGoal(goal, source ? { source } : undefined);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
