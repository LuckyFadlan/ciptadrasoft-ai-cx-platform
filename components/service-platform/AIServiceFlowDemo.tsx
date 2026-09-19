'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Ticket as TicketIcon,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileText,
  UserCheck,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Clock,
  ExternalLink,
  ChevronRight,
  Zap,
  Building2,
  Info
} from 'lucide-react';
import {
  DEMO_SCENARIOS,
  SERVENOW_CASE_DATA,
  DemoScenario
} from './mockData';
import { Ticket, TicketClassification, PlatformView } from '@/types/chatbot';

interface AIServiceFlowDemoProps {
  onSwitchView: (view: PlatformView) => void;
  onSelectTicketForAgent?: (ticket: Ticket) => void;
}

export const AIServiceFlowDemo: React.FC<AIServiceFlowDemoProps> = ({
  onSwitchView,
  onSelectTicketForAgent
}) => {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isServeNowMode, setIsServeNowMode] = useState<boolean>(false);

  // Dynamic state that gets built as the flow progresses
  const [classification, setClassification] = useState<TicketClassification>(
    DEMO_SCENARIOS[0].defaultClassification
  );
  const [appliedAction, setAppliedAction] = useState<string | null>(null);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < 10) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2400);
    } else if (isPlaying && currentStep === 10) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const handleSelectScenario = (scenario: DemoScenario) => {
    setActiveScenario(scenario);
    setClassification(scenario.defaultClassification);
    setCurrentStep(1);
    setIsPlaying(false);
    setAppliedAction(null);
  };

  const handleNext = () => {
    if (currentStep < 10) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsPlaying(false);
    setAppliedAction(null);
  };

  const stepsMeta = [
    { num: 1, title: 'Inbound Customer', icon: MessageSquare, short: 'Inbound' },
    { num: 2, title: 'Ticket Created', icon: TicketIcon, short: 'Ticket' },
    { num: 3, title: 'AI Classification', icon: Cpu, short: 'Classify' },
    { num: 4, title: 'Queue Assignment', icon: Layers, short: 'Routing' },
    { num: 5, title: 'Agent Assist', icon: Sparkles, short: 'Assist' },
    { num: 6, title: 'Knowledge Recs', icon: BookOpen, short: 'Knowledge' },
    { num: 7, title: 'Resolution & Action', icon: CheckCircle2, short: 'Resolve' },
    { num: 8, title: 'Automated Summary', icon: FileText, short: 'Summary' },
    { num: 9, title: 'Customer 360', icon: UserCheck, short: 'Profile' },
    { num: 10, title: 'Ops Dashboard', icon: BarChart3, short: 'Analytics' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER & CONTROLS */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                End-to-End Workflow
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Step {currentStep} of 10
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Service Flow & Live Demonstration
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Saksikan bagaimana CiptadraSoft menghubungkan Chatbot Omnichannel, Klasifikasi Otomatis, Agent Assist, Rekomendasi Knowledge, hingga Ringkasan Eksekutif menjadi satu alur terintegrasi.
            </p>
          </div>

          {/* SERVENOW CASE DEMO TOGGLE */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsServeNowMode(!isServeNowMode)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isServeNowMode
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>ServeNow Case Study Mode</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isServeNowMode ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {isServeNowMode ? 'ACTIVE' : 'OFF'}
              </span>
            </button>
          </div>
        </div>

        {/* SERVENOW CASE STUDY BANNER (WHEN ACTIVE) */}
        {isServeNowMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950">ServeNow Demo Case Assumptions:</span>
                <p className="text-amber-800 mt-0.5">
                  Organisasi dengan <strong>78 Karyawan</strong> menangani rata-rata <strong>43 Komplain Kritis per tahun</strong> dengan pencapaian SLA sebelumnya <strong>78%</strong>. Alur AI Service Flow mendemonstrasikan eliminasi pemilahan manual dari 2 jam menjadi 2.4 detik dan target SLA 96%+.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3 py-1 rounded-lg bg-amber-100/80 border border-amber-300 font-semibold text-amber-900 text-center">
                <div className="text-[10px] uppercase text-amber-700">Pencapaian SLA</div>
                <div className="text-sm font-bold text-amber-900">78% → 96%+</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4 ONE-CLICK DEMO SCENARIO SELECTOR BUTTONS */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Pilih Skenario Live Demo (1-Click Switch):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DEMO_SCENARIOS.map((sc) => {
              const isSelected = activeScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {sc.channel}
                      </span>
                      <span className={`text-[10px] font-bold ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}>
                        {sc.category}
                      </span>
                    </div>
                    <div className="font-extrabold text-sm line-clamp-1">{sc.name}</div>
                    <div className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                      {sc.shortDesc}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] font-medium text-blue-100">
                      <span>Skenario Aktif</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 10-STEP PROGRESS STEPPER TIMELINE */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 overflow-x-auto custom-scrollbar">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {stepsMeta.map((s, idx) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            const Icon = s.icon;
            return (
              <React.Fragment key={s.num}>
                <button
                  onClick={() => setCurrentStep(s.num)}
                  className={`flex flex-col items-center gap-1.5 transition-all text-center group cursor-pointer ${
                    isCurrent ? 'scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md shadow-blue-600/30'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-[11px] font-bold whitespace-nowrap ${
                    isCurrent ? 'text-blue-600' : isCompleted ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    {s.short}
                  </span>
                </button>
                {idx < stepsMeta.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 transition-colors ${
                      currentStep > idx + 1 ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* MAIN STEP SHOWCASE STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / CENTER: STEP CONTENT CARD (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScenario.id}-${currentStep}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              {/* STEP 1: Inbound Message */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        Langkah 1 • Inbound Omnichannel
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Pesan Masuk dari Pelanggan ({activeScenario.channel})
                      </h2>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                      <div className="font-semibold text-slate-800">
                        {activeScenario.customerName} ({activeScenario.companyName})
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        Kanal: {activeScenario.channel}
                      </span>
                    </div>
                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed italic">
                      "{activeScenario.initialComplaint}"
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Otomatisasi Onebox Ingestion:</span>
                    </div>
                    <p className="text-blue-800">
                      Pesan ditangkap secara real-time melalui webhook Onebox Omnichannel, langsung memicu pembuatan tiket tanpa intervensi manual agen.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: Ticket Created */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <TicketIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Langkah 2 • Tiket Terbuat
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Tiket Digenerate: #TKT-8402
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Nomor Tiket</div>
                      <div className="text-sm font-bold text-slate-900">#TKT-8402</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Pelanggan</div>
                      <div className="text-sm font-semibold text-slate-800 truncate">{activeScenario.customerName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Perusahaan</div>
                      <div className="text-sm font-semibold text-slate-800 truncate">{activeScenario.companyName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Waktu Ingestion</div>
                      <div className="text-sm font-semibold text-slate-800">&lt; 0.4 Detik</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-mono">
                      <span>Payload Metadata</span>
                      <span className="text-emerald-400">200 OK</span>
                    </div>
                    <code className="text-emerald-300 font-mono text-[11px] block overflow-x-auto whitespace-pre">
{`{
  "ticketId": "tkt-8402",
  "channel": "${activeScenario.channel}",
  "sender": "${activeScenario.customerName}",
  "accountTier": "Enterprise Gold",
  "status": "RAW_INBOUND"
}`}
                    </code>
                  </div>
                </div>
              )}

              {/* STEP 3: AI Classification */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        Langkah 3 • Klasifikasi AI Otomatis
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Ciptadra AI Classifier Ekstraksi Konteks
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Kategori</span>
                      <div className="text-sm font-black text-blue-700 mt-0.5">{classification.category}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Prioritas</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          classification.priority === 'Urgent' ? 'bg-red-500 animate-ping' : 'bg-amber-500'
                        }`} />
                        <span className="text-sm font-black text-red-600">{classification.priority}</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Target SLA</span>
                      <div className="text-sm font-black text-indigo-700 mt-0.5">{classification.slaHours} Jam Max</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Alasan Klasifikasi (AI Reasoning):</span>
                    </div>
                    <p className="text-indigo-900 leading-relaxed">{classification.reasoning}</p>
                    <div className="flex items-center justify-between text-[11px] pt-1 text-indigo-700 border-t border-indigo-200/60">
                      <span>Sentiment: <strong>{classification.sentiment}</strong> (Skor Urgensi: {classification.urgencyScore}/100)</span>
                      <span>Confidence: <strong>{(classification.confidenceScore * 100).toFixed(0)}%</strong></span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Queue Assignment */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                        Langkah 4 • Routing & Queue Assignment
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Dialokasikan ke Departemen: {classification.department}
                      </h2>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-900">Antrean Kerja (Active Queue):</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 font-bold">
                        Priority Queue #1
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-purple-100 text-xs space-y-1">
                      <div className="font-bold text-slate-900">Petugas Ditugaskan:</div>
                      <div className="text-slate-600">
                        {classification.department === 'Finance & Billing' && 'Rian Pratama (Finance Support Lead)'}
                        {classification.department === 'Core Engineering' && 'Agus Setiawan (DevOps On-Call Engineer)'}
                        {classification.department === 'Customer Success' && 'Clara Michelle (Senior CS Manager)'}
                        {classification.department === 'Solutions Architecture' && 'Fahmi Reza (Principal Solutions Architect)'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-800">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span>SLA Countdown Aktif: <strong>{classification.slaHours}:00:00</strong> tersisa.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Agent Assist */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Langkah 5 • Agent Assist AI
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        AI Menyiapkan Draf Tanggapan & Aksi Cepat
                      </h2>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Draf Respon Rekomendasi AI:</span>
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold text-[10px]">
                        Confidence 96%
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      Halo Bapak/Ibu {activeScenario.customerName}, kami mohon maaf atas kendala yang dialami. Tim kami telah memverifikasi transaksi dan segera mengambil tindakan mitigasi darurat agar operasional perusahaan Anda tetap berjalan lancar.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700">Aksi Kontekstual yang Direkomendasikan:</div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setAppliedAction(activeScenario.suggestedActionLabel)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          appliedAction === activeScenario.suggestedActionLabel
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                        }`}
                      >
                        ⚡ 1-Click: {activeScenario.suggestedActionLabel}
                      </button>
                      <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        Eskalasi ke Supervisor
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Knowledge Recommendation */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        Langkah 6 • Knowledge Recommendation
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Artikel SOP & Dokumentasi Terkait
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          SOP Rekonsiliasi Gateway & Aktivasi Darurat 24 Jam
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          98% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                        Memberikan panduan membuka kunci akses darurat bagi klien enterprise saat notifikasi transfer BCA VA mengalami delay antrean perbankan.
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                        <span>Sumber: SLA & Billing Policy</span>
                        <span>•</span>
                        <span className="text-blue-600 font-medium">Klik untuk sisipkan ke balasan</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">Dokumentasi API & Troubleshooting Gateway</span>
                        <span className="text-slate-500 text-[11px]">89% Match</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: Resolution */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Langkah 7 • Resolusi Tiket
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Aksi Diterapkan & Tanggapan Terkirim
                      </h2>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Tiket Berhasil Diselesaikan dalam 18 Menit</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100 text-xs text-slate-700 space-y-1.5">
                      <div className="font-bold text-slate-900">Aksi Sukses Dijalankan:</div>
                      <div className="text-emerald-700 font-semibold">• {activeScenario.suggestedActionLabel} (DITERAPKAN)</div>
                      <div className="text-slate-600">• Notifikasi email & WhatsApp konfirmasi terkirim ke {activeScenario.customerName}</div>
                      <div className="text-slate-600">• Status akun dikembalikan ke ACTIVE</div>
                    </div>
                    <div className="text-xs text-emerald-900 font-medium">
                      Pencapaian SLA: <strong>18 Menit</strong> (Batas Maksimal: {classification.slaHours} Jam) — <strong>SLA MET ✅</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: Automated Summary */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                        Langkah 8 • Automated Executive Summary
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Ringkasan Kasus Otomatis untuk Laporan Operasional
                      </h2>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                    <div>
                      <span className="font-bold text-slate-400 text-[10px] uppercase">Masalah Awal:</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{classification.summary}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 text-[10px] uppercase">Tindakan Diambil:</span>
                      <p className="text-slate-700 mt-0.5">
                        Menerapkan {activeScenario.suggestedActionLabel}, verifikasi sistem backend, dan notifikasi konfirmasi langsung ke klien.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                      <div>
                        <span className="text-slate-400 text-[10px]">Status Akhir</span>
                        <div className="font-bold text-emerald-600">RESOLVED</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Prediksi CSAT</span>
                        <div className="font-bold text-blue-600">High (5/5)</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Tindak Lanjut</span>
                        <div className="font-bold text-slate-800">Auto-Survei CSAT</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 9: Customer 360 */}
              {currentStep === 9 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        Langkah 9 • Pembaruan Customer 360
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Profil & Riwayat Interaksi Diperbarui
                      </h2>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-950 text-sm">{activeScenario.companyName}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-900 font-bold text-[10px]">
                        Enterprise Gold Tier
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-indigo-100">
                      <div>
                        <div className="text-[10px] text-slate-400">Total Tiket</div>
                        <div className="font-bold text-slate-900 text-sm">19 Tiket (+1)</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Tingkat Resolusi</div>
                        <div className="font-bold text-emerald-600 text-sm">95.2%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Churn Risk</div>
                        <div className="font-bold text-emerald-600 text-sm">Rendah (Low)</div>
                      </div>
                    </div>
                    <p className="text-indigo-900 text-[11px]">
                      AI merekomendasikan setup auto-reconciliation webhook agar kendala serupa tidak terulang saat masa renewal kontrak berikutnya.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 10: Ops Dashboard */}
              {currentStep === 10 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Langkah 10 • Supervisor & Operations Dashboard
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        Metrik SLA & Analitik Terkini
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Total Tiket Hari Ini</div>
                      <div className="text-lg font-black text-slate-900">183</div>
                      <div className="text-[10px] text-emerald-600 font-bold">+1 Baru Saja</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Pencapaian SLA</div>
                      <div className="text-lg font-black text-emerald-600">96.8%</div>
                      <div className="text-[10px] text-emerald-600 font-bold">Target Terpenuhi</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Akurasi AI Classifier</div>
                      <div className="text-lg font-black text-indigo-600">94.6%</div>
                      <div className="text-[10px] text-indigo-600 font-bold">Zero Routing Errors</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Rata-rata Resolusi</div>
                      <div className="text-lg font-black text-blue-600">18.5 Min</div>
                      <div className="text-[10px] text-blue-600 font-bold">45% Lebih Cepat</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                    <span>Alur lengkap 1-ke-10 telah tuntas diselesaikan dengan sukses!</span>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Demo</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* STEP CONTROLS FOOTER */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Auto-Play' : 'Auto-Play Flow'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                title="Reset ke Langkah 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none text-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentStep === 10}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-30 disabled:pointer-events-none shadow-sm"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: CONNECTED PLATFORM QUICK-TRANSITION PANE (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400">
              One Connected Ecosystem
            </span>
            <h3 className="text-lg font-black mt-1 mb-2">Buka di View Terkait</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Semua langkah ini terhubung langsung ke antarmuka operasional nyata. Anda dapat berpindah langsung ke:
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onSwitchView('agent');
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Agent Workspace</div>
                    <div className="text-[10px] text-slate-300">Antrean tiket & Agent Assist live</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onSwitchView('operations');
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center text-indigo-300">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Supervisor Dashboard</div>
                    <div className="text-[10px] text-slate-300">Metrik SLA & Customer 360</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onSwitchView('customer');
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Customer Portal</div>
                    <div className="text-[10px] text-slate-300">Landing Page & Chatbot</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* REAL-TIME IMPACT SUMMARY CARD */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Dampak Operasional:</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-500">Waktu Klasifikasi:</span>
                <span className="font-bold text-slate-800">2 Jam → 2.4 Detik</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-500">Salah Routing Tiket:</span>
                <span className="font-bold text-emerald-600">-85% Penurunan</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-500">First Contact Resolution:</span>
                <span className="font-bold text-blue-600">+38% Peningkatan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">SLA Achievement:</span>
                <span className="font-bold text-purple-600">{isServeNowMode ? '78% → 96%+' : '96.4%'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
