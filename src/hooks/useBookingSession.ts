"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  BookingSessionState,
  BookingStep,
  FamilySessionData,
  TravelSessionData,
  HotelSessionData,
  PersonalTouchItem,
  CustomerSessionData,
  PricingBreakdown,
} from "@/types/booking";

export const DEFAULT_PERSONAL_TOUCHES: PersonalTouchItem[] = [
  {
    id: "photography",
    title: "Professional Photography",
    description: "Capture your sacred rituals beautifully with high-resolution photography.",
    inclusions: ["200 Edited High-Res Photos", "Family Portrait Session", "Full Ceremony Coverage"],
    price: 3500,
    image: "/images/package_heritage_real.png",
    selected: false,
  },
  {
    id: "drone-video",
    title: "Drone Cinematic Video",
    description: "4K cinematic aerial film documenting your sacred oblations along the Falgu river.",
    inclusions: ["4K Cinematic Film Reel", "Aerial Drone Footage", "Edited Highlight Video"],
    price: 12000,
    image: "/images/sacred_fire_havan.png",
    selected: false,
  },
  {
    id: "grand-havan",
    title: "Grand Havan Ceremony",
    description: "Specialized Vedic Fire Havan at Vishnupad to invoke deep ancestral peace.",
    inclusions: ["Senior Priests Chanting", "Complete Havan Samagri", "Special Ancestral Sankalpa"],
    price: 10000,
    image: "/images/sacred_fire_havan.png",
    selected: false,
  },
  {
    id: "pretshila-visit",
    title: "Pretshila Hill Visit",
    description: "Guided sacred excursion to Pretshila Hill for elevated ancestral liberation rites.",
    inclusions: ["Private Escort & Guide", "Special Hill Oblation Rites", "Comfortable Transport"],
    price: 7500,
    image: "/images/gaya_vishnupad_temple.png",
    selected: false,
  },
];

export const PACKAGE_TIERS_DATA = [
  {
    id: "ritual-only",
    tierName: "Sacred Experience",
    title: "Sacred Ritual Service",
    subtitle: "Authentic Vedic rites on Falgu River ghats for self-arranged travelers",
    startingPrice: 5100,
    baseMembers: 4,
    extraFeePerPerson: 1100,
    duration: "3–4 Hours (Single Day)",
    badge: "Essential",
    image: "/images/pinda_daan_ceremony.png",
    includedSummary: ["Hereditary Gayawal Pandit", "Standard Pind & Ritual Kit", "Phalgu River Tarpan", "Ancestral Certificate"],
  },
  {
    id: "heritage-pilgrimage",
    tierName: "Heritage Experience",
    title: "Heritage Pilgrimage",
    subtitle: "Comfortable guided 2-day pilgrimage with 3-star hotel stay and private transfers",
    startingPrice: 24999,
    baseMembers: 4,
    extraFeePerPerson: 3500,
    duration: "2 Days / 1 Night",
    badge: "Most Popular",
    isPopular: true,
    image: "/images/booking_package_real.png",
    includedSummary: ["3-Star Heritage Hotel Stay", "AC Sedan Private Car", "Senior Gayawal Pandit", "Sattvik Breakfast & Dinner"],
  },
  {
    id: "moksha-journey",
    tierName: "Moksha Experience",
    title: "Moksha Journey",
    subtitle: "Complete 3-vedi liberation journey with 4-star resort stay & Innova Crysta MPV",
    startingPrice: 49999,
    baseMembers: 6,
    extraFeePerPerson: 4500,
    duration: "3 Days / 2 Nights",
    badge: "Complete Journey",
    image: "/images/gaya_family_moment_prayer.png",
    includedSummary: ["4-Star Heritage Resort", "Innova Crysta MPV Transfer", "VIP Sanctum Access", "All Sattvik Meals Included"],
  },
  {
    id: "royal-concierge",
    tierName: "Royal Experience",
    title: "Royal Concierge",
    subtitle: "Butler-managed private palace retreat with executive SUV fleet and drone film",
    startingPrice: 89999,
    baseMembers: 6,
    extraFeePerPerson: 6500,
    duration: "3 Days / 2 Nights",
    badge: "Ultra Luxury",
    image: "/images/hotel_luxury_suite.png",
    includedSummary: ["5-Star Palace Suite", "Premium SUV (Fortuner)", "Dedicated Butler & Escort", "Gourmet Sattvik Feast"],
  },
  {
    id: "eternal-legacy",
    tierName: "Legacy Experience",
    title: "Eternal Legacy Concierge",
    subtitle: "Invitation-only multi-day legacy compilation and historical archives search",
    startingPrice: 150000,
    baseMembers: 6,
    extraFeePerPerson: 8500,
    duration: "4–5 Days Bespoke",
    badge: "Invitation Only",
    image: "/images/gaya_akshayavat_banyan.png",
    includedSummary: ["Private Palace Wing Reservation", "BMW/Mercedes Fleet", "Multi-day Panji Tracing", "Genealogy Book & Film"],
  },
];

