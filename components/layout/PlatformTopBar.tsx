'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  SlidersHorizontal,
  LogOut,
  ChevronDown,
  Globe,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  Home,
  UserCheck,
  Building2,
  PhoneCall,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { UserSession, IndustryDomain, UserRole } from '@/types/chatbot';
import { DEMO_ACCOUNTS, saveStoredSession, clearStoredSession } from '@/lib/auth';
import { INDUSTRY_PRESETS } from '@/components/service-platform/mockData';

interface PlatformTopBarProps {
  session: UserSession;
  currentRole: UserRole;
  currentIndustry: IndustryDomain;
  onIndustryChange: (ind: IndustryDomain) => void;
  onRoleSwitch: (role: UserRole) => void;
  onLogout: () => void;
  onBackToLanding: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const PlatformTopBar: React.FC<PlatformTopBarProps> = ({
  session,
  currentRole,
  currentIndustry,
  onIndustryChange,
  onRoleSwitch,
  onLogout,
  onBackToLanding,
  searchQuery,
  onSearchChange,
  sidebarCollapsed,
  onToggleSidebar,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showIndustryMenu, setShowIndustryMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'cs_agent':
        return {
          title: 'CS Agent Desk',
          badge: 'Agen Pelayanan',
          color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        };
      case 'supervisor':
        return {
          title: 'Supervisor Cockpit',
          badge: 'Operasional & QM',
          color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
        };
      case 'marketing':
        return {
          title: 'Marketing Intelligence',
          badge: 'Pertumbuhan & Brand',
          color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
        };
      case 'customer':
        return {
          title: 'Customer Self-Service',
          badge: 'Portal Mandiri',
          color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        };
      default:
        return {
          title: 'Workspace',
          badge: 'Staff',
          color: 'bg-slate-500/10 text-slate-600 border-slate-500/20'
        };
    }
  };

  const roleMeta = getRoleLabel(currentRole);

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 md:px-5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-all">
      {/* Left section: Collapse button + Logo + Workspace Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-sm shadow-indigo-500/20">
            C
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs tracking-tight text-slate-900 dark:text-white">
                CiptadraSoft
              </span>
              <span className="text-[10px] text-slate-400 font-mono">/</span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {roleMeta.title}
              </span>
            </div>
          </div>
          <span
            className={`hidden md:inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${roleMeta.color}`}
          >
            {session.agentCode ? `${session.agentCode} · ` : ''}{roleMeta.badge}
          </span>
        </div>
      </div>

      {/* Middle section: Global search + Industry Switcher */}
      <div className="flex items-center gap-2 max-w-lg flex-1 justify-center px-2">
        {/* Search */}
        <div className="relative w-full max-w-xs md:max-w-sm hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari tiket, nasabah, speech, atau kampanye..."
            className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50/80 pl-8 pr-12 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 px-1 text-[9px] font-mono text-slate-400 dark:border-slate-700">
            /
          </kbd>
        </div>

        {/* Industry Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowIndustryMenu(!showIndustryMenu);
              setShowRoleMenu(false);
              setShowNotifications(false);
            }}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            title="Ubah Domain Industri"
          >
            <Building2 className="h-3.5 w-3.5 text-indigo-500" />
            <span className="hidden lg:inline text-[11px] truncate max-w-[110px]">
              {INDUSTRY_PRESETS[currentIndustry]?.name || 'Semua Sektor'}
            </span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showIndustryMenu && (
            <div className="absolute left-0 mt-1 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-800 z-50">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Pilih Domain Sektor Industri
              </div>
              {Object.entries(INDUSTRY_PRESETS).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    onIndustryChange(key as IndustryDomain);
                    setShowIndustryMenu(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition-colors ${
                    currentIndustry === key
                      ? 'bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-950/50 dark:text-indigo-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  {currentIndustry === key && (
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right section: Quick role switcher + User menu + Back to website */}
      <div className="flex items-center gap-2">
        {/* Landing Page Button */}
        <button
          onClick={onBackToLanding}
          className="hidden sm:flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2 text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Kembali ke Landing Page Utama"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Beranda</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowRoleMenu(false);
              setShowIndustryMenu(false);
            }}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute 1 top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-1 w-72 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl dark:border-slate-700 dark:bg-slate-800 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white">Notifikasi AI Omnichannel</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">Tandai Dibaca</span>
              </div>
              <div className="space-y-2 pt-2">
                <div className="rounded-lg bg-indigo-50/50 p-2 dark:bg-indigo-950/30">
                  <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-medium text-[11px]">
                    <Sparkles className="h-3 w-3" />
                    Tiket Prioritas Baru
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    Tiket TKT-2026-8802 (Telephony SIP Trunk) berhasil di-triage ke CS A.
                  </p>
                  <span className="text-[9px] text-slate-400">2 menit yang lalu</span>
                </div>
                <div className="rounded-lg bg-amber-50/50 p-2 dark:bg-amber-950/30">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-medium text-[11px]">
                    <AlertTriangle className="h-3 w-3" />
                    SLA Alert: Case B
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    Tiket TKT-2026-8805 memiliki sisa respon 22 menit.
                  </p>
                  <span className="text-[9px] text-slate-400">14 menit yang lalu</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Account & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowIndustryMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 pr-2 text-left hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 transition-colors"
          >
            <div className="relative h-6 w-6 rounded-md overflow-hidden bg-slate-200">
              {session.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.avatar}
                  alt={session.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-bold text-[10px] text-indigo-600">
                  {session.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-1 ring-white"></span>
            </div>

            <div className="hidden sm:block text-left leading-tight">
              <div className="text-[11px] font-semibold text-slate-900 dark:text-white truncate max-w-[100px]">
                {session.name}
              </div>
              <div className="text-[9px] text-slate-400">
                {session.agentCode || roleMeta.badge}
              </div>
            </div>

            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {/* User Menu Dropdown */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-1 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800 z-50">
              <div className="border-b border-slate-100 pb-2 dark:border-slate-700 px-1">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{session.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{session.email}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    Status: Online (Siap Melayani)
                  </span>
                </div>
              </div>

              <div className="py-1.5">
                <div className="px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Ganti Akun Demo (Role Switch)
                </div>
                <div className="mt-1 space-y-0.5">
                  {Object.entries(DEMO_ACCOUNTS).map(([accKey, acc]) => (
                    <button
                      key={accKey}
                      onClick={() => {
                        saveStoredSession({
                          id: acc.id,
                          email: acc.email,
                          name: acc.name,
                          role: acc.role,
                          agentCode: acc.agentCode,
                          avatar: acc.avatar,
                          status: acc.status,
                          title: acc.title,
                          department: acc.department
                        });
                        onRoleSwitch(acc.role);
                        setShowRoleMenu(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition-colors ${
                        session.email === acc.email
                          ? 'bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-950/50 dark:text-indigo-300'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-medium">{acc.name}</div>
                        <div className="text-[9px] text-slate-400">{acc.demoLabel}</div>
                      </div>
                      {session.email === acc.email && (
                        <CheckCircle className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-1.5 dark:border-slate-700">
                <button
                  onClick={() => {
                    setShowRoleMenu(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Keluar Sesi (Logout)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
