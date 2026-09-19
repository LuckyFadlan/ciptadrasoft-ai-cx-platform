'use client';

import React, { useState } from 'react';
import {
  Share2,
  TrendingUp,
  Send,
  Sparkles,
  Heart,
  MessageCircle,
  Repeat2,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Eye,
  MousePointerClick,
  Copy,
  Check,
  Building,
  Mail,
  RefreshCw,
  Plus
} from 'lucide-react';
import {
  UserSession,
  IndustryDomain,
  ContentSentimentItem,
  OutboundCampaign
} from '@/types/chatbot';
import {
  MOCK_MARKETING_SENTIMENT_POSTS,
  MOCK_CUSTOMER_JOURNEY_AIDA,
  MOCK_OUTBOUND_CAMPAIGNS
} from '@/components/service-platform/mockData';
import { SentimentDetailDrawer } from '@/components/drawers/SentimentDetailDrawer';

interface MarketingWorkspaceProps {
  session: UserSession;
  activeTab: string;
  currentIndustry: IndustryDomain;
  searchQuery: string;
}

export const MarketingWorkspace: React.FC<MarketingWorkspaceProps> = ({
  session,
  activeTab,
  currentIndustry,
  searchQuery
}) => {
  const [selectedSentiment, setSelectedSentiment] = useState<ContentSentimentItem | null>(null);
  const [isSentimentDrawerOpen, setIsSentimentDrawerOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<OutboundCampaign[]>(MOCK_OUTBOUND_CAMPAIGNS);
  const [activeCampaign, setActiveCampaign] = useState<OutboundCampaign>(MOCK_OUTBOUND_CAMPAIGNS[0]);
  const [simulatedToast, setSimulatedToast] = useState<string | null>(null);

  const handleOpenSentiment = (item: ContentSentimentItem) => {
    setSelectedSentiment(item);
    setIsSentimentDrawerOpen(true);
  };

  const handleSimulateCampaign = (campId: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campId
          ? {
              ...c,
              status: 'sent',
              openRate: 48.6,
              clickRate: 21.2,
              responseRate: 14.8,
              lastSent: Date.now()
            }
          : c
      )
    );
    setSimulatedToast(`Kampanye "${activeCampaign.name}" berhasil dikirim ke ${activeCampaign.recipientsCount} prospek!`);
    setTimeout(() => setSimulatedToast(null), 4000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Toast */}
      {simulatedToast && (
        <div className="absolute top-16 right-6 z-40 flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg animate-in slide-in-from-top duration-300">
          <Send className="h-4 w-4" />
          <span>{simulatedToast}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* TAB 1: SOCIAL SENTIMENT */}
        {activeTab === 'sentiment' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Sentimen Bersih (NSS)</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-emerald-600">74% Positif</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 rounded font-semibold">
                    +4.2% MoM
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Total Mention Brand</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">2,450</span>
                  <span className="text-[10px] text-slate-400">7 hari terakhir</span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Isu Kritis Terdeteksi</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-rose-600">1 Isu</span>
                  <span className="text-[10px] text-rose-600 bg-rose-50 px-1 rounded font-semibold">
                    Billing Settlement
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Indeks Brand Virality</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-purple-600">8.8 / 10</span>
                  <span className="text-[10px] text-purple-600 font-semibold">Trending Tech</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-purple-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Pemantauan Sentimen Multi-Platform (Social & Media)
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400">
                  Klik postingan untuk melihat sinyal kata kunci & rekomendasi preskriptif AI
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOCK_MARKETING_SENTIMENT_POSTS.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleOpenSentiment(post)}
                    className="cursor-pointer group rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-purple-500 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300">
                        {post.platform}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(post.timestamp).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">
                        &ldquo;{post.caption}&rdquo;
                      </p>
                    </div>

                    {/* Compact sentiment bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-emerald-600">
                          {post.sentimentBreakdown.positive}% Positif
                        </span>
                        <span className="text-slate-400">
                          {post.sentimentBreakdown.neutral}% Netral ·{' '}
                          <span className="text-rose-500">{post.sentimentBreakdown.negative}% Neg</span>
                        </span>
                      </div>
                      <div className="flex h-2 w-full rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500"
                          style={{ width: `${post.sentimentBreakdown.positive}%` }}
                        />
                        <div
                          className="bg-slate-300 dark:bg-slate-600"
                          style={{ width: `${post.sentimentBreakdown.neutral}%` }}
                        />
                        <div
                          className="bg-rose-500"
                          style={{ width: `${post.sentimentBreakdown.negative}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-3 text-slate-400">
                        <span>❤️ {post.likes.toLocaleString()}</span>
                        <span>💬 {post.comments.toLocaleString()}</span>
                      </div>
                      <span className="text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Detail Analisis <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER JOURNEY AIDA FUNNEL */}
        {activeTab === 'customer_journey' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>Analisis Corong Perjalanan Pelanggan (AIDA Funnel)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Pemetaan konversi dari Awareness (10,000) hingga Closed Contracts (540) dengan rekomendasi preskriptif.
              </p>
            </div>

            {/* Visual Funnel progression */}
            <div className="space-y-4">
              {MOCK_CUSTOMER_JOURNEY_AIDA.map((stage, idx) => {
                const widthPercent =
                  idx === 0 ? 100 : idx === 1 ? 75 : idx === 2 ? 50 : 35;
                return (
                  <div
                    key={stage.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-xs dark:bg-purple-950/60 dark:text-purple-300">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                          {stage.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-mono font-bold text-purple-600 text-sm">
                          {stage.count.toLocaleString()} Prospek
                        </span>
                        <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                          Konversi: {stage.conversionFromPrev}%
                        </span>
                      </div>
                    </div>

                    {/* Funnel Progress Visual */}
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>

                    {/* 3-Tier Analytics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs pt-1">
                      <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                        <span className="font-semibold text-[10px] uppercase tracking-wider text-slate-400">
                          1. Deskriptif (Fakta Saat Ini)
                        </span>
                        <p className="mt-1 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                          {stage.analyticsType.descriptive}
                        </p>
                      </div>

                      <div className="rounded-lg bg-indigo-50/50 p-2.5 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                        <span className="font-semibold text-[10px] uppercase tracking-wider text-indigo-500">
                          2. Prediktif (Proyeksi AI)
                        </span>
                        <p className="mt-1 text-[11px] text-indigo-900 dark:text-indigo-300 leading-relaxed">
                          {stage.analyticsType.predictive}
                        </p>
                      </div>

                      <div className="rounded-lg bg-emerald-50/50 p-2.5 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                        <span className="font-semibold text-[10px] uppercase tracking-wider text-emerald-600">
                          3. Preskriptif (Solusi Otomatis)
                        </span>
                        <p className="mt-1 text-[11px] text-emerald-950 dark:text-emerald-300 leading-relaxed">
                          {stage.analyticsType.prescriptive}
                        </p>
                      </div>
                    </div>

                    {/* Drop-off barriers */}
                    <div className="text-[11px] text-slate-500">
                      <span className="font-semibold text-rose-600">Hambatan Drop-Off:</span>{' '}
                      {stage.dropOffBarriers.join(' • ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: OUTBOUND CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Send className="h-5 w-5 text-purple-600" />
                  <span>Outbound Campaigns & Lead Nurturing (Simulation Mode)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Desain pesan kampanye omnichannel terpersonalisasi dengan variabel dinamis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Campaign list */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Daftar Kampanye
                </span>
                {campaigns.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => setActiveCampaign(camp)}
                    className={`w-full text-left rounded-xl p-3 text-xs transition-all border ${
                      activeCampaign.id === camp.id
                        ? 'border-purple-500 bg-purple-50/50 text-purple-900 font-semibold dark:bg-purple-950/50 dark:text-purple-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold truncate">{camp.name}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          camp.status === 'sent'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {camp.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 truncate">{camp.audience}</p>
                  </button>
                ))}
              </div>

              {/* Campaign preview & editor */}
              <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {activeCampaign.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Target:{' '}
                      <strong className="text-slate-700 dark:text-slate-300">
                        {activeCampaign.audience}
                      </strong>{' '}
                      ({activeCampaign.recipientsCount} penerima)
                    </p>
                  </div>

                  <button
                    onClick={() => handleSimulateCampaign(activeCampaign.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 font-semibold text-white hover:bg-purple-700 transition-colors shadow-2xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Jalankan Simulasi Kirim</span>
                  </button>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-slate-500">Subjek Template:</span>
                  <input
                    type="text"
                    readOnly
                    value={activeCampaign.templateSubject}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-medium text-slate-500">
                    Isi Pesan (Dengan Variabel Dinamis {`{{name}}`}, {`{{company}}`}):
                  </span>
                  <textarea
                    rows={6}
                    readOnly
                    value={activeCampaign.templateBody}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-mono text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 leading-relaxed"
                  />
                </div>

                {/* Campaign metrics simulation */}
                {activeCampaign.openRate !== undefined && activeCampaign.openRate > 0 && (
                  <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">Open Rate</span>
                      <p className="font-bold text-purple-600 text-sm">{activeCampaign.openRate}%</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">Click Rate</span>
                      <p className="font-bold text-indigo-600 text-sm">{activeCampaign.clickRate}%</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">Response Rate</span>
                      <p className="font-bold text-emerald-600 text-sm">
                        {activeCampaign.responseRate}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MARKET & PRESCRIPTIVE INSIGHTS */}
        {activeTab === 'insights' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>Market Trends & AI Strategic Prescriptions</span>
              </h2>
              <p className="text-xs text-slate-500">
                Peluang ekspansi pasar enterprise dan langkah mitigasi reputasi berdasarkan sentimen online.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20 space-y-2">
                <h3 className="font-bold text-indigo-950 dark:text-indigo-300">
                  Peluang Dominasi Segmen Perbankan & Asuransi
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Survei OJK dan sentimen medsos menunjukkan lonjakan 45% dalam kebutuhan automasi perbankan yang patuh regulasi data lokal. CiptadraSoft memiliki keunggulan kompetitif dengan opsi deployment on-premise dan sertifikasi ISO 27001.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20 space-y-2">
                <h3 className="font-bold text-emerald-950 dark:text-emerald-300">
                  Kampanye Retargeting Prospek Terkendala Legalitas CapEx
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Gunakan skema lisensi OPEX bulanan dan integrasi Flow BPM e-sign untuk memangkas hambatan penandatanganan dokumen legal dari 14 hari menjadi 3 hari kerja.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sentiment Detail Drawer */}
      <SentimentDetailDrawer
        isOpen={isSentimentDrawerOpen}
        item={selectedSentiment}
        onClose={() => setIsSentimentDrawerOpen(false)}
      />
    </div>
  );
};
