'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Mic,
  TrendingUp,
  Clock,
  GraduationCap,
  FileText,
  Search,
  CheckCircle,
  AlertTriangle,
  Play,
  Sparkles,
  BarChart2,
  Calendar,
  Activity,
  ArrowUpRight,
  UserCheck,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import {
  UserSession,
  IndustryDomain,
  AgentPerformanceRecord,
  CallAnalyticsRecord
} from '@/types/chatbot';
import {
  MOCK_AGENT_PERFORMANCE,
  MOCK_CALL_ANALYTICS,
  MOCK_QM_EVALUATIONS,
  MOCK_CSAT_METRICS,
  MOCK_PREDICTIVE_NEEDS,
  MOCK_TRAINING_PLANS,
  MOCK_AI_ACTIVITY_LOG,
  MOCK_WORKFORCE_DATA,
  MOCK_EXECUTIVE_SUMMARY
} from '@/components/service-platform/mockData';
import { AgentDetailDrawer } from '@/components/drawers/AgentDetailDrawer';
import { CallAnalyticsDrawer } from '@/components/drawers/CallAnalyticsDrawer';

interface SupervisorWorkspaceProps {
  session: UserSession;
  activeTab: string;
  currentIndustry: IndustryDomain;
  searchQuery: string;
}

export const SupervisorWorkspace: React.FC<SupervisorWorkspaceProps> = ({
  session,
  activeTab,
  currentIndustry,
  searchQuery
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentPerformanceRecord | null>(null);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<CallAnalyticsRecord | null>(null);
  const [isCallDrawerOpen, setIsCallDrawerOpen] = useState(false);

  const handleOpenAgent = (agent: AgentPerformanceRecord) => {
    setSelectedAgent(agent);
    setIsAgentDrawerOpen(true);
  };

  const handleOpenCall = (call: CallAnalyticsRecord) => {
    setSelectedCall(call);
    setIsCallDrawerOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* TAB 1: TEAM MONITORING */}
        {activeTab === 'team_overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Agen Aktif / Terjadwal</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">4 / 4</span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    100% On-Duty
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Okupansi Tim (Occupancy)</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    78.4%
                  </span>
                  <span className="text-[10px] text-slate-400">Target 75-85%</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Kepatuhan SLA Keseluruhan</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-emerald-600">93.2%</span>
                  <span className="text-[10px] text-emerald-600 font-medium">+2.1% MoM</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">CSAT Kontak Tim</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-amber-500">★ 4.74</span>
                  <span className="text-[10px] text-slate-400">dari 5.0</span>
                </div>
              </div>
            </div>

            {/* Agent Live Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Status Kinerja & Beban Antrean Agen
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400">
                  Klik agen untuk membuka scorecard detail & rekomendasi coaching
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-850 text-[11px] font-semibold text-slate-500">
                    <tr>
                      <th className="py-2.5 px-3">Kode & Nama Agen</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Beban Antrean</th>
                      <th className="py-2.5 px-3">SLA %</th>
                      <th className="py-2.5 px-3">FCR %</th>
                      <th className="py-2.5 px-3">CSAT</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {MOCK_AGENT_PERFORMANCE.map((ag) => (
                      <tr
                        key={ag.agentId}
                        onClick={() => handleOpenAgent(ag)}
                        className="cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                              {ag.agentCode}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-white">
                                {ag.agentName}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {ag.agentCode === 'CS A'
                                  ? 'Technical Specialist'
                                  : ag.agentCode === 'CS B'
                                  ? 'Billing Specialist'
                                  : 'Omnichannel Agent'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            Online
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {ag.openTicketsCount} aktif
                          </span>{' '}
                          <span className="text-slate-400 text-[10px]">
                            ({ag.resolvedToday} selesai)
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-emerald-600">
                          {ag.slaAdherencePct}%
                        </td>
                        <td className="py-3 px-3 font-semibold text-indigo-600 dark:text-indigo-400">
                          {ag.fcrPct}%
                        </td>
                        <td className="py-3 px-3 font-semibold text-amber-500">
                          ★ {ag.csatScore.toFixed(1)}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-indigo-600 hover:text-indigo-700 font-medium text-[11px] inline-flex items-center gap-1">
                            Scorecard <ChevronRight className="h-3 w-3" />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUALITY MONITORING (QM) */}
        {activeTab === 'quality_monitoring' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Rata-rata Skor Mutu AI</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    91.4 / 100
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1 rounded">
                    Sangat Baik
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Response Accuracy</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">94.8%</span>
                  <span className="text-[10px] text-slate-400">SOP Aligned</span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">Evaluasi Selesai (MoTD)</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {MOCK_QM_EVALUATIONS.length} Kasus
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">100% Audit</span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] text-slate-500">SLA Audit Compliance</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-emerald-600">96.0%</span>
                  <span className="text-[10px] text-slate-400">OJK Compliant</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-600" />
                <span>Log Evaluasi Quality Monitoring Otomatis</span>
              </h2>

              <div className="space-y-3">
                {MOCK_QM_EVALUATIONS.map((qm) => (
                  <div
                    key={qm.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {qm.ticketId}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {qm.customerName}
                        </span>
                        <span className="text-slate-500">({qm.agentName})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                          Skor AI: {qm.aiQualityScore}/100
                        </span>
                        <span className="text-amber-500 font-bold">★ {qm.customerRating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-50 p-2 rounded-lg dark:bg-slate-800">
                      <div>
                        <span className="text-slate-400">Akurasi Respon:</span>{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {qm.responseQuality}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Tuntas Resolusi:</span>{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {qm.resolutionQuality}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Kepatuhan SLA:</span>{' '}
                        <span className="font-semibold text-emerald-600">
                          {qm.slaMet ? 'Tercapai (On-time)' : 'Terlambat'}
                        </span>
                      </div>
                    </div>

                    {qm.customerFeedback && (
                      <p className="text-slate-600 dark:text-slate-300 italic text-[11px]">
                        Feedback Nasabah: &ldquo;{qm.customerFeedback}&rdquo;
                      </p>
                    )}

                    {qm.trainingNeedFlag && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/60">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        <span>Catatan AI Supervisi: {qm.trainingNeedFlag}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SPEECH ANALYTICS */}
        {activeTab === 'speech_analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mic className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Speech Analytics & Voice Call Intelligence</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Analisis otomatis rekaman panggilan CS support dan sales negotiation berbasis AI Speech-to-Text.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_CALL_ANALYTICS.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleOpenCall(c)}
                  className="cursor-pointer group rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-indigo-500 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {c.callNumber}
                      </span>
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                          c.callType === 'sales_negotiation'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {c.callType === 'sales_negotiation' ? 'Sales Call' : 'CS Support'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {Math.floor(c.durationSeconds / 60)}m {c.durationSeconds % 60}s
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {c.customerName} ↔ {c.agentName}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.topic}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-lg dark:bg-slate-800">
                    <div>
                      <span className="text-slate-400">Pace:</span>{' '}
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {c.speakingPaceWpm} WPM
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Interupsi:</span>{' '}
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {c.interruptionCount} kali
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      Observasi AI:
                    </span>{' '}
                    <span className="line-clamp-2">{c.aiObservations[0]}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      Sentimen: <strong className="text-emerald-600">{c.sentiment}</strong>
                    </span>
                    <span className="text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold">
                      Buka Transkrip & Player <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PREDICTIVE SERVICE */}
        {activeTab === 'predictive_service' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span>Predictive Customer Needs & Churn Prevention</span>
              </h2>
              <p className="text-xs text-slate-500">
                Peringatan dini AI terhadap anomali SLA, potensi kehabisan kuota, dan resiko churn korporasi.
              </p>
            </div>

            <div className="space-y-3">
              {MOCK_PREDICTIVE_NEEDS.map((pn) => (
                <div
                  key={pn.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {pn.company}
                      </span>
                      <span className="text-slate-400 text-xs ml-2">({pn.customerName})</span>
                    </div>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${
                        pn.riskLevel === 'High'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : pn.riskLevel === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      Resiko Churn: {pn.riskLevel}
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60 space-y-1">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Potensi Kebutuhan / Resiko Terdeteksi:
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      {pn.potentialNeed}
                    </p>
                  </div>

                  <div className="rounded-lg bg-indigo-50/50 p-3 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                    <div className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                      Rekomendasi Tindakan Proaktif:
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      {pn.recommendedAction}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>Tenggat Waktu: {pn.dueDate}</span>
                    <button className="rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs">
                      Jadwalkan Kontak Proaktif
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WORKFORCE MANAGEMENT (WFM) */}
        {activeTab === 'workforce' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span>Workforce Management (WFM) & Alokasi Shift</span>
              </h2>
              <p className="text-xs text-slate-500">
                Jadwal kerja harian, status istirahat (break tracking), dan kapasitas tampung panggilan.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-850 text-[11px] font-semibold text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">Nama Agen</th>
                    <th className="py-2.5 px-3">Beban Kerja Aktif</th>
                    <th className="py-2.5 px-3">Status Beban</th>
                    <th className="py-2.5 px-3">Utilisasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MOCK_WORKFORCE_DATA.workloadDistribution.map((wf, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                        {wf.agentName}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-mono">
                        {wf.activeTickets} / {wf.capacity} Tiket Aktif
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                            wf.status === 'Optimal'
                              ? 'bg-emerald-50 text-emerald-600'
                              : wf.status === 'High Load'
                              ? 'bg-rose-50 text-rose-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {wf.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {Math.round((wf.activeTickets / wf.capacity) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: TRAINING PLANS */}
        {activeTab === 'training' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span>Rencana Pelatihan AI & Perbaikan Mutu</span>
              </h2>
              <p className="text-xs text-slate-500">
                Program coaching terpersonalisasi yang dirancang otomatis dari hasil evaluasi QM dan Speech Analytics.
              </p>
            </div>

            <div className="space-y-3">
              {MOCK_TRAINING_PLANS.map((tp) => (
                <div
                  key={tp.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-2.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{tp.title}</h3>
                      <span className="text-slate-400 text-[11px]">
                        Ditugaskan untuk: <strong className="text-indigo-600">{tp.targetAgentName}</strong>
                      </span>
                    </div>
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {tp.estimatedHours} Jam Modul
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {tp.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500">Tenggat Penyelesaian: {tp.dueDate}</span>
                    <button className="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-medium text-indigo-600 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
                      Tinjau Kurikulum
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SUMMARIES & LOG */}
        {activeTab === 'summaries' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Executive summary */}
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  Ringkasan Eksekutif Harian (AI Operations Briefing)
                </span>
                <span className="text-[10px] text-slate-400">Diperbarui 5 menit lalu</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg bg-white p-3 dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40">
                  <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                    Insiden Utama Teratasi:
                  </span>
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {MOCK_EXECUTIVE_SUMMARY.keyIncidents}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-3 dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40">
                  <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                    Akar Permasalahan (Root Cause):
                  </span>
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {MOCK_EXECUTIVE_SUMMARY.rootCause}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-3 dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40">
                  <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                    Tindakan Lanjutan (Action Items):
                  </span>
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {MOCK_EXECUTIVE_SUMMARY.actionItems}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Activity Log */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500" />
                <span>Audit Trail Keputusan Otomatis AI</span>
              </h2>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {MOCK_AI_ACTIVITY_LOG.map((log) => (
                    <div key={log.id} className="p-3.5 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {log.action}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{log.details}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawers */}
      <AgentDetailDrawer
        isOpen={isAgentDrawerOpen}
        agent={selectedAgent}
        onClose={() => setIsAgentDrawerOpen(false)}
      />
      <CallAnalyticsDrawer
        isOpen={isCallDrawerOpen}
        call={selectedCall}
        onClose={() => setIsCallDrawerOpen(false)}
      />
    </div>
  );
};
