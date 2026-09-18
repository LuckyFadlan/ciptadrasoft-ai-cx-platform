'use client';

import React from 'react';
import { ArrowRight, Bot, Sparkles, MessageSquare } from 'lucide-react';

interface CTAProps {
  onOpenConsultation: () => void;
  onOpenChat: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenConsultation, onOpenChat }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Accelerate Your Modernization Journey</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
          Ready to transform your business?
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Whether you need to streamline customer operations, modernize legacy workflows, or pilot domain-grounded enterprise AI, our solutions team is ready to assist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-blue-900 bg-white hover:bg-blue-50 shadow-xl shadow-black/20 hover:scale-105 transition-all duration-200"
          >
            <span>Talk to CiptadraSoft</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenChat}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all duration-200"
          >
            <Bot className="w-4 h-4" />
            <span>Consult Ciptadra AI Assistant</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
          <span>✓ Free Architectural Consultation</span>
          <span>✓ No Lock-In Discovery</span>
          <span>✓ Enterprise Proof-of-Concept</span>
        </div>
      </div>
    </section>
  );
};
