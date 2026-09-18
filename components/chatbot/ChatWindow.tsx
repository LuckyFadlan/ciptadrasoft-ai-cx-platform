'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Trash2, 
  Sparkles, 
  Minimize2, 
  RefreshCw, 
  ChevronDown 
} from 'lucide-react';
import { ChatMessage as ChatMessageType, Role } from '@/types/chatbot';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import { TypingIndicator } from './TypingIndicator';
import { trackEvent } from '@/lib/analytics';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm Ciptadra AI. Ask me about CiptadraSoft's solutions, products, industries, services, or how we can help your business.",
  timestamp: Date.now(),
};

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicPrompts, setDynamicPrompts] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // If page requested a prompt (e.g. from Solutions or Products card), send it automatically
  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessageType = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);
    trackEvent('message_sent', { textLength: text.length });

    try {
      // Build conversation payload for backend
      const payloadMessages = newMessages
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.role as Role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessageType = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: data.reply || "Ciptadra AI is temporarily unavailable. Please try again or contact our team.",
        timestamp: Date.now(),
        isError: Boolean(data.error),
        suggestedFollowUps: data.suggestedFollowUps,
        showLeadForm: data.showLeadForm,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      trackEvent('message_received', { isError: Boolean(data.error) });

      if (data.suggestedFollowUps && data.suggestedFollowUps.length > 0) {
        setDynamicPrompts(data.suggestedFollowUps);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessageType = {
        id: `msg_${Date.now()}_err`,
        role: 'assistant',
        content: "Ciptadra AI is temporarily unavailable. Please try again or contact our team.",
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([
      {
        ...WELCOME_MESSAGE,
        timestamp: Date.now(),
      },
    ]);
    setDynamicPrompts([]);
  };

  const retryLastMessage = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      sendMessage(lastUserMsg.content);
    }
  };

  return (
    <div
      className="flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden w-[92vw] sm:w-[410px] h-[580px] sm:h-[620px] max-h-[85vh] transition-all duration-300"
      style={{
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.2), 0 0 25px rgba(37, 99, 235, 0.15)',
      }}
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-4 flex items-center justify-between shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Bot className="w-5 h-5 text-blue-200" />
            </div>
            {/* Status indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-indigo-900 rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white leading-tight">Ciptadra AI</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded font-medium">
                Online
              </span>
            </div>
            <p className="text-[11px] text-blue-200/80">Your CiptadraSoft assistant</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleClearConversation}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Minimize chat"
            aria-label="Minimize chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* BODY: Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50/60 flex flex-col justify-between">
        <div>
          {/* Render all messages */}
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onRetry={msg.isError ? retryLastMessage : undefined}
            />
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="my-2">
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts (shown when only welcome message or as follow-ups) */}
        {!isLoading && (
          <div className="mt-4 pt-2 border-t border-slate-200/60">
            <SuggestedPrompts
              prompts={dynamicPrompts}
              onSelectPrompt={(prompt) => sendMessage(prompt)}
              disabled={isLoading}
            />
          </div>
        )}
      </div>

      {/* FOOTER: Input Box */}
      <div className="p-3.5 bg-white border-t border-slate-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-end gap-2 bg-slate-50 rounded-2xl p-2 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about solutions, CRM, BPM, or pricing..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none resize-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none max-h-24 py-1 px-1 custom-scrollbar leading-snug"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
          <span>Enter to send, Shift + Enter for newline</span>
          <span className="text-slate-400 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-blue-500" />
            <span>Grounded in Ciptadra Knowledge</span>
          </span>
        </div>
      </div>
    </div>
  );
};
