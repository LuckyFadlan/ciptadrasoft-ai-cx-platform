'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  AlertCircle,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Share2,
  RefreshCw,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  User,
  Building,
  Phone,
  Mail,
  FileText,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { INITIAL_TICKETS } from './mockData';
import {
  Ticket,
  AgentAssistResult,
  KnowledgeRecommendation,
  TicketSummary,
  PlatformView
} from '@/types/chatbot';

interface AgentWorkspaceProps {
  onSwitchView?: (view: PlatformView) => void;
  selectedTicketId?: string;
}

export const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({
  onSwitchView,
  selectedTicketId
}) => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState<string>(
    selectedTicketId || INITIAL_TICKETS[0].id
  );
  const [filterTab, setFilterTab] = useState<'all' | 'urgent' | 'billing' | 'technical'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active ticket
  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];

  // Composer state
  const [responseText, setResponseText] = useState<string>(
    activeTicket.agentDraftResponse || ''
  );
  const [appliedActions, setAppliedActions] = useState<string[]>(
    activeTicket.appliedActions || []
  );

  // AI Assist state
  const [assistData, setAssistData] = useState<AgentAssistResult | null>(null);
  const [isAssistLoading, setIsAssistLoading] = useState(false);

  // Knowledge recommendations state
  const [recommendations, setRecommendations] = useState<KnowledgeRecommendation[]>([]);
  const [isKnowledgeLoading, setIsKnowledgeLoading] = useState(false);

  // Resolution & Summary state
  const [activeSummary, setActiveSummary] = useState<TicketSummary | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Fetch Agent Assist and Knowledge whenever active ticket changes
  useEffect(() => {
    if (!activeTicket) return;

    setResponseText(activeTicket.agentDraftResponse || '');
    setAppliedActions(activeTicket.appliedActions || []);

    const fetchAssistAndKnowledge = async () => {
      setIsAssistLoading(true);
      setIsKnowledgeLoading(true);

      try {
        // 1. Fetch Agent Assist
        const assistRes = await fetch('/api/agent-assist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            complaint: activeTicket.initialComplaint,
            category: activeTicket.classification.category,
            priority: activeTicket.classification.priority,
            customerName: activeTicket.customer.name,
            companyName: activeTicket.customer.company
          })
        });
        const assistJson = await assistRes.json();
        if (assistJson.assist) {
          setAssistData(assistJson.assist);
          if (!activeTicket.agentDraftResponse) {
            setResponseText(assistJson.assist.suggestedResponse);
          }
        }
      } catch (err) {
        console.error('Error loading agent assist:', err);
      } finally {
        setIsAssistLoading(false);
      }

      try {
        // 2. Fetch Knowledge Recommendations
        const kbRes = await fetch('/api/recommend-knowledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: activeTicket.initialComplaint,
            category: activeTicket.classification.category
          })
        });
        const kbJson = await kbRes.json();
        if (kbJson.recommendations) {
          setRecommendations(kbJson.recommendations);
        }
      } catch (err) {
        console.error('Error loading knowledge:', err);
      } finally {
        setIsKnowledgeLoading(false);
      }
    };

    fetchAssistAndKnowledge();
  }, [activeTicketId]);

  // Handle Apply AI Response to composer
  const handleUseAssistResponse = () => {
    if (assistData?.suggestedResponse) {
      setResponseText(assistData.suggestedResponse);
    }
  };

  // Handle Apply Quick Action
  const handleApplyAction = (label: string) => {
    if (!appliedActions.includes(label)) {
      setAppliedActions((prev) => [...prev, label]);
    }
  };

  // Handle Send Response
  const handleSendMessage = () => {
    if (!responseText.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'agent' as const,
      senderName: 'Rian Pratama (Anda)',
      content: responseText,
      timestamp: Date.now()
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === activeTicket.id) {
          return {
            ...t,
            messages: [...t.messages, newMsg],
            status: 'in_progress',
            agentDraftResponse: responseText
          };
        }
        return t;
      })
    );

    setResponseText('');
  };

  // Handle Resolve & Auto-Summary
  const handleResolveTicket = async () => {
    setIsSummarizing(true);
    try {
      const res = await fetch('/api/summarize-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: activeTicket.ticketNumber,
          customerName: activeTicket.customer.name,
          category: activeTicket.classification.category,
          priority: activeTicket.classification.priority,
          messages: activeTicket.messages,
          resolutionNotes: `Tindakan diterapkan: ${appliedActions.join(', ') || 'Solusi berhasil dikirimkan ke pelanggan'}.`
        })
      });

      const data = await res.json();
      if (data.summary) {
        setActiveSummary(data.summary);
        setShowSummaryModal(true);

        setTickets((prev) =>
          prev.map((t) =>
            t.id === activeTicket.id
              ? { ...t, status: 'resolved', summary: data.summary }
              : t
          )
        );
      }
    } catch (err) {
      console.error('Failed to summarize ticket:', err);
    } finally {
      setIsSummarizing(false);
    }
  };

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    if (filterTab === 'urgent' && t.classification.priority !== 'Urgent') return false;
    if (filterTab === 'billing' && !t.classification.category.includes('Billing')) return false;
    if (filterTab === 'technical' && !t.classification.category.includes('Technical')) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.ticketNumber.toLowerCase().includes(q) ||
        t.customer.name.toLowerCase().includes(q) ||
        t.customer.company.toLowerCase().includes(q) ||
        t.initialComplaint.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Live Agent Workspace • Onebox CX
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Omnichannel Ticket Desk & Agent Assist
          </h1>
        </div>

        {onSwitchView && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSwitchView('flow')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Simulasi Flow Demo</span>
            </button>
            <button
              onClick={() => onSwitchView('operations')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <span>Customer 360 & Analitik</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 3-COLUMN WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMN 1: TICKET QUEUE LIST (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[750px] overflow-hidden">
          {/* Queue Header & Filters */}
          <div className="p-3.5 border-b border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari tiket, klien..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-semibold">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                  filterTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua ({tickets.length})
              </button>
              <button
                onClick={() => setFilterTab('urgent')}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                  filterTab === 'urgent'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Urgent
              </button>
              <button
                onClick={() => setFilterTab('billing')}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                  filterTab === 'billing'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Billing
              </button>
              <button
                onClick={() => setFilterTab('technical')}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                  filterTab === 'technical'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Teknis
              </button>
            </div>
          </div>

          {/* Queue List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
            {filteredTickets.map((t) => {
              const isActive = t.id === activeTicket.id;
              const isUrgent = t.classification.priority === 'Urgent';
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTicketId(t.id)}
                  className={`w-full text-left p-3.5 transition-all flex flex-col gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50/80 border-l-4 border-blue-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {t.ticketNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isUrgent
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {t.classification.priority}
                    </span>
                  </div>

                  <div className="font-semibold text-xs text-slate-800 line-clamp-1">
                    {t.customer.name} • {t.customer.company}
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {t.initialComplaint}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                    <span className="font-medium text-slate-500">{t.channel}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>SLA: {t.classification.slaHours}h</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: ACTIVE CONVERSATION & COMPOSER (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[750px] overflow-hidden">
          {/* Ticket Details Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-base font-black text-slate-900">
                  {activeTicket.ticketNumber}
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeTicket.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {activeTicket.status.toUpperCase()}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                  {activeTicket.channel}
                </span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {activeTicket.customer.name} ({activeTicket.customer.company})
              </div>
            </div>

            <button
              onClick={handleResolveTicket}
              disabled={isSummarizing || activeTicket.status === 'resolved'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors disabled:opacity-40"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isSummarizing ? 'Merangkum...' : 'Resolve Ticket'}</span>
            </button>
          </div>

          {/* Conversation Transcript */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30 custom-scrollbar">
            {activeTicket.messages.map((m) => {
              const isCustomer = m.sender === 'customer';
              const isSystem = m.sender === 'system';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    isSystem
                      ? 'items-center my-2'
                      : isCustomer
                      ? 'items-start'
                      : 'items-end'
                  }`}
                >
                  {isSystem ? (
                    <div className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[10px] font-medium max-w-[90%] text-center">
                      {m.content}
                    </div>
                  ) : (
                    <div className="max-w-[85%] space-y-1">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                        <span className="font-semibold text-slate-600">{m.senderName}</span>
                        <span>•</span>
                        <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          isCustomer
                            ? 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs'
                            : 'bg-blue-600 text-white rounded-tr-xs shadow-xs'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Applied Actions Tracker Banner */}
          {appliedActions.length > 0 && (
            <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2 text-[11px] text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold">Aksi Diterapkan:</span>
              <div className="flex flex-wrap gap-1">
                {appliedActions.map((act, i) => (
                  <span key={i} className="bg-emerald-200/70 text-emerald-950 px-1.5 py-0.2 rounded font-medium">
                    {act}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Response Composer */}
          <div className="p-3.5 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Balasan Agen ({activeTicket.channel}):</span>
              {assistData && (
                <button
                  type="button"
                  onClick={handleUseAssistResponse}
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>Pakai Draf AI</span>
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Tulis balasan untuk pelanggan atau gunakan rekomendasi draf AI..."
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 custom-scrollbar resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">Tekan Kirim untuk meneruskan ke kanal pelanggan</span>
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!responseText.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Tanggapan</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 3: AI CO-PILOT, ACTIONS & KNOWLEDGE (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI AGENT ASSIST CARD */}
          <div className="bg-white rounded-2xl border border-blue-200/80 shadow-xs p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="font-extrabold text-sm text-slate-900">Agent Assist AI</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Confidence {assistData ? (assistData.confidenceScore * 100).toFixed(0) : '95'}%
              </span>
            </div>

            {isAssistLoading ? (
              <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Menganalisis tiket & merekomendasikan solusi...</span>
              </div>
            ) : assistData ? (
              <div className="space-y-3">
                {/* 1-Click Action Buttons */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Rekomendasi Aksi Cepat (1-Click):
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {assistData.suggestedActions.map((act) => {
                      const isApplied = appliedActions.includes(act.label);
                      return (
                        <button
                          key={act.id}
                          onClick={() => handleApplyAction(act.label)}
                          className={`w-full text-left p-2 rounded-xl text-xs border transition-all flex items-center justify-between ${
                            isApplied
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                              : 'bg-slate-50 hover:bg-blue-50 text-slate-800 border-slate-200 hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <Zap className={`w-3.5 h-3.5 ${isApplied ? 'text-emerald-600' : 'text-blue-600'}`} />
                            <span className="truncate">{act.label}</span>
                          </div>
                          {isApplied ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <span className="text-[10px] text-blue-600 font-bold shrink-0">Terapkan</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Key Talking Points */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Poin Kunci untuk Agen:
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-3.5">
                    {assistData.keyTalkingPoints.map((pt, idx) => (
                      <li key={idx} className="leading-snug">{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Pilih tiket untuk memuat rekomendasi.</p>
            )}
          </div>

          {/* KNOWLEDGE RECOMMENDATIONS CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900">Rekomendasi Knowledge</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Ranked Articles</span>
            </div>

            {isKnowledgeLoading ? (
              <div className="py-4 text-center text-xs text-slate-400">Memuat artikel relevan...</div>
            ) : recommendations.length > 0 ? (
              <div className="space-y-2">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors space-y-1"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                        {rec.title}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded shrink-0">
                        {rec.relevanceScore}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-2 italic">
                      {rec.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[9px] text-slate-400">
                      <span>{rec.source}</span>
                      <button
                        onClick={() => {
                          setResponseText((prev) => `${prev}\n\nReferensi Tambahan: ${rec.title} (${rec.url})`);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-bold"
                      >
                        + Sisipkan Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Tidak ada artikel spesifik ditemukan.</p>
            )}
          </div>
        </div>

      </div>

      {/* AUTOMATED SUMMARY MODAL */}
      {showSummaryModal && activeSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Ringkasan Tiket Otomatis ({activeSummary.ticketId})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Digenerate otomatis oleh Ciptadra AI Summary Engine
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px]">Deskripsi Masalah:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{activeSummary.issueDescription}</p>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px]">Tindakan yang Telah Diambil:</span>
                <ul className="list-disc pl-4 text-slate-700 mt-0.5 space-y-0.5">
                  {activeSummary.actionsTaken.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
                  <div className="font-bold text-emerald-600 uppercase">{activeSummary.currentStatus}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Waktu Resolusi</span>
                  <div className="font-bold text-slate-800">{activeSummary.resolutionTimeEstimate}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Prediksi CSAT</span>
                  <div className="font-bold text-blue-600">{activeSummary.csatPrediction}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Penanggung Jawab</span>
                  <div className="font-bold text-slate-800 truncate">{activeSummary.assignedOwner}</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-950">
                <span className="font-bold text-[10px] uppercase tracking-wider text-blue-800 block mb-0.5">
                  Executive Summary:
                </span>
                <p className="text-[11px] leading-relaxed text-blue-900">{activeSummary.executiveSummary}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Tutup
              </button>
              {onSwitchView && (
                <button
                  onClick={() => {
                    setShowSummaryModal(false);
                    onSwitchView('operations');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Lihat di Customer 360</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
