'use client';

import React, { useState } from 'react';
import {
  Inbox,
  Sparkles,
  BookOpen,
  UserCheck,
  BarChart3,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  MessageSquare,
  Building,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  Send,
  PlusCircle,
  RefreshCw
} from 'lucide-react';
import {
  UserSession,
  Ticket,
  GlobalFiltersState,
  IndustryDomain
} from '@/types/chatbot';
import {
  MOCK_INITIAL_TICKETS,
  MOCK_CUSTOMER_360_LIST,
  MOCK_KNOWLEDGE_RECOMMENDATIONS,
  MOCK_AGENT_PERFORMANCE
} from '@/components/service-platform/mockData';
import { GlobalFilterBar } from '@/components/layout/GlobalFilterBar';
import { TicketDetailDrawer } from '@/components/drawers/TicketDetailDrawer';

interface CSAgentWorkspaceProps {
  session: UserSession;
  activeTab: string;
  currentIndustry: IndustryDomain;
  searchQuery: string;
}

export const CSAgentWorkspace: React.FC<CSAgentWorkspaceProps> = ({
  session,
  activeTab,
  currentIndustry,
  searchQuery
}) => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [csatToast, setCsatToast] = useState<string | null>(null);

  // Filters state
  const [filters, setFilters] = useState<GlobalFiltersState>({
    channel: 'all',
    priority: 'all',
    status: 'all',
    aiDecision: 'all',
    searchQuery: searchQuery
  });

  const handleFilterChange = (partial: Partial<GlobalFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters({
      channel: 'all',
      priority: 'all',
      status: 'all',
      aiDecision: 'all',
      searchQuery: ''
    });
  };

  // Agent code of current user (default to 'CS A' if missing)
  const agentCode = session.agentCode || 'CS A';

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    if (filters.channel !== 'all' && t.channel !== filters.channel) return false;
    if (filters.priority !== 'all' && t.priority !== filters.priority) return false;
    if (filters.status !== 'all' && t.status.toLowerCase() !== filters.status.toLowerCase())
      return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const custName = t.customerName || t.customer?.name || '';
      const compName = t.companyName || t.customer?.company || '';
      const complaint = t.customerComplaint || t.initialComplaint || '';
      const match =
        t.ticketNumber.toLowerCase().includes(q) ||
        custName.toLowerCase().includes(q) ||
        compName.toLowerCase().includes(q) ||
        complaint.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Split into "Assigned to me" and "Open / Unassigned Queue"
  const myTickets = filteredTickets.filter((t) => t.assignedAgent === agentCode);
  const unassignedTickets = filteredTickets.filter(
    (t) => !t.assignedAgent || t.assignedAgent === 'Unassigned' || t.assignedAgent !== agentCode
  );

  const handleOpenTicket = (t: Ticket) => {
    setSelectedTicket(t);
    setIsDrawerOpen(true);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'Resolved' } : t))
    );
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) => (prev ? { ...prev, status: 'Resolved' } : null));
    }
  };

  const handleClaimTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignedAgent: agentCode } : t))
    );
  };

  // Find agent's private performance record
  const myPerformance =
    MOCK_AGENT_PERFORMANCE.find((a) => a.agentCode === agentCode) ||
    MOCK_AGENT_PERFORMANCE[0];

  // CSAT Survey Simulator
  const handleSimulateCsat = () => {
    setCsatToast(`★ 5.0 Rating CSAT baru diterima dari PT Mega Solusi Nusantara!`);
    setTimeout(() => setCsatToast(null), 4000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Toast Notification */}
      {csatToast && (
        <div className="absolute top-16 right-6 z-40 flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg animate-in slide-in-from-top duration-300">
          <Star className="h-4 w-4 fill-white" />
          <span>{csatToast}</span>
        </div>
      )}

      {/* Global Compact Filter Bar */}
      <GlobalFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResultsCount={tickets.length}
        filteredCount={filteredTickets.length}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* TAB 1: OMNICHANNEL INBOX */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            {/* Quick Stats Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Tiket Saya ({agentCode})</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {myTickets.length}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Aktif
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Antrean Terbuka</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {unassignedTickets.length}
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    Queue
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">SLA Met Hari Ini</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {myPerformance.slaAdherencePct}%
                  </span>
                  <span className="text-[10px] text-slate-400">Target &gt;90%</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">CSAT Score Saya</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-amber-500">
                    ★ {myPerformance.csatScore.toFixed(1)}
                  </span>
                  <button
                    onClick={handleSimulateCsat}
                    className="text-[9px] text-indigo-600 hover:underline cursor-pointer"
                    title="Simulasikan rating CSAT pelanggan masuk"
                  >
                    Simulasi CSAT
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 1: TICKETS ASSIGNED TO CURRENT AGENT */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Ditugaskan ke Saya ({agentCode})
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400">
                  {myTickets.length} tiket perlu respon
                </span>
              </div>

              {myTickets.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400 dark:border-slate-800">
                  Tidak ada tiket aktif yang ditugaskan kepada Anda saat ini.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {myTickets.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleOpenTicket(t)}
                      className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-indigo-500 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {t.ticketNumber}
                          </span>
                          <span
                            className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                              t.priority === 'Urgent'
                                ? 'bg-rose-50 text-rose-600 border-rose-200'
                                : t.priority === 'High'
                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                : 'bg-blue-50 text-blue-600 border-blue-200'
                            }`}
                          >
                            {t.priority} {t.priority === 'Urgent' ? '(Case A)' : '(Case B)'}
                          </span>
                        </div>
                        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {t.channel}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 mb-1">
                        {t.customerName} · <span className="font-normal text-slate-500">{t.companyName}</span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3 leading-relaxed font-sans">
                        {t.customerComplaint}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                          <span>SLA: {t.slaRemainingMinutes} mnt</span>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform">
                          <span>Buka Tiket & Copilot</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 2: OPEN / UNASSIGNED QUEUE */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-500" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Antrean Terbuka / Delegasi Tim ({unassignedTickets.length})
                  </h2>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-850 text-[11px] font-semibold text-slate-500">
                    <tr>
                      <th className="py-2.5 px-3">No. Tiket</th>
                      <th className="py-2.5 px-3">Pelanggan & Korporasi</th>
                      <th className="py-2.5 px-3">Channel</th>
                      <th className="py-2.5 px-3">Prioritas & Triage AI</th>
                      <th className="py-2.5 px-3">SLA Sisa</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {unassignedTickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {t.ticketNumber}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {t.customerName}
                          </div>
                          <div className="text-[11px] text-slate-400">{t.companyName}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                          {t.channel}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                t.priority === 'Urgent'
                                  ? 'bg-rose-50 text-rose-600'
                                  : t.priority === 'High'
                                  ? 'bg-amber-50 text-amber-600'
                                  : 'bg-blue-50 text-blue-600'
                              }`}
                            >
                              {t.priority}
                            </span>
                            {t.aiClassification?.recommendedRouting && (
                              <span className="text-[10px] text-slate-400">
                                → Rekomendasi: {t.aiClassification.recommendedRouting}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-500 font-mono">
                          {t.slaRemainingMinutes} menit
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => handleClaimTicket(t.id)}
                            className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300"
                          >
                            Klaim ke Saya
                          </button>
                          <button
                            onClick={() => handleOpenTicket(t)}
                            className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AGENT ASSIST & COPILOT */}
        {activeTab === 'copilot' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Agent Assist Copilot Workspace</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Asisten AI untuk merumuskan balasan terstandarisasi, analisis tiket, dan cek kepatuhan SOP.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Template Balasan Cepat (Canned Responses)
                </span>
                <div className="space-y-2 text-xs">
                  <div className="rounded-lg border border-slate-200 p-2.5 hover:border-indigo-400 cursor-pointer">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Konfirmasi Settlement VA BCA / Mandiri
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      &ldquo;Yth. Bapak/Ibu, pembayaran Anda telah terverifikasi di payment gateway kami. Akun Onebox telah aktif kembali...&rdquo;
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-2.5 hover:border-indigo-400 cursor-pointer">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Troubleshoot Telephony SIP Trunk Error 503
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      &ldquo;Mohon periksa firewall port 5060 UDP dan DNS resolver IP PBX CiptadraSoft sesuai panduan panduan berikut...&rdquo;
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-2.5 hover:border-indigo-400 cursor-pointer">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Permohonan Termin Pembayaran Faktur Pajak
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      &ldquo;Pengajuan termin faktur pajak 30 hari telah kami teruskan ke tim finance untuk diterbitkan e-faktur resmi...&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20 space-y-3">
                <span className="text-xs font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  Rekomendasi Cerdas AI
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Buka salah satu tiket di Kotak Masuk untuk memicu generasi jawaban otomatis secara kontekstual yang disesuaikan dengan profil pelanggan dan histori percakapan.
                </p>
                <div className="rounded-lg bg-white p-3 text-xs shadow-2xs dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Tips Efisiensi Agen:
                  </span>
                  <ul className="mt-1 space-y-1 text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside">
                    <li>Gunakan tombol &lsquo;Terapkan ke Balasan&rsquo; pada drawer tiket.</li>
                    <li>Periksa kembali angka nominal invoice sebelum menekan kirim.</li>
                    <li>SLA tiket kategori Urgent dihitung maksimal 60 menit respon pertama.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KNOWLEDGE BASE */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Pusat Dokumen & SOP Resmi (Onebox & CiptadraSoft)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Pencarian artikel panduan pemecahan masalah, konfigurasi modul, dan petunjuk integrasi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_KNOWLEDGE_RECOMMENDATIONS.map((kb) => (
                <div
                  key={kb.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {kb.category}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      {kb.relevanceScore}% Relevan
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    {kb.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {kb.summary}
                  </p>
                  <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      Snippet Respon SOP:
                    </span>
                    <p className="mt-0.5 italic line-clamp-2">
                      &ldquo;{kb.recommendedReplySnippet}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER 360 */}
        {activeTab === 'customer360' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Database Customer 360 Enterprise</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Riwayat kontrak, status tier akun korporasi, dan skor kepuasan pelanggan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_CUSTOMER_360_LIST.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {c.name}
                      </h3>
                      <p className="text-xs text-slate-500">{c.company}</p>
                    </div>
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200">
                      {c.tier || c.slaTier}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">Total Nilai</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        {c.totalValue || 'Rp 450 Jt/Thn'}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">NPS Score</span>
                      <p className="font-semibold text-emerald-600 mt-0.5">{c.nps || 72}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">Sisa Kontrak</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        {c.contractRemainingMonths || 8} Bln
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Produk Aktif:
                    </span>{' '}
                    {(c.activeProducts || c.productsInUse || []).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MY PERFORMANCE */}
        {activeTab === 'my_performance' && (
          <div className="space-y-5 max-w-4xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span>Scorecard & Metrik Pribadi Agen ({session.name} - {agentCode})</span>
              </h2>
              <p className="text-xs text-slate-500">
                Pencapaian target pelayanan individu, FCR, ketaatan SLA, dan evaluasi kepuasan nasabah.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-[11px] text-slate-500">SLA Adherence</span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {myPerformance.slaAdherencePct}%
                </p>
                <span className="text-[10px] text-slate-400">Target &gt; 90%</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-[11px] text-slate-500">FCR (First Contact Resolution)</span>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                  {myPerformance.fcrPct}%
                </p>
                <span className="text-[10px] text-slate-400">Target &gt; 80%</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-[11px] text-slate-500">Average Handling Time</span>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                  {myPerformance.avgHandlingTimeMinutes} m
                </p>
                <span className="text-[10px] text-emerald-600">Optimal</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-[11px] text-slate-500">CSAT Score</span>
                <p className="text-2xl font-bold text-amber-500 mt-1">
                  ★ {myPerformance.csatScore.toFixed(1)}
                </p>
                <span className="text-[10px] text-slate-400">Skala 1 - 5.0</span>
              </div>
            </div>

            {/* AI Coaching recommendation */}
            {myPerformance.coachingRecommendation && (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 dark:text-indigo-300">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Catatan Pembinaan AI untuk Peningkatan Scorecard</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {myPerformance.coachingRecommendation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ticket Detail Drawer */}
      <TicketDetailDrawer
        isOpen={isDrawerOpen}
        ticket={selectedTicket}
        onClose={() => setIsDrawerOpen(false)}
        onResolveTicket={handleResolveTicket}
      />
    </div>
  );
};
