import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Склеивает классы и разрешает конфликты Tailwind (последний побеждает).
 * Единственный допустимый способ собирать className в проекте.
 */
export function cn(...inputs: readonly ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const RU_PHONE_PATTERN = /^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/;

/**
 * Приводит российский номер из E.164 к читаемому виду: +7 (977) 996-04-39.
 * Нераспознанный формат возвращаем как есть — лендинг не должен падать
 * из-за опечатки в реквизитах.
 */
export function formatPhone(e164: string): string {
  const match = RU_PHONE_PATTERN.exec(e164);
  if (!match) return e164;

  const [, area, block, pairOne, pairTwo] = match;
  return `+7 (${area}) ${block}-${pairOne}-${pairTwo}`;
}

/**
 * Собирает российский номер в E.164. Принимает +7, 8 и «девятку» без кода.
 * Нераспознанное значение — null, чтобы форма не пропускала мусор.
 */
export function normalizeRuPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");

  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return `+7${digits.slice(1)}`;
  }

  if (digits.length === 10 && digits.startsWith("9")) {
    return `+7${digits}`;
  }

  return null;
}

export function buildApplyShareText(name: string, phone: string): string {
  const normalized = normalizeRuPhone(phone) ?? phone;
  return [
    "Здравствуйте! Хочу откликнуться на вакансию менеджера по продаже билетов.",
    `Имя: ${name}`,
    `Телефон: ${formatPhone(normalized)}`,
  ].join("\n");
}

export function withTextQuery(url: string, text: string): string {
  const glue = url.includes("?") ? "&" : "?";
  return `${url}${glue}text=${encodeURIComponent(text)}`;
}
