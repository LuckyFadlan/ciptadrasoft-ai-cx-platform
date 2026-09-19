'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  LifeBuoy,
  HelpCircle,
  Calendar,
  MessageSquare,
  HeartHandshake,
  BarChart3,
  Search,
  Upload,
  CheckCircle,
  FileText,
  Download,
  Send,
  Plus,
  ArrowRight,
  Sparkles,
  Bot,
  Clock,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import {
  UserSession,
  IndustryDomain,
  Ticket,
  CustomerInvoice,
  ServiceBooking,
  CommunityForumPost,
  FeedbackSubmission
} from '@/types/chatbot';
import {
  MOCK_CUSTOMER_INVOICES,
  MOCK_SERVICE_BOOKINGS,
  MOCK_COMMUNITY_POSTS,
  MOCK_FEEDBACK_SUBMISSIONS,
  MOCK_INITIAL_TICKETS,
  MOCK_KNOWLEDGE_RECOMMENDATIONS
} from '@/components/service-platform/mockData';

interface CustomerSelfServicePortalProps {
  session: UserSession;
  activeTab: string;
  currentIndustry: IndustryDomain;
  searchQuery: string;
}

export const CustomerSelfServicePortal: React.FC<CustomerSelfServicePortalProps> = ({
  session,
  activeTab,
  currentIndustry,
  searchQuery
}) => {
  // Invoices state
  const [invoices] = useState<CustomerInvoice[]>(MOCK_CUSTOMER_INVOICES);

  // Tickets state
  const [myTickets, setMyTickets] = useState<Ticket[]>(
    MOCK_INITIAL_TICKETS.filter(
      (t) =>
        (t.customerName || t.customer?.name || '').includes('Budi') ||
        (t.companyName || t.customer?.company || '').includes('Mega')
    )
  );
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('Technical Issue');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [ticketToast, setTicketToast] = useState<string | null>(null);

  // Cost calculator state
  const [calcAgents, setCalcAgents] = useState(5);
  const [calcChannels, setCalcChannels] = useState(3);
  const [calcAiAssist, setCalcAiAssist] = useState(true);

  // Community posts & Feedback
  const [posts, setPosts] = useState<CommunityForumPost[]>(MOCK_COMMUNITY_POSTS);
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>(MOCK_FEEDBACK_SUBMISSIONS);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState<'Feature Request' | 'Usability' | 'Bug Report' | 'Praise'>('Feature Request');

  // Bookings state
  const [bookings, setBookings] = useState<ServiceBooking[]>(MOCK_SERVICE_BOOKINGS);

  // Calculate monthly cost in IDR
  const monthlyCost =
    calcAgents * 450000 +
    calcChannels * 300000 +
    (calcAiAssist ? 750000 : 0);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject || !newTicketMessage) return;

    const newTicket: Ticket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: {
        name: session.name,
        email: session.email,
        company: 'PT Mega Solusi Nusantara',
        phone: '+62 812-3456-7890'
      },
      customerName: session.name,
      companyName: 'PT Mega Solusi Nusantara',
      channel: 'Webchat',
      priority: newTicketCategory === 'Technical Issue' ? 'Urgent' : 'High',
      status: 'open',
      category: newTicketCategory,
      classification: {
        category: (newTicketCategory as any) || 'Technical Support',
        priority: newTicketCategory === 'Technical Issue' ? 'Urgent' : 'High',
        department: 'Customer Success',
        slaHours: 2,
        sentiment: 'Neutral',
        urgencyScore: 70,
        summary: newTicketSubject,
        reasoning: 'Tiket baru dari portal mandiri',
        confidenceScore: 0.95
      },
      initialComplaint: `${newTicketSubject} - ${newTicketMessage}`,
      customerComplaint: `${newTicketSubject} - ${newTicketMessage}`,
      slaRemainingMinutes: 60,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [
        {
          id: `m-init-${Date.now()}`,
          sender: 'customer',
          senderName: session.name,
          content: newTicketMessage,
          text: newTicketMessage,
          timestamp: Date.now()
        }
      ]
    };

    setMyTickets([newTicket, ...myTickets]);
    setShowNewTicketModal(false);
    setNewTicketSubject('');
    setNewTicketMessage('');
    setTicketToast(`Tiket #${newTicket.ticketNumber} berhasil dibuat dan dikirim ke antrean CS!`);
    setTimeout(() => setTicketToast(null), 4000);
  };

  const handleUpvoteFeedback = (id: string) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, votes: f.votes + 1 } : f))
    );
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newFb: FeedbackSubmission = {
      id: `fb-${Date.now()}`,
      customerName: session.name,
      category: feedbackCategory,
      content: feedbackText,
      timestamp: Date.now(),
      votes: 1
    };

    setFeedbacks([newFb, ...feedbacks]);
    setFeedbackText('');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Toast */}
      {ticketToast && (
        <div className="absolute top-16 right-6 z-40 flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg animate-in slide-in-from-top duration-300">
          <CheckCircle className="h-4 w-4" />
          <span>{ticketToast}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* TAB 1: AKUN & TAGIHAN */}
        {activeTab === 'portal_account' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Customer Profile & Subscriptions */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                    {session.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {session.name}
                    </h2>
                    <p className="text-xs text-slate-500">PT Mega Solusi Nusantara · Enterprise Tier</p>
                  </div>
                </div>
                <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200">
                  Langganan Aktif
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                  <span className="text-[11px] text-slate-400">Paket Layanan</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                    Onebox Omnichannel Enterprise + AI
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                  <span className="text-[11px] text-slate-400">Lisensi Agen CS</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                    10 User Aktif
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                  <span className="text-[11px] text-slate-400">Jatuh Tempo Berikutnya</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                    15 Oktober 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Invoices List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-indigo-600" />
                  <span>Riwayat Tagihan & Faktur Pajak</span>
                </h3>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-850 text-[11px] font-semibold text-slate-500">
                    <tr>
                      <th className="py-2.5 px-3">No. Faktur</th>
                      <th className="py-2.5 px-3">Layanan</th>
                      <th className="py-2.5 px-3">Tanggal</th>
                      <th className="py-2.5 px-3">Jumlah</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Unduh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                          {inv.product}
                        </td>
                        <td className="py-3 px-3 text-slate-500">{inv.date}</td>
                        <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                          {inv.amount}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                              inv.status === 'paid'
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {inv.status === 'paid' ? 'LUNAS' : 'PENDING'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => alert(`Mengunduh PDF Faktur ${inv.invoiceNumber}...`)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>PDF</span>
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

        {/* TAB 2: KALKULATOR BIAYA & PEMAKAIAN */}
        {activeTab === 'portal_calculator' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                <span>Simulasi Kalkulator Biaya Lisensi & Pemakaian</span>
              </h2>
              <p className="text-xs text-slate-500">
                Hitung estimasi investasi bulanan untuk penambahan kursi agen, saluran omnichannel, dan fitur GenAI.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs space-y-5 text-xs">
              {/* Sliders */}
              <div className="space-y-2">
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>Jumlah Kursi Agen CS:</span>
                  <span className="text-indigo-600 font-bold">{calcAgents} Agen</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={calcAgents}
                  onChange={(e) => setCalcAgents(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
                />
                <span className="text-[10px] text-slate-400">Rp 450.000 / agen / bulan</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>Saluran Omnichannel (WhatsApp, Voice SIP, Web):</span>
                  <span className="text-indigo-600 font-bold">{calcChannels} Channel</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={calcChannels}
                  onChange={(e) => setCalcChannels(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
                />
                <span className="text-[10px] text-slate-400">Rp 300.000 / channel / bulan</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Paket Add-on Generative AI Agent Assist
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Termasuk Speech Analytics & AI Automatic Triage
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={calcAiAssist}
                  onChange={(e) => setCalcAiAssist(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {/* Total estimation */}
              <div className="rounded-xl bg-indigo-50/60 p-4 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold">
                  Estimasi Total Investasi Bulanan:
                </span>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  Rp {monthlyCost.toLocaleString('id-ID')}
                  <span className="text-xs text-slate-500 font-normal"> / bulan</span>
                </div>
                <button
                  onClick={() => alert('Permohonan penawaran resmi telah diteruskan ke Account Manager CiptadraSoft!')}
                  className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  Ajukan Penawaran Resmi (Quotation)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TIKET BANTUAN SAYA */}
        {activeTab === 'portal_tickets' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5 text-indigo-600" />
                  <span>Pusat Tiket Dukungan Mandiri</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Kirim permohonan bantuan teknis atau billing dengan lampiran dokumen resmi.
                </p>
              </div>
              <button
                onClick={() => setShowNewTicketModal(true)}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-2xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Buat Tiket Baru</span>
              </button>
            </div>

            {/* List of active tickets */}
            <div className="space-y-3">
              {myTickets.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {t.ticketNumber}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          t.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      SLA Respon: {t.slaRemainingMinutes} menit
                    </span>
                  </div>

                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {t.customerComplaint}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                    <span>Channel: {t.channel}</span>
                    <span>Petugas Penangan: {t.assignedAgent || 'Sedang Ditugaskan AI'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for creating ticket */}
            {showNewTicketModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Buat Tiket Bantuan Baru
                    </h3>
                    <button
                      onClick={() => setShowNewTicketModal(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateTicket} className="space-y-3">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Judul Masalah / Permohonan
                      </label>
                      <input
                        type="text"
                        required
                        value={newTicketSubject}
                        onChange={(e) => setNewTicketSubject(e.target.value)}
                        placeholder="Contoh: Pembayaran VA BCA belum terverifikasi akun"
                        className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Kategori Permintaan
                      </label>
                      <select
                        value={newTicketCategory}
                        onChange={(e) => setNewTicketCategory(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                      >
                        <option value="Technical Issue">Kendala Teknis (SIP Trunk / Telephony)</option>
                        <option value="Billing & Payment">Billing & Pembayaran Virtual Account</option>
                        <option value="Feature Request">Permintaan Fitur Baru</option>
                        <option value="Account Inquiry">Manajemen Akun & Lisensi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Deskripsi Lengkap & Detail Error
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={newTicketMessage}
                        onChange={(e) => setNewTicketMessage(e.target.value)}
                        placeholder="Jelaskan kendala Anda secara spesifik agar tim teknis dapat menyelesaikan lebih cepat..."
                        className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                      />
                    </div>

                    <div className="rounded-lg border border-dashed border-slate-300 p-3 text-center text-slate-500 hover:bg-slate-50 cursor-pointer dark:border-slate-700 dark:hover:bg-slate-800">
                      <Upload className="mx-auto h-5 w-5 text-slate-400 mb-1" />
                      <span className="text-[11px]">Unggah Bukti Bayar / Tangkapan Layar (Opsional)</span>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowNewTicketModal(false)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-indigo-600 px-4 py-1.5 font-semibold text-white hover:bg-indigo-700 shadow-2xs"
                      >
                        Kirim Tiket ke CS
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: KNOWLEDGE BASE & FAQ */}
        {activeTab === 'portal_kb' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-600" />
                <span>Pusat Pengetahuan Mandiri (Knowledge Base)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Temukan jawaban cepat atas pertanyaan konfigurasi umum tanpa perlu menunggu respon agen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_KNOWLEDGE_RECOMMENDATIONS.map((kb) => (
                <div
                  key={kb.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-2 text-xs"
                >
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
                    {kb.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white">{kb.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    {kb.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BOOKING TEKNISI */}
        {activeTab === 'portal_booking' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span>Jadwal Appointment Kunjungan & Implementasi Teknisi</span>
              </h2>
              <p className="text-xs text-slate-500">
                Atur jadwal kedatangan teknisi telekomunikasi on-site di kantor pusat Anda.
              </p>
            </div>

            <div className="space-y-3">
              {bookings.map((bk) => (
                <div
                  key={bk.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {bk.bookingCode}
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                      {bk.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white">{bk.serviceType}</h3>
                  <div className="text-slate-600 dark:text-slate-300 text-[11px]">
                    Jadwal: <strong>{bk.appointmentDate}</strong> · Teknisi Ditugaskan:{' '}
                    <strong>{bk.technicianName}</strong>
                  </div>
                  {bk.notes && <p className="text-slate-500 italic text-[11px]">&ldquo;{bk.notes}&rdquo;</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FORUM KOMUNITAS */}
        {activeTab === 'portal_community' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                <span>Forum Diskusi Pengguna & Best Practices</span>
              </h2>
              <p className="text-xs text-slate-500">
                Berbagi solusi implementasi omnichannel dengan sesama praktisi contact center Indonesia.
              </p>
            </div>

            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                      {post.category}
                    </span>
                    {post.isSolved && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        <CheckCircle className="h-3 w-3" /> Solved
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white">{post.title}</h3>
                  <div className="text-slate-500 text-[11px] flex items-center gap-3">
                    <span>
                      Oleh: <strong>{post.author}</strong> ({post.authorCompany})
                    </span>
                    <span>💬 {post.repliesCount} Jawaban</span>
                    <span>👍 {post.likesCount} Sukai</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: FEEDBACK BOX */}
        {activeTab === 'portal_feedback' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-indigo-600" />
                <span>Kotak Saran & Ide Pengembangan Fitur</span>
              </h2>
              <p className="text-xs text-slate-500">
                Ajukan ide fitur baru untuk Onebox atau dukung saran pengguna lain dengan memberikan vote.
              </p>
            </div>

            {/* Submit form */}
            <form
              onSubmit={handleSubmitFeedback}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3 text-xs"
            >
              <div className="flex gap-2">
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value as any)}
                  className="rounded-lg border border-slate-300 p-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="Feature Request">Permintaan Fitur</option>
                  <option value="Usability">Kemudahan Penggunaan</option>
                  <option value="Bug Report">Laporan Kendala</option>
                  <option value="Praise">Pujian & Apresiasi</option>
                </select>
                <input
                  type="text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Ketik usulan ide fitur baru..."
                  className="flex-1 rounded-lg border border-slate-300 p-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Kirim Saran
                </button>
              </div>
            </form>

            {/* Feedback list */}
            <div className="space-y-2.5">
              {feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 text-xs"
                >
                  <div className="space-y-1">
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {fb.category}
                    </span>
                    <p className="text-slate-900 dark:text-white font-medium">{fb.content}</p>
                    <span className="text-[10px] text-slate-400">Oleh {fb.customerName}</span>
                  </div>

                  <button
                    onClick={() => handleUpvoteFeedback(fb.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{fb.votes}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
