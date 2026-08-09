import {
  UserEntity,
  HotelEntity,
  VehicleEntity,
  PanditEntity,
  CoordinatorEntity,
  BookingEntity,
  BookingTimelineEntity,
  BookingTaskEntity,
  PaymentEntity,
  DocumentEntity,
  ReviewEntity,
  NotificationEntity,
  BookingStatus,
} from "@/lib/db/schema";
import { generateAutoDocuments } from "@/lib/documentEngine";
import { createPostJourneyReviewFlow } from "@/lib/postJourneyEngine";

export type { BookingStatus };

// ==========================================
// RELATIONAL ENTERPRISE DATABASE TABLES
// ==========================================

export const USERS_TABLE: UserEntity[] = [
  {
    id: "usr-1",
    name: "Sharma Ji",
    phone: "9876543210",
    email: "sharmaji@example.com",
    city: "Delhi",
    country: "India",
    createdAt: "2026-07-30T10:00:00Z",
  },
  {
    id: "usr-2",
    name: "Deepak Kulkarni",
    phone: "+91 98220 11223",
    email: "deepak.k@example.com",
    city: "Pune",
    country: "India",
    createdAt: "2026-07-28T09:00:00Z",
  },
];

export const HOTELS_TABLE: HotelEntity[] = [
  {
    id: "hot-vishnu",
    name: "Hotel Vishnu ⭐⭐⭐",
    starRating: 3,
    address: "Main Temple Road, Bodhgaya",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Vishnu+Bodhgaya",
    checkInTime: "12:00 PM",
  },
  {
    id: "hot-gaya-intl",
    name: "Hotel Gaya International ⭐⭐⭐⭐",
    starRating: 4,
    address: "Near Vishnupad Sanctum, Gaya",
    googleMapsUrl: "https://maps.google.com/?q=Gaya+International",
    checkInTime: "12:00 PM",
  },
  {
    id: "hot-regency",
    name: "Bodhgaya Regency Heritage Suite ⭐⭐⭐⭐",
    starRating: 4,
    address: "Heritage Zone, Bodhgaya",
    googleMapsUrl: "https://maps.google.com/?q=Bodhgaya+Regency",
    checkInTime: "12:00 PM",
  },
  {
    id: "hot-royal-heritage",
    name: "Hotel Royal Heritage ⭐⭐⭐⭐⭐",
    starRating: 5,
    address: "VIP Enclave, Bodhgaya",
    googleMapsUrl: "https://maps.google.com/?q=Royal+Heritage+Bodhgaya",
    checkInTime: "02:00 PM",
  },
];

export const VEHICLES_TABLE: VehicleEntity[] = [
  {
    id: "veh-innova",
    name: "Innova Crysta AC",
    driverName: "Chauffeur Ramesh",
    driverPhone: "+91 99887 76655",
    vehicleNumber: "BR-02-PA-8841",
  },
  {
    id: "veh-tempo",
    name: "Executive Tempo Traveller",
    driverName: "Chauffeur Suresh",
    driverPhone: "+91 98765 12345",
    vehicleNumber: "BR-02-TT-9912",
  },
];

export const PANDITS_TABLE: PanditEntity[] = [
  {
    id: "pandit-mishra",
    name: "Pandit Rajesh Mishra Ji",
    phone: "+91 98350 12345",
    title: "Senior Gayawal Purohit",
    sanctumSpecialty: "Vishnupad Footprint Pinda Daan",
  },
  {
    id: "pandit-shastri",
    name: "Acharya S. K. Shastri Ji",
    phone: "+91 94312 67890",
    title: "Vishnupad Sanctum Head",
    sanctumSpecialty: "Gayawal Panji Family Lineage Record",
  },
];

export const COORDINATORS_TABLE: CoordinatorEntity[] = [
  { id: "669598e2-3080-44f1-b012-ce59b7a7959c", name: "Rajesh", phone: "+91 98111 22233", role: "Senior Pilgrimage Concierge" },
  { id: "5db2fa12-5eb7-4619-a16e-8ec7e8703ee1", name: "Mukesh", phone: "+91 98222 33344", role: "Sanctum Escort Manager" },
  { id: "d8daf8e7-d022-416b-bb5c-dc9bc34561d2", name: "Ankit", phone: "+91 98333 44455", role: "VIP Concierge Coordinator" },
  { id: "28c2d0db-3e40-4cdc-9d3e-3e54c3ddcd8b", name: "Sanjay", phone: "+91 98444 55566", role: "Pilgrimage Operations Lead" },
];

