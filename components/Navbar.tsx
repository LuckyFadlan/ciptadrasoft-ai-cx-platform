'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Shield,
  Globe,
  Zap,
  Headphones,
  BarChart3,
  TrendingUp,
  UserCheck,
  LogIn,
  Layers,
  CreditCard
} from 'lucide-react';
import { PlatformView } from '@/types/chatbot';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenConsultation: () => void;
  activeView?: PlatformView;
  onSelectView?: (view: PlatformView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenConsultation,
  activeView = 'customer',
  onSelectView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2'
          : 'bg-white/90 backdrop-blur-sm py-3 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <button
            onClick={() => onSelectView && onSelectView('customer')}
            className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-black text-xl tracking-tighter">CS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
                Ciptadra<span className="text-blue-600">Soft</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                AI CX &amp; Omnichannel
              </span>
            </div>
          </button>

          {/* DESKTOP SEGMENTED ROLE / VIEW SWITCHER */}
          {onSelectView && (
            <div className="hidden xl:flex items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-inner">
              <button
                onClick={() => onSelectView('customer')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'customer' || activeView === 'landing'
                    ? 'bg-white text-blue-700 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>

              <button
                onClick={() => onSelectView('customer_portal')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'customer_portal'
                    ? 'bg-amber-500 text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Portal Pelanggan</span>
              </button>

              <button
                onClick={() => onSelectView('cs_workspace')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'cs_workspace' || activeView === 'cs_dashboard' || activeView === 'agent'
                    ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>CS Agent Desk</span>
              </button>

              <button
                onClick={() => onSelectView('supervisor_workspace')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'supervisor_workspace' || activeView === 'supervisor_dashboard' || activeView === 'operations'
                    ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Supervisor Cockpit</span>
              </button>

              <button
                onClick={() => onSelectView('marketing_workspace')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'marketing_workspace'
                    ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Marketing Intel</span>
              </button>

              <button
                onClick={() => onSelectView('live_demo')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'live_demo' || activeView === 'flow'
                    ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Live AI Demo</span>
              </button>
            </div>
          )}

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {onSelectView && (
              <button
                onClick={() => onSelectView('login')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                title="Masuk atau Ganti Peran Demo"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-600" />
                <span>Masuk Staf (Role Login)</span>
              </button>
            )}

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/70 transition-colors shadow-2xs cursor-pointer"
              title="Open Ciptadra AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Tanya AI Chatbot</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md shadow-blue-600/25 transition-all duration-200 hover:shadow-lg cursor-pointer"
            >
              <span>Konsultasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 rounded-lg text-blue-600 bg-blue-50"
              aria-label="Open AI Chatbot"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-200 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
            {onSelectView && (
              <div className="flex flex-col gap-1.5 pb-3 mb-3 border-b border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Pilih Ruang Kerja:</span>
                <button
                  onClick={() => {
                    onSelectView('customer');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-left ${
                    activeView === 'customer' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Landing Page &amp; AI Chatbot</span>
                </button>
                <button
                  onClick={() => {
                    onSelectView('customer_portal');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-left ${
                    activeView === 'customer_portal' ? 'bg-amber-50 text-amber-700' : 'text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Portal Mandiri Pelanggan (4 Pilar)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectView('cs_workspace');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-left ${
                    activeView === 'cs_workspace' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'
                  }`}
                >
                  <Headphones className="w-4 h-4 text-emerald-600" />
                  <span>CS Agent Desk (Omnichannel &amp; Copilot)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectView('supervisor_workspace');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-left ${
                    activeView === 'supervisor_workspace' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>Supervisor Cockpit &amp; Speech Analytics</span>
                </button>
                <button
                  onClick={() => {
                    onSelectView('marketing_workspace');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-left ${
                    activeView === 'marketing_workspace' ? 'bg-purple-50 text-purple-700' : 'text-slate-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span>Marketing Intelligence (Sentimen &amp; AIDA)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectView('login');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-left text-slate-700 bg-slate-50"
                >
                  <LogIn className="w-4 h-4 text-slate-600" />
                  <span>Masuk Staf Demo (Pilih Peran)</span>
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tanya AI Chatbot</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 shadow-md"
              >
                <span>Konsultasi Bisnis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
