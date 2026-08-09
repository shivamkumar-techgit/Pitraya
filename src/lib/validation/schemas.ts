import { z } from "zod";

/**
 * Devotee Booking Wizard Form & API Payload Schema
 */
export const bookingWizardSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(100),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15)
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address format").toLowerCase(),
  city: z.string().min(2, "City name is required").default("Gaya"),
  country: z.string().default("India"),
  packageId: z.string().optional(),
  packageTitle: z.string().optional(),
  duration: z.string().optional(),
  adults: z.number().int().min(1, "At least 1 adult is required").default(2),
  elders: z.number().int().min(0).default(0),
  children: z.number().int().min(0).default(0),
  totalCount: z.number().int().min(1).default(2),
  wheelchairNeeded: z.boolean().default(false),
  airportPickupNeeded: z.boolean().default(false),
  travelMode: z.enum(["flight", "train", "road"]).default("flight"),
  arrivalDate: z.string().min(1, "Arrival date is required"),
  arrivalTime: z.string().default("10:30 AM"),
  flightOrTrainNumber: z.string().optional().default(""),
  grandTotal: z.number().min(0, "Grand total cannot be negative").optional(),
});

export type BookingWizardInput = z.infer<typeof bookingWizardSchema>;

/**
 * Payment Link Creation Payload Schema
 */
export const createPaymentLinkSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  amount: z.number().min(1, "Payment amount must be greater than zero"),
  message: z.string().max(255).optional(),
});

export type CreatePaymentLinkInput = z.infer<typeof createPaymentLinkSchema>;

/**
 * Booking Record Update Payload Schema
 */
export const updateBookingSchema = z.object({
  id: z.string().min(1, "Booking ID is required"),
  status: z
    .enum([
      "draft",
      "lead",
      "coordinator_assigned",
      "payment_pending",
      "awaiting_payment",
      "paid",
      "confirmed",
      "hotel_reserved",
      "vehicle_assigned",
      "pandit_assigned",
      "in_journey",
      "completed",
      "cancelled",
    ])
    .optional(),
  journeyStatus: z
    .enum(["not_started", "arrival", "hotel_checkin", "rituals", "departure", "completed"])
    .optional(),
  paymentStatus: z
    .enum(["not_requested", "link_generated", "pending", "partially_paid", "paid", "refunded", "failed"])
    .optional(),
  coordinatorId: z.string().nullable().optional(),
  panditId: z.string().nullable().optional(),
  vehicleId: z.string().nullable().optional(),
  hotelId: z.string().nullable().optional(),
});

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;

/**
 * Authentication Form Schemas
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address format").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });
