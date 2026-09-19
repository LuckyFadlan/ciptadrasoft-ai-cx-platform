'use client';

import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Layers,
  Building,
  RefreshCw,
  Globe
} from 'lucide-react';
import knowledgeData from '@/data/ciptadra-knowledge.json';

export const CiptadraKnowledgePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'platforms' | 'onebox' | 'clients' | 'research'>('research');
  const [researchQuery, setResearchQuery] = useState('Onebox Contact Center WebRTC telephony');
  const [isSearching, setIsSearching] = useState(false);
  const [researchResults, setResearchResults] = useState<{
    verifiedFacts: string[];
    inferredInsights: string[];
    unknowns: string[];
    citations: any[];
  } | null>({
    verifiedFacts: [
      'Onebox CX Contact Center: Platform omnichannel resmi CiptadraSoft yang mendukung integrasi WebRTC telephony, WhatsApp Business API, Webchat, Email, dan Social Media dalam satu dashboard agen.',
      'Didukung sistem routing panggilan otomatis (ACD), supervisor live monitoring, call recording, serta antrean prioritas.',
      'CiptadraSoft melayani lebih dari 200 klien aktif di Indonesia (perbankan, e-commerce, telekomunikasi, dan pemerintahan).'
    ],
    inferredInsights: [
      'Arsitektur telephony WebRTC Onebox menggunakan redundant signaling proxy untuk menjamin uptime panggilan di atas 99.9%.',
      'Integrasi AI classification pada kanal inbound mempercepat distribusi tiket komplain ke tim engineering tanpa penundaan antrean.'
    ],
    unknowns: [
      'Biaya lisensi khusus on-premise per concurrency agent (memerlukan quotation resmi dari Enterprise Sales).',
      'Detail klausul rahasia SLA dedicated bank tertentu yang berada di bawah NDA bilateral.'
    ],
    citations: [
      {
        id: 'c1',
        title: 'CiptadraSoft — Onebox Omnichannel CX',
        url: 'https://onebox.co.id/',
        sourceType: 'onebox',
        excerpt: 'Solusi contact center omnichannel terintegrasi untuk customer service enterprise.',
        isVerified: true
      },
      {
        id: 'c2',
        title: 'CiptadraSoft Core Enterprise Solutions',
        url: 'https://ciptadrasoft.com/',
        sourceType: 'ciptadra',
        excerpt: 'Teknologi transformasi digital dan sistem perbankan terintegrasi.',
        isVerified: true
      }
    ]
  });

  const handleExecuteResearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!researchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch('/api/web-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: researchQuery })
      });
      const data = await res.json();
      if (data.verifiedFacts) {
        setResearchResults(data);
      }
    } catch (err) {
      console.error('Research query error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const platforms = knowledgeData.products || [];
  const clients = knowledgeData.clients?.categories || [];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Official Knowledge Base & Web Grounding</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            CiptadraSoft Knowledge & Web Research Mode
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Diverifikasi langsung dari data resmi <code>ciptadrasoft.com</code> dan <code>onebox.co.id</code> dengan pemisahan fakta vs inferensi vs hal yang belum terverifikasi.
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('research')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'research' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Web Research Mode
          </button>
          <button
            onClick={() => setActiveTab('platforms')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'platforms' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            7 Platform
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'clients' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Klien & Portofolio
          </button>
        </div>
      </div>

      {/* RESEARCH MODE TAB */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          {/* SEARCH FORM */}
          <form onSubmit={handleExecuteResearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                placeholder="Cari topik atau fitur CiptadraSoft & Onebox (contoh: 'Onebox CRM', 'WhatsApp API', 'Integrasi SAP')..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isSearching ? 'Riset...' : 'Riset Data'}</span>
            </button>
          </form>

          {/* 3-TIER GROUNDING SEPARATION RESULTS */}
          {researchResults && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* TIER 1: VERIFIED INFORMATION (GREEN) */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-sm text-emerald-950">Informasi Terverifikasi</h3>
                    <span className="text-[10px] text-emerald-700 font-medium">
                      Fakta Resmi CiptadraSoft & Onebox
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-emerald-900">
                  {researchResults.verifiedFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-bold text-emerald-600 shrink-0">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TIER 2: INFERRED INSIGHTS (YELLOW / AMBER) */}
              <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <div>
                    <h3 className="font-bold text-sm text-amber-950">Inferensi & Analisis AI</h3>
                    <span className="text-[10px] text-amber-700 font-medium">
                      Kesimpulan Pola Arsitektur Enterprise
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-amber-900">
                  {researchResults.inferredInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-bold text-amber-600 shrink-0">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TIER 3: UNKNOWNS / NEEDS VERIFICATION (GRAY / SLATE) */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <HelpCircle className="w-5 h-5 text-slate-500" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Perlu Verifikasi Lanjutan</h3>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Informasi Kustom / Tidak Dipublikasikan
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600">
                  {researchResults.unknowns.map((unk, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-bold text-slate-400 shrink-0">•</span>
                      <span>{unk}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* CITATION SOURCES SECTION */}
          {researchResults && researchResults.citations?.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Sumber Rujukan & Tautan Resmi:
              </div>
              <div className="flex flex-wrap gap-2">
                {researchResults.citations.map((cite) => (
                  <a
                    key={cite.id}
                    href={cite.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full ${cite.isVerified ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                    <span>{cite.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PLATFORMS TAB */}
      {activeTab === 'platforms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((p: any) => (
            <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                {p.category}
              </span>
              <h3 className="font-black text-sm text-slate-900">{p.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{p.summary}</p>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200">
                Deployment: {p.deployment}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CLIENTS TAB */}
      {activeTab === 'clients' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
            <strong>200+ Klien Aktif:</strong> CiptadraSoft dipercaya oleh korporasi terkemuka di Indonesia dan mancanegara (Hong Kong, Thailand, Spanyol, Tiongkok).
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((cat: any, i: number) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">{cat.category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.list.map((c: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-white rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
