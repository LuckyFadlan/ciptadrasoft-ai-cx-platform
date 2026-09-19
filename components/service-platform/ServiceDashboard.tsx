'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Cpu,
  Layers,
  Sparkles,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_DASHBOARD_METRICS } from './mockData';

export const ServiceDashboard: React.FC = () => {
  const metrics = MOCK_DASHBOARD_METRICS;

  return (
    <div className="space-y-6">
      {/* PROTOTYPE DEMO BANNER */}
      <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Prototype Demo Data:</strong> Metrik di bawah ini disimulasikan secara real-time mencerminkan telemetry contact center skala enterprise dengan ribuan interaksi bulanan.
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase bg-blue-200 text-blue-800 px-2 py-0.5 rounded shrink-0">
          Telemetry Live
        </span>
      </div>

      {/* 6 TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Tiket</span>
          <div className="text-xl font-black text-slate-900">{metrics.totalTickets.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">Bulan Berjalan</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Tiket Terbuka</span>
          <div className="text-xl font-black text-blue-600">{metrics.openTickets}</div>
          <div className="text-[10px] text-blue-700 font-semibold">Sedang Ditangani</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Selesai Hari Ini</span>
          <div className="text-xl font-black text-emerald-600">{metrics.resolvedToday}</div>
          <div className="text-[10px] text-emerald-700 font-semibold">+14 vs Kemarin</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Komplain Urgent</span>
          <div className="text-xl font-black text-red-600">{metrics.urgentTickets}</div>
          <div className="text-[10px] text-red-600 font-semibold">SLA Prioritas 1-2 Jam</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">SLA Compliance</span>
          <div className="text-xl font-black text-emerald-600">{metrics.slaComplianceRate}%</div>
          <div className="text-[10px] text-emerald-700 font-semibold">Target &gt; 95% Terpenuhi</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Akurasi AI Classifier</span>
          <div className="text-xl font-black text-indigo-600">{metrics.aiClassificationAccuracy}%</div>
          <div className="text-[10px] text-indigo-700 font-semibold">Zero Routing Errors</div>
        </div>
      </div>

      {/* 2-COLUMN CHARTS & BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: CHANNEL DISTRIBUTION */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Distribusi Kanal Omnichannel</h3>
            <span className="text-[10px] text-slate-400 font-semibold">Onebox CX</span>
          </div>

          <div className="space-y-3">
            {metrics.channelDistribution.map((ch) => (
              <div key={ch.channel} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{ch.channel}</span>
                  <span className="font-bold text-slate-900">{ch.percentage}% ({ch.count})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${ch.percentage}%`, backgroundColor: ch.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            WhatsApp mendominasi 54% interaksi inbound, disusul Webchat Onebox pada landing page (28%).
          </p>
        </div>

        {/* CARD 2: CATEGORY BREAKDOWN */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Klasifikasi Kategori Tiket</h3>
            <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
              AI Auto-Tagged
            </span>
          </div>

          <div className="space-y-2.5">
            {metrics.categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{cat.category}</span>
                  <span className="font-bold text-slate-900">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${cat.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 3: OPERATIONAL SPEED & EFFICIENCY */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Efisiensi AI vs Konvensional</h3>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              +65% Produktivitas
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Rata-rata Waktu Penanganan (AHT)</span>
              <div className="flex items-center justify-between">
                <span className="line-through text-slate-400">45 Menit (Manual)</span>
                <span className="font-black text-emerald-600 text-sm">18.5 Menit (AI Assist)</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Waktu Pemilahan & Routing Tiket</span>
              <div className="flex items-center justify-between">
                <span className="line-through text-slate-400">120 Menit / batch</span>
                <span className="font-black text-blue-600 text-sm">2.4 Detik / tiket</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold">First Contact Resolution (FCR)</span>
              <div className="flex items-center justify-between">
                <span className="line-through text-slate-400">58% Standar</span>
                <span className="font-black text-indigo-600 text-sm">82.4% Dengan KB AI</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
