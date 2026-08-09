"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Download, ChevronLeft, ChevronRight, CheckSquare, Square, Filter } from "lucide-react";

export interface BookingRow {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  packageName: string;
  amount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export interface AdminDataTableProps {
  data: BookingRow[];
  onBulkStatusUpdate?: (bookingIds: string[], status: string) => Promise<void>;
}

export default function AdminDataTable({ data, onBulkStatusUpdate }: AdminDataTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [updating, setUpdating] = useState<boolean>(false);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchStatus = statusFilter === "ALL" || row.status === statusFilter;
      const matchPayment = paymentFilter === "ALL" || row.paymentStatus === paymentFilter;
      return matchStatus && matchPayment;
    });
  }, [data, statusFilter, paymentFilter]);

  // Pagination math
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Reset page when filter changes
  const [prevFilterKey, setPrevFilterKey] = useState(`${statusFilter}|${paymentFilter}|${pageSize}`);
  if (prevFilterKey !== `${statusFilter}|${paymentFilter}|${pageSize}`) {
    setPrevFilterKey(`${statusFilter}|${paymentFilter}|${pageSize}`);
    setCurrentPage(1);
  }

  const exportToCsv = React.useCallback(() => {
    const exportRows = selectedIds.size > 0
      ? filteredData.filter((r) => selectedIds.has(r.id))
      : filteredData;

    const headers = ["Booking Ref", "Customer", "Phone", "Package", "Amount (INR)", "Status", "Payment", "Created Date"];
    const csvLines = [
      headers.join(","),
      ...exportRows.map((r) =>
        [
          `"${r.bookingNumber}"`,
          `"${r.customerName}"`,
          `"${r.customerPhone}"`,
          `"${r.packageName}"`,
          r.amount,
          `"${r.status}"`,
          `"${r.paymentStatus}"`,
          `"${r.createdAt}"`,
        ].join(",")
      ),
    ];

    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedIds, filteredData]);

  // Hotkey handlers (Ctrl+Shift+E -> Export CSV, Esc -> Deselect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        exportToCsv();
      }
      if (e.key === "Escape") {
        setSelectedIds(new Set());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [exportToCsv]);

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedData.map((r) => r.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleBulkUpdate = async (status: string) => {
    if (selectedIds.size === 0 || !onBulkStatusUpdate) return;
    setUpdating(true);
    try {
      await onBulkStatusUpdate(Array.from(selectedIds), status);
      setSelectedIds(new Set());
    } catch (err) {
      console.error("Bulk update failed:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Toolbar & Multi-Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl bg-slate-900 border border-slate-800 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Filter className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-medium">Filter:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="lead">Lead</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_journey">In Journey</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          {selectedIds.size > 0 && onBulkStatusUpdate && (
            <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
              <span className="text-xs font-semibold text-amber-400">{selectedIds.size} Selected</span>
              <button
                disabled={updating}
                onClick={() => handleBulkUpdate("confirmed")}
                className="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded"
              >
                Mark Confirmed
              </button>
              <button
                disabled={updating}
                onClick={() => handleBulkUpdate("completed")}
                className="text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded"
              >
                Mark Completed
              </button>
            </div>
          )}

          <button
            onClick={exportToCsv}
            className="flex items-center space-x-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-amber-400" />
            <span>Export CSV</span>
            <kbd className="hidden md:inline-block ml-1 rounded bg-slate-900 px-1 py-0.5 font-mono text-[9px] text-slate-400">Ctrl+Shift+E</kbd>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4 w-10">
                <button onClick={toggleSelectAll}>
                  {selectedIds.size > 0 && selectedIds.size === paginatedData.length ? (
                    <CheckSquare className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-500" />
                  )}
                </button>
              </th>
              <th className="p-4">Booking Ref</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Package</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-500 text-xs">
                  No matching bookings found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <tr key={row.id} className={`hover:bg-slate-800/50 transition-colors ${isSelected ? "bg-amber-500/5" : ""}`}>
                    <td className="p-4">
                      <button onClick={() => toggleSelectRow(row.id)}>
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-amber-400" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-600" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 font-mono font-semibold text-amber-400">{row.bookingNumber}</td>
                    <td className="p-4">
                      <div className="font-medium text-slate-100">{row.customerName}</div>
                      <div className="text-xs text-slate-500">{row.customerPhone}</div>
                    </td>
                    <td className="p-4 text-slate-300">{row.packageName}</td>
                    <td className="p-4 font-semibold text-slate-100">₹{row.amount.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        row.status === "confirmed" ? "bg-emerald-500/20 text-emerald-400" :
                        row.status === "completed" ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-400"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        row.paymentStatus === "paid" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {row.paymentStatus}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-400 px-2">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded bg-slate-900 border border-slate-800 px-2 py-1 text-slate-200 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-4">
            Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
