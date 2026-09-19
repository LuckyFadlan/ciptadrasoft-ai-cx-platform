'use client';

import React from 'react';
import {
  X,
  UserCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Award,
  BookOpen,
  Send,
  MessageSquare,
  ShieldCheck,
  BarChart2
} from 'lucide-react';
import { AgentPerformanceRecord } from '@/types/chatbot';

interface AgentDetailDrawerProps {
  isOpen: boolean;
  agent: AgentPerformanceRecord | null;
  onClose: () => void;
  onAssignCoaching?: (agentId: string) => void;
}

export const AgentDetailDrawer: React.FC<AgentDetailDrawerProps> = ({
  isOpen,
  agent,
  onClose,
  onAssignCoaching
}) => {
  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold text-xs text-slate-900 dark:text-white">
                Detail Profil & Scorecard Agen
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Agent info badge */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                {agent.agentCode}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                    {agent.agentName}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Online
                  </span>
                </div>
                <p className="text-xs text-slate-500">Omnichannel Customer Service Specialist</p>
                <div className="mt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  {agent.openTicketsCount} Tiket Aktif · {agent.resolvedToday} Diselesaikan Hari Ini
                </div>
              </div>
            </div>

            {/* Core KPIs */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Metrik Kinerja Utama (Live)
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                  <span className="text-[11px] text-slate-500">SLA Adherence</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {agent.slaAdherencePct}%
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">Target 90%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(agent.slaAdherencePct || agent.slaComplianceRate || 0, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                  <span className="text-[11px] text-slate-500">First Contact Resolution</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {agent.fcrPct || 85}%
                    </span>
                    <span className="text-[10px] text-indigo-600 font-medium">Target 80%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${Math.min(agent.fcrPct || 85, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                  <span className="text-[11px] text-slate-500">Rata-rata Penanganan (AHT)</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {agent.avgHandlingTimeMinutes || agent.avgHandlingTimeMin || 14} mnt
                    </span>
                    <span className="text-[10px] text-slate-400">Normal</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                  <span className="text-[11px] text-slate-500">Kepuasan Pelanggan (CSAT)</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-amber-500">
                      ★ {agent.csatScore.toFixed(1)} / 5.0
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">+0.3 MoM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Coaching & Weak Spots */}
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-950 dark:text-indigo-300">
                <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Analisis Supervisi AI & Peluang Peningkatan</span>
              </div>

              {agent.weakSpotAreas && agent.weakSpotAreas.length > 0 && (
                <div>
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    Area Perhatian Khusus:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {agent.weakSpotAreas.map((area, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-medium text-rose-700 shadow-2xs dark:bg-slate-900 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {agent.coachingRecommendation && (
                <div className="rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700 dark:bg-slate-900 dark:text-slate-300 border border-indigo-100 dark:border-indigo-900/40">
                  <span className="font-semibold text-indigo-900 dark:text-indigo-300">
                    Rekomendasi Kurikulum AI:
                  </span>
                  <p className="mt-1 text-[11px]">{agent.coachingRecommendation}</p>
                </div>
              )}

              {onAssignCoaching && (
                <button
                  onClick={() => onAssignCoaching(agent.agentId || agent.id)}
                  className="w-full rounded-lg bg-indigo-600 py-2 text-center text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Tugaskan Modul Pelatihan AI
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
