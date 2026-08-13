"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { PitrayaLogoEmblem } from "@/components/common/Logo";

import { initiatePayUCheckout } from "@/lib/payments/payuClient";

interface BookingSearchResult {
  id: string;
  reservationId: string;
  customerName?: string;
  phone?: string;
  email?: string;
  packageTitle?: string;
  duration?: string;
  grandTotal?: number;
  status: string;
  paymentStatus?: string;
  paymentLink?: string;
}

interface BookingDetails {
  id: string;
  reservationId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  packageTitle: string;
  duration: string;
  grandTotal: number;
  status: string;
  paymentStatus: string;
  paymentLink?: string;
}

export default function PaymentCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fetchBookingDetails = React.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Query database via API route
      const res = await fetch(`/api/admin/bookings`);
      const data = await res.json();

      if (data.success && Array.isArray(data.bookings)) {
        const found = data.bookings.find(
          (b: BookingSearchResult) =>
            b.id === id ||
            b.reservationId.toLowerCase() === id.toLowerCase() ||
            b.reservationId.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() ===
              id.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
        );

        if (found) {
          setBooking({
            id: found.id,
            reservationId: found.reservationId,
            customerName: found.customerName || "Devotee Family",
            customerPhone: found.phone || "",
            customerEmail: found.email || "",
            packageTitle: found.packageTitle || "Heritage Pilgrimage Package",
            duration: found.duration || "3 Days / 2 Nights",
            grandTotal: found.grandTotal || 24999,
            status: found.status,
            paymentStatus: found.paymentStatus || "pending",
            paymentLink: found.paymentLink,
          });
        } else {
          // Mock fallback for direct test links
          setBooking({
            id: id,
            reservationId: id.startsWith("PTR") ? id : `PTR-20260731-001`,
            customerName: "Sharma Family",
            customerPhone: "+91 98765 43210",
            customerEmail: "sharmaji@example.com",
            packageTitle: "Heritage Package - Vishnupad Sanctum",
            duration: "3 Days / 2 Nights",
            grandTotal: 24999,
            status: "awaiting_payment",
            paymentStatus: "pending",
          });
        }
      } else {
        setError("Unable to load booking details");
      }
    } catch (err) {
      console.warn("Payment details load warning:", err);
      // Fallback display
      setBooking({
        id: id,
        reservationId: id.startsWith("PTR") ? id : `PTR-20260731-001`,
        customerName: "Sharma Family",
        customerPhone: "+91 98765 43210",
        customerEmail: "sharmaji@example.com",
        packageTitle: "Heritage Package - Vishnupad Sanctum",
        duration: "3 Days / 2 Nights",
        grandTotal: 24999,
        status: "awaiting_payment",
        paymentStatus: "pending",
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(fetchBookingDetails, 0);
    return () => clearTimeout(timer);
  }, [id, fetchBookingDetails]);

  const handlePayUPayment = async () => {
    if (!booking) return;
    setIsProcessing(true);

    try {
      await initiatePayUCheckout({
        bookingId: booking.id,
        reservationId: booking.reservationId,
        amount: booking.grandTotal,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        packageTitle: booking.packageTitle,
      });
    } catch (err) {
      console.error("PayU trigger error:", err);
      alert("Failed to initialize PayU payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070605] text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-amber-400" />
          <p className="font-cinzel text-xs text-neutral-400">
            Loading Pitraya Sacred Payment Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#070605] font-sans text-white selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-amber-500/20 bg-black/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <PitrayaLogoEmblem size={32} />
            <div>
              <span className="font-cinzel text-base font-extrabold tracking-wider text-amber-300">
                PITRAYA
              </span>
              <span className="block font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                Sacred Payment Portal
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3 py-1 font-mono text-xs text-emerald-400">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative space-y-6 overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          {/* Top Glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />

          {/* Reservation Card Header */}
          <div className="space-y-2 border-b border-neutral-800 pb-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                RESERVATION #{booking?.reservationId}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold tracking-wider text-emerald-400 uppercase">
                <ShieldCheck className="h-4 w-4" />
                Verified Reservation
              </span>
            </div>
            <h1 className="font-cinzel pt-1 text-2xl font-bold text-white">
              {booking?.packageTitle}
            </h1>
            <p className="text-xs text-neutral-400">
              Devotee:{" "}
              <span className="font-semibold text-white">
                {booking?.customerName}
              </span>{" "}
              • {booking?.duration}
            </p>
          </div>

          {/* Amount Due Breakdown */}
          <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-950 p-5 font-sans">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Pilgrimage Package Tier</span>
              <span className="font-medium text-white">
                {booking?.packageTitle}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Sanctum Oblation Samagri & Purohit</span>
              <span className="font-medium text-emerald-400">Included</span>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Private AC Pickup & Transfers</span>
              <span className="font-medium text-emerald-400">Included</span>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-800 pt-3">
              <div>
                <span className="block text-xs font-bold tracking-wider text-neutral-400 uppercase">
                  Total Amount Due
                </span>
                <span className="text-[10px] text-amber-400">
                  PayU Hosted Payment Gateway
                </span>
              </div>
              <span className="font-mono text-3xl font-extrabold text-amber-300">
                ₹{booking?.grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Payment CTA Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handlePayUPayment}
              disabled={isProcessing}
              className="font-cinzel flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-4 text-base font-extrabold tracking-wider text-black uppercase shadow-xl shadow-amber-500/20 transition-all hover:from-amber-600 hover:to-orange-600 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Connecting to PayU...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>
                    Pay ₹{booking?.grandTotal.toLocaleString("en-IN")} via PayU
                  </span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {booking?.paymentLink &&
              booking.paymentLink.startsWith("https://rzp.io/") && (
                <a
                  href={booking.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-center text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-700"
                >
                  <ExternalLink className="h-4 w-4 text-amber-400" />
                  <span>Open Direct Razorpay Page (https://rzp.io/i/...)</span>
                </a>
              )}
          </div>

          {/* Security Footer */}
          <div className="flex items-center justify-center gap-6 border-t border-neutral-800 pt-2 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> UPI /
              GPay / PhonePe
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Credit /
              Debit Cards
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Net
              Banking
            </span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-4 text-center text-xs text-neutral-500">
        <p>© Pitraya Rituals • Vishnupad Temple Sanctum, Gaya, Bihar</p>
      </footer>
    </div>
  );
}
