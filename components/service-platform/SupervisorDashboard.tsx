'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Search,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  User,
  Plus,
  Eye,
  FileText,
  Zap,
  Filter,
  Check,
  Cpu,
  Bot,
  Flame,
  Layers,
  Award,
  HelpCircle,
  X
} from 'lucide-react';
import {
  MOCK_AGENTS_PERFORMANCE,
  INITIAL_TRAINING_PLANS,
  MOCK_AI_ACTIVITY_LOGS,
  MOCK_SUPERVISOR_EXECUTIVE_SUMMARY
} from './mockData';
import {
  AgentPerformanceRecord,
  SupervisorTrainingPlan,
  AiActivityLogItem,
  PlatformView
} from '@/types/chatbot';

interface SupervisorDashboardProps {
  onSwitchView?: (view: PlatformView) => void;
}

export const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({
  onSwitchView
}) => {
  // Navigation tabs inside Supervisor Cockpit
  const [activeTab, setActiveTab] = useState<
    'performance' | 'training' | 'summaries' | 'activity_log'
  >('performance');

  // Agent Performance & Investigation State
  const [agents, setAgents] = useState<AgentPerformanceRecord[]>(MOCK_AGENTS_PERFORMANCE);
  const [selectedAgentForInvestigation, setSelectedAgentForInvestigation] = useState<AgentPerformanceRecord | null>(null);

  // Training Plans State
  const [trainingPlans, setTrainingPlans] = useState<SupervisorTrainingPlan[]>(INITIAL_TRAINING_PLANS);
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [newPlanAgentId, setNewPlanAgentId] = useState('agent-cs-a');
  const [newPlanTopic, setNewPlanTopic] = useState('');
  const [newPlanModule, setNewPlanModule] = useState('');
  const [newPlanDate, setNewPlanDate] = useState('2026-09-28');
  const [newPlanNotes, setNewPlanNotes] = useState('');

  // Summaries state
  const [summaryMode, setSummaryMode] = useState<'team' | 'agent'>('team');
  const [selectedAgentForSummary, setSelectedAgentForSummary] = useState<string>('agent-cs-a');

  // Activity Log State
  const [activityLogs, setActivityLogs] = useState<AiActivityLogItem[]>(MOCK_AI_ACTIVITY_LOGS);
  const [logFilter, setLogFilter] = useState<'all' | 'auto_answered' | 'escalated_ticket'>('all');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Handle open investigation
  const handleOpenInvestigation = (agent: AgentPerformanceRecord) => {
    setSelectedAgentForInvestigation(agent);
  };

  // Handle open create training plan from investigation
  const handleCreatePlanForAgent = (agent: AgentPerformanceRecord) => {
    setNewPlanAgentId(agent.id);
    if (agent.investigationObservation) {
      setNewPlanTopic(agent.investigationObservation.identifiedPattern);
      setNewPlanModule(agent.investigationObservation.recommendedKbModule);
      setNewPlanNotes(agent.investigationObservation.nonPunitiveGuidance);
    } else {
      setNewPlanTopic(`Peningkatan Efisiensi Penanganan ${agent.role}`);
      setNewPlanModule('SOP Standar Operasional Onebox CX');
      setNewPlanNotes('Pendampingan berkala peningkatan SLA & penanganan multi-kanal.');
    }
    setShowCreatePlanModal(true);
  };

  // Submit new training plan
  const handleSaveTrainingPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const targetAgent = agents.find((a) => a.id === newPlanAgentId) || agents[0];

    const createdPlan: SupervisorTrainingPlan = {
      id: `plan-${Date.now()}`,
      title: newPlanTopic || `Coaching Pelatihan: ${targetAgent.name}`,
      targetAgentId: targetAgent.id,
      targetAgentName: targetAgent.name,
      targetAgentCode: targetAgent.code,
      topic: newPlanTopic,
      kbModule: newPlanModule || 'SOP-TEL-04: Automated Secondary SIP Trunk Failover Protocols',
      targetDate: newPlanDate,
      status: 'in_progress',
      notes: newPlanNotes,
      createdAt: Date.now(),
      createdByName: 'Ferry Darmawan (Supervisor Ops)'
    };

    setTrainingPlans([createdPlan, ...trainingPlans]);
    setShowCreatePlanModal(false);
    setActiveTab('training');
  };

  // Filtered activity logs
  const filteredActivityLogs = activityLogs.filter((log) => {
    if (logFilter !== 'all' && log.decision !== logFilter) return false;
    if (logSearchQuery.trim()) {
      const q = logSearchQuery.toLowerCase();
      const matchName = log.customerName.toLowerCase().includes(q);
      const matchSnippet = log.rawInputSnippet.toLowerCase().includes(q);
      const matchIntent = log.detectedIntent.toLowerCase().includes(q);
      const matchChannel = log.channel.toLowerCase().includes(q);
      if (!matchName && !matchSnippet && !matchIntent && !matchChannel) return false;
    }
    return true;
  });

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* SUPERVISOR TOP EXECUTIVE BAR */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-4 shrink-0 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                Supervisor Management Cockpit
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                Prototype Demo Data
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Onebox Contact Center Supervisor &amp; Operations Intelligence
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Monitoring performa tim CS, investigasi anomali durasi penanganan, rencana pelatihan agen, audit log AI, dan ringkasan eksekutif mingguan.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {onSwitchView && (
              <button
                onClick={() => onSwitchView('cs_dashboard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Buka Agent Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setShowCreatePlanModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Training Plan</span>
            </button>
          </div>

        </div>
      </div>

      {/* 6 TOP EXECUTIVE TELEMETRY CARDS */}
      <div className="bg-slate-100/80 border-b border-slate-200/80 px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-slate-400">Total Interaksi</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">1,840</div>
            <div className="text-[10px] text-slate-500">9 Kanal Omnichannel</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-emerald-600">✓ AI Auto-Resolved</span>
            <div className="text-lg font-black text-emerald-600 mt-0.5">42.0% (773)</div>
            <div className="text-[10px] text-emerald-700 font-medium">Zero Human Touch</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-blue-600">Eskalasi ke Agen</span>
            <div className="text-lg font-black text-blue-600 mt-0.5">58.0% (1,067)</div>
            <div className="text-[10px] text-blue-700 font-medium">AI Assist Aktif</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-slate-400">Respon Pertama AI</span>
            <div className="text-lg font-black text-indigo-600 mt-0.5">1.8 Detik</div>
            <div className="text-[10px] text-slate-500">vs Agen: 2.1 Menit</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-slate-400">Rata-rata Waktu CS (AHT)</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">14.5 Menit</div>
            <div className="text-[10px] text-emerald-600 font-bold">-48% Berkat Assist</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-slate-400">Kepatuhan SLA</span>
            <div className="text-lg font-black text-emerald-600 mt-0.5">96.8%</div>
            <div className="text-[10px] text-emerald-700 font-medium">Target &gt;95% Tercapai</div>
          </div>

        </div>
      </div>

      {/* SUB-SECTION TABS SWITCHER */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'performance'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>1. Agent Performance &amp; Investigasi</span>
          </button>

          <button
            onClick={() => setActiveTab('training')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'training'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. Supervisor Training Plans ({trainingPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('summaries')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'summaries'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Automated Summaries</span>
          </button>

          <button
            onClick={() => setActiveTab('activity_log')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'activity_log'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>4. Real-Time AI Activity Log</span>
          </button>

        </div>
      </div>

      {/* TAB CONTENT AREA */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">

        {/* ========================================================================= */}
        {/* TAB 1: AGENT PERFORMANCE & INVESTIGATION                                  */}
        {/* ========================================================================= */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            
            {/* Context callout regarding CS A Investigation */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>AI Supervisor Alert:</strong> Terdeteksi anomali penanganan pada <strong>CS A (Andi Wijaya)</strong> di kategori <em>Technical Support</em> (rata-rata 24.2 menit vs 14.5 menit rata-rata tim).
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Klik tombol <strong>Investigasi</strong> pada baris CS A di bawah untuk meninjau pola root cause dan menerbitkan coaching plan secara non-punitif.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenInvestigation(agents[0])}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-all"
              >
                Buka Investigasi CS A →
              </button>
            </div>

            {/* Performance Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Daftar Agen &amp; Metrik Efisiensi Operasional
                  </h3>
                  <p className="text-xs text-slate-500">
                    Data realtime hari berjalan dihitung otomatis berdasarkan aktivitas inbox Onebox.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  Total 5 Agen Aktif
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                      <th className="py-3 px-4">Agen CS</th>
                      <th className="py-3 px-3">Role &amp; Status</th>
                      <th className="py-3 px-3">Kanal Aktif</th>
                      <th className="py-3 px-3 text-center">Tiket Hari Ini</th>
                      <th className="py-3 px-3 text-center">Respon Pertama</th>
                      <th className="py-3 px-3 text-center">Waktu Penanganan (AHT)</th>
                      <th className="py-3 px-3 text-center">Kepatuhan SLA</th>
                      <th className="py-3 px-3 text-center">Skor CSAT</th>
                      <th className="py-3 px-4 text-right">Aksi Supervisor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {agents.map((agent) => {
                      const hasAlert = agent.avgHandlingTimeMin > agent.teamAvgHandlingTimeMin * 1.3;

                      return (
                        <tr
                          key={agent.id}
                          className={`hover:bg-indigo-50/40 transition-colors ${
                            hasAlert ? 'bg-amber-50/20' : ''
                          }`}
                        >
                          {/* Agent Info */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                                  <span>{agent.name}</span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold">
                                    {agent.code}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400">
                                  ID: {agent.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Role & Status */}
                          <td className="py-3.5 px-3">
                            <div className="font-semibold text-slate-700">{agent.role}</div>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                              agent.status === 'online' ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              <span className="capitalize">{agent.status}</span>
                            </span>
                          </td>

                          {/* Channels */}
                          <td className="py-3.5 px-3">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {agent.channels.map((ch) => (
                                <span
                                  key={ch}
                                  className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700"
                                >
                                  {ch}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Tickets Handled */}
                          <td className="py-3.5 px-3 text-center font-bold text-slate-900">
                            {agent.ticketsHandledToday}
                          </td>

                          {/* First Response */}
                          <td className="py-3.5 px-3 text-center font-medium text-slate-700">
                            {agent.avgFirstResponseMin} Menit
                          </td>

                          {/* AHT (Key Metric with Flag) */}
                          <td className="py-3.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <span className={`font-black text-xs ${
                                hasAlert ? 'text-amber-700 font-black' : 'text-slate-900'
                              }`}>
                                {agent.avgHandlingTimeMin}m
                              </span>
                              {hasAlert && (
                                <span className="text-[9px] font-extrabold uppercase px-1 rounded bg-amber-100 text-amber-800" title="Melebihi rata-rata tim">
                                  +67% vs Tim
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              Tim: {agent.teamAvgHandlingTimeMin}m
                            </span>
                          </td>

                          {/* SLA Compliance */}
                          <td className="py-3.5 px-3 text-center">
                            <span className={`font-bold ${
                              agent.slaComplianceRate >= 95 ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              {agent.slaComplianceRate}%
                            </span>
                          </td>

                          {/* CSAT */}
                          <td className="py-3.5 px-3 text-center font-bold text-slate-900">
                            ⭐ {agent.csatScore}
                          </td>

                          {/* Action */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleOpenInvestigation(agent)}
                              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                                hasAlert
                                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {hasAlert ? 'Investigasi ⚠' : 'Detail'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SUPERVISOR TRAINING PLANS                                          */}
        {/* ========================================================================= */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  Rencana Pelatihan &amp; Coaching Agen
                </h3>
                <p className="text-xs text-slate-500">
                  Penetapan target pendampingan, materi SOP terverifikasi, dan batas waktu tindak lanjut.
                </p>
              </div>

              <button
                onClick={() => setShowCreatePlanModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat Training Plan Baru</span>
              </button>
            </div>

            {/* Training Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                        {plan.targetAgentCode} — {plan.targetAgentName}
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        plan.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : plan.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {plan.status === 'completed'
                          ? 'Selesai'
                          : plan.status === 'in_progress'
                          ? 'Sedang Berjalan'
                          : 'Direncanakan'}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                      {plan.title}
                    </h4>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Modul SOP Ditugaskan:</span>
                      <div className="font-bold text-slate-800 text-[11px] leading-tight">
                        {plan.kbModule}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      &ldquo;{plan.notes}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Target: <strong>{plan.targetDate}</strong></span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Oleh {plan.createdByName.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AUTOMATED SUMMARIES                                                */}
        {/* ========================================================================= */}
        {activeTab === 'summaries' && (
          <div className="space-y-6">
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-2xs text-xs font-bold">
              <button
                onClick={() => setSummaryMode('team')}
                className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                  summaryMode === 'team'
                    ? 'bg-indigo-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ringkasan Eksekutif Tim (Mingguan)
              </button>
              <button
                onClick={() => setSummaryMode('agent')}
                className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                  summaryMode === 'agent'
                    ? 'bg-indigo-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Evaluasi Individual Per-Agen
              </button>
            </div>

            {summaryMode === 'team' ? (
              /* TEAM WEEKLY EXECUTIVE SUMMARY */
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Executive Ops Synthesis
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">
                      Laporan Telemetry Mingguan: {MOCK_SUPERVISOR_EXECUTIVE_SUMMARY.period}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                    1,840 Total Percakapan
                  </span>
                </div>

                {/* 3 Pillars of Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Key Highlights */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2.5">
                    <div className="font-extrabold text-xs text-emerald-900 uppercase flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>Pencapaian Utama (Wins)</span>
                    </div>
                    <ul className="space-y-2 text-xs text-emerald-950">
                      {MOCK_SUPERVISOR_EXECUTIVE_SUMMARY.keyHighlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottlenecks Identified */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
                    <div className="font-extrabold text-xs text-amber-900 uppercase flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-600" />
                      <span>Bottleneck Operasional</span>
                    </div>
                    <ul className="space-y-2 text-xs text-amber-950">
                      {MOCK_SUPERVISOR_EXECUTIVE_SUMMARY.topBottlenecks.map((bn, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{bn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Coaching Actions Recommended */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2.5">
                    <div className="font-extrabold text-xs text-indigo-900 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Rekomendasi Supervisor</span>
                    </div>
                    <ul className="space-y-2 text-xs text-indigo-950">
                      {MOCK_SUPERVISOR_EXECUTIVE_SUMMARY.coachingRecommendations.map((cr, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <Zap className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{cr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            ) : (
              /* INDIVIDUAL AGENT SUMMARY */
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Kartu Evaluasi Individual CS
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pilih agen untuk melihat profil kinerja, efisiensi waktu, dan fokus coaching.
                    </p>
                  </div>

                  <select
                    value={selectedAgentForSummary}
                    onChange={(e) => setSelectedAgentForSummary(e.target.value)}
                    className="p-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.code} — {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>

                {(() => {
                  const currAgent = agents.find((a) => a.id === selectedAgentForSummary) || agents[0];
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <img
                          src={currAgent.avatar}
                          alt={currAgent.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div>
                          <div className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                            <span>{currAgent.name}</span>
                            <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                              {currAgent.code}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">{currAgent.role}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-2xl bg-white border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Total Tiket Ditangani</span>
                          <div className="text-lg font-black text-slate-900">{currAgent.ticketsHandledToday}</div>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Rata-rata Waktu (AHT)</span>
                          <div className="text-lg font-black text-slate-900">{currAgent.avgHandlingTimeMin} Menit</div>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Kepatuhan SLA</span>
                          <div className="text-lg font-black text-emerald-600">{currAgent.slaComplianceRate}%</div>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Skor CSAT</span>
                          <div className="text-lg font-black text-slate-900">⭐ {currAgent.csatScore}</div>
                        </div>
                      </div>

                      {currAgent.investigationObservation && (
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                          <span className="font-extrabold text-amber-900 uppercase">
                            Catatan Khusus Supervisor &amp; Rekomendasi Coaching
                          </span>
                          <p className="text-amber-950 leading-relaxed">
                            {currAgent.investigationObservation.nonPunitiveGuidance}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: REAL-TIME AI ACTIVITY LOG                                          */}
        {/* ========================================================================= */}
        {activeTab === 'activity_log' && (
          <div className="space-y-4">
            
            {/* Search & Filter Bar */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kanal, nama pelanggan, pesan, atau alasan AI..."
                  value={logSearchQuery}
                  onChange={(e) => setLogSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1 text-xs font-bold">
                <button
                  onClick={() => setLogFilter('all')}
                  className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                    logFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua Log ({activityLogs.length})
                </button>
                <button
                  onClick={() => setLogFilter('auto_answered')}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer ${
                    logFilter === 'auto_answered' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Case A (Auto-Answer)</span>
                </button>
                <button
                  onClick={() => setLogFilter('escalated_ticket')}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer ${
                    logFilter === 'escalated_ticket' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Case B (Escalated)</span>
                </button>
              </div>
            </div>

            {/* Chronological Feed */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {filteredActivityLogs.map((log) => {
                const isAuto = log.decision === 'auto_answered';

                return (
                  <div key={log.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start gap-3.5 text-xs">
                    {/* Icon indicator */}
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      isAuto ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {isAuto ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                          <span className="font-extrabold text-slate-900">
                            {log.customerName}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                            {log.channel}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            isAuto
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                          }`}>
                            {isAuto ? '✓ CASE A: AUTO-ANSWERED' : '⚠️ CASE B: ESCALATED TO TICKET'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 font-bold">
                            Score {Math.round(log.confidenceScore * 100)}%
                          </span>
                        </div>
                      </div>

                      <div className="text-slate-600 bg-slate-50/80 p-2 rounded-lg border border-slate-100 text-[11px]">
                        &ldquo;{log.rawInputSnippet}&rdquo;
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-1">
                        <span><strong>Intent:</strong> {log.detectedIntent}</span>
                        <span>•</span>
                        <span><strong>Alasan AI:</strong> {log.decisionReason}</span>
                        {log.assignedAgentName && (
                          <>
                            <span>•</span>
                            <span className="text-blue-700 font-semibold">
                              Ditugaskan ke: {log.assignedAgentName}
                            </span>
                          </>
                        )}
                        {log.knowledgeSourceUsed && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">
                              Sumber: {log.knowledgeSourceUsed}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

      {/* INVESTIGATION MODAL (DEEP DIVE ON CS A / ANY AGENT) */}
      {selectedAgentForInvestigation && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAgentForInvestigation.avatar}
                  alt={selectedAgentForInvestigation.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-indigo-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">
                      Supervisor Investigation: {selectedAgentForInvestigation.name}
                    </h3>
                    <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                      {selectedAgentForInvestigation.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedAgentForInvestigation.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgentForInvestigation(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparative Benchmarking Chart */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Perbandingan Waktu Penanganan (AHT) — Technical Support
              </span>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-amber-800 font-black">{selectedAgentForInvestigation.name} (CS A)</span>
                    <span className="text-amber-800 font-black">24.2 Menit</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500 w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600">Rata-rata Tim Support</span>
                    <span className="text-slate-600">14.5 Menit</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500 w-[51%]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-700">Target SLA Enterprise</span>
                    <span className="text-emerald-700">15.0 Menit</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 w-[53%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI ROOT CAUSE ANALYSIS */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <span className="font-extrabold text-blue-900 uppercase flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>AI Root Cause &amp; Observation</span>
                </span>
                <p className="text-blue-950 leading-relaxed">
                  {selectedAgentForInvestigation.investigationObservation?.rootCauseAnalysis ||
                    'Agen menginvestigasi log telephony secara manual baris demi baris, alih-alih mengeksekusi skrip auto-failover pada Agent Workspace.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <span className="font-extrabold text-emerald-900 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Panduan Non-Punitif &amp; Kesempatan Peningkatan (Coaching)</span>
                </span>
                <p className="text-emerald-950 leading-relaxed">
                  {selectedAgentForInvestigation.investigationObservation?.nonPunitiveGuidance ||
                    'Andi memiliki pemahaman arsitektur yang kuat. Pendampingan difokuskan pada adopsi SOP Failover Secondary SIP Trunk dan penggunaan AI Agent Assist 1-klik.'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedAgentForInvestigation(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  const target = selectedAgentForInvestigation;
                  setSelectedAgentForInvestigation(null);
                  handleCreatePlanForAgent(target);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat Training Plan untuk {selectedAgentForInvestigation.name}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CREATE TRAINING PLAN MODAL */}
      {showCreatePlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Buat Training Plan Baru</h3>
                  <p className="text-xs text-slate-500">
                    Susun materi coaching dan tetapkan target penyelesaian agen.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCreatePlanModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrainingPlan} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Agen CS</label>
                <select
                  value={newPlanAgentId}
                  onChange={(e) => setNewPlanAgentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.code} — {a.name} ({a.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Topik Coaching / Sasaran</label>
                <input
                  type="text"
                  value={newPlanTopic}
                  onChange={(e) => setNewPlanTopic(e.target.value)}
                  placeholder="Misal: WebRTC SIP 503 Auto-Failover &amp; Voice Diagnostics"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Modul Knowledge Base / SOP Resmi</label>
                <input
                  type="text"
                  value={newPlanModule}
                  onChange={(e) => setNewPlanModule(e.target.value)}
                  placeholder="Misal: SOP-TEL-04: Automated Secondary SIP Trunk Failover Protocols"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Tanggal Selesai</label>
                <input
                  type="date"
                  value={newPlanDate}
                  onChange={(e) => setNewPlanDate(e.target.value)}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Khusus Supervisor</label>
                <textarea
                  rows={2}
                  value={newPlanNotes}
                  onChange={(e) => setNewPlanNotes(e.target.value)}
                  placeholder="Pendampingan praktek langsung 1-klik failover untuk mereduksi waktu penanganan..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreatePlanModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
                >
                  Simpan &amp; Terbitkan Training Plan
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
