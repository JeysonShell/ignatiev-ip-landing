import { METRIKA_GOAL_OTKLIK, YANDEX_METRIKA_ID } from "@/lib/constants";

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
  }
}

export type OtklikSource = "telegram" | "whatsapp" | "phone" | "form";

/** Атрибуты на ссылке: клик ловит MetrikaGoals и шлёт reachGoal. */
export function otklikAttrs(source: Exclude<OtklikSource, "form">) {
  return {
    "data-metrika-goal": METRIKA_GOAL_OTKLIK,
    "data-metrika-source": source,
  } as const;
}

/**
 * Цель Директа. ym из сниппета сразу очередь: вызов до загрузки tag.js не теряется.
 */
export function reachGoal(
  goal: string,
  params?: Readonly<Record<string, string>>,
) {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, params);
}

export function reachOtklik(source: OtklikSource) {
  reachGoal(METRIKA_GOAL_OTKLIK, { source });
}
