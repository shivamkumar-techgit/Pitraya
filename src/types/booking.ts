export type BookingStep = 
  | "choose-experience"
  | "family-details"
  | "journey"
  | "stay"
  | "confirmation";

export interface PackageTier {
  id: string;
  tierName: string;
  title: string;
  subtitle: string;
  startingPrice: number;
  badge?: string;
  isPopular?: boolean;
  image: string;
  duration: string;
  includedSummary: string[];
}

export interface FamilySessionData {
  adults: number;
  elders: number;
  children: number;
  wheelchairNeeded: boolean;
  airportPickupNeeded: boolean;
}

export interface TravelSessionData {
  mode: "flight" | "train" | "road";
  arrivalDate: string;
  arrivalTime: string;
  flightOrTrainNumber?: string;
}

export interface HotelSessionData {
  tierId: "heritage-3star" | "heritage-4star" | "royal-palace";
  title: string;
  subtitle: string;
  starRating: number;
  upgradePricePerPerson: number;
  roomsNeeded: number;
}

export interface PersonalTouchItem {
  id: string;
  title: string;
  description: string;
  inclusions: string[];
  price: number;
  image: string;
  selected: boolean;
}

export interface CustomerSessionData {
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
}

export interface PricingBreakdown {
  basePrice: number;
  familyTotalCount: number;
  extraMemberFee: number;
  hotelUpgradeTotal: number;
  enhancementsTotal: number;
  grandTotal: number;
}

export interface BookingSessionState {
  sessionId: string;
  reservationId?: string;
  package: {
    id: string;
    title: string;
    startingPrice: number;
    duration: string;
  };
  family: FamilySessionData;
  travel: TravelSessionData;
  hotel: HotelSessionData;
  enhancements: PersonalTouchItem[];
  customer: CustomerSessionData;
  pricing: PricingBreakdown;
  status: "draft" | "confirmed";
  currentStepIndex: number;
  lastUpdated: string;
}
