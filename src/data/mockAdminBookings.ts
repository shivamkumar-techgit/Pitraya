export type BookingStatus =
  | "draft"
  | "lead"
  | "coordinator_assigned"
  | "payment_pending"
  | "confirmed"
  | "in_journey"
  | "completed"
  | "cancelled";

export interface AdminCoordinator {
  id: string;
  name: string;
  phone: string;
  role: string;
}

export interface AdminBooking {
  id: string;
  sessionId: string;
  reservationId?: string;
  status: BookingStatus;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  packageTitle: string;
  packageTierId: string;
  duration: string;
  grandTotal: number;
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
  assignedCoordinator?: AdminCoordinator;
  notes: {
    id: string;
    author: string;
    text: string;
    createdAt: string;
  }[];
  createdAt: string;
  lastUpdated: string;
}

export const AVAILABLE_COORDINATORS: AdminCoordinator[] = [
  { id: "pandit-mishra", name: "Pandit Rajesh Mishra Ji", phone: "+91 98350 12345", role: "Senior Gayawal Purohit" },
  { id: "pandit-shastri", name: "Acharya S. K. Shastri Ji", phone: "+91 94312 67890", role: "Vishnupad Sanctum Coordinator" },
  { id: "coord-rahul", name: "Rahul Sharma", phone: "+91 84344 57228", role: "Lead Pilgrimage Escort" },
  { id: "coord-anand", name: "Anand Verma", phone: "+91 70000 88888", role: "Logistics Manager" },
];

