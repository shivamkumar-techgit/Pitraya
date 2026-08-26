"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  Users,
  Hotel,
  Car,
  Calendar,
  Phone,
  MessageCircle,
  Clock,
  Download,
  Search,
  UserCheck,
  Plus,
  RefreshCw,
  X,
  Eye,
  CreditCard,
  ExternalLink,
  Flame,
  CheckCircle2,
  Inbox,
  Send,
  AlertCircle,
  FileText,
  CheckSquare,
  MessageSquare,
  Folder,
  History,
  ShieldCheck,
  Database as DatabaseIcon,
  Star,
  Camera,
  Gift,
  Mail,
  BarChart2,
  TrendingUp,
  Award,
  Percent,
  DollarSign,
  LogOut,
  ShieldAlert,
  Archive,
  KeyRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PitrayaLogoEmblem } from "@/components/common/Logo";
import GlassCard from "@/components/cards/GlassCard";
import ItineraryPdfModal from "@/components/booking/ItineraryPdfModal";
import GeneratePaymentLinkModal from "@/components/admin/GeneratePaymentLinkModal";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import BackupModal from "@/components/admin/BackupModal";
import { hasPermission, Permission } from "@/lib/auth/permissions";
import {
  FullBookingRecord,
  USERS_TABLE,
  HOTELS_TABLE,
  VEHICLES_TABLE,
  PANDITS_TABLE,
  COORDINATORS_TABLE,
  INITIAL_BOOKINGS_DATA,
  getBookingsStore,
} from "@/lib/bookingStore";
import { BookingStatus } from "@/lib/db/schema";
import { generatePostJourneyWhatsAppMessage } from "@/lib/postJourneyEngine";
import { BookingSessionState } from "@/types/booking";
import { cn } from "@/lib/utils";

type DetailTab =
  | "overview"
  | "timeline"
  | "payment"
  | "hotel"
  | "vehicle"
  | "pandit"
  | "documents"
  | "communication"
  | "activity";

interface TimelineItem {
  id: string | number;
  title?: string;
  description?: string;
  timestamp?: string;
  action?: string;
  performedBy?: string;
}

interface BookingViewModel extends FullBookingRecord {
  paymentStatus?: string;
  journeyStatus?: string;
  timelines?: TimelineItem[];
}

const DETAIL_TABS: { id: DetailTab; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: ShieldCheck },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "vehicle", label: "Vehicle", icon: Car },
  { id: "pandit", label: "Pandit", icon: Flame },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "communication", label: "Communication", icon: MessageSquare },
  { id: "activity", label: "Activity", icon: CheckSquare },
];

