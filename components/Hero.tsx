'use client';

import React from 'react';
import { ArrowRight, Bot, ShieldCheck, Zap, Activity, Cpu, Layers, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
  onOpenCSDashboard?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onOpenCSDashboard }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/70 border-b border-slate-200/60">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl -z-10">
        <div className="absolute -top-12 left-10 w-72 h-72 rounded-full bg-blue-400/30" />
        <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-emerald-400/20" />
        <div className="absolute top-32 left-1/3 w-96 h-96 rounded-full bg-indigo-400/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Enterprise Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Enterprise IT &amp; Digital Transformation Partner</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Transform Your Business with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Smarter Digital Solutions
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl">
              Integrated technology solutions designed to simplify business processes,
              improve customer experiences, and accelerate digital transformation for forward-thinking enterprises.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              {onOpenCSDashboard && (
                <button
                  onClick={onOpenCSDashboard}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-700 hover:via-indigo-700 hover:to-emerald-700 shadow-xl shadow-blue-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                  </span>
                  <span>ENTER AI CUSTOMER SERVICE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Explore Solutions</span>
              </a>

              <button
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl text-base font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/70 shadow-2xs hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Bot className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                </div>
                <span>Talk to AI Assistant</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 w-full max-w-xl">
              <div>
                <div className="text-2xl font-black text-slate-900">25+ Thn</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Pengalaman (Est. 1999)</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">200+</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Klien Enterprise &amp; BUMN</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">94%</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Skor CSAT Pelanggan</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">18K+</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Interaksi Setiap Hari</div>
              </div>
            </div>
          </div>

          {/* Right Column: Technology-oriented visual graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-lg">
              
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-emerald-400/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Enterprise Architecture Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/80 border border-slate-200/80 relative">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">CiptadraSoft Core Engine</div>
                      <div className="text-xs text-slate-500">Distributed Enterprise Grid</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Operational
                  </span>
                </div>

                {/* Architecture Layers */}
                <div className="space-y-3.5">
                  {/* Layer 1: Omni Engagement */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 border border-blue-100/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white shadow-sm text-blue-600">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Omnichannel Customer Desk</div>
                        <div className="text-[11px] text-slate-500">WhatsApp • Webchat • Email • Voice</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded">
                      Live
                    </span>
                  </div>

                  {/* Layer 2: GenAI & RAG Engine */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-blue-50/50 border border-indigo-100/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white shadow-sm text-indigo-600">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Domain Generative AI &amp; RAG</div>
                        <div className="text-[11px] text-slate-500">Strict Grounding • Private LLM Sandbox</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-indigo-600 bg-indigo-100/60 px-2 py-0.5 rounded">
                      0ms Leak
                    </span>
                  </div>

                  {/* Layer 3: BPM Workflow */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-slate-50 border border-emerald-100/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white shadow-sm text-emerald-600">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Ciptadra Flow BPM Engine</div>
                        <div className="text-[11px] text-slate-500">BPMN 2.0 • Automated Matrix Approvals</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded">
                      Fast
                    </span>
                  </div>

                  {/* Layer 4: Integration Middleware */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/80 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white shadow-sm text-slate-700">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Core Banking &amp; ERP ESB Gateway</div>
                        <div className="text-[11px] text-slate-500">ISO 8583 • SAP • Oracle • REST APIs</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                      Secure
                    </span>
                  </div>
                </div>

                {/* Footer metrics inside card */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ISO/IEC 27001 Security Practice</span>
                  </div>
                  <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    Jakarta On-Premise / Cloud
                  </span>
                </div>
              </div>

              {/* Floating Mini Interactive AI Bubble */}
              <button
                onClick={onOpenChat}
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 hover:bg-slate-800 hover:scale-105 transition-all duration-200 border border-slate-700 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-slate-200">Have specific requirements?</div>
                  <div className="text-[11px] text-blue-300 font-medium">Ask Ciptadra AI right now →</div>
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Trusted By Client Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200/80">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Dipercaya 200+ Klien Terkemuka &amp; Diekspor ke Hong Kong, Thailand, Cina, Spanyol
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold text-slate-600">
            <span className="hover:text-blue-600 transition-colors">Bank Indonesia</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">OJK</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">Telkom Indonesia</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">Telkomsel</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">XL Axiata</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">Gojek</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">AXA Mandiri</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">Ciputra Life</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">Allobank</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">LRT Jakarta</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors">Kemenkeu RI</span>
          </div>
        </div>
      </div>
    </section>
  );
};
