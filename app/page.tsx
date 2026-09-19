'use client';

import React, { useState, useEffect } from 'react';
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
import { CSDashboard } from '@/components/service-platform/CSDashboard';
import { SupervisorDashboard } from '@/components/service-platform/SupervisorDashboard';
import { LiveAIDemo } from '@/components/service-platform/LiveAIDemo';
import { PlatformView, IndustryDomain, UserSession, UserRole } from '@/types/chatbot';
import { trackEvent } from '@/lib/analytics';
import { DEMO_ACCOUNTS, getStoredSession, saveStoredSession, clearStoredSession } from '@/lib/auth';

// Layout & Workspaces
import { PlatformTopBar } from '@/components/layout/PlatformTopBar';
import { ContextualSidebar } from '@/components/layout/ContextualSidebar';
import { LoginPage } from '@/components/auth/LoginPage';
import { CSAgentWorkspace } from '@/components/cs-agent/CSAgentWorkspace';
import { SupervisorWorkspace } from '@/components/supervisor/SupervisorWorkspace';
import { MarketingWorkspace } from '@/components/marketing/MarketingWorkspace';
import { CustomerSelfServicePortal } from '@/components/customer-portal/CustomerSelfServicePortal';

export default function Home() {
  const [activeView, setActiveView] = useState<PlatformView>('customer');
  const [session, setSession] = useState<UserSession | null>(null);
  const [currentIndustry, setCurrentIndustry] = useState<IndustryDomain>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('inbox');

  // Chatbot & modal states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | null>(null);

  // Initialize session on mount
  useEffect(() => {
    const stored = getStoredSession();
    if (stored) {
      setSession(stored);
    } else {
      // Default to CS A demo session
      const def = DEMO_ACCOUNTS.cs_a;
      setSession({
        id: def.id,
        email: def.email,
        name: def.name,
        role: def.role,
        agentCode: def.agentCode,
        avatar: def.avatar,
        status: def.status,
        title: def.title,
        department: def.department
      });
    }
  }, []);

  // Update default active tab when role or view changes
  const getDefaultTabForRole = (role: UserRole): string => {
    switch (role) {
      case 'cs_agent':
        return 'inbox';
      case 'supervisor':
        return 'team_overview';
      case 'marketing':
        return 'sentiment';
      case 'customer':
        return 'portal_account';
      default:
        return 'inbox';
    }
  };

  const handleSelectView = (view: PlatformView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync session and activeTab based on view
    if (view === 'cs_workspace') {
      const acc = DEMO_ACCOUNTS.cs_a;
      const s: UserSession = {
        id: acc.id,
        email: acc.email,
        name: acc.name,
        role: 'cs_agent',
        agentCode: acc.agentCode,
        avatar: acc.avatar,
        status: acc.status,
        title: acc.title,
        department: acc.department
      };
      setSession(s);
      saveStoredSession(s);
      setActiveTab('inbox');
    } else if (view === 'supervisor_workspace') {
      const acc = DEMO_ACCOUNTS.supervisor;
      const s: UserSession = {
        id: acc.id,
        email: acc.email,
        name: acc.name,
        role: 'supervisor',
        avatar: acc.avatar,
        status: acc.status,
        title: acc.title,
        department: acc.department
      };
      setSession(s);
      saveStoredSession(s);
      setActiveTab('team_overview');
    } else if (view === 'marketing_workspace') {
      const acc = DEMO_ACCOUNTS.marketing;
      const s: UserSession = {
        id: acc.id,
        email: acc.email,
        name: acc.name,
        role: 'marketing',
        avatar: acc.avatar,
        status: acc.status,
        title: acc.title,
        department: acc.department
      };
      setSession(s);
      saveStoredSession(s);
      setActiveTab('sentiment');
    } else if (view === 'customer_portal') {
      const acc = DEMO_ACCOUNTS.customer;
      const s: UserSession = {
        id: acc.id,
        email: acc.email,
        name: acc.name,
        role: 'customer',
        avatar: acc.avatar,
        status: acc.status,
        title: acc.title,
        department: acc.department
      };
      setSession(s);
      saveStoredSession(s);
      setActiveTab('portal_account');
    }
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    if (newRole === 'cs_agent') {
      setActiveView('cs_workspace');
      setActiveTab('inbox');
    } else if (newRole === 'supervisor') {
      setActiveView('supervisor_workspace');
      setActiveTab('team_overview');
    } else if (newRole === 'marketing') {
      setActiveView('marketing_workspace');
      setActiveTab('sentiment');
    } else if (newRole === 'customer') {
      setActiveView('customer_portal');
      setActiveTab('portal_account');
    }
  };

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    saveStoredSession(newSession);
    handleRoleSwitch(newSession.role);
  };

  const handleLogout = () => {
    clearStoredSession();
    setActiveView('login');
  };

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

  const currentRole: UserRole = session?.role || 'cs_agent';

  // Determine whether current view is a workspace view (requires TopBar + Sidebar)
  const isWorkspaceView =
    activeView === 'cs_workspace' ||
    activeView === 'supervisor_workspace' ||
    activeView === 'marketing_workspace' ||
    activeView === 'customer_portal';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative selection:bg-blue-600 selection:text-white dark:bg-slate-950 dark:text-slate-100">
      {/* 1. PUBLIC LANDING VIEW */}
      {(activeView === 'customer' || activeView === 'landing') && (
        <>
          <Navbar
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
            activeView={activeView}
            onSelectView={handleSelectView}
          />

          <main className="flex-grow">
            <Hero
              onOpenChat={handleOpenChat}
              onOpenCSDashboard={() => handleSelectView('cs_workspace')}
            />
            <Solutions onAskAIAbout={handleAskAIAbout} />
            <Products onAskAIAbout={handleAskAIAbout} />
            <Industries onAskAIAbout={handleAskAIAbout} />
            <WhyCiptadra />
            <CTA
              onOpenConsultation={handleOpenConsultation}
              onOpenChat={handleOpenChat}
            />
          </main>

          <Footer
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
          />
        </>
      )}

      {/* 2. LOGIN PAGE */}
      {activeView === 'login' && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => handleSelectView('customer')}
        />
      )}

      {/* 3. LIVE AI DEMO VIEW */}
      {(activeView === 'live_demo' || activeView === 'flow') && (
        <div className="flex flex-col min-h-screen">
          <Navbar
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
            activeView={activeView}
            onSelectView={handleSelectView}
          />
          <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full">
            <LiveAIDemo onSwitchView={handleSelectView} />
          </main>
          <Footer
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
          />
        </div>
      )}

      {/* 4. LEGACY ALIASES (Keep compatibility with existing demo flows) */}
      {(activeView === 'cs_dashboard' || activeView === 'agent') && (
        <div className="flex flex-col min-h-screen">
          <Navbar
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
            activeView={activeView}
            onSelectView={handleSelectView}
          />
          <main className="flex-grow">
            <CSDashboard onSwitchView={handleSelectView} />
          </main>
          <Footer
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
          />
        </div>
      )}

      {(activeView === 'supervisor_dashboard' || activeView === 'operations') && (
        <div className="flex flex-col min-h-screen">
          <Navbar
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
            activeView={activeView}
            onSelectView={handleSelectView}
          />
          <main className="flex-grow">
            <SupervisorDashboard onSwitchView={handleSelectView} />
          </main>
          <Footer
            onOpenChat={handleOpenChat}
            onOpenConsultation={handleOpenConsultation}
          />
        </div>
      )}

      {/* 5. ROLE-BASED WORKSPACES (With PlatformTopBar + ContextualSidebar) */}
      {isWorkspaceView && session && (
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Top Bar */}
          <PlatformTopBar
            session={session}
            currentRole={currentRole}
            currentIndustry={currentIndustry}
            onIndustryChange={setCurrentIndustry}
            onRoleSwitch={handleRoleSwitch}
            onLogout={handleLogout}
            onBackToLanding={() => handleSelectView('customer')}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Workspace Body: Sidebar + Main Content */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <ContextualSidebar
              currentRole={currentRole}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* View Switching based on activeView */}
            {activeView === 'cs_workspace' && (
              <CSAgentWorkspace
                session={session}
                activeTab={activeTab}
                currentIndustry={currentIndustry}
                searchQuery={searchQuery}
              />
            )}

            {activeView === 'supervisor_workspace' && (
              <SupervisorWorkspace
                session={session}
                activeTab={activeTab}
                currentIndustry={currentIndustry}
                searchQuery={searchQuery}
              />
            )}

            {activeView === 'marketing_workspace' && (
              <MarketingWorkspace
                session={session}
                activeTab={activeTab}
                currentIndustry={currentIndustry}
                searchQuery={searchQuery}
              />
            )}

            {activeView === 'customer_portal' && (
              <CustomerSelfServicePortal
                session={session}
                activeTab={activeTab}
                currentIndustry={currentIndustry}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      )}

      {/* Enterprise Consultation Request Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseConsultation}
      />

      {/* Floating Expandable Multimodal AI Chatbot (Always mounted) */}
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
