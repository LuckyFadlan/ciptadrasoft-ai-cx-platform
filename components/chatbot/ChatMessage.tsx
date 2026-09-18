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

          {/* Formatted Text Content */}
          {renderFormattedContent(message.content)}

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
