'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Headphones, 
  RefreshCw, 
  Cpu, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  Check, 
  X,
  Bot,
  Users,
  ShieldCheck,
  Radio,
  HeartPulse
} from 'lucide-react';
import { getAllSolutions } from '@/lib/retrieval';
import { SolutionItem } from '@/types/chatbot';

interface SolutionsProps {
  onAskAIAbout: (topic: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'omnichannel-customer-experience': <Headphones className="w-6 h-6 text-blue-600" />,
  'smartcity-egovernment': <Building2 className="w-6 h-6 text-emerald-600" />,
  'insurance-fintech': <ShieldCheck className="w-6 h-6 text-indigo-600" />,
  'datawarehouse-bi': <BarChart3 className="w-6 h-6 text-amber-600" />,
  'pr-media-intelligence': <Radio className="w-6 h-6 text-purple-600" />,
  'digital-wellbeing': <HeartPulse className="w-6 h-6 text-rose-600" />,
};

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  'omnichannel-customer-experience': { bg: 'bg-blue-50/70', border: 'border-blue-100', badge: 'text-blue-700 bg-blue-100/70' },
  'smartcity-egovernment': { bg: 'bg-emerald-50/70', border: 'border-emerald-100', badge: 'text-emerald-700 bg-emerald-100/70' },
  'insurance-fintech': { bg: 'bg-indigo-50/70', border: 'border-indigo-100', badge: 'text-indigo-700 bg-indigo-100/70' },
  'datawarehouse-bi': { bg: 'bg-amber-50/70', border: 'border-amber-100', badge: 'text-amber-700 bg-amber-100/70' },
  'pr-media-intelligence': { bg: 'bg-purple-50/70', border: 'border-purple-100', badge: 'text-purple-700 bg-purple-100/70' },
  'digital-wellbeing': { bg: 'bg-rose-50/70', border: 'border-rose-100', badge: 'text-rose-700 bg-rose-100/70' },
};

export const Solutions: React.FC<SolutionsProps> = ({ onAskAIAbout }) => {
  const solutions = getAllSolutions();
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  return (
    <section id="solutions" className="py-24 bg-white border-b border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Core Enterprise Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Integrated Solutions for High-Impact Enterprises
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From omnichannel customer service to automated BPM and generative AI workflows,
            CiptadraSoft delivers scalable foundations engineered for Southeast Asian enterprise scale.
          </p>
        </div>

        {/* Grid of 6 Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => {
            const colors = colorMap[sol.id] || { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'text-slate-700 bg-slate-100' };
            const icon = iconMap[sol.id] || <Cpu className="w-6 h-6 text-blue-600" />;

            return (
              <div
                key={sol.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon & Target */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      {icon}
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                      Enterprise
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                    {sol.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {sol.shortDescription}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {sol.keyBenefits.slice(0, 2).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSolution(sol)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAskAIAbout(`Tell me more about CiptadraSoft's ${sol.name} and how it applies to our business.`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title={`Ask AI about ${sol.name}`}
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detailed Modal for "Learn More" */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                {iconMap[selectedSolution.id] || <Cpu className="w-6 h-6 text-blue-600" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedSolution.name}</h3>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Target: {selectedSolution.targetAudience}
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedSolution.description}
            </p>

            {/* Key Benefits */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Enterprise Benefits</h4>
              <div className="space-y-2.5">
                {selectedSolution.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities Included */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Capabilities Included</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSolution.capabilitiesIncluded.map((cap, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  const sol = selectedSolution;
                  setSelectedSolution(null);
                  onAskAIAbout(`Explain how CiptadraSoft's ${sol.name} works and what business problems it solves.`);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span>Discuss with Ciptadra AI</span>
              </button>
              <button
                onClick={() => setSelectedSolution(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
