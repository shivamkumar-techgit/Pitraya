"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Archive,
  Download,
  Upload,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Database,
  FileArchive,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { BackupFileInfo } from "@/lib/backup/storage";

export interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export default function BackupModal({ isOpen, onClose, isAdmin = true }: BackupModalProps) {
  const [backups, setBackups] = useState<BackupFileInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedFileForRestore, setSelectedFileForRestore] = useState<File | null>(null);

  const fetchBackups = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/backup");
      const data = await res.json();
      if (data.success && Array.isArray(data.backups)) {
        setBackups(data.backups);
      }
    } catch (err) {
      console.error("Failed to fetch backups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        fetchBackups();
        setStatusMsg(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTriggerBackup = async () => {
    if (!isAdmin) return;
    setActionLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/admin/backup", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: `Backup '${data.backup.filename}' generated successfully!` });
        fetchBackups();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to trigger backup" });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error creating backup archive" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestoreFromExisting = async (filename: string) => {
    if (!isAdmin) return;
    if (!confirm(`Are you sure you want to restore database from '${filename}'? Current data will be synced with backup snapshot.`)) {
      return;
    }

    setActionLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/admin/backup/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({
          type: "success",
          text: `Database restored successfully! ${data.result.counts.bookings} bookings, ${data.result.counts.customers} customers synced.`,
        });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to restore backup" });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error restoring database from backup" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUploadAndRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !selectedFileForRestore) return;

    if (!confirm(`Restore database from uploaded file '${selectedFileForRestore.name}'?`)) {
      return;
    }

    setActionLoading(true);
    setStatusMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFileForRestore);

      const res = await fetch("/api/admin/backup/restore", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({
          type: "success",
          text: `Database restored from uploaded ZIP successfully!`,
        });
        setSelectedFileForRestore(null);
        fetchBackups();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to restore uploaded backup" });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error uploading and restoring backup file" });
    } finally {
      setActionLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-100 shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Archive className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-serif text-amber-100 flex items-center gap-2">
                  <span>Database Backup Center v1</span>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md uppercase">
                    JSON • ZIP • SHA256
                  </span>
                </h2>
                <p className="text-xs text-neutral-400">
                  Export, download, and restore complete system snapshots.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Status Alert Banner */}
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                  statusMsg.type === "success"
                    ? "bg-emerald-950/50 border-emerald-800/50 text-emerald-200"
                    : "bg-red-950/50 border-red-800/50 text-red-200"
                }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{statusMsg.text}</span>
              </motion.div>
            )}

            {/* Action Card Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Trigger Instant Backup */}
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>Create New Backup</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Exports all 14 database models into a compressed ZIP with SHA-256 integrity hash.
                  </p>
                </div>
                <button
                  onClick={handleTriggerBackup}
                  disabled={actionLoading || !isAdmin}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Archive className="w-4 h-4" />
                  )}
                  <span>Generate Backup Archive</span>
                </button>
              </div>

              {/* Upload & Restore */}
              <form
                onSubmit={handleUploadAndRestore}
                className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Upload & Restore</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Select a local backup `.zip` file to restore database records.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".zip,.json"
                    onChange={(e) => setSelectedFileForRestore(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700"
                  />
                  <button
                    type="submit"
                    disabled={!selectedFileForRestore || actionLoading || !isAdmin}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                  >
                    {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>Restore</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Backups Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-amber-400" />
                  <span>Available Backup Archives ({backups.length})</span>
                </h3>
                <button
                  onClick={fetchBackups}
                  disabled={loading}
                  className="p-1 text-neutral-400 hover:text-neutral-200 transition"
                  title="Refresh backup list"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>

              {loading ? (
                <div className="p-8 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Loading backup archives...</span>
                </div>
              ) : backups.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
                  No backup archives found. Click &quot;Generate Backup Archive&quot; to create your first backup.
                </div>
              ) : (
                <div className="border border-neutral-800 rounded-xl overflow-hidden divide-y divide-neutral-800/60">
                  {backups.map((b) => (
                    <div key={b.filename} className="p-4.5 flex items-center justify-between text-xs hover:bg-neutral-800/40 transition">
                      <div className="flex items-center gap-3">
                        <FileArchive className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                          <p className="font-semibold text-neutral-200 font-mono">{b.filename}</p>
                          <p className="text-[10px] text-neutral-400">
                            Created: {new Date(b.createdAt).toLocaleString()} • Size: {(b.sizeBytes / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`/api/admin/backup/download?file=${encodeURIComponent(b.filename)}`}
                          download
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center gap-1.5 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>

                        {isAdmin && (
                          <button
                            onClick={() => handleRestoreFromExisting(b.filename)}
                            disabled={actionLoading}
                            className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60 font-semibold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Restore</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/50 flex items-center justify-between text-xs text-neutral-500">
            <span>Backup v1 Engine • Pitraya Sacred Concierge</span>
            <button onClick={onClose} className="px-4 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 font-medium">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
