export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  inquiryType?: string;
  preferredContact?: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormInput, string>>;

export function validateContactFormInput(input: ContactFormInput): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!input.name?.trim()) {
    errors.name = "Your name is required";
  }

  if (!input.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "A valid email is required";
  }

  if (!input.phone?.trim() || !/^\+?[\d\s\-()]{7,}$/.test(input.phone)) {
    errors.phone = "A valid phone number is required";
  }

  if (!input.message?.trim() || input.message.trim().length < 20) {
    errors.message = "Please describe your inquiry (min 20 characters)";
  }

  return errors;
}

export function extractContactErrorMessage(payload?: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "Something went wrong. Please try WhatsApp or email directly.";
  }

  const maybeMessage = (payload as { message?: unknown }).message;
  if (typeof maybeMessage === "string" && maybeMessage.trim()) {
    return maybeMessage;
  }

  const maybeErrors = (payload as { errors?: unknown }).errors;
  if (Array.isArray(maybeErrors) && maybeErrors.length > 0) {
    const firstError = maybeErrors[0];
    if (firstError && typeof firstError === "object") {
      const issue = firstError as { message?: unknown };
      if (typeof issue.message === "string" && issue.message.trim()) {
        return issue.message;
      }
    }
  }

  return "Something went wrong. Please try WhatsApp or email directly.";
}
