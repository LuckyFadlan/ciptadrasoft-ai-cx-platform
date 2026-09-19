'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Users,
  TrendingUp,
  CreditCard,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Home,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { UserSession, UserRole } from '@/types/chatbot';
import { DEMO_ACCOUNTS, authenticateUser } from '@/lib/auth';

interface LoginPageProps {
  onLoginSuccess: (session: UserSession) => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToLanding
}) => {
  const [email, setEmail] = useState('cs.a@ciptadra-demo.com');
  const [password, setPassword] = useState('DemoCS123!');
  const [errorMessage, setErrorMessage] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const session = authenticateUser(email, password);
    if (session) {
      onLoginSuccess(session);
    } else {
      setErrorMessage('Email atau password demo tidak cocok. Silakan gunakan tombol 1-klik di bawah.');
    }
  };

  const handleQuickLogin = (accountKey: string) => {
    const acc = DEMO_ACCOUNTS[accountKey];
    if (acc) {
      const session = authenticateUser(acc.email, acc.password);
      if (session) {
        onLoginSuccess(session);
      }
    }
  };

  const quickRoles = [
    {
      key: 'cs_a',
      title: 'CS Agent A (Teknis)',
      role: 'cs_agent',
      name: 'Andi Wijaya',
      badge: 'Technical Specialist',
      desc: 'Triage Case A (Telephony & Database), Agent Assist Copilot, Antrean Tiket.',
      icon: UserCheck,
      color: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30'
    },
    {
      key: 'cs_b',
      title: 'CS Agent B (Billing)',
      role: 'cs_agent',
      name: 'Siti Rahmawati',
      badge: 'Billing Specialist',
      desc: 'Triage Case B (VA Settlement & Invoicing), Knowledge SOP, CSAT.',
      icon: UserCheck,
      color: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30'
    },
    {
      key: 'supervisor',
      title: 'CS Supervisor',
      role: 'supervisor',
      name: 'Ferry Darmawan',
      badge: 'Operations & QM',
      desc: 'Speech Analytics, Quality Monitoring 91%, Workforce WFM, AI Training.',
      icon: Users,
      color: 'border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/30'
    },
    {
      key: 'marketing',
      title: 'Marketing Intelligence',
      role: 'marketing',
      name: 'Maya Putri',
      badge: 'Growth & Social CX',
      desc: 'Social Sentiment Monitor, AIDA Funnel 10k→540, Outbound Campaigns.',
      icon: TrendingUp,
      color: 'border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30'
    },
    {
      key: 'customer',
      title: 'Portal Pelanggan Mandiri',
      role: 'customer',
      name: 'Budi Santoso',
      badge: 'Enterprise Customer',
      desc: '4 Pilar Mandiri: Billing, FAQ & Kalkulator, Tiket & File Upload, Forum Komunitas.',
      icon: CreditCard,
      color: 'border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 shadow-2xs"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda CiptadraSoft</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20">
          <Sparkles className="h-6 w-6" />
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Masuk ke Ciptadra AI Platform
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Onebox-Inspired Role-Based Omnichannel Customer Experience
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-6">
          {/* Quick 1-Click Role Login Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pilih Peran Demo Cepat (1-Click Login)
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                Langsung masuk tanpa input password
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quickRoles.map((qr) => {
                const Icon = qr.icon;
                return (
                  <button
                    key={qr.key}
                    onClick={() => handleQuickLogin(qr.key)}
                    className={`flex flex-col text-left rounded-xl border p-3 transition-all cursor-pointer ${qr.color}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="font-bold text-xs">{qr.title}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                    </div>
                    <div className="text-[11px] font-semibold text-slate-900 dark:text-white">
                      {qr.name} · <span className="text-slate-500 font-normal">{qr.badge}</span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {qr.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[11px] text-slate-400 uppercase font-mono">
              atau login manual
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-2.5 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 text-xs border border-rose-200 dark:border-rose-900">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Alamat Email Demo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="cs.a@ciptadra-demo.com"
                  className="h-9 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-9 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
