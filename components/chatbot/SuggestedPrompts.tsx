'use client';

import React from 'react';
import { Sparkles, MessageCircleQuestion } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface SuggestedPromptsProps {
  prompts?: string[];
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const DEFAULT_PROMPTS = [
  'Jelaskan Onebox CRM',
  'Bagaimana ticketing bekerja?',
  'Solusi untuk customer service volume tinggi',
  'Produk Ciptadra untuk perusahaan saya',
];

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  prompts = DEFAULT_PROMPTS,
  onSelectPrompt,
  disabled = false,
}) => {
  const displayPrompts = prompts.length > 0 ? prompts : DEFAULT_PROMPTS;

  const handleClick = (prompt: string) => {
    if (disabled) return;
    trackEvent('suggested_prompt_clicked', { prompt });
    onSelectPrompt(prompt);
  };

  return (
    <div className="py-2">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-2">
        <Sparkles className="w-3 h-3 text-blue-600" />
        <span>Suggested questions:</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {displayPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => handleClick(prompt)}
            className="flex items-center gap-2 text-left text-xs text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50/80 p-2.5 rounded-xl border border-slate-200/80 hover:border-blue-200 shadow-sm transition-all duration-150 disabled:opacity-50 group"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="line-clamp-2">{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
