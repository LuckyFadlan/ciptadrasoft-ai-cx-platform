'use client';

import React from 'react';
import { Filter, X, RefreshCw, Check } from 'lucide-react';
import { GlobalFiltersState, SupportChannel, TicketPriority } from '@/types/chatbot';

interface GlobalFilterBarProps {
  filters: GlobalFiltersState;
  onFilterChange: (filters: Partial<GlobalFiltersState>) => void;
  onResetFilters: () => void;
  totalResultsCount?: number;
  filteredCount?: number;
}

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  filteredCount
}) => {
  const channels: { id: SupportChannel | 'all'; label: string }[] = [
    { id: 'all', label: 'Semua Channel' },
    { id: 'WhatsApp', label: 'WhatsApp' },
    { id: 'Webchat', label: 'Webchat' },
    { id: 'Email', label: 'Email' },
    { id: 'Voice', label: 'Telephony (SIP)' }
  ];

  const priorities: { id: TicketPriority | 'all'; label: string }[] = [
    { id: 'all', label: 'Semua Prioritas' },
    { id: 'Urgent', label: 'Urgent (Case A)' },
    { id: 'High', label: 'High (Case B)' },
    { id: 'Medium', label: 'Medium' },
    { id: 'Low', label: 'Low' }
  ];

  const statuses: { id: 'all' | 'open' | 'pending' | 'resolved'; label: string }[] = [
    { id: 'all', label: 'Semua Status' },
    { id: 'open', label: 'Baru / Open' },
    { id: 'pending', label: 'Dalam Penanganan' },
    { id: 'resolved', label: 'Terselesaikan' }
  ];

  const isFiltered =
    filters.channel !== 'all' ||
    filters.priority !== 'all' ||
    filters.status !== 'all' ||
    filters.aiDecision !== 'all' ||
    filters.searchQuery !== '';

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/60 px-4 py-2 dark:border-slate-800 dark:bg-slate-900/40 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium mr-1">
          <Filter className="h-3.5 w-3.5" />
          <span className="text-[11px]">Filter Cepat:</span>
        </div>

        {/* Channel pills */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onFilterChange({ channel: ch.id })}
              className={`rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                filters.channel === ch.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Priority select */}
        <select
          value={filters.priority}
          onChange={(e) => onFilterChange({ priority: e.target.value as any })}
          className="h-7 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 hover:border-slate-300 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {priorities.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Status select */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value as any })}
          className="h-7 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 hover:border-slate-300 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {statuses.map((st) => (
            <option key={st.id} value={st.id}>
              {st.label}
            </option>
          ))}
        </select>

        {/* Reset filter button if active */}
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-[10px] font-medium text-rose-600 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400"
          >
            <X className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Result counter */}
      {totalResultsCount !== undefined && (
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          Menampilkan{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {filteredCount ?? totalResultsCount}
          </span>{' '}
          dari <span className="font-semibold text-slate-800 dark:text-slate-200">{totalResultsCount}</span> entri
        </div>
      )}
    </div>
  );
};
