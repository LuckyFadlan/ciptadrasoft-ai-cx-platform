'use client';

import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-white rounded-2xl rounded-tl-sm border border-slate-200/80 shadow-sm w-fit">
      <span className="text-xs text-slate-500 font-medium mr-1.5">Ciptadra AI is thinking</span>
      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
    </div>
  );
};
