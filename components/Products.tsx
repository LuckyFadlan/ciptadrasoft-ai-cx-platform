'use client';

import React, { useState } from 'react';
import { 
  Users, 
  MessageSquareCode, 
  Workflow, 
  TrendingUp, 
  Bot, 
  Network, 
  CheckCircle2, 
  Server, 
  ArrowRight 
} from 'lucide-react';
import { getAllProducts } from '@/lib/retrieval';

interface ProductsProps {
  onAskAIAbout: (topic: string) => void;
}

const productIcons: Record<string, React.ReactNode> = {
  'onebox-crm': <MessageSquareCode className="w-5 h-5 text-blue-600" />,
  'onebox-antrian': <Users className="w-5 h-5 text-emerald-600" />,
  'orbeets-platform': <TrendingUp className="w-5 h-5 text-indigo-600" />,
  'ciptadra-bpm': <Workflow className="w-5 h-5 text-amber-600" />,
  'ciptadra-ai-agent': <Bot className="w-5 h-5 text-purple-600" />,
  'ciptadra-iot-custom': <Network className="w-5 h-5 text-teal-600" />,
};

export const Products: React.FC<ProductsProps> = ({ onAskAIAbout }) => {
  const products = getAllProducts();
  const [activeTab, setActiveTab] = useState<string>(products[0]?.id || 'ciptadra-crm');

  const selectedProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section id="products" className="py-24 bg-slate-50/70 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Enterprise Product Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Purpose-Built Platforms for Business Acceleration
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Engineered with modern APIs, modular microservices, and hybrid cloud compatibility to seamlessly fit your IT landscape.
          </p>
        </div>

        {/* Desktop Product Tabs */}
        <div className="hidden md:flex items-center justify-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl max-w-4xl mx-auto mb-12">
          {products.map((p) => {
            const isActive = p.id === activeTab;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md shadow-slate-300/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {productIcons[p.id]}
                <span>{p.name.replace('Ciptadra ', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Dropdown Select */}
        <div className="md:hidden mb-8">
          <label htmlFor="product-select" className="block text-xs font-semibold text-slate-500 mb-2">
            Select Product Suite
          </label>
          <select
            id="product-select"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Showcase Detail Card */}
        {selectedProduct && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/60 border border-slate-200/80 max-w-5xl mx-auto transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Info Column */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-4">
                  {selectedProduct.category}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                  {selectedProduct.name}
                </h3>

                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {selectedProduct.summary}
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Capabilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deployment badge & AI button */}
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <Server className="w-3.5 h-3.5 text-slate-500" />
                    <span>Deployment: {selectedProduct.deployment}</span>
                  </div>

                  <button
                    onClick={() => onAskAIAbout(`Tell me about ${selectedProduct.name} features and implementation requirements.`)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors ml-auto"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Inquire via AI Assistant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Graphical Preview Card Column */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider">v4.2 ENTERPRISE</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-slate-400">// System Health &amp; Telemetry</div>
                    <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                      <span className="text-slate-300">Cluster Status</span>
                      <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                      <span className="text-slate-300">Throughput Capacity</span>
                      <span className="text-blue-400 font-bold">15,000 req/sec</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                      <span className="text-slate-300">Compliance Standard</span>
                      <span className="text-purple-300 font-bold">ISO 27001 / OJK</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Enterprise Sandbox</span>
                    <span className="text-emerald-400 font-semibold">Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
