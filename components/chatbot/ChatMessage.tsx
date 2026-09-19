'use client';

import React from 'react';
import { Bot, User, RotateCcw, AlertCircle, BookOpen } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types/chatbot';
import { LeadForm } from './LeadForm';

interface ChatMessageProps {
  message: ChatMessageType;
  onRetry?: () => void;
}

// Simple text formatter for bullet points, bold text, and line breaks
function renderFormattedContent(content: string) {
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Bullet item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1">
              <span className="text-blue-500 font-bold">•</span>
              <span>{renderInlineStyles(trimmed.slice(2))}</span>
            </div>
          );
        }

        // Numbered item
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 font-medium">
              <span className="text-blue-600 font-bold">{numberedMatch[1]}.</span>
              <span>{renderInlineStyles(numberedMatch[2])}</span>
            </div>
          );
        }

        return <p key={idx}>{renderInlineStyles(line)}</p>;
      })}
    </div>
  );
}

function renderInlineStyles(text: string) {
  // Simple bold parser: **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;
  const [selectedCitation, setSelectedCitation] = React.useState<any | null>(null);

  const timeString = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex gap-2.5 my-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* Bot Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Bot className="w-4 h-4" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        
        <div
          className={`p-3.5 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-md shadow-blue-500/10'
              : isError
              ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-sm'
              : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-tl-sm'
          }`}
        >
          {isError && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 mb-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Service Notice</span>
            </div>
          )}

          {/* User Attached Files (if any) */}
          {isUser && message.attachments && message.attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-white/20 backdrop-blur-xs text-white text-[11px] border border-white/20"
                >
                  {att.category === 'image' && att.dataUrl ? (
                    <img src={att.dataUrl} alt={att.name} className="w-9 h-9 rounded-lg object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex flex-col max-w-[150px]">
                    <span className="truncate font-semibold">{att.name}</span>
                    <span className="text-[9px] text-white/80">{(att.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formatted Text Content */}
          {renderFormattedContent(message.content)}

          {/* 4-Tier Source Attribution Breakdown */}
          {!isUser && !isError && message.sourceBreakdown && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] space-y-1.5">
              <div className="font-bold text-slate-400 uppercase tracking-wider">
                Attribution & Sources:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {message.sourceBreakdown.fromFile && message.sourceBreakdown.fromFile.length > 0 && (
                  <div className="p-1.5 rounded-lg bg-blue-50/80 border border-blue-200/60 text-blue-900 flex items-start gap-1.5">
                    <span className="font-bold">📄 File:</span>
                    <span className="truncate">{message.sourceBreakdown.fromFile.join(', ')}</span>
                  </div>
                )}
                {message.sourceBreakdown.fromOfficial && message.sourceBreakdown.fromOfficial.length > 0 && (
                  <div className="p-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-emerald-900 flex items-start gap-1.5">
                    <span className="font-bold">🌐 Official:</span>
                    <span className="truncate">{message.sourceBreakdown.fromOfficial.join(', ')}</span>
                  </div>
                )}
                {message.sourceBreakdown.fromWeb && message.sourceBreakdown.fromWeb.length > 0 && (
                  <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 flex items-start gap-1.5">
                    <span className="font-bold">🔍 Web:</span>
                    <span className="truncate">{message.sourceBreakdown.fromWeb.join(', ')}</span>
                  </div>
                )}
                {message.sourceBreakdown.inferences && message.sourceBreakdown.inferences.length > 0 && (
                  <div className="p-1.5 rounded-lg bg-amber-50/80 border border-amber-200/60 text-amber-900 flex items-start gap-1.5">
                    <span className="font-bold">💡 Inference:</span>
                    <span className="truncate">{message.sourceBreakdown.inferences.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Compact Clickable Source Citation Chips */}
          {!isUser && !isError && ((message.citations && message.citations.length > 0) || (message.groundedSources && message.groundedSources.length > 0)) && (
            <div className="mt-3 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                <BookOpen className="w-3 h-3 text-blue-500" />
                <span>Verified Sources & Citations:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {message.citations && message.citations.length > 0 ? (
                  message.citations.map((cite) => (
                    <button
                      key={cite.id}
                      type="button"
                      onClick={() => setSelectedCitation(cite)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/70 transition-all cursor-pointer shadow-2xs hover:scale-102"
                      title="Click to view verified source excerpt"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cite.isVerified ? 'bg-emerald-500' : 'bg-indigo-400'}`} />
                      <span className="truncate max-w-[180px]">{cite.title}</span>
                    </button>
                  ))
                ) : (
                  message.groundedSources?.map((src, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
                    >
                      {src}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Citation Preview Modal / Popover */}
          {selectedCitation && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900 text-white text-[11px] shadow-lg border border-slate-700 space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${selectedCitation.isVerified ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                  <span className="font-bold text-white text-xs">{selectedCitation.title}</span>
                  {selectedCitation.isVerified && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1 rounded">
                      Verified
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCitation(null)}
                  className="text-slate-400 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed italic">{selectedCitation.excerpt}</p>
              {selectedCitation.url && (
                <div className="pt-1 flex justify-end">
                  <a
                    href={selectedCitation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Open Source Documentation →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Inline Lead Form if requested */}
          {!isUser && message.showLeadForm && (
            <div className="mt-3 pt-2 border-t border-slate-100">
              <LeadForm />
            </div>
          )}
        </div>

        {/* Timestamp & Retry */}
        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-[10px] text-slate-400">{timeString}</span>

          {isError && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          )}
        </div>

      </div>

      {/* User Icon */}
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}

    </div>
  );
};
