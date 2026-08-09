"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, X, Check, Copy, ExternalLink, Send, Sparkles, Clock, ShieldCheck, Mail, RefreshCw } from "lucide-react";
import { FullBookingRecord } from "@/lib/bookingStore";

interface Props {
  booking: FullBookingRecord;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (paymentLink: string) => void;
}

type PaymentType = "advance" | "full" | "balance";

export default function GeneratePaymentLinkModal({
  booking,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const totalAmount = booking.grandTotal || 24999;
  const advanceAmount = Math.round(totalAmount * 0.5);

  const [paymentType, setPaymentType] = useState<PaymentType>("advance");
  const [amount, setAmount] = useState<number>(advanceAmount);
  const [notes, setNotes] = useState<string>(`Advance for ${booking.packageTitle || "Pilgrimage Package"}`);
  const [expiryDays, setExpiryDays] = useState<number>(3);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (!isOpen) return null;

  const handlePaymentTypeChange = (type: PaymentType) => {
    setPaymentType(type);
    if (type === "advance") {
      setAmount(advanceAmount);
      setNotes(`Advance for ${booking.packageTitle || "Pilgrimage Package"}`);
    } else if (type === "full") {
      setAmount(totalAmount);
      setNotes(`Full Payment for ${booking.packageTitle || "Pilgrimage Package"}`);
    } else if (type === "balance") {
      const balance = totalAmount - advanceAmount;
      setAmount(balance);
      setNotes(`Balance Payment for ${booking.packageTitle || "Pilgrimage Package"}`);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/payments/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.id,
          amount,
          message: notes,
          expiryDays,
        }),
      });

      const data = await res.json();

      if (data.success && data.paymentLink) {
        setGeneratedLink(data.paymentLink);
        setWhatsappUrl(data.whatsappUrl || "");
        if (data.email) {
          setEmailSubject(data.email.subject || "");
          setEmailBody(data.email.body || "");
        }
        if (onSuccess) onSuccess(data.paymentLink);
      } else {
        setErrorMsg(data.error || "Failed to generate Razorpay payment link");
      }
    } catch (err) {
      console.error("Error generating payment link:", err);
      setErrorMsg("Network error generating payment link");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRegenerate = () => {
    setGeneratedLink("");
    setWhatsappUrl("");
    setErrorMsg("");
  };

  const mailtoUrl = `mailto:${booking.email}?subject=${encodeURIComponent(
    emailSubject || `Payment Link for ${booking.packageTitle} (${booking.reservationId})`
  )}&body=${encodeURIComponent(
    emailBody ||
      `Namaste ${booking.customerName},\n\nYour ${booking.packageTitle} booking payment link is ready:\n${generatedLink}\n\nThank you,\nPitraya Concierge Team`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 text-white shadow-2xl overflow-hidden font-sans"
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-200 tracking-wide">PAYMENT REQUEST</h3>
                <p className="text-xs text-neutral-400">Razorpay Link Generator</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Summary Card */}
          <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5 mb-5 grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Booking</span>
              <span className="text-amber-300 font-mono font-bold">{booking.reservationId}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Customer</span>
              <span className="text-white font-medium truncate block">{booking.customerName}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Total Package</span>
              <span className="text-emerald-400 font-bold font-mono">₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {!generatedLink ? (
            /* Form View */
            <form onSubmit={handleGenerate} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-300 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Payment Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Payment Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePaymentTypeChange("advance")}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentType === "advance"
                        ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                        : "bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${paymentType === "advance" ? "border-amber-400 bg-amber-400" : "border-neutral-500"}`} />
                    Advance
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentTypeChange("full")}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentType === "full"
                        ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                        : "bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${paymentType === "full" ? "border-amber-400 bg-amber-400" : "border-neutral-500"}`} />
                    Full Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentTypeChange("balance")}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentType === "balance"
                        ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                        : "bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${paymentType === "balance" ? "border-amber-400 bg-amber-400" : "border-neutral-500"}`} />
                    Balance Payment
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full bg-neutral-800/80 border border-neutral-700 focus:border-amber-500/70 rounded-xl py-2.5 pl-8 pr-4 text-white font-mono font-bold text-sm outline-none transition-colors"
                    placeholder="24999"
                  />
                </div>
              </div>

              {/* Expiry Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Link Expiry
                </label>
                <div className="relative">
                  <select
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="w-full bg-neutral-800/80 border border-neutral-700 focus:border-amber-500/70 rounded-xl py-2.5 px-3.5 text-white text-sm outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value={1}>1 Day (24 Hours)</option>
                    <option value={3}>3 Days (Recommended)</option>
                    <option value={7}>7 Days (1 Week)</option>
                  </select>
                  <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Notes Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Notes / Description
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                  className="w-full bg-neutral-800/80 border border-neutral-700 focus:border-amber-500/70 rounded-xl py-2.5 px-3.5 text-white text-sm outline-none transition-colors"
                  placeholder="Advance for Heritage Package"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-800 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Link
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Generated Link Result View */
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-200">Payment Link Created</h4>
                  <p className="text-xs text-emerald-300/80 mt-0.5">
                    Requested: <span className="font-bold text-white">₹{amount.toLocaleString("en-IN")}</span> ({paymentType.toUpperCase()}) • Valid for {expiryDays} Days
                  </p>
                </div>
              </div>

              {/* Generated Link Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Razorpay Link URL
                </label>
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full bg-neutral-950 border border-amber-500/30 rounded-xl py-2.5 px-3.5 text-xs text-amber-300 font-mono font-semibold select-all outline-none"
                />
              </div>

              {/* 5 Quick Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-medium text-xs rounded-xl transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <a
                  href={mailtoUrl}
                  className="flex items-center justify-center gap-2 py-2.5 bg-blue-600/80 hover:bg-blue-600 border border-blue-500/40 text-white font-medium text-xs rounded-xl transition-all text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>

                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-medium text-xs rounded-xl transition-all text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Link</span>
                </a>
              </div>

              {/* Regenerate & Close Footer */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-3">
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
