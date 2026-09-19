'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  UserCheck,
  BookOpen,
  ArrowRight,
  Zap,
  Building2
} from 'lucide-react';
import { ServiceDashboard } from './ServiceDashboard';
import { Customer360Panel } from './Customer360Panel';
import { CiptadraKnowledgePanel } from './CiptadraKnowledgePanel';
import { PlatformView } from '@/types/chatbot';

interface OperationsViewProps {
  onSwitchView?: (view: PlatformView) => void;
  defaultSubTab?: 'dashboard' | 'customer360' | 'research';
}

export const OperationsView: React.FC<OperationsViewProps> = ({
  onSwitchView,
  defaultSubTab = 'dashboard'
}) => {
  const [subTab, setSubTab] = useState<'dashboard' | 'customer360' | 'research'>(defaultSubTab);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* OPERATIONS HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
              Supervisor & Executive View
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Operations Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Supervisor Operations & Customer 360
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Pantau metrik SLA, performa AI Classification, profil lengkap pelanggan (Customer 360), serta eksplorasi Knowledge & Web Research Mode.
          </p>
        </div>

        {/* SUB-TAB TOGGLES */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 self-start md:self-center">
          <button
            onClick={() => setSubTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              subTab === 'dashboard'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard KPIs</span>
          </button>
          <button
            onClick={() => setSubTab('customer360')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              subTab === 'customer360'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Customer 360</span>
          </button>
          <button
            onClick={() => setSubTab('research')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              subTab === 'research'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Knowledge & Research</span>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE SUB-TAB */}
      {subTab === 'dashboard' && <ServiceDashboard />}
      {subTab === 'customer360' && <Customer360Panel onSwitchView={onSwitchView} />}
      {subTab === 'research' && <CiptadraKnowledgePanel />}
    </div>
  );
};
