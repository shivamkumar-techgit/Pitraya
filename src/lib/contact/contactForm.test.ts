import test from "node:test";
import assert from "node:assert/strict";

import { validateContactFormInput, extractContactErrorMessage } from "./contactForm";

test("validates a complete contact form", () => {
  const result = validateContactFormInput({
    name: "Rajesh Sharma",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    message: "I would like to book a Pind Daan ceremony for my mother.",
  });

  assert.deepEqual(result, {});
});

test("returns a helpful fallback error when the server response is empty", () => {
  const message = extractContactErrorMessage(undefined);
  assert.equal(message, "Something went wrong. Please try WhatsApp or email directly.");
});
