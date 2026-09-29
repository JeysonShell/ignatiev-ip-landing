import { applicationSchema } from "@/lib/apply-schema";
import { normalizeRuPhone } from "@/lib/utils";

export type ApplicationResult =
  | { ok: true }
  | { ok: false; message: string };

const RATE_LIMIT_MS = 30_000;
const lastSubmitAt = new Map<string, number>();

export function submitApplication(input: unknown): ApplicationResult {
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
      message:
        "Заявка уже отправлена. Подождите полминуты или напишите в Telegram.",
    };
  }
  lastSubmitAt.set(phone, now);

  return { ok: true };
}
