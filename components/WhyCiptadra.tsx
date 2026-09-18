'use client';

import React from 'react';
import { 
  Layers, 
  TrendingUp, 
  Award, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle 
} from 'lucide-react';

const pillars = [
  {
    icon: <Layers className="w-6 h-6 text-blue-600" />,
    title: 'Integrated Technology',
    description: 'Unified architecture connecting legacy core systems, ERPs, modern APIs, and third-party services without disjointed data silos.'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    title: 'Scalable Solutions',
    description: 'High-throughput microservices engineered to comfortably handle millions of transactions, customer chats, and workflow approvals.'
  },
  {
    icon: <Award className="w-6 h-6 text-indigo-600" />,
    title: 'Industry Expertise',
    description: 'Over a decade of hands-on delivery in Indonesian banking, telecom, manufacturing, retail, and public sector domains.'
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
    title: 'Customer-Centric Approach',
    description: 'Dedicated solution architects and 24/7 SLA engineering teams committed to your business outcomes and long-term user adoption.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-rose-600" />,
    title: 'Secure Infrastructure',
    description: 'ISO/IEC standard compliance, end-to-end encryption, role-based access control, and full on-premise or sovereign cloud hosting.'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-purple-600" />,
    title: 'AI-Enabled Transformation',
    description: 'Pragmatic, domain-grounded Generative AI assistants and workflow automation with private data isolation and zero public training leaks.'
  },
];

export const WhyCiptadra: React.FC = () => {
  return (
    <section id="why-ciptadra" className="py-24 bg-slate-50/50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Enterprise Value
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Enterprise Leaders Choose CiptadraSoft
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We bridge the gap between complex legacy systems and agile modern technology, ensuring your digital modernization yields measurable operational returns.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-start"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Highlight Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold mb-2">Enterprise-Grade Readiness &amp; Compliance</h4>
            <p className="text-slate-300 text-sm max-w-xl">
              Strict compliance readiness with OJK, Bank Indonesia standards, and personal data protection principles (UU PDP).
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Sovereign Data Residency</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>24/7 SLA Engineering</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Account Architects</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