export const DEFAULT_TASKS_KEYS = [
  "Call Customer",
  "Confirm Arrival",
  "Assign Hotel",
  "Assign Vehicle",
  "Assign Pandit",
  "Receive Payment",
  "Send Itinerary",
  "Send Driver Details",
  "Journey Completed",
  "Request Review",
];

// Composite Full Booking Model for Frontend Controls
export interface FullBookingRecord extends BookingEntity {
  sessionId?: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  family: {
    adults: number;
    elders: number;
    children: number;
    totalCount: number;
    wheelchairNeeded: boolean;
    airportPickupNeeded: boolean;
  };
  travel: {
    mode: "flight" | "train" | "road";
    arrivalDate: string;
    arrivalTime: string;
    flightOrTrainNumber?: string;
  };
  hotel: {
    title: string;
    roomsNeeded: number;
  };
  assignedCoordinator?: CoordinatorEntity;
  assignedPandit?: PanditEntity;
  assignedVehicle?: VehicleEntity;
  assignedHotel?: HotelEntity;
  notes: {
    id: string;
    author: string;
    text: string;
    createdAt: string;
  }[];
  tasks: { id: string; title: string; completed: boolean }[];
  documents: DocumentEntity[];
  reviewFlow?: ReviewEntity;
  history: { id: string; action: string; performedBy: string; timestamp: string }[];
}

const TODAY_DATE_STR = new Date().toISOString().split("T")[0];

const INITIAL_FULL_BOOKINGS: FullBookingRecord[] = [
  {
    id: "b-101",
    reservationId: "PTR240801",
    userId: "usr-1",
    customerName: "Sharma Ji",
    phone: "9876543210",
    email: "sharmaji@example.com",
    city: "Delhi",
    country: "India",
    packageTierId: "heritage-pilgrimage",
    packageTitle: "Heritage",
    duration: "2 Days / 1 Night",
    status: "lead",
    grandTotal: 24999,
    adults: 2,
    elders: 1,
    children: 1,
    totalCount: 4,
    wheelchairNeeded: true,
    airportPickupNeeded: true,
    arrivalDate: "12 August",
    arrivalTime: "10:30 AM",
    travelMode: "flight",
    flightOrTrainNumber: "6E-2411",
    family: {
      adults: 2,
      elders: 1,
      children: 1,
      totalCount: 4,
      wheelchairNeeded: true,
      airportPickupNeeded: true,
    },
    travel: {
      mode: "flight",
      arrivalDate: "12 August",
      arrivalTime: "10:30 AM",
      flightOrTrainNumber: "6E-2411",
    },
    hotel: {
      title: "⭐⭐⭐ Heritage Stay",
      roomsNeeded: 1,
    },
    assignedCoordinator: undefined,
    assignedPandit: undefined,
    assignedVehicle: undefined,
    assignedHotel: undefined,
    notes: [
      {
        id: "n-101",
        author: "System",
        text: "New Lead submitted via Web Wizard.",
        createdAt: `${TODAY_DATE_STR}T10:15:00Z`,
      },
    ],
    tasks: DEFAULT_TASKS_KEYS.map((k, idx) => ({
      id: `t-${idx + 1}`,
      title: k,
      completed: idx === 0,
    })),
    documents: [],
    history: [
      { id: "h-1", action: "Lead Created via Web Wizard", performedBy: "System", timestamp: `${TODAY_DATE_STR}T10:15:00Z` },
    ],
    createdAt: `${TODAY_DATE_STR}T10:15:00Z`,
    updatedAt: `${TODAY_DATE_STR}T10:15:00Z`,
  },
];

// Initialize Auto-Documents for Initial Data
INITIAL_FULL_BOOKINGS[0].documents = generateAutoDocuments(INITIAL_FULL_BOOKINGS[0]);

const globalFullBookings: FullBookingRecord[] = [...INITIAL_FULL_BOOKINGS];

export function getBookingsStore(): FullBookingRecord[] {
  return globalFullBookings;
}

export interface LeadInput {
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    city?: string;
    country?: string;
  };
  customerName?: string;
  phone?: string;
  email?: string;
  city?: string;
  country?: string;
  package?: {
    id?: string;
    title?: string;
    duration?: string;
  };
  packageTierId?: string;
  packageTitle?: string;
  duration?: string;
  pricing?: {
    grandTotal?: number;
    familyTotalCount?: number;
  };
  grandTotal?: number;
  family?: {
    adults?: number;
    elders?: number;
    children?: number;
    totalCount?: number;
    wheelchairNeeded?: boolean;
    airportPickupNeeded?: boolean;
  };
  travel?: {
    mode?: "flight" | "train" | "road";
    arrivalDate?: string;
    arrivalTime?: string;
    flightOrTrainNumber?: string;
  };
  hotel?: {
    title?: string;
    roomsNeeded?: number;
  };
}

