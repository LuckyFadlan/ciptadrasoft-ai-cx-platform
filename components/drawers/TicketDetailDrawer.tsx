'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  Send,
  Sparkles,
  Bot,
  User,
  Shield,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
  Building,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  CornerDownRight
} from 'lucide-react';
import { Ticket, TicketClassification, KnowledgeRecommendation } from '@/types/chatbot';
import { MOCK_KNOWLEDGE_RECOMMENDATIONS } from '@/components/service-platform/mockData';

interface TicketDetailDrawerProps {
  isOpen: boolean;
  ticket: Ticket | null;
  onClose: () => void;
  onResolveTicket: (ticketId: string) => void;
  onAssignTicket?: (ticketId: string, agentCode: 'CS A' | 'CS B') => void;
}

export const TicketDetailDrawer: React.FC<TicketDetailDrawerProps> = ({
  isOpen,
  ticket,
  onClose,
  onResolveTicket,
  onAssignTicket
}) => {
  const [activeTab, setActiveTab] = useState<'conversation' | 'ai_insights' | 'knowledge'>('conversation');
  const [replyText, setReplyText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !ticket) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplySnippet = (snippet: string) => {
    setReplyText((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'Urgent':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/30';
      case 'High':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      case 'Medium':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/30';
    }
  };

  const ticketCategory = (ticket.category || ticket.classification?.category || '').toLowerCase();
  const relevantKB = MOCK_KNOWLEDGE_RECOMMENDATIONS.filter(
    (kb) =>
      (kb.category || '').toLowerCase().includes(ticketCategory) ||
      (kb.title || '').toLowerCase().includes(ticketCategory)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {ticket.ticketNumber}
              </span>
              <span
                className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${getPriorityBadge(
                  ticket.priority || ticket.classification?.priority || 'Medium'
                )}`}
              >
                {ticket.priority || ticket.classification?.priority || 'Medium'}
              </span>
              {ticket.aiClassification?.recommendedRouting && (
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  Routing: {ticket.aiClassification.recommendedRouting}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {ticket.status !== 'Resolved' && (
                <button
                  onClick={() => onResolveTicket(ticket.id)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700 shadow-xs"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Selesaikan Tiket</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Subheader info bar */}
          <div className="bg-slate-50 px-5 py-2.5 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{ticket.customerName}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-normal">{ticket.companyName}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Channel: <span className="font-medium text-slate-700 dark:text-slate-300">{ticket.channel}</span> · Kategori: <span className="font-medium text-slate-700 dark:text-slate-300">{ticket.category}</span>
              </div>
            </div>

            <div className="text-right text-[11px]">
              <div className="text-slate-500">
                Ditangani: <span className="font-medium text-indigo-600 dark:text-indigo-400">{ticket.assignedAgent || 'Unassigned (Queue)'}</span>
              </div>
              <div className="text-slate-400">SLA: {ticket.slaRemainingMinutes} menit tersisa</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 px-5 dark:border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('conversation')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors ${
                activeTab === 'conversation'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Percakapan ({ticket.messages.length})
            </button>
            <button
              onClick={() => setActiveTab('ai_insights')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'ai_insights'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>AI Triage & Copilot</span>
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'knowledge'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              <span>Rekomendasi SOP</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeTab === 'conversation' && (
              <div className="space-y-4">
                {/* Initial customer complaint box */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3.5 dark:border-indigo-900/40 dark:bg-indigo-950/20">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-900 dark:text-indigo-300 mb-1">
                    <span>Ringkasan Keluhan Utama Pelanggan</span>
                    <span className="text-[10px] text-indigo-500 font-normal">{ticket.channel} Inbound</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    {ticket.customerComplaint}
                  </p>
                </div>

                {/* Message stream */}
                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Riwayat Percakapan Omnichannel
                  </div>
                  {ticket.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2.5 ${
                        msg.sender === 'agent' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          msg.sender === 'agent'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {msg.sender === 'agent' ? 'CS' : 'C'}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs shadow-xs ${
                          msg.sender === 'agent'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                        <div
                          className={`mt-1 text-[9px] text-right ${
                            msg.sender === 'agent' ? 'text-indigo-200' : 'text-slate-400'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ai_insights' && (
              <div className="space-y-4">
                {/* AI Classification Card */}
                {ticket.aiClassification && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                        <Sparkles className="h-4 w-4 text-indigo-500" />
                        <span>Analisis Otomatis AI Triage</span>
                      </div>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                        {Math.round(ticket.aiClassification.confidence * 100)}% Confidence
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900/60">
                        <span className="text-[10px] text-slate-400">Kategori Terdeteksi</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {ticket.aiClassification.category}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900/60">
                        <span className="text-[10px] text-slate-400">Sentimen Pelanggan</span>
                        <p className="font-semibold text-amber-600 dark:text-amber-400">
                          {ticket.aiClassification.sentiment}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-medium text-slate-500">Kata Kunci Esensial:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {ticket.aiClassification.urgencyKeywords?.map((kw, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg bg-indigo-50/50 p-2.5 text-xs text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                      <span className="font-semibold">Alasan AI Routing:</span>
                      <p className="mt-0.5 text-[11px] leading-relaxed">
                        {ticket.aiClassification.routingReason}
                      </p>
                    </div>
                  </div>
                )}

                {/* Draft Copilot Response */}
                {ticket.aiClassification?.suggestedResponse && (
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-800 dark:bg-indigo-950/20 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5">
                        <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        Draft Rekomendasi Jawaban Agent Assist
                      </span>
                      <button
                        onClick={() => handleCopy(ticket.aiClassification!.suggestedResponse!)}
                        className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copied ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <p className="rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-800 shadow-xs dark:bg-slate-900 dark:text-slate-200 border border-indigo-100 dark:border-indigo-900/40">
                      {ticket.aiClassification.suggestedResponse}
                    </p>

                    <button
                      onClick={() => handleApplySnippet(ticket.aiClassification!.suggestedResponse!)}
                      className="w-full rounded-lg bg-indigo-600 py-1.5 text-center text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                    >
                      Terapkan ke Kotak Balasan
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'knowledge' && (
              <div className="space-y-3">
                <div className="text-[11px] text-slate-500">
                  Rekomendasi artikel SOP dan dokumen resmi CiptadraSoft & Onebox yang relevan:
                </div>

                {relevantKB.length > 0 ? (
                  relevantKB.map((kb) => (
                    <div
                      key={kb.id}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs shadow-xs dark:border-slate-800 dark:bg-slate-800/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {kb.title}
                        </span>
                        <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                          {kb.relevanceScore}% Match
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                        {kb.summary}
                      </p>
                      <button
                        onClick={() => handleApplySnippet(kb.recommendedReplySnippet || '')}
                        className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                      >
                        <CornerDownRight className="h-3 w-3" />
                        <span>Gunakan template respon SOP ini</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    Tidak ada artikel SOP spesifik untuk kategori ini.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Reply Bar at bottom */}
          <div className="border-t border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="space-y-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Ketik balasan resmi atau masukkan draft dari AI Copilot..."
                rows={2}
                className="w-full resize-none rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-slate-400">
                  Channel keluar: <span className="font-semibold">{ticket.channel}</span>
                </div>
                <button
                  onClick={() => {
                    if (!replyText.trim()) return;
                    ticket.messages.push({
                      id: `msg-${Date.now()}`,
                      sender: 'agent',
                      text: replyText,
                      timestamp: Date.now()
                    });
                    setReplyText('');
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Kirim Respon</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
