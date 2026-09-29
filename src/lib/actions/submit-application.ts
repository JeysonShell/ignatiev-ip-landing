"use server";

import { applicationSchema } from "@/lib/apply-schema";
import { normalizeRuPhone } from "@/lib/utils";

export type ApplicationResult =
  | { ok: true }
  | { ok: false; message: string };

const RATE_LIMIT_MS = 30_000;
const lastSubmitAt = new Map<string, number>();

export async function submitApplication(
  input: unknown,
): Promise<ApplicationResult> {
  const parsed = applicationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Проверьте форму",
    };
  }

  const phone = normalizeRuPhone(parsed.data.phone);
  if (!phone) {
    return { ok: false, message: "Не похоже на российский номер" };
  }

  const now = Date.now();
  const recent = lastSubmitAt.get(phone);
  if (recent !== undefined && now - recent < RATE_LIMIT_MS) {
    return {
      ok: false,
      message: "Заявка уже отправлена. Подождите полминуты или напишите в Telegram.",
    };
  }
  lastSubmitAt.set(phone, now);

  const text = [
    "Новый отклик на вакансию",
    `Имя: ${parsed.data.name}`,
    `Телефон: ${phone}`,
  ].join("\n");
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        },
      );
      if (!response.ok) {
        lastSubmitAt.delete(phone);
        return {
          ok: false,
          message:
            "Не удалось отправить. Напишите в Telegram или WhatsApp — так заявка точно дойдёт.",
        };
      }
    } catch {
      lastSubmitAt.delete(phone);
      return {
        ok: false,
        message:
          "Не удалось отправить. Напишите в Telegram или WhatsApp — так заявка точно дойдёт.",
      };
    }
  } else {
    console.info("[apply]", text);
  }

  return { ok: true };
}
