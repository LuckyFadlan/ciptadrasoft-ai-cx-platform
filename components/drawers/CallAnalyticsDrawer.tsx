'use client';

import React, { useState } from 'react';
import {
  X,
  Mic,
  Play,
  Pause,
  Clock,
  User,
  Headphones,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Volume2,
  FileText,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { CallAnalyticsRecord } from '@/types/chatbot';

interface CallAnalyticsDrawerProps {
  isOpen: boolean;
  call: CallAnalyticsRecord | null;
  onClose: () => void;
}

export const CallAnalyticsDrawer: React.FC<CallAnalyticsDrawerProps> = ({
  isOpen,
  call,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'speech_kpi' | 'sales_coaching'>('transcript');

  if (!isOpen || !call) return null;

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                {call.callNumber}
              </span>
              <span
                className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                  call.callType === 'sales_negotiation'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                {call.callType === 'sales_negotiation' ? 'Sales Call' : 'CS Support'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Subheader info bar & Audio Player Simulator */}
          <div className="bg-slate-50 p-4 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {call.customerName}
                </span>{' '}
                <span className="text-slate-400">↔</span>{' '}
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {call.agentName}
                </span>
                <div className="text-[11px] text-slate-500 mt-0.5">{call.topic}</div>
              </div>
              <div className="text-right text-[11px]">
                <div className="font-semibold text-slate-700 dark:text-slate-300">
                  Durasi: {formatDuration(call.durationSeconds)}
                </div>
                <div className="text-slate-400">Status: {call.resolutionStatus}</div>
              </div>
            </div>

            {/* Audio Waveform Player */}
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900 flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1">
                {/* Waveform graphic mock */}
                <div className="flex h-6 items-center gap-0.5">
                  {[
                    40, 60, 25, 80, 100, 45, 30, 75, 90, 65, 35, 20, 85, 95, 70, 50, 60, 30, 85,
                    90, 40, 20, 60, 80, 45, 70, 30, 85, 40, 25, 90, 70, 40, 20
                  ].map((height, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all ${
                        isPlaying && i < 15
                          ? 'bg-indigo-600 dark:bg-indigo-400'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>{isPlaying ? '01:24' : '00:00'}</span>
                  <span>{formatDuration(call.durationSeconds)}</span>
                </div>
              </div>

              <Volume2 className="h-4 w-4 text-slate-400 shrink-0" />
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-200 px-5 dark:border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('transcript')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors ${
                activeTab === 'transcript'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Transkrip Pembicaraan
            </button>
            <button
              onClick={() => setActiveTab('speech_kpi')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors ${
                activeTab === 'speech_kpi'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Parameter Bicara & Persona
            </button>
            <button
              onClick={() => setActiveTab('sales_coaching')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'sales_coaching'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>AI Coaching Insight</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeTab === 'transcript' && (
              <div className="space-y-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Cuplikan Percakapan Terindeks Speech-to-Text
                </div>
                {call.transcriptSnippet.map((line, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-3 text-xs ${
                      line.speaker === 'agent'
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 ml-4'
                        : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mr-4'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-semibold mb-1">
                      <span
                        className={
                          line.speaker === 'agent'
                            ? 'text-indigo-700 dark:text-indigo-300'
                            : 'text-slate-700 dark:text-slate-300'
                        }
                      >
                        {line.speaker === 'agent' ? `[Agen] ${call.agentName}` : `[Pelanggan] ${call.customerName}`}
                      </span>
                      <span className="text-slate-400 font-mono">
                        {Math.floor(line.timeSec / 60)}:
                        {line.timeSec % 60 < 10 ? '0' : ''}
                        {line.timeSec % 60}
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                      &ldquo;{line.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'speech_kpi' && (
              <div className="space-y-4 text-xs">
                {/* Speech metrics grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                    <span className="text-[11px] text-slate-500">Kecepatan Bicara (Pace)</span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {call.speakingPaceWpm} WPM
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        {call.personaInsights.paceAssessment}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                    <span className="text-[11px] text-slate-500">Frekuensi Interupsi</span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {call.interruptionCount} kali
                      </span>
                      <span className="text-[10px] text-indigo-600 font-medium">Tertib</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                    <span className="text-[11px] text-slate-500">Gaya Bahasa & Nada</span>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                      {call.personaInsights.languageTone} ({call.personaInsights.formality})
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80">
                    <span className="text-[11px] text-slate-500">Sentimen Akhir</span>
                    <p className="mt-1 font-semibold text-emerald-600">
                      {call.sentiment}
                    </p>
                  </div>
                </div>

                {/* Repeated questions */}
                {call.repeatedQuestions && call.repeatedQuestions.length > 0 && (
                  <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-900 dark:text-amber-300 mb-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                      <span>Pertanyaan Berulang (Indikasi Penjelasan Kurang Jelas)</span>
                    </div>
                    <ul className="space-y-1">
                      {call.repeatedQuestions.map((q, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-amber-800 dark:text-amber-200 list-disc list-inside"
                        >
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sales_coaching' && (
              <div className="space-y-4 text-xs">
                {/* Sales insights if available */}
                {call.salesInsights && (
                  <div className="rounded-xl border border-purple-200 bg-purple-50/30 p-3.5 dark:border-purple-900/40 dark:bg-purple-950/20 space-y-2">
                    <span className="text-xs font-semibold text-purple-950 dark:text-purple-300 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-purple-600" />
                      Parameter Peluang Sales & Negosiasi
                    </span>
                    <div className="space-y-1.5 text-[11px]">
                      <div>
                        <span className="font-semibold text-purple-900 dark:text-purple-300">
                          Keberatan Utama (Objection):
                        </span>{' '}
                        <span className="text-slate-700 dark:text-slate-300">
                          {call.salesInsights.mainObjection}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-purple-900 dark:text-purple-300">
                          Fitur yang Diinginkan:
                        </span>{' '}
                        <span className="text-slate-700 dark:text-slate-300">
                          {call.salesInsights.requestedFeature}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-purple-900 dark:text-purple-300">
                          Tahap Funnel AIDA:
                        </span>{' '}
                        <span className="rounded-md bg-purple-100 px-1.5 py-0.5 text-purple-800 dark:bg-purple-900 dark:text-purple-200 font-semibold">
                          {call.salesInsights.aidaStage}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Observations */}
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-800/80 space-y-2">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                    Observasi Kecerdasan Buatan (AI Speech Observation)
                  </span>
                  <ul className="space-y-1.5">
                    {call.aiObservations.map((obs, i) => (
                      <li
                        key={i}
                        className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5"
                      >
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended improvements */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20 space-y-2">
                  <span className="text-xs font-semibold text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    Saran Coaching & Follow-Up Supervisor
                  </span>
                  <ul className="space-y-1.5">
                    {call.recommendedImprovements.map((imp, i) => (
                      <li
                        key={i}
                        className="text-[11px] text-emerald-900 dark:text-emerald-200 flex items-start gap-1.5"
                      >
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
