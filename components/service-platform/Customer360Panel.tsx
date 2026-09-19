'use client';

import React from 'react';
import {
  User,
  Building,
  Mail,
  Phone,
  ShieldCheck,
  Clock,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MOCK_CUSTOMER_360 } from './mockData';
import { PlatformView } from '@/types/chatbot';

interface Customer360PanelProps {
  onSwitchView?: (view: PlatformView) => void;
}

export const Customer360Panel: React.FC<Customer360PanelProps> = ({ onSwitchView }) => {
  const profile = MOCK_CUSTOMER_360;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* HEADER WITH SLA BADGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20">
            {profile.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">{profile.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                SLA Tier: {profile.slaTier}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.company}</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.phone}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6">
          <div className="text-[10px] uppercase font-bold text-slate-400">Aktif Sejak</div>
          <div className="text-xs font-bold text-slate-800">{profile.activeSince}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1 sm:justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Klien Prioritas Aktif</span>
          </div>
        </div>
      </div>

      {/* 4 SUMMARY STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Tiket Seumur Hidup</div>
          <div className="text-xl font-black text-slate-900 mt-0.5">{profile.totalTickets} Tiket</div>
          <div className="text-[10px] text-slate-500 mt-0.5">3 Kanal Omnichannel</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-400">Tingkat Resolusi</div>
          <div className="text-xl font-black text-emerald-600 mt-0.5">{profile.resolvedRate}%</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Di atas SLA (Target 90%)</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-400">Rata-rata Skor CSAT</div>
          <div className="text-xl font-black text-blue-600 mt-0.5">{profile.averageCsat} / 5.0</div>
          <div className="text-[10px] text-blue-700 font-semibold mt-0.5">Sangat Puas</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-400">Trend Sentimen AI</div>
          <div className="text-xl font-black text-indigo-600 mt-0.5">{profile.sentimentTrend}</div>
          <div className="text-[10px] text-indigo-700 font-semibold mt-0.5">Retensi Tinggi</div>
        </div>
      </div>

      {/* PRODUCTS IN USE & AI INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Products in use (5 Cols) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Produk Ciptadra yang Digunakan:</span>
          </div>
          <div className="space-y-2">
            {profile.productsInUse.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs"
              >
                <span>{p}</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Customer Insights (7 Cols) */}
        <div className="md:col-span-7 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-blue-50/70 border border-indigo-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Insights & Prediksi Retensi:</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              Churn Risk: {profile.aiInsights.churnRisk.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2 text-xs text-indigo-900">
            <div>
              <span className="font-bold text-indigo-950 block mb-0.5">Rekomendasi Tindak Lanjut Otomatis:</span>
              <p className="bg-white/80 p-2.5 rounded-xl border border-indigo-100 leading-relaxed text-[11px]">
                {profile.aiInsights.recommendedNextStep}
              </p>
            </div>

            <div>
              <span className="font-bold text-indigo-950 block mb-0.5">Pola Masalah Berulang Terdeteksi:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-indigo-900">
                {profile.aiInsights.recurringIssuePatterns.map((pat, idx) => (
                  <li key={idx}>{pat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* OMNICHANNEL TOUCHPOINTS TIMELINE */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">
            Riwayat Interaksi Omnichannel Terakhir
          </h3>
          <span className="text-xs text-slate-400">Sinkronisasi Real-Time</span>
        </div>

        <div className="space-y-2.5">
          {profile.recentTouchpoints.map((tp) => (
            <div
              key={tp.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  tp.channel === 'WhatsApp'
                    ? 'bg-emerald-100 text-emerald-700'
                    : tp.channel === 'Webchat'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {tp.channel.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{tp.channel}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(tp.timestamp).toLocaleDateString()}
                    </span>
                    {tp.agentName && (
                      <span className="text-[10px] text-slate-500 font-medium">
                        • Ditangani oleh {tp.agentName}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mt-0.5 text-[11px]">{tp.summary}</p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  tp.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {tp.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
