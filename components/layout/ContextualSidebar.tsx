'use client';

import React from 'react';
import {
  Inbox,
  Sparkles,
  BookOpen,
  UserCheck,
  BarChart3,
  Users,
  ShieldCheck,
  Mic,
  TrendingUp,
  Clock,
  GraduationCap,
  FileText,
  Activity,
  HeartHandshake,
  Share2,
  Send,
  HelpCircle,
  CreditCard,
  LifeBuoy,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { UserRole } from '@/types/chatbot';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface ContextualSidebarProps {
  currentRole: UserRole;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadCount?: number;
}

export const ContextualSidebar: React.FC<ContextualSidebarProps> = ({
  currentRole,
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  unreadCount = 3
}) => {
  const getSidebarSections = (): SidebarSection[] => {
    switch (currentRole) {
      case 'cs_agent':
        return [
          {
            title: 'Pelayanan Omnichannel',
            items: [
              { id: 'inbox', label: 'Kotak Masuk Tiket', icon: Inbox, badge: unreadCount, badgeColor: 'bg-rose-500' },
              { id: 'copilot', label: 'Agent Assist AI', icon: Sparkles, badge: 'Copilot', badgeColor: 'bg-indigo-500' },
              { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
              { id: 'customer360', label: 'Customer 360', icon: UserCheck }
            ]
          },
          {
            title: 'Performa Saya',
            items: [
              { id: 'my_performance', label: 'Scorecard & SLA', icon: BarChart3 }
            ]
          }
        ];

      case 'supervisor':
        return [
          {
            title: 'Operasional Tim',
            items: [
              { id: 'team_overview', label: 'Monitoring Tim', icon: Users, badge: 'Live', badgeColor: 'bg-emerald-500' },
              { id: 'quality_monitoring', label: 'Quality Monitoring', icon: ShieldCheck, badge: '91%', badgeColor: 'bg-blue-500' },
              { id: 'speech_analytics', label: 'Speech Analytics', icon: Mic, badge: 'AI', badgeColor: 'bg-indigo-500' },
              { id: 'predictive_service', label: 'Predictive Service', icon: TrendingUp }
            ]
          },
          {
            title: 'Manajemen & Mutu',
            items: [
              { id: 'workforce', label: 'Workforce (WFM)', icon: Clock },
              { id: 'training', label: 'Rencana Pelatihan', icon: GraduationCap },
              { id: 'summaries', label: 'Ringkasan AI & Log', icon: FileText }
            ]
          }
        ];

      case 'marketing':
        return [
          {
            title: 'Social & Brand Intelligence',
            items: [
              { id: 'sentiment', label: 'Social Sentiment', icon: Share2, badge: '74% Pos', badgeColor: 'bg-emerald-500' },
              { id: 'customer_journey', label: 'Customer Journey AIDA', icon: TrendingUp },
              { id: 'campaigns', label: 'Outbound Campaign', icon: Send, badge: '4 Aktif', badgeColor: 'bg-purple-500' },
              { id: 'insights', label: 'Market & Prescriptive', icon: Sparkles }
            ]
          }
        ];

      case 'customer':
        return [
          {
            title: 'Akun & Transaksi Mandiri',
            items: [
              { id: 'portal_account', label: 'Akun & Tagihan', icon: CreditCard },
              { id: 'portal_calculator', label: 'Kalkulator Biaya', icon: BarChart3 }
            ]
          },
          {
            title: 'Pusat Solusi & Tiket',
            items: [
              { id: 'portal_tickets', label: 'Tiket Bantuan Saya', icon: LifeBuoy, badge: '1 Aktif', badgeColor: 'bg-amber-500' },
              { id: 'portal_kb', label: 'Knowledge Base & FAQ', icon: HelpCircle },
              { id: 'portal_booking', label: 'Booking Teknisi', icon: Calendar }
            ]
          },
          {
            title: 'Sosial & Komunitas',
            items: [
              { id: 'portal_community', label: 'Forum Komunitas', icon: MessageSquare },
              { id: 'portal_feedback', label: 'Kotak Saran & Ide', icon: HeartHandshake }
            ]
          }
        ];

      default:
        return [];
    }
  };

  const sections = getSidebarSections();

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 transition-all duration-200 select-none z-20 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && section.title && (
              <div className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                  } ${collapsed ? 'justify-center' : 'justify-between'}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge !== undefined && (
                    <span
                      className={`ml-2 rounded-full px-1.5 py-0.5 text-[9px] font-semibold text-white ${
                        item.badgeColor || 'bg-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Toggle section */}
      <div className="border-t border-slate-200/80 p-2 dark:border-slate-800">
        <button
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center rounded-lg p-1.5 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          title={collapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="ml-1.5 text-[11px]">Ciutkan Menu</span>}
        </button>
      </div>
    </aside>
  );
};
