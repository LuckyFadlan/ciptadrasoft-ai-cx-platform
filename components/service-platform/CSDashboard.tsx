'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  User,
  Zap,
  RefreshCw,
  Send,
  Copy,
  Check,
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Flame,
  FileText,
  Sparkles,
  Cpu
} from 'lucide-react';
import {
  OMNICHANNEL_CONVERSATIONS,
  MOCK_CUSTOMER_360
} from './mockData';
import {
  OmnichannelConversation,
  SupportChannel,
  AgentAssistResult,
  KnowledgeRecommendation,
  TicketSummary,
  PlatformView
} from '@/types/chatbot';

interface CSDashboardProps {
  onSwitchView?: (view: PlatformView) => void;
  initialConversationId?: string;
}

export const CSDashboard: React.FC<CSDashboardProps> = ({
  onSwitchView,
  initialConversationId
}) => {
  // Master state
  const [conversations, setConversations] = useState<OmnichannelConversation[]>(
    OMNICHANNEL_CONVERSATIONS
  );
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [filterType, setFilterType] = useState<
    'all' | 'ai_answered' | 'needs_cs' | 'urgent'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConvId, setActiveConvId] = useState<string | null>(
    initialConversationId || null
  );

  // Active conversation
  const activeConversation = conversations.find((c) => c.id === activeConvId);

  // Composer & Agent Assist states
  const [responseText, setResponseText] = useState('');
  const [appliedActions, setAppliedActions] = useState<string[]>([]);
  const [assistData, setAssistData] = useState<AgentAssistResult | null>(null);
  const [isAssistLoading, setIsAssistLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<KnowledgeRecommendation[]>([]);
  const [isKnowledgeLoading, setIsKnowledgeLoading] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState<'assist' | 'kb' | 'customer360'>('assist');
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [resolutionSummary, setResolutionSummary] = useState<TicketSummary | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);

  // Auto-load assist and recommendations when active conversation changes
  useEffect(() => {
    if (!activeConversation) return;

    setResponseText('');
    setAppliedActions([]);
    setResolutionSummary(null);

    // Call API endpoints for live dynamic intelligence
    const fetchAssistAndKb = async () => {
      setIsAssistLoading(true);
      setIsKnowledgeLoading(true);

      try {
        const assistRes = await fetch('/api/agent-assist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            complaint: activeConversation.snippet,
            category: activeConversation.category,
            priority: activeConversation.classification?.priority || 'Medium',
            customerName: activeConversation.customer.name,
            companyName: activeConversation.customer.company || 'Enterprise Client'
          })
        });
        const assistJson = await assistRes.json();
        if (assistJson.assist) {
          setAssistData(assistJson.assist);
          if (!activeConversation.isAiAnswered && !responseText) {
            setResponseText(assistJson.assist.suggestedResponse);
          }
        }
      } catch (err) {
        console.error('Error fetching assist:', err);
      } finally {
        setIsAssistLoading(false);
      }

      try {
        const kbRes = await fetch('/api/recommend-knowledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: activeConversation.snippet,
            category: activeConversation.category
          })
        });
        const kbJson = await kbRes.json();
        if (kbJson.recommendations) {
          setRecommendations(kbJson.recommendations);
        }
      } catch (err) {
        console.error('Error fetching KB:', err);
      } finally {
        setIsKnowledgeLoading(false);
      }
    };

    fetchAssistAndKb();
  }, [activeConvId]);

  // Filtering
  const filteredConversations = conversations.filter((conv) => {
    // Channel filter
    if (selectedChannel !== 'all') {
      if (conv.channel.toLowerCase() !== selectedChannel.toLowerCase()) return false;
    }

    // Type filter
    if (filterType === 'ai_answered' && !conv.isAiAnswered) return false;
    if (filterType === 'needs_cs' && conv.isAiAnswered) return false;
    if (filterType === 'urgent' && conv.classification?.priority !== 'Urgent') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = conv.customer.name.toLowerCase().includes(q);
      const matchSubject = conv.subject.toLowerCase().includes(q);
      const matchSnippet = conv.snippet.toLowerCase().includes(q);
      const matchCode = conv.conversationCode.toLowerCase().includes(q);
      if (!matchName && !matchSubject && !matchSnippet && !matchCode) return false;
    }

    return true;
  });

  // Channel helper icons & badges
  const renderChannelBadge = (ch: SupportChannel) => {
    switch (ch) {
      case 'WhatsApp':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span>WA</span>
          </span>
        );
      case 'Instagram':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
            <span>IG</span>
          </span>
        );
      case 'Facebook':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span>FB</span>
          </span>
        );
      case 'Twitter':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <span>X</span>
          </span>
        );
      case 'TikTok':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900 text-white border border-slate-700">
            <span>TikTok</span>
          </span>
        );
      case 'Email':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <span>Email</span>
          </span>
        );
      case 'Webchat':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span>Chat</span>
          </span>
        );
      case 'Phone':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <span>Call</span>
          </span>
        );
      case 'GoogleReviews':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-yellow-50 text-yellow-800 border border-yellow-200">
            <span>Reviews</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
            <span>{ch}</span>
          </span>
        );
    }
  };

  // Status badge helper
  const renderStatusBadge = (conv: OmnichannelConversation) => {
    if (conv.isAiAnswered) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100/90 text-emerald-800 border border-emerald-300 shadow-2xs">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>✓ AI ANSWERED</span>
        </span>
      );
    }

    switch (conv.status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
            NEW
          </span>
        );
      case 'open':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            OPEN
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            IN PROGRESS
          </span>
        );
      case 'escalated':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300 animate-pulse">
            ESCALATED
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            RESOLVED
          </span>
        );
      default:
        return null;
    }
  };

  // Send message from agent
  const handleSendMessage = () => {
    if (!responseText.trim() || !activeConversation) return;

    const newMsg = {
      id: `msg-agent-${Date.now()}`,
      sender: 'agent' as const,
      senderName: 'Andi Wijaya (Anda)',
      content: responseText.trim(),
      timestamp: Date.now()
    };

    const updated = conversations.map((c) => {
      if (c.id === activeConversation.id) {
        return {
          ...c,
          status: 'in_progress' as const,
          updatedAt: Date.now(),
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setConversations(updated);
    setResponseText('');
  };

  // Resolve Ticket
  const handleResolveTicket = async () => {
    if (!activeConversation) return;
    setIsResolving(true);

    try {
      const summaryRes = await fetch('/api/summarize-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: activeConversation.ticketId || activeConversation.conversationCode,
          issueDescription: activeConversation.subject,
          actionsTaken: appliedActions.length > 0 ? appliedActions : ['Penjelasan solusi teknis', 'Eskalasi ke spesialis'],
          currentStatus: 'resolved',
          nextAction: 'Monitoring kepuasan pelanggan pasca penanganan',
          priority: activeConversation.classification?.priority || 'Medium',
          customerName: activeConversation.customer.name,
          companyName: activeConversation.customer.company || 'Enterprise Client'
        })
      });

      const summaryJson = await summaryRes.json();
      if (summaryJson.summary) {
        setResolutionSummary(summaryJson.summary);
      }

      // Mark as resolved in conversations state
      const updated = conversations.map((c) => {
        if (c.id === activeConversation.id) {
          return {
            ...c,
            status: 'resolved' as const,
            timeToResponseLabel: 'Selesai (Resolved)',
            updatedAt: Date.now()
          };
        }
        return c;
      });
      setConversations(updated);
      setShowResolveModal(true);
    } catch (err) {
      console.error('Error resolving conversation:', err);
    } finally {
      setIsResolving(false);
    }
  };

  // Quick Action click
  const handleApplyAction = (label: string) => {
    if (!appliedActions.includes(label)) {
      setAppliedActions((prev) => [...prev, label]);
    }
  };

  // Copy or insert KB excerpt
  const handleInsertKbExcerpt = (excerpt: string) => {
    setResponseText((prev) => (prev ? `${prev}\n\n${excerpt}` : excerpt));
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* TOP HEADER: ONEBOX BRANDING & METRIC SUMMARY */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 shrink-0 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-black text-lg">
              OB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">
                  Onebox<span className="text-blue-600">.CRM</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                  Omnichannel Customer Desk
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Connected
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Single screen untuk semua kanal (WhatsApp, Sosmed, Email, PBX, Webchat, Reviews)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            {/* PROTOTYPE DEMO BANNER PILL */}
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
              Prototype Demo Data
            </span>

            {onSwitchView && (
              <button
                onClick={() => onSwitchView('supervisor_dashboard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Lihat Supervisor Cockpit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* CHANNEL NAVIGATION BAR (REFERENCE IMAGE ONEBOX ICONS) */}
      <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 sm:px-6 py-2 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSelectedChannel('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedChannel === 'all'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              All Channels ({conversations.length})
            </button>

            {[
              { id: 'whatsapp', label: 'WhatsApp', count: 4 },
              { id: 'instagram', label: 'Instagram', count: 2 },
              { id: 'facebook', label: 'Facebook', count: 1 },
              { id: 'twitter', label: 'X / Twitter', count: 1 },
              { id: 'tiktok', label: 'TikTok', count: 1 },
              { id: 'email', label: 'Email', count: 2 },
              { id: 'webchat', label: 'Webchat', count: 3 },
              { id: 'phone', label: 'Call Center', count: 1 },
              { id: 'googlereviews', label: 'Google Reviews', count: 2 }
            ].map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChannel(ch.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                  selectedChannel === ch.id
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{ch.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Filter: AI Answered vs CS Needs */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                filterType === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterType('ai_answered')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                filterType === 'ai_answered'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
              }`}
              title="Kasus yang dijawab mandiri oleh AI (Case A)"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>✓ AI Answered</span>
            </button>
            <button
              onClick={() => setFilterType('needs_cs')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                filterType === 'needs_cs'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
              }`}
              title="Kasus eskalasi ke CS (Case B)"
            >
              <User className="w-3 h-3" />
              <span>Antrean CS</span>
            </button>
            <button
              onClick={() => setFilterType('urgent')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                filterType === 'urgent'
                  ? 'bg-red-600 text-white'
                  : 'text-red-700 bg-red-50 hover:bg-red-100'
              }`}
              title="Tiket Urgent dengan risiko SLA"
            >
              <Flame className="w-3 h-3" />
              <span>Urgent SLA</span>
            </button>
          </div>

        </div>
      </div>

      {/* MAIN WORKSPACE CONTENT */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 flex flex-col">
        
        {/* IF NO CONVERSATION SELECTED: SHOW FULL ONEBOX TABLE */}
        {!activeConversation ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col flex-1 overflow-hidden">
            
            {/* Table Search & Controls Bar */}
            <div className="p-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama pengirim, perusahaan, tiket, atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Menampilkan <strong>{filteredConversations.length}</strong> percakapan</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>5 Terjawab AI</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-blue-700 font-semibold">
                  <User className="w-3.5 h-3.5" />
                  <span>11 Antrean CS</span>
                </span>
              </div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                    <th className="py-3 px-3 w-8 text-center">
                      <input type="checkbox" className="rounded border-slate-300" disabled />
                    </th>
                    <th className="py-3 px-3">Requester &amp; Kanal</th>
                    <th className="py-3 px-3">Subject &amp; Snippet Pesan</th>
                    <th className="py-3 px-3">Agen Ditugaskan</th>
                    <th className="py-3 px-3">Kategori</th>
                    <th className="py-3 px-3 text-center">Status / AI Decision</th>
                    <th className="py-3 px-3 text-right">Time To Response</th>
                    <th className="py-3 px-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredConversations.map((conv) => (
                    <tr
                      key={conv.id}
                      onClick={() => setActiveConvId(conv.id)}
                      className={`hover:bg-blue-50/60 cursor-pointer transition-colors group ${
                        conv.classification?.priority === 'Urgent' ? 'bg-red-50/20' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300" />
                      </td>

                      {/* Requester & Channel */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          {renderChannelBadge(conv.channel)}
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                              <span>{conv.customer.name}</span>
                              {conv.customer.slaTier && (
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                                  conv.customer.slaTier === 'Enterprise Platinum'
                                    ? 'bg-purple-100 text-purple-800'
                                    : conv.customer.slaTier === 'Gold'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {conv.customer.slaTier}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {conv.customer.company || conv.customer.handleOrPhone}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Subject & Snippet */}
                      <td className="py-3 px-3 max-w-xs md:max-w-md">
                        <div className="font-semibold text-slate-800 truncate">
                          {conv.subject}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {conv.snippet}
                        </div>
                      </td>

                      {/* Assigned Agent */}
                      <td className="py-3 px-3">
                        {conv.assignedAgent ? (
                          <div className="flex items-center gap-1.5">
                            {conv.assignedAgent.avatar ? (
                              <img
                                src={conv.assignedAgent.avatar}
                                alt={conv.assignedAgent.name}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                                {conv.assignedAgent.name[0]}
                              </div>
                            )}
                            <span className="font-medium text-slate-700">{conv.assignedAgent.name}</span>
                          </div>
                        ) : conv.isAiAnswered ? (
                          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                            <Bot className="w-3.5 h-3.5" />
                            <span>Ciptadra AI Agent</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Unassigned (Queue)</span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {conv.category}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-3 text-center">
                        {renderStatusBadge(conv)}
                      </td>

                      {/* Time To Response */}
                      <td className="py-3 px-3 text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          conv.slaStatus === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : conv.slaStatus === 'breached'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {conv.timeToResponseLabel}
                        </span>
                      </td>

                      {/* Arrow */}
                      <td className="py-3 px-3 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <div>
                Klik baris percakapan untuk membuka <strong>Customer Service Workspace &amp; AI Assist</strong>.
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Case A: Auto-Answered via KB</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Case B: Auto-Ticket &amp; Routed to CS</span>
                </span>
              </div>
            </div>

          </div>
        ) : (

          /* SPLIT SCREEN WORKSPACE: CONVERSATION + AGENT ASSIST / KB / CUSTOMER 360 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
            
            {/* LEFT 7-8 COLS: CONVERSATION THREAD & MANUAL COMPOSER */}
            <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              
              {/* Header */}
              <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveConvId(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title="Kembali ke Daftar Percakapan"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  {renderChannelBadge(activeConversation.channel)}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        {activeConversation.customer.name}
                      </span>
                      {activeConversation.customer.company && (
                        <span className="text-xs text-slate-500 font-medium">
                          ({activeConversation.customer.company})
                        </span>
                      )}
                      {activeConversation.ticketId && (
                        <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
                          {activeConversation.ticketId}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{activeConversation.customer.handleOrPhone}</span>
                      <span>•</span>
                      <span>{activeConversation.subject}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {renderStatusBadge(activeConversation)}

                  {!activeConversation.isAiAnswered && activeConversation.status !== 'resolved' && (
                    <button
                      onClick={handleResolveTicket}
                      disabled={isResolving}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isResolving ? 'Menyimpan...' : 'Resolve Ticket'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* DUAL-CASE AI BANNER */}
              {activeConversation.isAiAnswered ? (
                <div className="p-3 bg-emerald-50/80 border-b border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold flex items-center gap-2">
                      <span>Case A: Percakapan ini dijawab otomatis oleh AI (Zero Human Touch)</span>
                      <span className="text-[10px] bg-emerald-200/70 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                        Akurasi 98%
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Sumber Pengetahuan: <strong>{activeConversation.aiSource}</strong>. Ditutup otomatis tanpa membebani antrean agen CS.
                    </p>
                  </div>
                </div>
              ) : activeConversation.classification ? (
                <div className="p-3 bg-amber-50/80 border-b border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 flex-1">
                    <div className="font-bold flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span>Case B: AI Auto-Classification &amp; Ticket Escalation</span>
                        <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded uppercase">
                          {activeConversation.classification.priority} Prioritas
                        </span>
                      </span>
                      <span className="text-[10px] font-mono text-amber-800 font-semibold">
                        SLA Target: {activeConversation.classification.slaHours} Jam
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      <strong>Departemen:</strong> {activeConversation.classification.department} • <strong>Sentimen:</strong> {activeConversation.classification.sentiment} • <strong>Alasan:</strong> {activeConversation.classification.reasoning}
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[420px] bg-slate-50/30">
                {activeConversation.messages.map((m) => {
                  const isCustomer = m.sender === 'customer';
                  const isAi = m.sender === 'ai';
                  const isSystem = m.sender === 'system';
                  const isAgent = m.sender === 'agent';

                  if (isSystem) {
                    return (
                      <div key={m.id} className="flex items-center justify-center my-2">
                        <div className="px-3 py-1.5 rounded-full bg-slate-200/80 text-[11px] font-medium text-slate-700 flex items-center gap-1.5 text-center max-w-lg">
                          <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{m.content}</span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        isCustomer ? 'items-start' : 'items-end'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-slate-600">
                          {m.senderName}
                        </span>
                        {isAi && (
                          <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5" />
                            <span>AI Verified</span>
                          </span>
                        )}
                        {isAgent && (
                          <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded">
                            CS Agent
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {new Date(m.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl max-w-xl text-xs leading-relaxed shadow-2xs ${
                          isCustomer
                            ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                            : isAi
                            ? 'bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 text-slate-900 rounded-tr-sm'
                            : 'bg-blue-600 text-white rounded-tr-sm'
                        }`}
                      >
                        <p className="whitespace-pre-line">{m.content}</p>

                        {m.aiSource && (
                          <div className="mt-2.5 pt-2 border-t border-indigo-200/60 text-[10px] text-indigo-700 flex items-center justify-between font-medium">
                            <span>Sumber: {m.aiSource}</span>
                            <span>Akurasi {Math.round((m.aiConfidence || 0.95) * 100)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Agent Manual Composer */}
              <div className="p-3.5 border-t border-slate-200 bg-white">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase text-slate-500">
                        Composer Respon Agen
                      </span>
                      {appliedActions.length > 0 && (
                        <div className="flex items-center gap-1">
                          {appliedActions.map((act) => (
                            <span
                              key={act}
                              className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full"
                            >
                              ✓ {act}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {assistData?.suggestedResponse && (
                      <button
                        onClick={() => setResponseText(assistData.suggestedResponse)}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                        title="Gunakan draf yang dibuat oleh AI Agent Assist"
                      >
                        <Sparkles className="w-3 h-3 text-blue-500" />
                        <span>Gunakan Draf AI Assist</span>
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={3}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Ketik respon resmi ke pelanggan, atau gunakan rekomendasi AI Assist di panel kanan..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-slate-400">
                      Tekan <strong>Send</strong> untuk mengirim pesan via kanal {activeConversation.channel}.
                    </div>

                    <button
                      onClick={handleSendMessage}
                      disabled={!responseText.trim()}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Respon</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT 4-5 COLS: AGENT ASSIST, KNOWLEDGE & CUSTOMER 360 */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
              
              {/* Tab Selector */}
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex items-center justify-between shadow-2xs text-xs font-bold">
                <button
                  onClick={() => setRightPanelTab('assist')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    rightPanelTab === 'assist'
                      ? 'bg-blue-600 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Agent Assist</span>
                </button>

                <button
                  onClick={() => setRightPanelTab('kb')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    rightPanelTab === 'kb'
                      ? 'bg-indigo-600 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Knowledge SOP</span>
                </button>

                <button
                  onClick={() => setRightPanelTab('customer360')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    rightPanelTab === 'customer360'
                      ? 'bg-slate-900 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Customer 360</span>
                </button>
              </div>

              {/* TAB 1: AGENT ASSIST */}
              {rightPanelTab === 'assist' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4 flex-1">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">AI Real-Time Agent Assist</h4>
                        <span className="text-[10px] text-slate-500">Draf &amp; Rekomendasi Solusi</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                      Model Ready
                    </span>
                  </div>

                  {isAssistLoading ? (
                    <div className="p-6 text-center text-xs text-slate-400 space-y-2">
                      <RefreshCw className="w-5 h-5 text-blue-500 animate-spin mx-auto" />
                      <p>Menganalisis percakapan &amp; menyusun draf terbaik...</p>
                    </div>
                  ) : assistData ? (
                    <div className="space-y-3.5 text-xs">
                      {/* Suggested response card */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-slate-500">
                            Draf Rekomendasi AI
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 font-bold">
                            Score {Math.round(assistData.confidenceScore * 100)}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-4">
                          {assistData.suggestedResponse}
                        </p>
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70">
                          <button
                            onClick={() => setResponseText(assistData.suggestedResponse)}
                            className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Gunakan Respon Ini</span>
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(assistData.suggestedResponse);
                              setCopiedResponse(true);
                              setTimeout(() => setCopiedResponse(false), 2000);
                            }}
                            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            title="Salin ke clipboard"
                          >
                            {copiedResponse ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* 1-Click Action Buttons */}
                      {assistData.suggestedActions && assistData.suggestedActions.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-slate-500">
                            Aksi Cepat 1-Klik (Quick Actions)
                          </span>
                          <div className="space-y-1.5">
                            {assistData.suggestedActions.map((act) => (
                              <button
                                key={act.id}
                                onClick={() => handleApplyAction(act.label)}
                                className={`w-full p-2.5 rounded-xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer ${
                                  appliedActions.includes(act.label)
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                              >
                                <div>
                                  <div className="font-bold text-[11px] flex items-center gap-1.5">
                                    <Zap className="w-3 h-3 text-amber-500" />
                                    <span>{act.label}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">
                                    {act.description}
                                  </div>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  appliedActions.includes(act.label)
                                    ? 'bg-emerald-200 text-emerald-900'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {appliedActions.includes(act.label) ? 'Applied' : 'Execute'}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Talking Points */}
                      {assistData.keyTalkingPoints && assistData.keyTalkingPoints.length > 0 && (
                        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-blue-900">
                            Key Talking Points
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-[11px] text-blue-950">
                            {assistData.keyTalkingPoints.map((pt, i) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Pilih percakapan untuk mengaktifkan AI Agent Assist.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: KNOWLEDGE SOP */}
              {rightPanelTab === 'kb' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Knowledge Recommendations</h4>
                        <span className="text-[10px] text-slate-500">SOP &amp; Kebijakan Resmi</span>
                      </div>
                    </div>
                  </div>

                  {isKnowledgeLoading ? (
                    <div className="p-6 text-center text-xs text-slate-400 space-y-2">
                      <RefreshCw className="w-5 h-5 text-indigo-500 animate-spin mx-auto" />
                      <p>Mencari SOP &amp; dokumen terkait...</p>
                    </div>
                  ) : recommendations.length > 0 ? (
                    <div className="space-y-3 text-xs">
                      {recommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-bold text-[11px] text-slate-900 leading-tight">
                              {rec.title}
                            </h5>
                            <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded shrink-0">
                              {rec.relevanceScore}% Match
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {rec.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                            <span className="text-[10px] text-slate-400">
                              Sumber: {rec.source}
                            </span>
                            <button
                              onClick={() => handleInsertKbExcerpt(rec.excerpt || rec.summary || '')}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                            >
                              <span>+ Tempel ke Respon</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Tidak ada rekomendasi dokumen spesifik untuk topik ini.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CUSTOMER 360 */}
              {rightPanelTab === 'customer360' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3.5 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-900 text-white">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Profil Pelanggan 360</h4>
                        <span className="text-[10px] text-slate-500">Telemetry &amp; Histori Akun</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      {activeConversation.customer.slaTier || 'Gold Tier'}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Informasi Kontak</div>
                      <div className="font-bold text-slate-900">{activeConversation.customer.name}</div>
                      <div className="text-slate-600">{activeConversation.customer.company || 'Enterprise Account'}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{activeConversation.customer.handleOrPhone}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400">CSAT Historis</span>
                        <div className="text-base font-black text-slate-900 mt-0.5">4.8 / 5.0</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Risiko Churn</span>
                        <div className="text-base font-black text-emerald-600 mt-0.5">Rendah (Low)</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Produk Digunakan</span>
                      <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
                        <li>Onebox CRM Enterprise (50 Agen)</li>
                        <li>Onebox Contact Center Omnichannel</li>
                        <li>Ciptadra Flow BPM Engine</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-900">AI Next-Step Insight</span>
                      <p className="text-[11px] text-indigo-950">
                        Tawarkan aktivasi Webhook Auto-Reconciliation BCA VA agar settlement otomatis dan mencegah kendala berulang saat renewal tahunan.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* RESOLUTION SUMMARY MODAL */}
      {showResolveModal && resolutionSummary && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Tiket Berhasil Diselesaikan</h3>
                <p className="text-xs text-slate-500">
                  Ringkasan otomatis tersimpan di Supervisor Ops Telemetry.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Executive Summary</span>
                <p className="text-slate-800 mt-1 font-medium leading-relaxed">
                  {resolutionSummary.executiveSummary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Estimasi Penanganan</span>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {resolutionSummary.resolutionTimeEstimate || '18.5 Menit'}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Prediksi CSAT</span>
                  <div className="font-bold text-emerald-600 mt-0.5">
                    {resolutionSummary.csatPrediction || 'Tinggi (High)'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowResolveModal(false);
                  setActiveConvId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Tutup &amp; Kembali ke Antrean
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
