/**
 * Client-side helper to submit PayU Hosted Checkout form dynamically
 */
export async function initiatePayUCheckout(bookingDetails?: {
  bookingId?: string;
  reservationId?: string;
  amount?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  packageTitle?: string;
}): Promise<void> {
  try {
    if (bookingDetails) {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();

      if (data.success && data.payuPayload) {
        const { payuPayload } = data;

        // Create and auto-submit hidden HTML form to PayU Hosted Checkout URL
        const form = document.createElement("form");
        form.method = "POST";
        form.action = payuPayload.actionUrl || "https://secure.payu.in/_payment";

        Object.entries(payuPayload).forEach(([key, value]) => {
          if (key !== "actionUrl" && value !== undefined && value !== null) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = String(value);
            form.appendChild(input);
          }
        });

        document.body.appendChild(form);
        form.submit();
        return;
      }
    }
    // Direct Live PayU Quick Payment Link
    window.location.href = "https://u.payu.in/MIvnJ8tUOvLJ";
  } catch (error) {
    console.error("PayU Checkout Error:", error);
    window.location.href = "https://u.payu.in/MIvnJ8tUOvLJ";
  }
}
