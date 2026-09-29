import { z } from "zod";

import { normalizeRuPhone } from "@/lib/utils";

export const applicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя — хотя бы два символа")
    .max(80, "Имя слишком длинное"),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => normalizeRuPhone(value) !== null,
      "Не похоже на российский номер",
    ),
  consent: z
    .boolean()
    .refine((value) => value, "Нужно согласие на обработку персональных данных"),
});

export type ApplicationValues = z.infer<typeof applicationSchema>;
