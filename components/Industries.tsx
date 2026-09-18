'use client';

import React from 'react';
import { 
  Landmark, 
  ShoppingBag, 
  Radio, 
  Factory, 
  Building, 
  Stethoscope, 
  Globe, 
  Bot, 
  ArrowUpRight 
} from 'lucide-react';
import { getAllIndustries } from '@/lib/retrieval';

interface IndustriesProps {
  onAskAIAbout: (topic: string) => void;
}

const industryIcons: Record<string, React.ReactNode> = {
  'banking-finance': <Landmark className="w-6 h-6 text-blue-600" />,
  'retail': <ShoppingBag className="w-6 h-6 text-emerald-600" />,
  'telecommunications': <Radio className="w-6 h-6 text-indigo-600" />,
  'manufacturing': <Factory className="w-6 h-6 text-amber-600" />,
  'government': <Building className="w-6 h-6 text-teal-600" />,
  'healthcare': <Stethoscope className="w-6 h-6 text-rose-600" />,
  'other-enterprise': <Globe className="w-6 h-6 text-purple-600" />,
};

export const Industries: React.FC<IndustriesProps> = ({ onAskAIAbout }) => {
  const industries = getAllIndustries();

  return (
    <section id="industries" className="py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Sectors We Empower
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Tailored for Mission-Critical Industries
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Every sector has unique regulatory constraints and operational workflows. CiptadraSoft’s architectures are built around industry-specific compliance and real-world scale.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const icon = industryIcons[ind.id] || <Globe className="w-6 h-6 text-blue-600" />;

            return (
              <div
                key={ind.id}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/70 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {icon}
                    </div>
                    <button
                      onClick={() => onAskAIAbout(`How does CiptadraSoft help organizations in the ${ind.name} industry?`)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors"
                      title={`Ask AI regarding ${ind.name}`}
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {ind.name}
                  </h3>
                  
                  <p className="text-xs font-medium text-blue-600 mb-4">
                    {ind.tagline}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">Key Challenges:</span>
                      <p className="text-slate-500 leading-relaxed">{ind.challengesAddressed}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">Recommended Solutions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {ind.popularSolutions.map((solName, i) => (
                          <span
                            key={i}
                            className="bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium"
                          >
                            {solName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => onAskAIAbout(`What specific solutions does CiptadraSoft offer for ${ind.name}?`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50/70 transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask AI About {ind.name} Solutions</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