const INITIAL_DRAFT_ID = () => `DRAFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export function useBookingSession(initialPackageId: string = "heritage-pilgrimage") {
  const [session, setSession] = useState<BookingSessionState>(() => {
    const selectedPkg = PACKAGE_TIERS_DATA.find((p) => p.id === initialPackageId) || PACKAGE_TIERS_DATA[1];
    
    return {
      sessionId: INITIAL_DRAFT_ID(),
      package: {
        id: selectedPkg.id,
        title: selectedPkg.title,
        startingPrice: selectedPkg.startingPrice,
        duration: selectedPkg.duration,
      },
      family: {
        adults: 2,
        elders: 1,
        children: 1,
        wheelchairNeeded: false,
        airportPickupNeeded: true,
      },
      travel: {
        mode: "flight",
        arrivalDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
        arrivalTime: "10:30 AM",
        flightOrTrainNumber: "",
      },
      hotel: {
        tierId: "heritage-3star",
        title: "⭐⭐⭐ Heritage Stay",
        subtitle: "Included in package for guided comfort",
        starRating: 3,
        upgradePricePerPerson: 0,
        roomsNeeded: 1,
      },
      enhancements: DEFAULT_PERSONAL_TOUCHES,
      customer: {
        name: "",
        phone: "",
        email: "",
        city: "",
        country: "India",
      },
      pricing: {
        basePrice: selectedPkg.startingPrice,
        familyTotalCount: 4,
        extraMemberFee: 0,
        hotelUpgradeTotal: 0,
        enhancementsTotal: 0,
        grandTotal: selectedPkg.startingPrice,
      },
      status: "draft",
      currentStepIndex: 0,
      lastUpdated: new Date().toISOString(),
    };
  });

  // Hydrate from localStorage on client side mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("booking_session");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.sessionId && parsed.status === "draft") {
            setSession(parsed);
          }
        }
      } catch (err) {
        console.warn("Failed to load booking session from localStorage:", err);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Compute pricing breakdown dynamically
  const calculatedPricing = useMemo((): PricingBreakdown => {
    const pkgData = PACKAGE_TIERS_DATA.find((p) => p.id === session.package.id) || PACKAGE_TIERS_DATA[1];
    const basePrice = pkgData.startingPrice;
    
    const totalMembers = session.family.adults + session.family.elders + session.family.children;
    const baseMembers = pkgData.baseMembers;
    const extraCount = Math.max(0, totalMembers - baseMembers);
    const extraMemberFee = extraCount * pkgData.extraFeePerPerson;

    const hotelUpgradeTotal = session.hotel.upgradePricePerPerson * Math.max(1, totalMembers);

    const enhancementsTotal = session.enhancements
      .filter((e) => e.selected)
      .reduce((sum, item) => sum + item.price, 0);

    const grandTotal = basePrice + extraMemberFee + hotelUpgradeTotal + enhancementsTotal;

    return {
      basePrice,
      familyTotalCount: totalMembers,
      extraMemberFee,
      hotelUpgradeTotal,
      enhancementsTotal,
      grandTotal,
    };
  }, [session.package.id, session.family, session.hotel, session.enhancements]);

  // Sync pricing changes & save to LocalStorage + API draft
  const saveSession = useCallback(
    (newSession: BookingSessionState) => {
      const updated: BookingSessionState = {
        ...newSession,
        pricing: calculatedPricing,
        lastUpdated: new Date().toISOString(),
      };
      setSession(updated);

      try {
        localStorage.setItem("booking_session", JSON.stringify(updated));
      } catch (err) {
        console.warn("Could not write to localStorage:", err);
      }

      // Background API sync
      fetch("/api/booking/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }).catch((e) => console.warn("Failed sync to /api/booking/draft", e));
    },
    [calculatedPricing]
  );

  const selectPackage = (packageId: string) => {
    const selectedPkg = PACKAGE_TIERS_DATA.find((p) => p.id === packageId);
    if (!selectedPkg) return;

    saveSession({
      ...session,
      package: {
        id: selectedPkg.id,
        title: selectedPkg.title,
        startingPrice: selectedPkg.startingPrice,
        duration: selectedPkg.duration,
      },
    });
  };

  const updateFamily = (updates: Partial<FamilySessionData>) => {
    saveSession({
      ...session,
      family: { ...session.family, ...updates },
    });
  };

  const updateTravel = (updates: Partial<TravelSessionData>) => {
    saveSession({
      ...session,
      travel: { ...session.travel, ...updates },
    });
  };

  const updateHotel = (updates: Partial<HotelSessionData>) => {
    saveSession({
      ...session,
      hotel: { ...session.hotel, ...updates },
    });
  };

  const toggleEnhancement = (enhancementId: string) => {
    const updatedEnhancements = session.enhancements.map((e) =>
      e.id === enhancementId ? { ...e, selected: !e.selected } : e
    );
    saveSession({
      ...session,
      enhancements: updatedEnhancements,
    });
  };

  const updateCustomer = (updates: Partial<CustomerSessionData>) => {
    saveSession({
      ...session,
      customer: { ...session.customer, ...updates },
    });
  };

  const setStepIndex = (index: number) => {
    saveSession({
      ...session,
      currentStepIndex: index,
    });
  };

  const confirmReservation = (): string => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const uniqueSuffix = `${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    const finalReservationId = `PTR-${dateStr}-${uniqueSuffix}`;

    const confirmedSession: BookingSessionState = {
      ...session,
      reservationId: finalReservationId,
      status: "confirmed",
      pricing: calculatedPricing,
      lastUpdated: new Date().toISOString(),
    };

    setSession(confirmedSession);

    try {
      localStorage.setItem("booking_session", JSON.stringify(confirmedSession));
    } catch (e) {
      console.warn(e);
    }

    fetch("/api/booking/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(confirmedSession),
    }).catch(console.warn);

    return finalReservationId;
  };

  return {
    session: {
      ...session,
      pricing: calculatedPricing,
    },
    selectPackage,
    updateFamily,
    updateTravel,
    updateHotel,
    toggleEnhancement,
    updateCustomer,
    setStepIndex,
    confirmReservation,
  };
}
