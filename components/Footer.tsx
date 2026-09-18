'use client';

import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Bot, Shield, ChevronRight } from 'lucide-react';
import { getCompanyInfo } from '@/lib/retrieval';

interface FooterProps {
  onOpenChat: () => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChat, onOpenConsultation }) => {
  const company = getCompanyInfo();

  return (
    <footer id="about" className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Column 1 & 2: Company Profile */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center font-black text-white text-lg">
                CS
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Ciptadra<span className="text-blue-400">Soft</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              {company.description}
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{company.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{company.contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{company.contact.phone} • WA: {company.contact.whatsapp || '081383249247'}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Solutions</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products &amp; Platforms</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Industries Served</a></li>
              <li><a href="#why-ciptadra" className="hover:text-white transition-colors">Why CiptadraSoft</a></li>
            </ul>
          </div>

          {/* Column 4: 7 Core Platforms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">7 Platform Utama</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#products" className="hover:text-white transition-colors">Onebox CRM (Omnichannel)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Onebox Smartcity (SPBE)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Onebox Insurance</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Onebox Data Warehouse &amp; BI</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Onebox Digital</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Onebox PR (Humas &amp; Sentimen)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Ciptalife (Wellbeing &amp; SatuSehat)</a></li>
            </ul>
          </div>

          {/* Column 5: AI & Inquiry */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">AI Assistant &amp; Contact</h4>
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">Ciptadra AI Live</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Have inquiries about architectures or integrations? Chat with our virtual assistant.
              </p>
              <button
                onClick={onOpenChat}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                <span>Launch Assistant</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <span>Schedule Enterprise Demo</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Security Practices</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
