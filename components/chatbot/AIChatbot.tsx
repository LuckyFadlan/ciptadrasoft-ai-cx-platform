'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { trackEvent } from '@/lib/analytics';

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen,
  onToggle,
  onClose,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    const nextState = !isOpen;
    if (nextState) {
      trackEvent('chatbot_opened');
    } else {
      trackEvent('chatbot_closed');
    }
    onToggle();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* ANIMATED CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ciptadra-chat-window"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 origin-bottom-right"
          >
            <ChatWindow
              isOpen={isOpen}
              onClose={() => {
                trackEvent('chatbot_closed');
                onClose();
              }}
              initialPrompt={initialPrompt}
              onClearInitialPrompt={onClearInitialPrompt}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TRIGGER BUTTON CONTAINER */}
      <div className="relative flex items-center justify-center">
        
        {/* Hover Tooltip: "Ask Ciptadra AI" */}
        <AnimatePresence>
          {!isOpen && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-16 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Ask Ciptadra AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Floating Launcher Button */}
        <motion.button
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 ${
            isOpen
              ? 'bg-slate-900 shadow-xl shadow-slate-900/30'
              : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 animate-float-slow animate-glow shadow-xl shadow-blue-500/30'
          }`}
          aria-label={isOpen ? 'Close Ciptadra AI Chat' : 'Open Ciptadra AI Chat'}
          title={isOpen ? 'Close' : 'Ask Ciptadra AI'}
        >
          {/* Animated Icon Swap */}
          <motion.div
            key={isOpen ? 'close' : 'bot'}
            initial={{ rotate: isOpen ? -90 : 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: isOpen ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Bot className="w-6 h-6 text-white" />
            )}
          </motion.div>

          {/* Active Status Badge dot when closed */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm animate-ping" />
          )}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
          )}
        </motion.button>

      </div>

    </div>
  );
};