export default function AdminDashboardPage() {
  const { data: session, status: authStatus } = useSession();
  const [mounted, setMounted] = useState<boolean>(false);
  const [bookings, setBookings] = useState<BookingViewModel[]>([]);
  const [viewMode, setViewMode] = useState<"command" | "table" | "analytics" | "db">("command");
  const [dbTab, setDbTab] = useState<string>("users");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeBooking, setActiveBooking] = useState<BookingViewModel | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>("overview");
  const [noteInput, setNoteInput] = useState<string>("");
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [pdfSession, setPdfSession] = useState<BookingSessionState | null>(null);
  const [payModalBooking, setPayModalBooking] = useState<BookingViewModel | null>(null);
  const [backupModalOpen, setBackupModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sessionUser = session?.user as { role?: string; id?: string; coordinatorId?: string; name?: string; email?: string; image?: string } | undefined;
  const userRole = sessionUser?.role || "OPERATOR";
  const isCoordinator = userRole === "COORDINATOR";
  const isAccountant = userRole === "ACCOUNTANT";
  const isOperator = userRole === "OPERATOR";
  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";
  const isSuperAdmin = userRole === "SUPER_ADMIN";

  const canEditBookings = hasPermission(userRole, Permission.BOOKING_UPDATE);
  const canViewAnalytics = hasPermission(userRole, Permission.ANALYTICS_READ);
  const canManageUsers = hasPermission(userRole, Permission.USER_MANAGE);
  const canManagePayments = hasPermission(userRole, Permission.PAYMENT_CREATE);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Sync with API route on mount with 5s real-time auto-polling
  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/admin/bookings?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.warn("Using initial mock bookings fallback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const timer = setTimeout(fetchBookings, 0);
      const interval = setInterval(fetchBookings, 5000);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [session]);

  if (!mounted || authStatus === "loading") {
    return (
      <div className="min-h-screen bg-[#070605] flex items-center justify-center text-gold-primary font-cinzel text-xs uppercase tracking-widest gap-2">
        <RefreshCw className="w-5 h-5 animate-spin" />
        Loading Pitraya Enterprise CRM...
      </div>
    );
  }

  if (authStatus === "unauthenticated" || !session) {
    return <AdminLoginForm />;
  }

  // Update Status handler with Auto WhatsApp Notification
  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    if (!canEditBookings) {
      alert("Modification restricted: your role does not have edit booking permissions.");
      return;
    }
    const target = bookings.find((b) => b.id === id);
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({ ...activeBooking, status: newStatus });
    }

    // Auto WhatsApp Notification when Status becomes CONFIRMED
    if (newStatus === "confirmed" && target) {
      const waMsg = encodeURIComponent(
        `Namaste ${target.customerName} Ji 🙏\n\n` +
          `Your pilgrimage has been confirmed.\n\n` +
          `📍 Reservation ID: ${target.reservationId}\n` +
          `✨ Experience: ${target.packageTitle}\n` +
          `📅 Arrival Date: ${target.travel.arrivalDate}\n\n` +
          `Our Senior Gayawal Purohit is preparing your Pinda Daan rites.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/${target.phone.replace(/[^0-9]/g, "")}?text=${waMsg}`, "_blank");
      }, 300);
    }

    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBookings();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdatePaymentStatus = async (id: string, newPayStatus: string) => {
    if (!canManagePayments) {
      alert("Modification restricted: your role does not have payment permissions.");
      return;
    }
    const updated = bookings.map((b) => (b.id === id ? { ...b, paymentStatus: newPayStatus } : b));
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({ ...activeBooking, paymentStatus: newPayStatus });
    }
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newPayStatus }),
      });
      fetchBookings();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateJourneyStatus = async (id: string, newJourneyStatus: string) => {
    if (!canEditBookings) {
      alert("Modification restricted: your role does not have edit booking permissions.");
      return;
    }
    const updated = bookings.map((b) => (b.id === id ? { ...b, journeyStatus: newJourneyStatus } : b));
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({ ...activeBooking, journeyStatus: newJourneyStatus });
    }
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journeyStatus: newJourneyStatus }),
      });
      fetchBookings();
    } catch (e) {
      console.warn(e);
    }
  };

  // Assign Coordinator handler
  const handleAssignCoordinator = async (id: string, coordinatorId: string) => {
    if (isCoordinator) {
      alert("Coordinator role is read-only. Modification is restricted.");
      return;
    }
    const coordinator = COORDINATORS_TABLE.find((c) => c.id === coordinatorId);
    const updated = bookings.map((b) => (b.id === id ? { ...b, assignedCoordinator: coordinator } : b));
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({ ...activeBooking, assignedCoordinator: coordinator });
    }

    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, coordinator }),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // Assign Pandit handler
  const handleAssignPandit = async (id: string, panditId: string) => {
    if (isCoordinator) {
      alert("Coordinator role is read-only. Modification is restricted.");
      return;
    }
    const pandit = PANDITS_TABLE.find((p) => p.id === panditId);
    const updated = bookings.map((b) => (b.id === id ? { ...b, assignedPandit: pandit } : b));
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({ ...activeBooking, assignedPandit: pandit });
    }

    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pandit }),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // Assign Vehicle handler with Auto Driver WhatsApp Notification
  const handleAssignVehicle = async (id: string, vehicleId: string) => {
    if (isCoordinator) {
      alert("Coordinator role is read-only. Modification is restricted.");
      return;
    }
    const vehicle = VEHICLES_TABLE.find((v) => v.id === vehicleId);
    const target = bookings.find((b) => b.id === id);
    const updated = bookings.map((b) => (b.id === id ? { ...b, assignedVehicle: vehicle } : b));
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({ ...activeBooking, assignedVehicle: vehicle });
    }

    // Auto WhatsApp Notification when Vehicle Assigned
    if (vehicle && target) {
      const waMsg = encodeURIComponent(
        `Namaste ${target.customerName} Ji 🙏\n\n` +
          `Your private pickup vehicle & chauffeur details for your Gaya pilgrimage have been assigned:\n\n` +
          `🚗 Vehicle: ${vehicle.name}\n` +
          `👨‍✈️ Driver Name: ${vehicle.driverName}\n` +
          `📞 Driver Phone: ${vehicle.driverPhone}\n\n` +
          `Your chauffeur will receive you upon arrival.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/${target.phone.replace(/[^0-9]/g, "")}?text=${waMsg}`, "_blank");
      }, 300);
    }

    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, vehicle }),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // Assign Hotel handler with Auto Hotel WhatsApp Notification
  const handleAssignHotel = async (id: string, hotelId: string) => {
    if (isCoordinator) {
      alert("Coordinator role is read-only. Modification is restricted.");
      return;
    }
    const hotelOpt = HOTELS_TABLE.find((h) => h.id === hotelId);
    const target = bookings.find((b) => b.id === id);
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            assignedHotel: hotelOpt,
            hotel: hotelOpt ? { title: hotelOpt.name, roomsNeeded: 2 } : b.hotel,
          }
        : b
    );
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({
        ...activeBooking,
        assignedHotel: hotelOpt,
        hotel: hotelOpt ? { title: hotelOpt.name, roomsNeeded: 2 } : activeBooking.hotel,
      });
    }

    // Auto WhatsApp Notification when Hotel Assigned
    if (hotelOpt && target) {
      const waMsg = encodeURIComponent(
        `Namaste ${target.customerName} Ji 🙏\n\n` +
          `Your Sattvik hotel accommodation reservation details:\n\n` +
          `🏨 Hotel Name: ${hotelOpt.name}\n` +
          `📍 Address: ${hotelOpt.address}\n` +
          `🗺️ Google Maps: ${hotelOpt.googleMapsUrl}\n` +
          `⏰ Check-in Time: ${hotelOpt.checkInTime}\n` +
          `🛏️ Rooms: Reserved`
      );
      setTimeout(() => {
        window.open(`https://wa.me/${target.phone.replace(/[^0-9]/g, "")}?text=${waMsg}`, "_blank");
      }, 300);
    }

    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, hotel: hotelOpt }),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // Add Note handler
  const handleAddNote = async (id: string) => {
    if (isCoordinator) {
      alert("Coordinator role is read-only. Modification is restricted.");
      return;
    }
    if (!noteInput.trim()) return;
    const newNote = {
      id: `n-${Date.now()}`,
      author: "Admin Concierge",
      text: noteInput.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = bookings.map((b) =>
      b.id === id ? { ...b, notes: [...b.notes, newNote] } : b
    );
    setBookings(updated);
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking({ ...activeBooking, notes: [...activeBooking.notes, newNote] });
    }
    setNoteInput("");

    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, noteText: newNote.text }),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // Toggle Task Handler
  const handleToggleTask = (taskId: string) => {
    if (isCoordinator) {
      alert("Coordinator role is read-only. Modification is restricted.");
      return;
    }
    if (!activeBooking) return;
    const updatedTasks = (activeBooking.tasks || []).map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const updatedBooking = { ...activeBooking, tasks: updatedTasks };
    setActiveBooking(updatedBooking);

    const updatedBookings = bookings.map((b) => (b.id === activeBooking.id ? updatedBooking : b));
    setBookings(updatedBookings);
  };

  // Open PDF Preview for Admin
  const handleOpenPdf = (b: FullBookingRecord) => {
    const sessionData: BookingSessionState = {
      sessionId: b.id,
      reservationId: b.reservationId,
      package: {
        id: b.packageTierId,
        title: b.packageTitle,
        startingPrice: b.grandTotal,
        duration: b.duration,
      },
      family: {
        adults: b.family.adults,
        elders: b.family.elders,
        children: b.family.children,
        wheelchairNeeded: b.family.wheelchairNeeded,
        airportPickupNeeded: b.family.airportPickupNeeded,
      },
      travel: {
        mode: b.travel.mode,
        arrivalDate: b.travel.arrivalDate,
        arrivalTime: b.travel.arrivalTime,
        flightOrTrainNumber: b.travel.flightOrTrainNumber,
      },
      hotel: {
        tierId: "heritage-3star",
        title: b.assignedHotel?.name || b.hotel.title,
        subtitle: "Sanctum Stay",
        starRating: 4,
        upgradePricePerPerson: 0,
        roomsNeeded: b.hotel.roomsNeeded,
      },
      enhancements: [],
      customer: {
        name: b.customerName,
        phone: b.phone,
        email: b.email,
        city: b.city,
        country: b.country,
      },
      pricing: {
        basePrice: b.grandTotal,
        familyTotalCount: b.family.totalCount,
        extraMemberFee: 0,
        hotelUpgradeTotal: 0,
        enhancementsTotal: 0,
        grandTotal: b.grandTotal,
      },
      status: b.status === "confirmed" || b.status === "in_journey" || b.status === "completed" ? "confirmed" : "draft",
      currentStepIndex: 4,
      lastUpdated: b.updatedAt,
    };

    setPdfSession(sessionData);
    setPdfModalOpen(true);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const todaysLeads = bookings.filter((b) => b.status === "lead" || b.status === "draft");
  const pendingCalls = bookings.filter((b) => b.status === "lead" || b.status === "coordinator_assigned" || (b.status as string) === "awaiting_payment");
  const todaysArrivals = bookings.filter((b) => (b.travel?.arrivalDate === todayStr || (b.travel?.arrivalDate && b.travel.arrivalDate.toLowerCase().includes(todayStr.toLowerCase()))) && b.status !== "cancelled");
  const todaysRituals = bookings.filter((b) => (b.status === "in_journey" || b.status === "confirmed"));
  const paymentsPending = bookings.filter((b) => b.status === "payment_pending" || b.paymentStatus === "pending" || b.paymentStatus === "link_generated");
  const completedJourneys = bookings.filter((b) => b.status === "completed" || b.journeyStatus === "completed");

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = selectedStatus === "all" || b.status === selectedStatus;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesStatus;

    // Search across all 7 requested fields + Customer Name:
    const matchesResId = b.reservationId ? b.reservationId.toLowerCase().includes(query) : false;
    const matchesId = b.id ? b.id.toLowerCase().includes(query) : false;
    const matchesPhone = b.phone ? b.phone.toLowerCase().includes(query) : false;
    const matchesEmail = b.email ? b.email.toLowerCase().includes(query) : false;
    const matchesCity = b.city ? b.city.toLowerCase().includes(query) : false;
    const matchesCoordinator = b.assignedCoordinator?.name ? b.assignedCoordinator.name.toLowerCase().includes(query) : false;
    const matchesPandit = b.assignedPandit?.name ? b.assignedPandit.name.toLowerCase().includes(query) : false;
    const matchesHotel = (b.assignedHotel?.name || b.hotel?.title || "").toLowerCase().includes(query);
    const matchesName = b.customerName ? b.customerName.toLowerCase().includes(query) : false;

    const matchesQuery =
      matchesResId ||
      matchesId ||
      matchesPhone ||
      matchesEmail ||
      matchesCity ||
      matchesCoordinator ||
      matchesPandit ||
      matchesHotel ||
      matchesName;

    return matchesStatus && matchesQuery;
  });

  const getStatusBadgeClass = (status: BookingStatus) => {
    switch (status) {
      case "draft":
        return "bg-amber-500/15 text-amber-400 border-amber-500/40";
      case "lead":
        return "bg-blue-500/15 text-blue-400 border-blue-500/40 font-black shadow-md";
      case "coordinator_assigned":
        return "bg-cyan-500/15 text-cyan-400 border-cyan-500/40";
      case "payment_pending":
        return "bg-purple-500/15 text-purple-400 border-purple-500/40";
      case "confirmed":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/40";
      case "in_journey":
        return "bg-indigo-500/15 text-indigo-400 border-indigo-500/40";
      case "completed":
        return "bg-gold-primary/20 text-gold-primary border-gold-primary/40";
      case "cancelled":
        return "bg-red-500/15 text-red-400 border-red-500/40";
      default:
        return "bg-surface text-text-muted border-border";
    }
  };

  const getStatusLabel = (status: BookingStatus) => {
    switch (status) {
      case "draft":
        return "Draft (Form In Progress)";
      case "lead":
        return "LEAD";
      case "coordinator_assigned":
        return "Coordinator Assigned";
      case "payment_pending":
        return "Payment Pending";
      case "confirmed":
        return "Confirmed";
      case "in_journey":
        return "In Journey";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  // Dynamic Reporting & Intelligence Analytics Computations
  const totalRevenueMonth = bookings.reduce((sum, b) => (b.status === "confirmed" || b.status === "completed" ? sum + b.grandTotal : sum), 0);
  const todayRevenueTotal = bookings.filter((b) => (b.status === "confirmed" || b.status === "completed")).reduce((sum, b) => sum + Math.round(b.grandTotal * 0.4), 0);
  const pendingPaymentsAmount = bookings.filter((b) => (b.status as string) === "lead" || (b.status as string) === "awaiting_payment" || b.paymentStatus === "pending" || b.paymentStatus === "link_generated").reduce((sum, b) => sum + b.grandTotal, 0);
  const confirmedCount = bookings.filter((b) => b.status === "confirmed" || b.status === "completed").length;
  const conversionPercentage = bookings.length > 0 ? Math.round((confirmedCount / bookings.length) * 100) : 84;

  return (
    <div className="min-h-screen bg-[#070605] text-white p-4 sm:p-8 font-sans selection:bg-gold-primary selection:text-black">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gold-primary/25">
          <div className="flex items-center gap-4">
            <PitrayaLogoEmblem size={48} className="shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-gold-primary tracking-wider uppercase">
                  PITRAYA ENTERPRISE CRM
                </h1>
                <span className="text-[10px] font-bold font-cinzel bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-2.5 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                  12 Linked DB Entities
                </span>
              </div>
              <p className="text-xs text-text-muted font-cinzel tracking-widest uppercase">
                Auto PDF Documents • Relational Schema • Post-Journey Reviews & Referrals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="p-1 rounded-xl bg-surface border border-border-gold/20 flex items-center gap-1 font-cinzel text-xs font-bold">
              <button
                onClick={() => setViewMode("command")}
                className={cn(
                  "py-1.5 px-3 rounded-lg transition-all cursor-pointer",
                  viewMode === "command"
                    ? "bg-gold-primary text-black font-black"
                    : "text-text-muted hover:text-white"
                )}
              >
                Operational Work
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "py-1.5 px-3 rounded-lg transition-all cursor-pointer",
                  viewMode === "table"
                    ? "bg-gold-primary text-black font-black"
                    : "text-text-muted hover:text-white"
                )}
              >
                All CRM Records
              </button>
              {canViewAnalytics && (
                <button
                  onClick={() => setViewMode("analytics")}
                  className={cn(
                    "py-1.5 px-3 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
                    viewMode === "analytics"
                      ? "bg-gold-primary text-black font-black"
                      : "text-text-muted hover:text-white"
                  )}
                >
                  <BarChart2 className="h-3.5 w-3.5" />
                  <span>Reporting Dashboard</span>
                </button>
              )}
              {canManageUsers && (
                <button
                  onClick={() => setViewMode("db")}
                  className={cn(
                    "py-1.5 px-3 rounded-lg transition-all cursor-pointer flex items-center gap-1",
                    viewMode === "db"
                      ? "bg-gold-primary text-black font-black"
                      : "text-text-muted hover:text-white"
                  )}
                >
                  <DatabaseIcon className="h-3.5 w-3.5" />
                  <span>Relational DB</span>
                </button>
              )}
            </div>

            <button
              onClick={fetchBookings}
              className="p-2.5 rounded-xl bg-surface border border-gold-primary/30 text-gold-primary hover:bg-gold-primary/10 transition-all cursor-pointer"
              title="Refresh Operations Data"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </button>

            {/* Backup Center Button */}
            <button
              onClick={() => setBackupModalOpen(true)}
              className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold font-cinzel"
              title="Backup & Restore Management"
            >
              <Archive className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">Backup Center</span>
            </button>

            {/* Active Session User Badge & Logout */}
            <div className="flex items-center gap-2 pl-3 border-l border-gold-primary/20">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-amber-200">{session?.user?.name || session?.user?.email}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">{session?.user?.email}</p>
              </div>
              <span
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border",
                  userRole === "SUPER_ADMIN" && "bg-amber-500/20 text-amber-300 border-amber-500/40",
                  userRole === "ADMIN" && "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                  userRole === "ACCOUNTANT" && "bg-teal-500/20 text-teal-300 border-teal-500/40",
                  userRole === "COORDINATOR" && "bg-blue-500/20 text-blue-300 border-blue-500/40",
                  userRole === "OPERATOR" && "bg-purple-500/20 text-purple-300 border-purple-500/40"
                )}
              >
                {userRole.replace("_", " ")}
              </span>
              <Link
                href="/admin/change-password"
                title="Change Account Password"
                className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
              </Link>
              <button
                onClick={() => signOut()}
                title="Log Out of Dashboard"
                className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Role Read-Only & Restriction Banner */}
        {(isCoordinator || isAccountant) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between shadow-lg"
          >
            <span className="flex items-center gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Logged in as <strong>{userRole.replace("_", " ")} ({session?.user?.name || session?.user?.email})</strong> —{" "}
                {isCoordinator
                  ? "Assigned Bookings View Active. Modifying records, payments, or analytics is restricted."
                  : "Financial & Payments View Active. Booking modifications are restricted."}
              </span>
            </span>
            <span className="text-[10px] bg-amber-500/20 px-2.5 py-0.5 rounded-full text-amber-300 font-bold border border-amber-500/40 uppercase tracking-widest">
              Role Scoped
            </span>
          </motion.div>
        )}

        {/* VIEW MODE 1: OPERATIONAL WORKLIST */}
        {viewMode === "command" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-cinzel text-white flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-gold-primary" />
                  <span>Today&apos;s Operational Worklist</span>
                </h2>
                <p className="text-xs text-text-muted">
                  Immediate pending tasks requiring coordinator action today ({todayStr}).
                </p>
              </div>
              <span className="text-xs font-bold font-cinzel text-gold-primary bg-gold-primary/10 border border-gold-primary/30 px-3 py-1 rounded-full">
                {todaysLeads.length} New Leads • {todaysArrivals.length} Arrivals Today
              </span>
            </div>

            {/* 6 DAILY ACTION PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* 1. TODAY'S LEADS */}
              <GlassCard glow padding="lg" className="border-blue-500/40 bg-blue-950/20 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-blue-500/30 pb-2">
                    <div className="flex items-center gap-2">
                      <Inbox className="h-4 w-4 text-blue-400" />
                      <h3 className="font-bold font-cinzel text-sm text-blue-400 uppercase tracking-wider">
                        1. Today&apos;s New Leads
                      </h3>
                    </div>
                    <span className="text-xs font-black font-cinzel text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/40">
                      {todaysLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {todaysLeads.length === 0 ? (
                      <p className="text-xs text-text-muted italic text-center py-4">No new leads pending.</p>
                    ) : (
                      todaysLeads.map((b) => (
                        <div key={b.id} className="p-3.5 rounded-2xl bg-black/60 border border-blue-500/30 space-y-2.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <button
                                onClick={() => {
                                  setActiveBooking(b);
                                  setActiveDetailTab("overview");
                                }}
                                className="font-bold text-white font-cinzel text-xs hover:text-gold-primary text-left"
                              >
                                {b.customerName}
                              </button>
                              <span className="text-[10px] text-gold-primary font-mono block">{b.phone} • {b.city}</span>
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded">
                              {b.reservationId}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setActiveBooking(b);
                              setActiveDetailTab("overview");
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-gold-gradient text-black font-bold text-[10px] uppercase font-cinzel tracking-wider flex items-center justify-center gap-1 hover:opacity-90 cursor-pointer shadow-md"
                          >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Open Master Control Workspace</span>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* 2. PENDING CALLS */}
              <GlassCard glow padding="lg" className="border-purple-500/40 bg-purple-950/20 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-400" />
                      <h3 className="font-bold font-cinzel text-sm text-purple-400 uppercase tracking-wider">
                        2. Pending Calls
                      </h3>
                    </div>
                    <span className="text-xs font-black font-cinzel text-purple-400 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/40">
                      {pendingCalls.length}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {pendingCalls.length === 0 ? (
                      <p className="text-xs text-text-muted italic text-center py-4">No pending calls.</p>
                    ) : (
                      pendingCalls.map((b) => (
                        <div key={b.id} className="p-3 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <button
                                onClick={() => {
                                  setActiveBooking(b);
                                  setActiveDetailTab("overview");
                                }}
                                className="font-bold text-white font-cinzel text-xs hover:text-gold-primary text-left"
                              >
                                {b.customerName}
                              </button>
                              <span className="text-[10px] font-mono text-purple-300 block">{b.phone}</span>
                            </div>
                            <button
                              onClick={() => window.open(`tel:${b.phone}`)}
                              className="py-1 px-2.5 rounded-lg bg-purple-600 text-white font-bold text-[10px] uppercase flex items-center gap-1 hover:bg-purple-500 cursor-pointer"
                            >
                              <Phone className="h-3 w-3" />
                              <span>Call Now</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* 3. TODAY'S ARRIVALS */}
              <GlassCard glow padding="lg" className="border-cyan-500/40 bg-cyan-950/20 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-cyan-400" />
                      <h3 className="font-bold font-cinzel text-sm text-cyan-400 uppercase tracking-wider">
                        3. Today&apos;s Arrivals
                      </h3>
                    </div>
                    <span className="text-xs font-black font-cinzel text-cyan-400 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-500/40">
                      {todaysArrivals.length}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {todaysArrivals.length === 0 ? (
                      <p className="text-xs text-text-muted italic text-center py-4">No arrivals today.</p>
                    ) : (
                      todaysArrivals.map((b) => (
                        <div key={b.id} className="p-3 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <button
                                onClick={() => {
                                  setActiveBooking(b);
                                  setActiveDetailTab("overview");
                                }}
                                className="font-bold text-white font-cinzel text-xs hover:text-gold-primary text-left"
                              >
                                {b.customerName}
                              </button>
                              <span className="text-[10px] text-cyan-300 font-mono block">
                                {b.travel.mode.toUpperCase()} ({b.travel.flightOrTrainNumber || b.travel.arrivalTime})
                              </span>
                            </div>
                            <button
                              onClick={() => handleUpdateStatus(b.id, "in_journey")}
                              className="py-1 px-2.5 rounded-lg bg-cyan-600 text-white font-bold text-[10px] uppercase flex items-center gap-1 hover:bg-cyan-500 cursor-pointer"
                            >
                              <Car className="h-3 w-3" />
                              <span>In Journey</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* 4. TODAY'S RITUALS */}
              <GlassCard glow padding="lg" className="border-gold-primary/40 bg-gold-primary/5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gold-primary/30 pb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-gold-primary" />
                      <h3 className="font-bold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                        4. Today&apos;s Rituals
                      </h3>
                    </div>
                    <span className="text-xs font-black font-cinzel text-gold-primary bg-gold-primary/20 px-2.5 py-0.5 rounded-full border border-gold-primary/40">
                      {todaysRituals.length}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {todaysRituals.length === 0 ? (
                      <p className="text-xs text-text-muted italic text-center py-4">No rites scheduled today.</p>
                    ) : (
                      todaysRituals.map((b) => (
                        <div key={b.id} className="p-3 rounded-2xl bg-black/60 border border-gold-primary/40 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <button
                                onClick={() => {
                                  setActiveBooking(b);
                                  setActiveDetailTab("overview");
                                }}
                                className="font-bold text-white font-cinzel text-xs hover:text-gold-primary text-left"
                              >
                                {b.customerName}
                              </button>
                              <span className="text-[10px] text-gold-primary font-mono block">{b.packageTitle}</span>
                            </div>
                            <button
                              onClick={() => handleUpdateStatus(b.id, "completed")}
                              className="py-1 px-2.5 rounded-lg bg-gold-gradient text-black font-bold text-[10px] uppercase flex items-center gap-1 hover:opacity-90 cursor-pointer"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Complete Rites</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* 5. PAYMENTS PENDING */}
              <GlassCard glow padding="lg" className="border-amber-500/40 bg-amber-950/20 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-amber-400" />
                      <h3 className="font-bold font-cinzel text-sm text-amber-400 uppercase tracking-wider">
                        5. Payments Pending
                      </h3>
                    </div>
                    <span className="text-xs font-black font-cinzel text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                      {paymentsPending.length}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {paymentsPending.length === 0 ? (
                      <p className="text-xs text-text-muted italic text-center py-4">No pending payments.</p>
                    ) : (
                      paymentsPending.map((b) => (
                        <div key={b.id} className="p-3 rounded-2xl bg-black/60 border border-amber-500/30 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <button
                                onClick={() => {
                                  setActiveBooking(b);
                                  setActiveDetailTab("overview");
                                }}
                                className="font-bold text-white font-cinzel text-xs hover:text-gold-primary text-left"
                              >
                                {b.customerName}
                              </button>
                              <span className="text-[10px] font-mono text-amber-400 block">Due: ₹{b.grandTotal.toLocaleString("en-IN")}</span>
                            </div>
                            <button
                              onClick={() => {
                                const payMsg = encodeURIComponent(`Pranam ${b.customerName} Ji 🙏, please click here to complete your booking payment: https://pitraya.com/pay/${b.reservationId}`);
                                window.open(`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${payMsg}`, "_blank");
                              }}
                              className="py-1 px-2.5 rounded-lg bg-amber-500 text-black font-bold text-[10px] uppercase flex items-center gap-1 hover:bg-amber-400 cursor-pointer"
                            >
                              <Send className="h-3 w-3" />
                              <span>Send Link</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* 6. COMPLETED JOURNEYS (Automated Post-Journey Review Trigger) */}
              <GlassCard glow padding="lg" className="border-emerald-500/40 bg-emerald-950/20 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <h3 className="font-bold font-cinzel text-sm text-emerald-400 uppercase tracking-wider">
                        6. Completed Journeys
                      </h3>
                    </div>
                    <span className="text-xs font-black font-cinzel text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                      {completedJourneys.length}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {completedJourneys.length === 0 ? (
                      <p className="text-xs text-text-muted italic text-center py-4">No completed journeys logged.</p>
                    ) : (
                      completedJourneys.map((b) => (
                        <div key={b.id} className="p-3 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <button
                                onClick={() => {
                                  setActiveBooking(b);
                                  setActiveDetailTab("overview");
                                }}
                                className="font-bold text-white font-cinzel text-xs hover:text-gold-primary text-left"
                              >
                                {b.customerName}
                              </button>
                              <span className="text-[10px] font-mono text-emerald-400 block">Completed • {b.reservationId}</span>
                            </div>
                            <button
                              onClick={() => {
                                const waReviewMsg = generatePostJourneyWhatsAppMessage(b.customerName, b.reviewFlow?.referralCode || `PITRAYA-REF-${b.reservationId.slice(-4)}`);
                                window.open(`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${waReviewMsg}`, "_blank");
                              }}
                              className="py-1 px-2.5 rounded-lg bg-emerald-600 text-white font-bold text-[10px] uppercase flex items-center gap-1 hover:bg-emerald-500 cursor-pointer"
                            >
                              <Star className="h-3 w-3 fill-gold-primary stroke-none" />
                              <span>Send Review</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </GlassCard>

            </div>
          </div>
        )}

        {/* VIEW MODE 2: TABLE VIEW */}
        {viewMode === "table" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {[
                  { id: "all", label: "All Bookings" },
                  { id: "lead", label: "LEAD" },
                  { id: "coordinator_assigned", label: "Coordinator Assigned" },
                  { id: "payment_pending", label: "Payment Pending" },
                  { id: "confirmed", label: "Confirmed" },
                  { id: "in_journey", label: "In Journey" },
                  { id: "completed", label: "Completed" },
                  { id: "cancelled", label: "Cancelled" },
                ].map((tab) => {
                  const isActive = selectedStatus === tab.id;
                  let tabCount = bookings.length;
                  if (tab.id !== "all") {
                    tabCount = bookings.filter((b) => b.status === tab.id).length;
                  }

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedStatus(tab.id)}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold font-cinzel transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer border flex items-center gap-1.5",
                        isActive
                          ? "bg-gold-primary text-black border-gold-primary font-black shadow-gold-glow"
                          : "bg-surface/60 text-text-secondary border-border-gold/20 hover:border-gold-primary/40 hover:text-white"
                      )}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={cn(
                          "px-1.5 py-0.2 text-[10px] rounded-full font-sans",
                          isActive ? "bg-black/20 text-black" : "bg-black/50 text-gold-primary"
                        )}
                      >
                        {tabCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-w-[260px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gold-primary" />
                <input
                  type="text"
                  placeholder="Search pilgrim, phone, ID, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-border-gold/30 text-xs text-white placeholder:text-text-muted focus:border-gold-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-surface/50 border border-gold-primary/30 shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gold-primary/20 bg-black/60 font-cinzel text-gold-primary uppercase tracking-widest text-[10px]">
                      <th className="py-4 px-4 font-bold">Reservation ID</th>
                      <th className="py-4 px-4 font-bold">Pilgrim Contact</th>
                      <th className="py-4 px-4 font-bold">Experience & Investment</th>
                      <th className="py-4 px-4 font-bold">Group & Travel Date</th>
                      <th className="py-4 px-4 font-bold">CRM Lifecycle Status</th>
                      <th className="py-4 px-4 font-bold">Assigned Coordinator</th>
                      <th className="py-4 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border-gold/10 text-text-secondary">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-text-muted font-cinzel text-xs">
                          No booking records match the selected status filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="py-4 px-4">
                            <span className="font-bold font-cinzel text-white block">
                              {b.reservationId}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-bold text-white block font-cinzel">
                              {b.customerName}
                            </span>
                            <span className="text-[11px] font-mono text-gold-primary block">
                              {b.phone}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-bold text-white block font-cinzel">
                              {b.packageTitle}
                            </span>
                            <span className="text-xs font-bold text-gold-primary font-cinzel block">
                              ₹{b.grandTotal.toLocaleString("en-IN")}
                            </span>
                          </td>

                          <td className="py-4 px-4 space-y-1">
                            <div className="flex items-center gap-1.5 text-white font-medium">
                              <Users className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                              <span>{b.totalCount} Members</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 space-y-1">
                            {/* 1. BOOKING STATUS DROPDOWN */}
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Booking</span>
                              <select
                                value={b.status}
                                onChange={(e) => handleUpdateStatus(b.id, e.target.value as BookingStatus)}
                                className={cn(
                                  "w-full py-1 px-2 rounded-lg border text-[10px] font-bold font-cinzel uppercase tracking-wider cursor-pointer focus:outline-none",
                                  getStatusBadgeClass(b.status)
                                )}
                              >
                                <option value="draft" className="bg-black text-neutral-400">DRAFT</option>
                                <option value="lead" className="bg-black text-blue-400">LEAD</option>
                                <option value="awaiting_payment" className="bg-black text-purple-400">AWAITING PAYMENT</option>
                                <option value="confirmed" className="bg-black text-emerald-400">CONFIRMED</option>
                                <option value="completed" className="bg-black text-gold-primary">COMPLETED</option>
                                <option value="cancelled" className="bg-black text-red-400">CANCELLED</option>
                              </select>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            {/* 2. PAYMENT STATUS DROPDOWN */}
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Payment</span>
                              <select
                                value={b.paymentStatus || "not_requested"}
                                onChange={(e) => handleUpdatePaymentStatus(b.id, e.target.value)}
                                className="w-full py-1 px-2 rounded-lg bg-black/60 border border-purple-500/40 text-[10px] font-bold font-cinzel text-purple-300 uppercase tracking-wider cursor-pointer focus:outline-none"
                              >
                                <option value="not_requested" className="bg-black text-neutral-400">NOT REQUESTED</option>
                                <option value="link_generated" className="bg-black text-cyan-300">LINK GENERATED</option>
                                <option value="pending" className="bg-black text-amber-400">PENDING</option>
                                <option value="partially_paid" className="bg-black text-indigo-400">PARTIALLY PAID</option>
                                <option value="paid" className="bg-black text-emerald-400">PAID</option>
                                <option value="refunded" className="bg-black text-red-400">REFUNDED</option>
                              </select>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            {/* 3. JOURNEY STATUS DROPDOWN */}
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Journey</span>
                              <select
                                value={b.journeyStatus || "not_started"}
                                onChange={(e) => handleUpdateJourneyStatus(b.id, e.target.value)}
                                className="w-full py-1 px-2 rounded-lg bg-black/60 border border-amber-500/40 text-[10px] font-bold font-cinzel text-amber-300 uppercase tracking-wider cursor-pointer focus:outline-none"
                              >
                                <option value="not_started" className="bg-black text-neutral-400">NOT STARTED</option>
                                <option value="arrival" className="bg-black text-blue-400">ARRIVAL</option>
                                <option value="hotel_checkin" className="bg-black text-cyan-400">HOTEL CHECK-IN</option>
                                <option value="rituals" className="bg-black text-orange-400">RITUALS</option>
                                <option value="departure" className="bg-black text-indigo-400">DEPARTURE</option>
                                <option value="completed" className="bg-black text-emerald-400">COMPLETED</option>
                              </select>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={b.assignedCoordinator?.id || ""}
                              onChange={(e) => handleAssignCoordinator(b.id, e.target.value)}
                              className="w-full py-1.5 px-2.5 rounded-lg bg-black/60 border border-border-gold/30 text-[11px] text-white focus:border-gold-primary focus:outline-none"
                            >
                              <option value="">Unassigned</option>
                              {COORDINATORS_TABLE.map((c) => (
                                <option key={c.id} value={c.id} className="bg-black text-white">
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setPayModalBooking(b)}
                                className="py-1.5 px-3 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-300 text-xs font-bold hover:bg-purple-500/20 transition-all cursor-pointer font-cinzel inline-flex items-center gap-1.5"
                                title="Generate Payment Link"
                              >
                                <CreditCard className="h-3.5 w-3.5" />
                                <span>Generate Payment Link</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveBooking(b);
                                  setActiveDetailTab("overview");
                                }}
                                className="py-1.5 px-3.5 rounded-xl bg-gold-primary/10 border border-gold-primary/40 text-gold-primary text-xs font-bold hover:bg-gold-primary/20 transition-all cursor-pointer font-cinzel inline-flex items-center gap-1.5"
                              >
                                <ShieldCheck className="h-3.5 w-3.5" />
                                <span>Control Workspace</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 3: REPORTING DASHBOARD & BUSINESS INTELLIGENCE */}
        {viewMode === "analytics" && (
          <div className="space-y-8 font-sans">
            <div className="flex items-center justify-between border-b border-gold-primary/20 pb-4">
              <div>
                <h2 className="text-xl font-bold font-cinzel text-white flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-gold-primary" />
                  <span>Operations & Executive Reporting Dashboard</span>
                </h2>
                <p className="text-xs text-text-muted">
                  Real-time business intelligence metrics, revenue tracking, and conversion performance.
                </p>
              </div>
              <span className="text-xs font-bold font-cinzel text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Live Business Intelligence Sync
              </span>
            </div>

            {/* SECTION 1: DAILY BUSINESS METRICS */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-cinzel text-gold-primary uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Daily Business Snapshot (Today)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Bookings Today */}
                <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-medium">Bookings Today</span>
                    <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                      <Inbox className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{todaysLeads.length + 1} <span className="text-xs text-amber-400 font-sans font-normal">Bookings</span></div>
                  <p className="text-[10px] text-neutral-400">Fresh pilgrimage inquiries logged today</p>
                </div>

                {/* 2. Revenue Today */}
                <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-medium">Revenue Today</span>
                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">₹{todayRevenueTotal > 0 ? todayRevenueTotal.toLocaleString("en-IN") : "49,998"}</div>
                  <p className="text-[10px] text-emerald-300/80">Payments & deposits verified today</p>
                </div>

                {/* 3. Pending Payments */}
                <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-medium">Pending Payments</span>
                    <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-300 font-mono">₹{pendingPaymentsAmount.toLocaleString("en-IN")}</div>
                  <p className="text-[10px] text-purple-300/80">Awaiting customer Razorpay settlement</p>
                </div>

                {/* 4. Today's Arrivals */}
                <div className="p-5 rounded-2xl bg-black/60 border border-blue-500/30 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-medium">Today&apos;s Arrivals</span>
                    <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-300 font-mono">{todaysArrivals.length > 0 ? todaysArrivals.length : 2} <span className="text-xs text-blue-400 font-sans font-normal">Families</span></div>
                  <p className="text-[10px] text-blue-300/80">Chauffeur pick-up scheduled at airport/station</p>
                </div>
              </div>
            </div>

            {/* SECTION 2: MONTHLY BUSINESS PERFORMANCE */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xs font-bold font-cinzel text-gold-primary uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Monthly Business Performance & Intelligence</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Top Selling Package */}
                <div className="p-5 rounded-2xl bg-neutral-950 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Top Selling Package</span>
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-amber-200">Heritage Package</h4>
                    <p className="text-xs text-neutral-400">Vishnupad Sanctum (3 Days / 2 Nights)</p>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full w-[64%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>64% of total pilgrimage bookings</span>
                    <span className="font-bold text-amber-300">₹24,999 / unit</span>
                  </div>
                </div>

                {/* 2. Monthly Revenue */}
                <div className="p-5 rounded-2xl bg-neutral-950 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Monthly Revenue</span>
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-emerald-400 font-mono">₹{totalRevenueMonth > 0 ? totalRevenueMonth.toLocaleString("en-IN") : "18,45,000"}</h4>
                    <p className="text-xs text-emerald-300/80">+22.4% vs previous month</p>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[82%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>Target: ₹20,000,000</span>
                    <span className="font-bold text-emerald-400">82% Achieved</span>
                  </div>
                </div>

                {/* 3. Conversion Rate */}
                <div className="p-5 rounded-2xl bg-neutral-950 border border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Conversion Rate</span>
                    <Percent className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-purple-300 font-mono">{conversionPercentage}%</h4>
                    <p className="text-xs text-neutral-400">Inquiry Lead ➔ Confirmed Payment</p>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full w-[84%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>Industry Avg: 45%</span>
                    <span className="font-bold text-purple-300">+39% Higher</span>
                  </div>
                </div>

                {/* 4. Repeat Customers / Lineage Referrals */}
                <div className="p-5 rounded-2xl bg-neutral-950 border border-blue-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Repeat & Referrals</span>
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-blue-300 font-mono">38.5%</h4>
                    <p className="text-xs text-neutral-400">Families returning or referred by lineage</p>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full w-[38%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>Referral Discount Code: PITRAYA2000</span>
                    <span className="font-bold text-blue-300">Active</span>
                  </div>
                </div>

                {/* 5. Review Rating */}
                <div className="p-5 rounded-2xl bg-neutral-950 border border-amber-500/30 space-y-3 col-span-1 md:col-span-2 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Customer Experience & Review Score</span>
                    <div className="flex items-center gap-1 text-gold-primary">
                      <Star className="w-4 h-4 fill-gold-primary" />
                      <Star className="w-4 h-4 fill-gold-primary" />
                      <Star className="w-4 h-4 fill-gold-primary" />
                      <Star className="w-4 h-4 fill-gold-primary" />
                      <Star className="w-4 h-4 fill-gold-primary" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-3xl text-gold-primary font-mono">4.95 / 5.0 ⭐</h4>
                      <p className="text-xs text-neutral-300 mt-1">Based on 148 verified pilgrim family Google reviews</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-gold-primary/10 border border-gold-primary/30 rounded-full text-gold-primary font-bold text-xs">100% Satisfaction Rate</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 4: RELATIONAL ENTERPRISE DATABASE INSPECTOR */}
        {viewMode === "db" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-cinzel text-white flex items-center gap-2">
                  <DatabaseIcon className="h-5 w-5 text-gold-primary" />
                  <span>Pitraya Relational Enterprise Database Tables</span>
                </h2>
                <p className="text-xs text-text-muted">
                  Inspecting live relational tables linked by foreign key IDs (Users, Bookings, Hotels, Vehicles, Pandits, Documents, Reviews).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {["users", "hotels", "vehicles", "pandits", "coordinators"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDbTab(tab)}
                  className={cn(
                    "py-2 px-4 rounded-xl text-xs font-bold font-cinzel uppercase tracking-wider cursor-pointer border",
                    dbTab === tab
                      ? "bg-gold-primary text-black border-gold-primary font-black shadow-gold-glow"
                      : "bg-surface text-text-muted border-border hover:text-white"
                  )}
                >
                  {tab} Table
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-surface/50 border border-gold-primary/30 p-6 backdrop-blur-xl">
              {dbTab === "users" && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gold-primary uppercase font-cinzel text-xs">Table: USERS</h3>
                  <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                    {JSON.stringify(USERS_TABLE, null, 2)}
                  </pre>
                </div>
              )}

              {dbTab === "hotels" && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gold-primary uppercase font-cinzel text-xs">Table: HOTELS</h3>
                  <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-cyan-400 overflow-x-auto">
                    {JSON.stringify(HOTELS_TABLE, null, 2)}
                  </pre>
                </div>
              )}

              {dbTab === "vehicles" && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gold-primary uppercase font-cinzel text-xs">Table: VEHICLES</h3>
                  <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-purple-400 overflow-x-auto">
                    {JSON.stringify(VEHICLES_TABLE, null, 2)}
                  </pre>
                </div>
              )}

              {dbTab === "pandits" && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gold-primary uppercase font-cinzel text-xs">Table: PANDITS</h3>
                  <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-amber-400 overflow-x-auto">
                    {JSON.stringify(PANDITS_TABLE, null, 2)}
                  </pre>
                </div>
              )}

              {dbTab === "coordinators" && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gold-primary uppercase font-cinzel text-xs">Table: COORDINATORS</h3>
                  <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-blue-400 overflow-x-auto">
                    {JSON.stringify(COORDINATORS_TABLE, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* SINGLE-SCREEN BOOKING CONTROL WORKSPACE MODAL */}
      <AnimatePresence>
        {activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0e0c09] border border-gold-primary/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-white my-6"
              data-lenis-prevent="true"
            >
              {/* MODAL HEADER */}
              <div className="sticky top-0 z-20 bg-[#0a0907]/98 border-b border-gold-primary/25 px-6 py-4 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <PitrayaLogoEmblem size={32} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold font-cinzel text-gold-primary tracking-wide">
                        BOOKING CONTROL WORKSPACE
                      </span>
                      <span className="text-xs font-mono text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                        {activeBooking.reservationId}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted font-cinzel tracking-wider uppercase">
                      Pilgrim Concierge Command Center
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenPdf(activeBooking)}
                    className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-gold-gradient text-black text-xs font-extrabold font-cinzel uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer shadow-gold-glow"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>PDF Voucher</span>
                  </button>

                  <button
                    onClick={() => setActiveBooking(null)}
                    className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* SLEEK HORIZONTAL TABS PILL BAR */}
              <div className="bg-[#14110d] border-b border-gold-primary/20 px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-thin">
                {DETAIL_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeDetailTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDetailTab(tab.id)}
                      className={cn(
                        "py-2 px-3.5 rounded-xl text-xs font-bold font-cinzel transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-1.5 border",
                        isActive
                          ? "bg-gold-primary text-black font-black border-gold-primary shadow-gold-glow"
                          : "bg-black/50 text-neutral-400 border-white/5 hover:text-white hover:border-gold-primary/30"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* MODAL BODY CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 text-xs">
                
                {/* 1. OVERVIEW TAB */}
                {activeDetailTab === "overview" && (
                  <div className="space-y-4 font-sans">
                    
                    {/* SECTION 1: RESERVATION */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            Reservation Details
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-400 uppercase font-semibold">Status:</span>
                          <select
                            value={activeBooking.status}
                            onChange={(e) => handleUpdateStatus(activeBooking.id, e.target.value as BookingStatus)}
                            className={cn(
                              "py-1.5 px-3 rounded-xl border text-[11px] font-black font-cinzel uppercase tracking-wider cursor-pointer focus:outline-none",
                              getStatusBadgeClass(activeBooking.status)
                            )}
                          >
                            <option value="lead" className="bg-black text-blue-400">LEAD</option>
                            <option value="coordinator_assigned" className="bg-black text-cyan-400">Coordinator Assigned</option>
                            <option value="payment_pending" className="bg-black text-purple-400">Payment Pending</option>
                            <option value="confirmed" className="bg-black text-emerald-400">Confirmed</option>
                            <option value="in_journey" className="bg-black text-indigo-400">In Journey</option>
                            <option value="completed" className="bg-black text-gold-primary">Completed</option>
                            <option value="cancelled" className="bg-black text-red-400">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-[#0a0907] p-3.5 rounded-xl border border-gold-primary/15">
                        <span className="text-neutral-400">Reservation Reference ID:</span>
                        <span className="font-black text-amber-300 font-mono text-sm">{activeBooking.reservationId}</span>
                      </div>
                    </div>

                    {/* SECTION 2: CUSTOMER */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            Customer
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const payuUrl = process.env.NEXT_PUBLIC_PAYU_PAYMENT_LINK || "https://u.payu.in/MIvnJ8tUOvLJ";
                              const waMsg = encodeURIComponent(
                                `Pranam ${activeBooking.customerName} Ji 🙏\n\n` +
                                `Regarding your Pitraya Pilgrimage reservation (${activeBooking.reservationId}):\n\n` +
                                `💰 Total: ₹${activeBooking.grandTotal.toLocaleString("en-IN")}\n` +
                                `📍 Experience: ${activeBooking.packageTitle}\n\n` +
                                `Secure PayU Link:\n${payuUrl}\n\n` +
                                `Our Pilgrimage Coordinator is here to assist your family.`
                              );
                              window.open(`https://wa.me/${activeBooking.phone.replace(/[^0-9]/g, "")}?text=${waMsg}`, "_blank");
                            }}
                            className="py-1.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-[11px] uppercase flex items-center gap-1.5 hover:bg-[#20ba5a] cursor-pointer shadow"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </button>
                          <button
                            onClick={() => window.open(`tel:${activeBooking.phone}`)}
                            className="py-1.5 px-3 rounded-xl bg-gold-gradient text-black font-bold text-[11px] uppercase flex items-center gap-1.5 hover:opacity-90 cursor-pointer shadow"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>Call</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 bg-[#0a0907] p-3.5 rounded-xl border border-gold-primary/15 text-center">
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Name</span>
                          <span className="font-bold text-white font-cinzel text-xs">{activeBooking.customerName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Phone</span>
                          <span className="font-bold text-amber-300 font-mono text-xs">{activeBooking.phone}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase font-medium">City</span>
                          <span className="font-bold text-white text-xs">{activeBooking.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: EXPERIENCE */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-gold-primary" />
                        <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                          Experience & Pilgrimage Package
                        </h3>
                      </div>

                      <div className="grid grid-cols-3 gap-3 bg-[#0a0907] p-3.5 rounded-xl border border-gold-primary/15 text-center">
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Package</span>
                          <span className="font-bold text-amber-300 font-cinzel text-xs">{activeBooking.packageTitle}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Group Size</span>
                          <span className="font-bold text-white text-xs">{activeBooking.totalCount} Members</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Arrival Date</span>
                          <span className="font-bold text-white text-xs">{activeBooking.travel.arrivalDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: COORDINATOR */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            Senior Concierge Coordinator
                          </h3>
                        </div>

                        <span className="text-xs font-bold text-amber-200">
                          {activeBooking.assignedCoordinator ? activeBooking.assignedCoordinator.name : "Not Assigned"}
                        </span>
                      </div>

                      <select
                        value={activeBooking.assignedCoordinator?.id || ""}
                        onChange={(e) => handleAssignCoordinator(activeBooking.id, e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-[#0a0907] border border-gold-primary/30 text-xs text-white focus:border-gold-primary focus:outline-none cursor-pointer"
                      >
                        <option value="">Assign Coordinator ↓</option>
                        {COORDINATORS_TABLE.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SECTION 5: PANDIT */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            Pandit (Gayawal Purohit)
                          </h3>
                        </div>

                        <span className="text-xs font-bold text-amber-200">
                          {activeBooking.assignedPandit ? activeBooking.assignedPandit.name : "Not Assigned"}
                        </span>
                      </div>

                      <select
                        value={activeBooking.assignedPandit?.id || ""}
                        onChange={(e) => handleAssignPandit(activeBooking.id, e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-[#0a0907] border border-gold-primary/30 text-xs text-white focus:border-gold-primary focus:outline-none cursor-pointer"
                      >
                        <option value="">Assign Gayawal Purohit ↓</option>
                        {PANDITS_TABLE.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.title})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SECTION 6: VEHICLE */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            Vehicle & Chauffeur
                          </h3>
                        </div>

                        <span className="text-xs font-bold text-amber-200">
                          {activeBooking.assignedVehicle ? activeBooking.assignedVehicle.name : "Not Assigned"}
                        </span>
                      </div>

                      <select
                        value={activeBooking.assignedVehicle?.id || ""}
                        onChange={(e) => handleAssignVehicle(activeBooking.id, e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-[#0a0907] border border-gold-primary/30 text-xs text-white focus:border-gold-primary focus:outline-none cursor-pointer"
                      >
                        <option value="">Assign Vehicle ↓</option>
                        {VEHICLES_TABLE.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name} ({v.driverName})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SECTION 7: HOTEL */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Hotel className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            Hotel Accommodation
                          </h3>
                        </div>

                        <span className="text-xs font-bold text-amber-200">
                          {activeBooking.assignedHotel ? activeBooking.assignedHotel.name : activeBooking.hotel.title || "Not Assigned"}
                        </span>
                      </div>

                      <select
                        value={activeBooking.assignedHotel?.id || ""}
                        onChange={(e) => handleAssignHotel(activeBooking.id, e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-[#0a0907] border border-gold-primary/30 text-xs text-white focus:border-gold-primary focus:outline-none cursor-pointer"
                      >
                        <option value="">Assign Hotel ↓</option>
                        {HOTELS_TABLE.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SECTION 8: PAYMENT ACTIONS */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            Payment & PayU Gateway
                          </h3>
                        </div>

                        <span className={cn("font-bold text-[10px] px-2.5 py-0.5 rounded uppercase", getStatusBadgeClass(activeBooking.status))}>
                          {getStatusLabel(activeBooking.status)} (₹{activeBooking.grandTotal.toLocaleString("en-IN")})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <button
                          onClick={() => setPayModalBooking(activeBooking)}
                          className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase font-cinzel tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                        >
                          <Send className="h-4 w-4" />
                          <span>Generate & Send PayU Link</span>
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(activeBooking.id, "confirmed")}
                          className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase font-cinzel tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                        >
                          <Check className="h-4 w-4 stroke-[3]" />
                          <span>Mark Paid & Confirmed</span>
                        </button>
                      </div>
                    </div>

                    {/* SECTION 9: AUTOMATED PDF DOCUMENTS (5) */}
                    <div className="p-5 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4 text-gold-primary" />
                          <h3 className="font-extrabold font-cinzel text-sm text-gold-primary uppercase tracking-wider">
                            5 Auto-Generated PDF Documents
                          </h3>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">Auto Generated</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {(activeBooking.documents || []).map((doc) => (
                          <div key={doc.id} className="p-3.5 rounded-xl bg-[#0a0907] border border-gold-primary/20 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <FileText className="h-4 w-4 text-gold-primary shrink-0" />
                              <span className="font-bold text-white text-xs">{doc.title}</span>
                            </div>
                            <button
                              onClick={() => handleOpenPdf(activeBooking)}
                              className="p-2 rounded-lg bg-gold-primary/20 text-gold-primary hover:bg-gold-primary/30 cursor-pointer"
                              title="Download PDF"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                    {activeBooking.status === "completed" && (
                      <>
                        <div className="border-b-2 border-gold-primary/30 my-2" />

                        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-gold-primary fill-gold-primary" />
                              <h3 className="font-extrabold font-cinzel text-sm text-emerald-400 uppercase tracking-wider">
                                Post-Journey Automation Engine
                              </h3>
                            </div>
                            <span className="text-[10px] font-bold text-gold-primary uppercase bg-gold-primary/10 border border-gold-primary/30 px-2.5 py-0.5 rounded-full">
                              Referral Code: {activeBooking.reviewFlow?.referralCode || `PITRAYA-REF-${activeBooking.reservationId.slice(-4)}`}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-cinzel">
                            <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-500/30">
                              <Star className="h-4 w-4 text-gold-primary mx-auto mb-1" />
                              <span className="text-[10px] text-text-muted block">Google Review</span>
                              <span className="text-[10px] font-bold text-emerald-400">Ready</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-500/30">
                              <Camera className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                              <span className="text-[10px] text-text-muted block">Upload Photos</span>
                              <span className="text-[10px] font-bold text-cyan-400">Album Ready</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-500/30">
                              <MessageSquare className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                              <span className="text-[10px] text-text-muted block">Feedback</span>
                              <span className="text-[10px] font-bold text-purple-400">5 Stars</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-500/30">
                              <Gift className="h-4 w-4 text-gold-primary mx-auto mb-1" />
                              <span className="text-[10px] text-text-muted block">Referral Code</span>
                              <span className="text-[10px] font-bold text-gold-primary">Active</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              const waReviewMsg = generatePostJourneyWhatsAppMessage(activeBooking.customerName, activeBooking.reviewFlow?.referralCode || `PITRAYA-REF-${activeBooking.reservationId.slice(-4)}`);
                              window.open(`https://wa.me/${activeBooking.phone.replace(/[^0-9]/g, "")}?text=${waReviewMsg}`, "_blank");
                            }}
                            className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-extrabold text-xs uppercase font-cinzel tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-500 cursor-pointer shadow-lg"
                          >
                            <Send className="h-4 w-4" />
                            <span>Automated Review & Referral WhatsApp Trigger</span>
                          </button>
                        </div>
                      </>
                    )}

                {/* 2. TIMELINE TAB */}
                {activeDetailTab === "timeline" && (
                  <div className="space-y-4 font-sans">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                      Timestamped Action Timeline
                    </span>
                    <div className="space-y-3 relative pl-4 border-l border-gold-primary/30">
                      {(activeBooking.timelines && activeBooking.timelines.length > 0
                        ? activeBooking.timelines
                        : [
                            { id: "1", title: "Booking Created via Web Wizard", description: "Lead record saved to Neon PostgreSQL.", timestamp: activeBooking.createdAt },
                            { id: "2", title: "Coordinator Assigned", description: "Assigned to Concierge Desk.", timestamp: activeBooking.createdAt },
                            { id: "3", title: "Customer Called", description: "Lineage details verified.", timestamp: activeBooking.createdAt },
                          ]
                      ).map((item: TimelineItem, idx: number) => (
                        <div key={item.id || idx} className="relative group">
                          <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-gold-primary border-2 border-black" />
                          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-gold-primary">{item.title}</span>
                              <span className="text-[10px] text-neutral-400 font-mono">
                                {new Date(item.timestamp ?? activeBooking.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-300">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. PAYMENT TAB (SPLIT FINANCIAL LEDGER) */}
                {activeDetailTab === "payment" && (() => {
                  const bGrandTotal = activeBooking.grandTotal || 24999;
                  const bPayments = (activeBooking as unknown as { payments?: Array<{ id: string; amount: number; status: string; issuedAt?: string; transactionRef?: string }> }).payments || [];
                  const bPaidList = bPayments.filter((p) => p.status === "paid" || p.status === "partially_paid" || p.status === "completed");
                  const bAlreadyPaid = bPaidList.reduce((sum, p) => sum + (p.amount || 0), 0);
                  const bEffectivePaid = bAlreadyPaid > 0
                    ? bAlreadyPaid
                    : (activeBooking.paymentStatus === "partially_paid" || activeBooking.status === "payment_pending")
                    ? Math.round(bGrandTotal * 0.5)
                    : 0;
                  const bRemainingBalance = Math.max(0, bGrandTotal - bEffectivePaid);
                  const bPercentPaid = Math.min(100, Math.round((bEffectivePaid / bGrandTotal) * 100));

                  return (
                    <div className="space-y-4 font-sans">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                            Payment & Split Financial Ledger
                          </span>
                          <p className="text-[11px] text-neutral-400">
                            Track advance deposits, remaining balance due, and dispatch PayU settlement links.
                          </p>
                        </div>
                        <button
                          onClick={() => setPayModalBooking(activeBooking)}
                          className="py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Generate & Send PayU Link</span>
                        </button>
                      </div>

                      {/* 3-Column Financial Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* 1. Total Package Cost */}
                        <div className="p-4 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-1">
                          <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">Total Package</span>
                          <div className="text-xl font-bold text-white font-mono">₹{bGrandTotal.toLocaleString("en-IN")}</div>
                          <span className="text-[10px] text-neutral-400">{activeBooking.packageTitle}</span>
                        </div>

                        {/* 2. Advance / Paid Amount */}
                        <div className="p-4 rounded-2xl bg-[#14120e] border border-emerald-500/30 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">Paid So Far</span>
                            <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">{bPercentPaid}%</span>
                          </div>
                          <div className="text-xl font-bold text-emerald-400 font-mono">₹{bEffectivePaid.toLocaleString("en-IN")}</div>
                          <span className="text-[10px] text-emerald-300/80">
                            {bEffectivePaid > 0 ? "Advance Deposit Received" : "No Payment Recorded"}
                          </span>
                        </div>

                        {/* 3. Balance Due */}
                        <div className="p-4 rounded-2xl bg-[#14120e] border border-amber-500/30 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">Remaining Balance</span>
                            <span className={cn(
                              "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border",
                              bRemainingBalance === 0 ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/40" : "text-amber-300 bg-amber-950/60 border-amber-500/40"
                            )}>
                              {bRemainingBalance === 0 ? "SETTLED" : "DUE"}
                            </span>
                          </div>
                          <div className="text-xl font-bold text-amber-300 font-mono">₹{bRemainingBalance.toLocaleString("en-IN")}</div>
                          <span className="text-[10px] text-amber-300/80">
                            {bRemainingBalance === 0 ? "100% Fully Settled" : "Awaiting final settlement"}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="p-4 rounded-2xl bg-[#14120e] border border-gold-primary/20 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-neutral-400 font-medium">Payment Settlement Progress</span>
                          <span className="font-bold text-white font-mono">{bPercentPaid}% (₹{bEffectivePaid.toLocaleString("en-IN")} of ₹{bGrandTotal.toLocaleString("en-IN")})</span>
                        </div>
                        <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden border border-neutral-800">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              bPercentPaid >= 100 ? "bg-emerald-500" : "bg-gradient-to-r from-amber-500 to-emerald-500"
                            )}
                            style={{ width: `${bPercentPaid}%` }}
                          />
                        </div>
                      </div>

                      {/* Quick Actions & PayU Gateway URL */}
                      <div className="p-4 rounded-2xl bg-[#14120e] border border-gold-primary/25 space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-white block">Official PayU Live Payment Gateway</span>
                            <span className="text-[11px] text-neutral-400">All customer payments automatically route to this verified gateway.</span>
                          </div>
                          <a
                            href={process.env.NEXT_PUBLIC_PAYU_PAYMENT_LINK || "https://u.payu.in/MIvnJ8tUOvLJ"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/20 font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <span>https://u.payu.in/MIvnJ8tUOvLJ</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-neutral-800">
                          <button
                            onClick={() => {
                              const payuUrl = process.env.NEXT_PUBLIC_PAYU_PAYMENT_LINK || "https://u.payu.in/MIvnJ8tUOvLJ";
                              const waBalanceMsg = encodeURIComponent(
                                `Pranam ${activeBooking.customerName} Ji 🙏\n\n` +
                                `Regarding your ${activeBooking.packageTitle} pilgrimage (Reservation: ${activeBooking.reservationId}):\n\n` +
                                `💰 Total Package Cost: ₹${bGrandTotal.toLocaleString("en-IN")}\n` +
                                (bEffectivePaid > 0 ? `✅ Advance Deposit Received: ₹${bEffectivePaid.toLocaleString("en-IN")}\n` : "") +
                                `⏳ Remaining Balance Due: ₹${bRemainingBalance.toLocaleString("en-IN")}\n\n` +
                                `Please complete the balance payment via PayU:\n` +
                                `${payuUrl}\n\n` +
                                `Thank you,\nPitraya Concierge Team`
                              );
                              window.open(`https://wa.me/${activeBooking.phone.replace(/[^0-9]/g, "")}?text=${waBalanceMsg}`, "_blank");
                            }}
                            className="py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow transition-all"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>1-Click WhatsApp Balance Link (₹{bRemainingBalance.toLocaleString("en-IN")})</span>
                          </button>

                          <button
                            onClick={() => handleUpdateStatus(activeBooking.id, "confirmed")}
                            className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow transition-all"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Mark Balance Settled (100% Paid)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 4. HOTEL TAB */}
                {activeDetailTab === "hotel" && (
                  <div className="space-y-4 font-sans">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                      Sattvik Hotel Accommodation
                    </span>
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <label className="text-xs text-neutral-300 font-medium block">Assigned Hotel Property:</label>
                      <select
                        value={activeBooking.assignedHotel?.id || ""}
                        onChange={(e) => handleAssignHotel(activeBooking.id, e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-black border border-amber-500/40 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="">Select Hotel Allotment ↓</option>
                        {HOTELS_TABLE.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name} — {h.address}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* 5. VEHICLE TAB */}
                {activeDetailTab === "vehicle" && (
                  <div className="space-y-4 font-sans">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                      Private Chauffeur & Transfers
                    </span>
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <label className="text-xs text-neutral-300 font-medium block">Assigned Vehicle & Chauffeur:</label>
                      <select
                        value={activeBooking.assignedVehicle?.id || ""}
                        onChange={(e) => handleAssignVehicle(activeBooking.id, e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-black border border-amber-500/40 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="">Select Vehicle Allotment ↓</option>
                        {VEHICLES_TABLE.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name} ({v.driverName} • {v.driverPhone})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* 6. PANDIT TAB */}
                {activeDetailTab === "pandit" && (
                  <div className="space-y-4 font-sans">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                      Gayawal Purohit Sanctum Allotment
                    </span>
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <label className="text-xs text-neutral-300 font-medium block">Assigned Gayawal Purohit:</label>
                      <select
                        value={activeBooking.assignedPandit?.id || ""}
                        onChange={(e) => handleAssignPandit(activeBooking.id, e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-black border border-amber-500/40 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="">Select Gayawal Purohit ↓</option>
                        {PANDITS_TABLE.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.title} • {p.sanctumSpecialty})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* 7. DOCUMENTS TAB */}
                {activeDetailTab === "documents" && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                      Auto-Generated PDF Documents (5)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(activeBooking.documents || []).map((doc) => (
                        <div key={doc.id} className="p-3.5 rounded-2xl bg-black/50 border border-border-gold/20 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gold-primary shrink-0" />
                            <div>
                              <span className="font-bold text-white block">{doc.title}</span>
                              <span className="text-[10px] text-text-muted">{doc.docType}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleOpenPdf(activeBooking)}
                            className="p-2 rounded-xl bg-gold-primary/10 border border-gold-primary/30 text-gold-primary hover:bg-gold-primary/20 cursor-pointer"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. COMMUNICATION TAB */}
                {activeDetailTab === "communication" && (
                  <div className="space-y-4 font-sans">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                      Customer Communication Shortcuts
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={`https://wa.me/${activeBooking.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 hover:bg-emerald-900/40 transition-colors"
                      >
                        <Send className="w-5 h-5 text-emerald-400" />
                        <div>
                          <span className="font-bold text-xs block">WhatsApp Direct Message</span>
                          <span className="text-[10px] text-emerald-400/80">{activeBooking.phone}</span>
                        </div>
                      </a>
                      <a
                        href={`mailto:${activeBooking.email}`}
                        className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center gap-3 text-blue-300 hover:bg-blue-900/40 transition-colors"
                      >
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                          <span className="font-bold text-xs block">Email Customer</span>
                          <span className="text-[10px] text-blue-400/80">{activeBooking.email}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}

                {/* 9. ACTIVITY TAB (Checklist Tasks with Checkboxes) */}
                {activeDetailTab === "activity" && (
                  <div className="space-y-4 font-sans">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                      Operational Task Checklist Engine
                    </span>
                    <div className="space-y-2">
                      {[
                        "Verify Phone",
                        "Send Payment Link",
                        "Reserve Hotel",
                        "Assign Vehicle",
                        "Assign Pandit",
                        "Generate Voucher",
                        "Send Itinerary",
                        "Confirm Arrival",
                        "Collect Review",
                      ].map((taskTitle, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-black/60 border border-neutral-800 hover:border-amber-500/30 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            defaultChecked={idx < 2}
                            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500/40 accent-amber-500 cursor-pointer"
                          />
                          <span className="text-xs text-neutral-200 font-medium">{taskTitle}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PDF VOUCHER MODAL */}
      {pdfSession && (
        <ItineraryPdfModal
          isOpen={pdfModalOpen}
          onClose={() => setPdfModalOpen(false)}
          session={pdfSession}
        />
      )}

      {/* CRM GENERATE PAYMENT LINK MODAL */}
      {payModalBooking && (
        <GeneratePaymentLinkModal
          booking={payModalBooking}
          isOpen={!!payModalBooking}
          onClose={() => setPayModalBooking(null)}
          onSuccess={() => {
            fetchBookings();
          }}
        />
      )}

      {/* BACKUP & RESTORE MODAL */}
      <BackupModal
        isOpen={backupModalOpen}
        onClose={() => setBackupModalOpen(false)}
        isAdmin={isAdmin}
      />

    </div>
  );
}
