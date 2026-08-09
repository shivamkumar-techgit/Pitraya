"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Clock, CheckCircle2, User, Phone, MapPin, AlertCircle, RefreshCw } from "lucide-react";

interface BookingTaskItem {
  id: string;
  title: string;
  status: string;
  description?: string;
  reservationId: string;
  customerName?: string;
  customerPhone?: string;
}

interface RecentBookingItem {
  reservationId: string;
  customer?: { name?: string; phone?: string };
  tasks?: BookingTaskItem[];
}

export default function CoordinatorTasksPage() {
  const [tasks, setTasks] = useState<BookingTaskItem[]>([]);;
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      if (res.ok && json.success) {
        const allBookings = json.data?.recentBookings || [];
        const taskList: BookingTaskItem[] = [];
        allBookings.forEach((b: RecentBookingItem) => {
          (b.tasks || []).forEach((t) => {
            taskList.push({ ...t, reservationId: b.reservationId, customerName: b.customer?.name, customerPhone: b.customer?.phone });
          });
        });
        setTasks(taskList);
      }
    } catch {
      // Ignore fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchTasks, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = async (taskId: string, currentStatus: string) => {
    setUpdatingId(taskId);
    const nextStatus = currentStatus === "pending" ? "in_progress" : currentStatus === "in_progress" ? "completed" : "pending";

    try {
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t)));
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto text-text-primary">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif flex items-center gap-2">
            <CheckSquare className="w-7 h-7 text-accent-gold" /> Coordinator Field Operations & Tasks
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Real-time ritual task management, pandit assignments, and devotee arrival tracking.
          </p>
        </div>
        <button
          onClick={fetchTasks}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-surface border border-border hover:border-accent-gold text-text-primary text-sm font-medium flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-accent-gold"
        >
          <RefreshCw className={`w-4 h-4 text-accent-gold ${loading ? "animate-spin" : ""}`} /> Refresh Operations
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div className="glass-panel p-5 rounded-2xl border border-border bg-surface/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="font-semibold text-sm flex items-center gap-2 text-amber-400">
              <Clock className="w-4 h-4" /> Pending Action ({pendingTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((t) => (
              <TaskCard key={t.id} task={t} onUpdate={handleStatusChange} updatingId={updatingId} />
            ))}
            {pendingTasks.length === 0 && <EmptyColumnState label="No pending tasks" />}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="glass-panel p-5 rounded-2xl border border-border bg-surface/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="font-semibold text-sm flex items-center gap-2 text-sky-400">
              <RefreshCw className="w-4 h-4" /> In Ceremony ({inProgressTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map((t) => (
              <TaskCard key={t.id} task={t} onUpdate={handleStatusChange} updatingId={updatingId} />
            ))}
            {inProgressTasks.length === 0 && <EmptyColumnState label="No active ceremonies" />}
          </div>
        </div>

        {/* Completed Column */}
        <div className="glass-panel p-5 rounded-2xl border border-border bg-surface/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="font-semibold text-sm flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Completed ({completedTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {completedTasks.map((t) => (
              <TaskCard key={t.id} task={t} onUpdate={handleStatusChange} updatingId={updatingId} />
            ))}
            {completedTasks.length === 0 && <EmptyColumnState label="No completed tasks yet" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, onUpdate, updatingId }: { task: BookingTaskItem; onUpdate: (id: string, s: string) => void; updatingId: string | null }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 rounded-xl bg-surface border border-border/80 space-y-2.5 shadow-sm hover:border-accent-gold/50 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono font-semibold text-accent-gold">{task.reservationId}</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface border border-border text-text-secondary uppercase">
          {task.status}
        </span>
      </div>
      <div className="text-sm font-semibold text-text-primary">{task.title}</div>
      {task.description && <div className="text-xs text-text-secondary">{task.description}</div>}
      <div className="text-xs text-text-secondary flex items-center gap-2 pt-2 border-t border-border/50">
        <User className="w-3.5 h-3.5 text-accent-gold" /> {task.customerName} ({task.customerPhone})
      </div>
      <button
        onClick={() => onUpdate(task.id, task.status)}
        disabled={updatingId === task.id}
        className="w-full mt-2 py-1.5 rounded-lg bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30 transition-all"
      >
        Advance Progress
      </button>
    </motion.div>
  );
}

function EmptyColumnState({ label }: { label: string }) {
  return <div className="p-6 text-center text-xs text-text-secondary border border-dashed border-border rounded-xl">{label}</div>;
}
