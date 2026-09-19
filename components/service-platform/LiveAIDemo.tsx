'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  User,
  Bot,
  Send,
  ArrowRight,
  ShieldCheck,
  Clock,
  BarChart3,
  Cpu,
  Layers,
  ChevronRight,
  ArrowUpRight,
  Zap,
  Flame,
  FileText
} from 'lucide-react';
import { PlatformView } from '@/types/chatbot';

interface LiveAIDemoProps {
  onSwitchView?: (view: PlatformView) => void;
}

export const LiveAIDemo: React.FC<LiveAIDemoProps> = ({ onSwitchView }) => {
  const [scenario, setScenario] = useState<'case_a' | 'case_b'>('case_a');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'normal' | 'fast'>('normal');

  const delayMs = speed === 'normal' ? 2400 : 1200;

  // Scenario 1: Case A (AI Auto-Answer) steps
  const caseASteps = [
    {
      title: 'Pesan Masuk via WhatsApp',
      desc: 'Pelanggan (Lisa Humairoh) bertanya perbandingan paket Onebox CRM Starter vs Professional.',
      badge: 'Inbound Customer Event',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      data: {
        channel: 'WhatsApp (+62 812-9988-1122)',
        message: 'Halo selamat siang, kami ingin tanya perbedaan paket Onebox CRM Starter vs Professional dan biaya lisensi per agen bulanan. Apakah ada free trial?'
      }
    },
    {
      title: 'AI Intent Analysis & Knowledge Retrieval',
      desc: 'Ciptadra AI Triage Engine menganalisis pesan dan mencocokkan dokumen resmi perusahaan.',
      badge: 'AI Processing Engine',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      data: {
        detectedIntent: 'Product Pricing & Feature Comparison',
        matchedKnowledge: 'Onebox Official Pricing & Packaging KB',
        confidenceScore: '98% (High Confidence)',
        decisionGate: 'Case A: Pertanyaan faktual terverifikasi 100% pada Knowledge Base.'
      }
    },
    {
      title: 'Instant Autonomous AI Response (1.8 Detik)',
      desc: 'AI menyusun respon terverifikasi lengkap dengan perbandingan paket dan penawaran demo sandbox.',
      badge: '✓ AI Auto-Answer Delivered',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      data: {
        aiReply: 'Halo Ibu Lisa! Terima kasih telah menghubungi CiptadraSoft & Onebox CRM. Onebox Starter cocok untuk tim hingga 10 agen dengan multichannel dasar. Onebox Professional mendukung unlimited agen, integrasi 9 kanal omnichannel lengkap, AI Ticket Classification, dan SLA Automation. Sandbox 14 hari gratis tersedia tanpa komitmen kartu kredit.',
        responseTime: '1.8 Detik',
        humanCsLoad: '0 Menit (Zero Human Touch)'
      }
    },
    {
      title: 'Status: ✓ AI ANSWERED & Telemetry Updated',
      desc: 'Percakapan otomatis ditutup dengan status berhasil. Telemetry Supervisor mencatat efisiensi.',
      badge: 'Telemetry Logged',
      badgeColor: 'bg-blue-100 text-blue-800',
      data: {
        status: '✓ AI ANSWERED',
        ticketCreated: 'Tidak Diperlukan (Saved to Knowledge Log)',
        supervisorEffect: '+1 Terjawab AI (Deflection Rate naik menjadi 42%)'
      }
    }
  ];

  // Scenario 2: Case B (Escalation to CS) steps
  const caseBSteps = [
    {
      title: 'Keluhan Kritis Inbound via Webchat',
      desc: 'Head of Contact Center Bank Digital melaporkan insiden SIP 503 WebRTC pada 20 agen live.',
      badge: 'Critical Inbound Event',
      badgeColor: 'bg-red-100 text-red-800',
      data: {
        channel: 'Webchat (Bank Digital Bersama)',
        customer: 'Siti Rahmawati (Head of Contact Center)',
        message: 'Tim call center kami mendadak tidak bisa menerima panggilan masuk lewat WebRTC Onebox sejak 15 menit lalu. Muncul error SIP 503 Service Unavailable di dashboard 20 agen kami. Sangat kritis!'
      }
    },
    {
      title: 'AI Urgency Evaluation & Auto-Classification',
      desc: 'AI mendeteksi insiden infrastruktur tingkat keparahan tinggi yang melanggar SLA operasional.',
      badge: 'AI Triage & Classification',
      badgeColor: 'bg-amber-100 text-amber-800',
      data: {
        detectedIntent: 'Infrastructure Outage / WebRTC Telephony SIP 503',
        urgencyScore: '97 / 100 (Urgent)',
        category: 'Technical Support',
        assignedDepartment: 'Core Engineering',
        slaTarget: '1 Jam (SLA Darurat)',
        decisionGate: 'Case B: Eskalasi otomatis ke CS Queue & auto-ticket creation.'
      }
    },
    {
      title: 'Polite Handoff & Auto-Ticket Creation',
      desc: 'AI membalas ramah ke nasabah bahwa tiket prioritas darurat telah diterbitkan ke spesialis teknis.',
      badge: 'Tiket #TKT-8403 Dibuat',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      data: {
        ticketNumber: 'TKT-8403',
        assignedAgent: 'Andi Wijaya (CS A - Technical Specialist)',
        customerNotification: 'Selamat siang Ibu Siti, tiket darurat #TKT-8403 dengan SLA 1 Jam telah di-assign ke Senior Specialist Andi Wijaya & tim NOC.'
      }
    },
    {
      title: 'Agent Workspace: AI Agent Assist 1-Klik',
      desc: 'Andi membuka antrean tiket dan menerima rekomendasi solusi terverifikasi dari AI Agent Assist.',
      badge: 'Human CS + AI Copilot',
      badgeColor: 'bg-blue-100 text-blue-800',
      data: {
        suggestedResponse: 'Halo Ibu Siti, kami telah mendeteksi bottleneck signaling pada trunk primer. Kami menyarankan pengalihan rute ke Secondary SIP Trunk Telkom via panel Network.',
        oneClickAction: 'Failover ke Secondary SIP Trunk (Eksekusi 1-Klik)',
        kbReference: 'SOP-TEL-04: WebRTC Voice Trunk Failover Protocol'
      }
    },
    {
      title: 'Tiket Diselesaikan & Supervisor Updated',
      desc: 'Andi mengeksekusi failover, konfirmasi dengan klien, dan menutup tiket. Ringkasan terbit otomatis.',
      badge: 'Resolution & Analytics Logged',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      data: {
        finalStatus: 'RESOLVED (18.5 Menit)',
        slaCompliance: 'Terpenuhi (Target 60m, Selesai dalam 18.5m)',
        csatResult: '⭐ 5.0 (Klien Puas & Operasional Kembali Lancar)',
        supervisorEffect: 'Data performa Andi & ringkasan otomatis tersimpan di Supervisor Cockpit.'
      }
    }
  ];

  const steps = scenario === 'case_a' ? caseASteps : caseBSteps;

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, delayMs]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleChangeScenario = (s: 'case_a' | 'case_b') => {
    setIsPlaying(false);
    setScenario(s);
    setCurrentStep(0);
  };

  const activeStepData = steps[currentStep];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-4 shrink-0 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live AI Presentation Showcase
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                Interactive Runner (60 Detik)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Simulasi End-to-End: AI First-Response, Eskalasi CS, dan Supervisor Intelligence
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Tunjukkan secara visual kepada stakeholder bagaimana sistem membedakan Case A (Auto-Answer) dan Case B (Eskalasi Human CS).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {onSwitchView && (
              <button
                onClick={() => onSwitchView('cs_dashboard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Buka CS Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
            {onSwitchView && (
              <button
                onClick={() => onSwitchView('supervisor_dashboard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Buka Supervisor</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SCENARIO TOGGLE & PLAYBACK CONTROLS */}
      <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Scenario Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xs text-xs font-bold">
            <button
              onClick={() => handleChangeScenario('case_a')}
              className={`px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                scenario === 'case_a'
                  ? 'bg-emerald-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Skenario 1: Case A (AI Auto-Answer 1.8s)</span>
            </button>

            <button
              onClick={() => handleChangeScenario('case_b')}
              className={`px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                scenario === 'case_b'
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Skenario 2: Case B (Eskalasi CS + Assist)</span>
            </button>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Demo' : 'Play Demo'}</span>
            </button>

            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 cursor-pointer"
            >
              ← Prev
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 cursor-pointer"
            >
              Next →
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 cursor-pointer"
              title="Reset Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setSpeed(speed === 'normal' ? 'fast' : 'normal')}
              className="px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-white border border-slate-200 text-slate-600 cursor-pointer"
            >
              {speed === 'normal' ? '1x Speed' : '2x Fast'}
            </button>
          </div>

        </div>
      </div>

      {/* MAIN DEMO STAGE */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        
        {/* Step Progress Tracker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(idx);
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                idx === currentStep
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : idx < currentStep
                  ? 'bg-slate-100/80 border-slate-200 text-slate-600'
                  : 'bg-white/60 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  Langkah {idx + 1}
                </span>
                {idx < currentStep ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : idx === currentStep ? (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                ) : null}
              </div>
              <div className="font-extrabold text-xs text-slate-900 truncate">
                {step.title}
              </div>
            </button>
          ))}
        </div>

        {/* Current Active Step Interactive Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${activeStepData.badgeColor}`}>
                {activeStepData.badge}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-2">
                {currentStep + 1}. {activeStepData.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeStepData.desc}
              </p>
            </div>

            <div className="text-right text-xs font-mono text-slate-400 self-start sm:self-center">
              Langkah {currentStep + 1} dari {steps.length}
            </div>
          </div>

          {/* Interactive Visual Stage depending on step */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            
            {/* Display relevant details based on current step data */}
            <div className="space-y-3 text-xs">
              {Object.entries(activeStepData.data).map(([key, value]) => (
                <div key={key} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <div className="font-medium text-slate-800 text-xs leading-relaxed whitespace-pre-line">
                    {value}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Footer Action to test in real environment */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              {currentStep < steps.length - 1 ? (
                <span>Klik <strong>Next</strong> atau <strong>Play</strong> untuk melihat tahapan berikutnya.</span>
              ) : (
                <span className="text-emerald-700 font-bold">
                  ✓ Skenario selesai! Anda dapat mengulangi atau mencoba skenario lainnya.
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {currentStep === steps.length - 1 && onSwitchView && (
                <button
                  onClick={() => onSwitchView(scenario === 'case_a' ? 'cs_dashboard' : 'supervisor_dashboard')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Verifikasi di {scenario === 'case_a' ? 'CS Dashboard' : 'Supervisor Cockpit'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
