/**
 * Pitraya Relational Database Schema Definitions
 * 12 Linked Entities:
 * Users, Bookings, BookingTimeline, BookingTasks, Payments, Hotels, Vehicles,
 * Pandits, Coordinators, Documents, Reviews, Notifications.
 */

export interface UserEntity {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  createdAt: string;
}

export interface HotelEntity {
  id: string;
  name: string;
  starRating: number;
  address: string;
  googleMapsUrl: string;
  checkInTime: string;
}

export interface VehicleEntity {
  id: string;
  name: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
}

export interface PanditEntity {
  id: string;
  name: string;
  phone: string;
  title: string;
  sanctumSpecialty: string;
}

export interface CoordinatorEntity {
  id: string;
  name: string;
  phone: string;
  role: string;
}

export type BookingStatus =
  | "draft"
  | "lead"
  | "coordinator_assigned"
  | "payment_pending"
  | "confirmed"
  | "in_journey"
  | "completed"
  | "cancelled";

export interface BookingEntity {
  id: string;
  reservationId: string;
  userId: string; // FK -> UserEntity.id
  packageTierId: string;
  packageTitle: string;
  duration: string;
  status: BookingStatus;
  grandTotal: number;
  adults: number;
  elders: number;
  children: number;
  totalCount: number;
  wheelchairNeeded: boolean;
  airportPickupNeeded: boolean;
  arrivalDate: string;
  arrivalTime: string;
  travelMode: "flight" | "train" | "road";
  flightOrTrainNumber?: string;
  hotelId?: string; // FK -> HotelEntity.id
  vehicleId?: string; // FK -> VehicleEntity.id
  panditId?: string; // FK -> PanditEntity.id
  coordinatorId?: string; // FK -> CoordinatorEntity.id
  createdAt: string;
  updatedAt: string;
}

export interface BookingTimelineEntity {
  id: string;
  bookingId: string; // FK -> BookingEntity.id
  dayNumber: number;
  title: string;
  description: string;
  location: string;
  scheduledTime: string;
}

export interface BookingTaskEntity {
  id: string;
  bookingId: string; // FK -> BookingEntity.id
  taskKey: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

export interface PaymentEntity {
  id: string;
  bookingId: string; // FK -> BookingEntity.id
  amount: number;
  paymentMethod: "UPI" | "Bank Transfer" | "Card" | "WhatsApp Pay";
  transactionRef: string;
  status: "pending" | "paid" | "failed";
  paymentLink: string;
  issuedAt: string;
  paidAt?: string;
}

export type AutoDocType =
  | "reservation_letter"
  | "invoice"
  | "payment_receipt"
  | "journey_itinerary"
  | "temple_schedule";

export interface DocumentEntity {
  id: string;
  bookingId: string; // FK -> BookingEntity.id
  docType: AutoDocType;
  title: string;
  downloadUrl: string;
  generatedAt: string;
}

export interface ReviewEntity {
  id: string;
  bookingId: string; // FK -> BookingEntity.id
  userId: string; // FK -> UserEntity.id
  googleReviewUrl: string;
  photoUrls: string[];
  feedbackRating?: number; // 1 to 5 stars
  feedbackText?: string;
  referralCode: string;
  status: "pending_request" | "review_sent" | "completed";
  createdAt: string;
}

export interface NotificationEntity {
  id: string;
  bookingId: string; // FK -> BookingEntity.id
  type: "confirmation" | "vehicle" | "hotel" | "payment_link" | "review_request";
  recipientPhone: string;
  channel: "whatsapp" | "sms";
  content: string;
  sentAt: string;
}