export const INITIAL_MOCK_BOOKINGS: AdminBooking[] = [
  {
    id: "DRAFT-9921-X9",
    sessionId: "DRAFT-9921-X9",
    reservationId: undefined,
    status: "draft",
    customerName: "Sunita Agarwal",
    phone: "+91 99100 88221",
    email: "sunita.agarwal@example.com",
    city: "Delhi",
    country: "India",
    packageTitle: "Heritage Pilgrimage",
    packageTierId: "heritage-pilgrimage",
    duration: "2 Days / 1 Night",
    grandTotal: 24999,
    family: {
      adults: 3,
      elders: 2,
      children: 0,
      totalCount: 5,
      wheelchairNeeded: false,
      airportPickupNeeded: false,
    },
    travel: {
      mode: "road",
      arrivalDate: "2026-08-14",
      arrivalTime: "02:00 PM",
      flightOrTrainNumber: "Private Innova",
    },
    hotel: {
      title: "⭐⭐⭐ Heritage Stay",
      roomsNeeded: 2,
    },
    assignedCoordinator: undefined,
    notes: [
      {
        id: "n-1",
        author: "System",
        text: "In-progress booking session saved by user.",
        createdAt: "2026-07-30T12:00:00Z",
      },
    ],
    createdAt: "2026-07-30T12:00:00Z",
    lastUpdated: "2026-07-30T12:10:00Z",
  },
  {
    id: "PTR-20260730-8412",
    sessionId: "DRAFT-8412-A1",
    reservationId: "PTR-20260730-8412",
    status: "lead",
    customerName: "Rameshwar Sharma",
    phone: "+91 98765 43210",
    email: "rameshwar.sharma@example.com",
    city: "Mumbai",
    country: "India",
    packageTitle: "Heritage Pilgrimage",
    packageTierId: "heritage-pilgrimage",
    duration: "2 Days / 1 Night",
    grandTotal: 24999,
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
      arrivalDate: "2026-08-05",
      arrivalTime: "10:30 AM",
      flightOrTrainNumber: "6E-2411",
    },
    hotel: {
      title: "⭐⭐⭐ Heritage Stay",
      roomsNeeded: 1,
    },
    assignedCoordinator: undefined,
    notes: [
      {
        id: "n-2",
        author: "System",
        text: "New online lead submitted via Web Booking Wizard.",
        createdAt: "2026-07-30T10:15:00Z",
      },
    ],
    createdAt: "2026-07-30T10:15:00Z",
    lastUpdated: "2026-07-30T10:15:00Z",
  },
  {
    id: "PTR-20260729-3319",
    sessionId: "DRAFT-3319-K4",
    reservationId: "PTR-20260729-3319",
    status: "coordinator_assigned",
    customerName: "Amitabh Banerjee",
    phone: "+91 98310 44556",
    email: "a.banerjee@example.com",
    city: "Kolkata",
    country: "India",
    packageTitle: "Moksha Journey",
    packageTierId: "moksha-journey",
    duration: "3 Days / 2 Nights",
    grandTotal: 49999,
    family: {
      adults: 4,
      elders: 1,
      children: 1,
      totalCount: 6,
      wheelchairNeeded: true,
      airportPickupNeeded: true,
    },
    travel: {
      mode: "train",
      arrivalDate: "2026-08-08",
      arrivalTime: "08:15 AM",
      flightOrTrainNumber: "Vande Bharat 22345",
    },
    hotel: {
      title: "⭐⭐⭐⭐ Heritage Resort",
      roomsNeeded: 2,
    },
    assignedCoordinator: AVAILABLE_COORDINATORS[0],
    notes: [
      {
        id: "n-3",
        author: "System",
        text: "Assigned to Pandit Rajesh Mishra Ji.",
        createdAt: "2026-07-29T15:00:00Z",
      },
    ],
    createdAt: "2026-07-29T14:00:00Z",
    lastUpdated: "2026-07-29T15:00:00Z",
  },
  {
    id: "PTR-20260728-4412",
    sessionId: "DRAFT-4412-C3",
    reservationId: "PTR-20260728-4412",
    status: "payment_pending",
    customerName: "Gurpreet Singh",
    phone: "+91 98111 22334",
    email: "gurpreet@example.com",
    city: "Chandigarh",
    country: "India",
    packageTitle: "Royal Concierge",
    packageTierId: "royal-concierge",
    duration: "3 Days / 2 Nights",
    grandTotal: 89999,
    family: {
      adults: 4,
      elders: 1,
      children: 1,
      totalCount: 6,
      wheelchairNeeded: false,
      airportPickupNeeded: true,
    },
    travel: {
      mode: "flight",
      arrivalDate: "2026-08-18",
      arrivalTime: "11:45 AM",
      flightOrTrainNumber: "AI-409",
    },
    hotel: {
      title: "⭐⭐⭐⭐⭐ Royal Palace Suite",
      roomsNeeded: 2,
    },
    assignedCoordinator: AVAILABLE_COORDINATORS[1],
    notes: [
      {
        id: "n-4",
        author: "Anand Verma",
        text: "Itinerary confirmed. Payment invoice sent to client via WhatsApp.",
        createdAt: "2026-07-28T14:30:00Z",
      },
    ],
    createdAt: "2026-07-28T14:00:00Z",
    lastUpdated: "2026-07-30T09:00:00Z",
  },
  {
    id: "PTR-20260730-7719",
    sessionId: "DRAFT-7719-B2",
    reservationId: "PTR-20260730-7719",
    status: "confirmed",
    customerName: "Vikramaditya Roy",
    phone: "+91 98201 55443",
    email: "v.roy@example.com",
    city: "Kolkata",
    country: "India",
    packageTitle: "Moksha Journey",
    packageTierId: "moksha-journey",
    duration: "3 Days / 2 Nights",
    grandTotal: 49999,
    family: {
      adults: 4,
      elders: 2,
      children: 0,
      totalCount: 6,
      wheelchairNeeded: true,
      airportPickupNeeded: true,
    },
    travel: {
      mode: "train",
      arrivalDate: "2026-08-10",
      arrivalTime: "07:15 AM",
      flightOrTrainNumber: "Vande Bharat 22345",
    },
    hotel: {
      title: "⭐⭐⭐⭐ Heritage Resort",
      roomsNeeded: 2,
    },
    assignedCoordinator: AVAILABLE_COORDINATORS[0],
    notes: [
      {
        id: "n-5",
        author: "Rahul Sharma",
        text: "Payment received. Confirmation seal issued.",
        createdAt: "2026-07-30T11:00:00Z",
      },
    ],
    createdAt: "2026-07-29T16:20:00Z",
    lastUpdated: "2026-07-30T11:00:00Z",
  },
  {
    id: "PTR-20260730-1092",
    sessionId: "DRAFT-1092-J8",
    reservationId: "PTR-20260730-1092",
    status: "in_journey",
    customerName: "Deepak Kulkarni",
    phone: "+91 98220 11223",
    email: "deepak.k@example.com",
    city: "Pune",
    country: "India",
    packageTitle: "Heritage Pilgrimage",
    packageTierId: "heritage-pilgrimage",
    duration: "2 Days / 1 Night",
    grandTotal: 24999,
    family: {
      adults: 2,
      elders: 2,
      children: 0,
      totalCount: 4,
      wheelchairNeeded: true,
      airportPickupNeeded: true,
    },
    travel: {
      mode: "flight",
      arrivalDate: "2026-07-30",
      arrivalTime: "09:30 AM",
      flightOrTrainNumber: "6E-551",
    },
    hotel: {
      title: "⭐⭐⭐ Heritage Stay",
      roomsNeeded: 2,
    },
    assignedCoordinator: AVAILABLE_COORDINATORS[2],
    notes: [
      {
        id: "n-6",
        author: "Rahul Sharma",
        text: "Chauffeur Ramesh picked up family at Gaya Airport. Checked into Bodhgaya Regency.",
        createdAt: "2026-07-30T10:00:00Z",
      },
    ],
    createdAt: "2026-07-28T09:00:00Z",
    lastUpdated: "2026-07-30T10:00:00Z",
  },
  {
    id: "PTR-20260725-1102",
    sessionId: "DRAFT-1102-D4",
    reservationId: "PTR-20260725-1102",
    status: "completed",
    customerName: "Harishchandra Deshmukh",
    phone: "+91 94220 99887",
    email: "h.deshmukh@example.com",
    city: "Pune",
    country: "India",
    packageTitle: "Moksha Journey",
    packageTierId: "moksha-journey",
    duration: "3 Days / 2 Nights",
    grandTotal: 49999,
    family: {
      adults: 3,
      elders: 2,
      children: 1,
      totalCount: 6,
      wheelchairNeeded: true,
      airportPickupNeeded: true,
    },
    travel: {
      mode: "flight",
      arrivalDate: "2026-07-25",
      arrivalTime: "09:10 AM",
      flightOrTrainNumber: "6E-551",
    },
    hotel: {
      title: "⭐⭐⭐⭐ Heritage Resort",
      roomsNeeded: 2,
    },
    assignedCoordinator: AVAILABLE_COORDINATORS[0],
    notes: [
      {
        id: "n-7",
        author: "Pandit Rajesh Mishra Ji",
        text: "Ancestral Pinda Daan rites completed successfully at Vishnupad Sanctum & Akshay Vat.",
        createdAt: "2026-07-27T16:00:00Z",
      },
    ],
    createdAt: "2026-07-24T10:00:00Z",
    lastUpdated: "2026-07-27T16:00:00Z",
  },
];