export function createLeadRecord(data: LeadInput): FullBookingRecord {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const uniqueSuffix = `${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
  const reservationId = `PTR-${dateStr}-${uniqueSuffix}`;

  const newBooking: FullBookingRecord = {
    id: `b-${Date.now()}`,
    reservationId,
    userId: `usr-${Date.now()}`,
    customerName: data.customer?.name || data.customerName || "Sharma Ji",
    phone: data.customer?.phone || data.phone || "9876543210",
    email: data.customer?.email || data.email || "sharmaji@example.com",
    city: data.customer?.city || data.city || "Delhi",
    country: data.customer?.country || data.country || "India",
    packageTierId: data.package?.id || data.packageTierId || "heritage-pilgrimage",
    packageTitle: data.package?.title || data.packageTitle || "Heritage",
    duration: data.package?.duration || data.duration || "2 Days",
    status: "lead",
    grandTotal: data.pricing?.grandTotal || data.grandTotal || 24999,
    adults: data.family?.adults || 2,
    elders: data.family?.elders || 1,
    children: data.family?.children || 1,
    totalCount: data.pricing?.familyTotalCount || data.family?.totalCount || 4,
    wheelchairNeeded: !!(data.family?.wheelchairNeeded),
    airportPickupNeeded: !!(data.family?.airportPickupNeeded),
    arrivalDate: data.travel?.arrivalDate || "12 August",
    arrivalTime: data.travel?.arrivalTime || "10:30 AM",
    travelMode: data.travel?.mode || "flight",
    flightOrTrainNumber: data.travel?.flightOrTrainNumber || "",
    family: {
      adults: data.family?.adults || 2,
      elders: data.family?.elders || 1,
      children: data.family?.children || 1,
      totalCount: data.pricing?.familyTotalCount || data.family?.totalCount || 4,
      wheelchairNeeded: !!(data.family?.wheelchairNeeded),
      airportPickupNeeded: !!(data.family?.airportPickupNeeded),
    },
    travel: {
      mode: data.travel?.mode || "flight",
      arrivalDate: data.travel?.arrivalDate || "12 August",
      arrivalTime: data.travel?.arrivalTime || "10:30 AM",
      flightOrTrainNumber: data.travel?.flightOrTrainNumber || "",
    },
    hotel: {
      title: data.hotel?.title || "⭐⭐⭐ Heritage Stay",
      roomsNeeded: data.hotel?.roomsNeeded || 1,
    },
    assignedCoordinator: undefined,
    assignedPandit: undefined,
    assignedVehicle: undefined,
    assignedHotel: undefined,
    notes: [
      {
        id: `n-${Date.now()}`,
        author: "System",
        text: `New Lead submitted. Auto-generated 5 official PDF documents.`,
        createdAt: new Date().toISOString(),
      },
    ],
    tasks: DEFAULT_TASKS_KEYS.map((k, idx) => ({
      id: `t-${idx + 1}`,
      title: k,
      completed: idx === 0,
    })),
    documents: [],
    history: [
      {
        id: `h-${Date.now()}`,
        action: "New Lead Created via Web Wizard",
        performedBy: "System",
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // AUTO GENERATE ALL 5 DOCUMENTS (Reservation Letter, Invoice, Payment Receipt, Journey Itinerary, Temple Schedule)
  newBooking.documents = generateAutoDocuments(newBooking);

  globalFullBookings.unshift(newBooking);
  return newBooking;
}

export function updateBookingRecord(id: string, updates: Partial<FullBookingRecord>): FullBookingRecord | null {
  const index = globalFullBookings.findIndex((b) => b.id === id || b.reservationId === id);
  if (index === -1) return null;

  const existing = globalFullBookings[index];
  
  const historyEntries = [...(existing.history || [])];
  if (updates.status && updates.status !== existing.status) {
    historyEntries.push({
      id: `h-${Date.now()}`,
      action: `Status changed to ${updates.status}`,
      performedBy: "Admin Concierge",
      timestamp: new Date().toISOString(),
    });
  }

  // AUTO TRIGGER POST-JOURNEY REVIEW FLOW WHEN STATUS IS COMPLETED
  let reviewFlowData = existing.reviewFlow;
  if (updates.status === "completed" && !existing.reviewFlow) {
    reviewFlowData = createPostJourneyReviewFlow(existing);
  }

  const updated: FullBookingRecord = {
    ...existing,
    ...updates,
    history: historyEntries,
    reviewFlow: reviewFlowData,
    updatedAt: new Date().toISOString(),
  };

  globalFullBookings[index] = updated;
  return updated;
}

export const INITIAL_BOOKINGS_DATA = INITIAL_FULL_BOOKINGS;
