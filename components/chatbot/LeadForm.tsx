'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, User, Building, Mail, Phone, AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { LeadFormData } from '@/types/chatbot';

interface LeadFormProps {
  onSuccess?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    need: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide at least your name and email.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Submission failed');

      setSubmitted(true);
      trackEvent('lead_submitted', { source: 'chatbot_inline', company: formData.company });
      if (onSuccess) onSuccess();
    } catch {
      setError('Could not submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs">
        <div className="flex items-center gap-2 font-bold mb-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Consultation Request Sent!</span>
        </div>
        <p className="text-emerald-700">
          Our solutions specialist will contact you at <strong>{formData.email}</strong> shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200/80 my-2">
      <div className="text-xs font-bold text-blue-900 mb-1">
        Would you like our team to contact you?
      </div>
      <p className="text-[11px] text-slate-600 mb-3">
        Leave your details and a CiptadraSoft solution architect will get in touch for a tailored consultation.
      </p>

      {error && (
        <div className="mb-2 p-2 bg-red-50 text-red-700 rounded-lg text-[11px] flex items-center gap-1.5 border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="relative">
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              required
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div className="relative">
            <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="email"
              required
              placeholder="Corporate Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Brief business need / project scope"
            value={formData.need}
            onChange={(e) => setFormData({ ...formData, need: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {submitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Connect with CiptadraSoft</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
