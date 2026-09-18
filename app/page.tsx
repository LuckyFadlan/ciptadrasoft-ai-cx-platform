'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Solutions } from '@/components/Solutions';
import { Products } from '@/components/Products';
import { Industries } from '@/components/Industries';
import { WhyCiptadra } from '@/components/WhyCiptadra';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { LeadModal } from '@/components/LeadModal';
import { AIChatbot } from '@/components/chatbot/AIChatbot';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | null>(null);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleAskAIAbout = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  const handleOpenConsultation = () => {
    setIsLeadModalOpen(true);
    trackEvent('lead_form_opened');
  };

  const handleCloseConsultation = () => {
    setIsLeadModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative selection:bg-blue-600 selection:text-white">
      {/* Sticky Enterprise Navigation Bar */}
      <Navbar
        onOpenChat={handleOpenChat}
        onOpenConsultation={handleOpenConsultation}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenChat={handleOpenChat} />

        {/* Solutions Section */}
        <Solutions onAskAIAbout={handleAskAIAbout} />

        {/* Products & Capabilities Showcase */}
        <Products onAskAIAbout={handleAskAIAbout} />

        {/* Industries Section */}
        <Industries onAskAIAbout={handleAskAIAbout} />

        {/* Why CiptadraSoft Pillars */}
        <WhyCiptadra />

        {/* Closing Conversion CTA Section */}
        <CTA
          onOpenConsultation={handleOpenConsultation}
          onOpenChat={handleOpenChat}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        onOpenChat={handleOpenChat}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Enterprise Consultation Request Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseConsultation}
      />

      {/* Floating Animated AI Chatbot */}
      <AIChatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onClose={handleCloseChat}
        initialPrompt={chatInitialPrompt}
        onClearInitialPrompt={() => setChatInitialPrompt(null)}
      />
    </div>
  );
}
