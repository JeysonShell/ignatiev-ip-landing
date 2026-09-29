"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { submitApplication } from "@/lib/submit-application";
import {
  applicationSchema,
  type ApplicationValues,
} from "@/lib/apply-schema";
import { CONTACTS, EXTERNAL_LINKS, PATHS } from "@/lib/constants";
import { APPLY_SECTION } from "@/lib/content/vacancy";
import { buildApplyShareText, formatPhone, withTextQuery } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TelegramButton, WhatsAppButton } from "@/components/ui/cta";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ApplyForm() {
  const [success, setSuccess] = useState(false);
  const [shareText, setShareText] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      phone: "",
      consent: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitApplication(values);
    if (!result.ok) {
      setServerError(result.message);
      return;
    }

    setShareText(buildApplyShareText(values.name, values.phone));
    setSuccess(true);
  });

  if (success) {
    const telegramHref = shareText
      ? withTextQuery(EXTERNAL_LINKS.telegram, shareText)
      : EXTERNAL_LINKS.telegram;
    const whatsappHref = shareText
      ? withTextQuery(EXTERNAL_LINKS.whatsapp, shareText)
      : EXTERNAL_LINKS.whatsapp;

    return (
      <div>
        <p className="font-display text-xl font-bold tracking-tight">
          {APPLY_SECTION.successTitle}
        </p>
        <p className="mt-2 text-content-muted">{APPLY_SECTION.successLead}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <TelegramButton href={telegramHref} label="Telegram" fullWidth />
          <WhatsAppButton
            href={whatsappHref}
            variant="secondary"
            fullWidth
          />
        </div>
      </div>
    );
  }

  const nameError = errors.name?.message;
  const phoneError = errors.phone?.message;
  const consentError = errors.consent?.message;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field id="apply-name" label={APPLY_SECTION.nameLabel} error={nameError}>
        <Input
          id="apply-name"
          autoComplete="name"
          maxLength={80}
          placeholder={APPLY_SECTION.namePlaceholder}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "apply-name-error" : undefined}
          {...register("name")}
        />
      </Field>

      <Field
        id="apply-phone"
        label={APPLY_SECTION.phoneLabel}
        error={phoneError}
      >
        <Input
          id="apply-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          placeholder={APPLY_SECTION.phonePlaceholder}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? "apply-phone-error" : undefined}
          {...register("phone")}
        />
      </Field>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="apply-consent"
          className="flex min-h-11 gap-3 text-sm leading-relaxed text-content-muted"
        >
          <span className="inline-flex size-11 shrink-0 items-center justify-center">
            <Checkbox
              id="apply-consent"
              aria-invalid={consentError ? true : undefined}
              aria-describedby={consentError ? "apply-consent-error" : undefined}
              {...register("consent")}
            />
          </span>
          <span>
            {APPLY_SECTION.consentPrefix}{" "}
            <Link
              href={PATHS.privacy}
              className="inline-flex min-h-11 items-center font-medium text-ink underline-offset-4 hover:text-accent-dark hover:underline"
            >
              {APPLY_SECTION.consentLink}
            </Link>
            .
          </span>
        </label>
        {consentError ? (
          <p id="apply-consent-error" role="alert" className="text-sm text-danger">
            {consentError}
          </p>
        ) : null}
      </div>

      {serverError ? (
        <p role="alert" className="text-sm text-danger">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
        {APPLY_SECTION.submitLabel}
      </Button>

      <p className="text-center text-xs text-content-muted">
        Или сразу {formatPhone(CONTACTS.phone)}
      </p>
    </form>
  );
}
