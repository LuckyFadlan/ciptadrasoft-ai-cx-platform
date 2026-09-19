import { UserSession, UserRole } from '@/types/chatbot';

export interface DemoAccountConfig extends UserSession {
  password: string;
  demoLabel: string;
}

export const DEMO_ACCOUNTS: Record<string, DemoAccountConfig> = {
  cs_a: {
    id: 'agent-cs-a',
    email: 'cs.a@ciptadra-demo.com',
    password: 'DemoCS123!',
    name: 'Andi Wijaya',
    role: 'cs_agent',
    agentCode: 'CS A',
    title: 'Senior Technical Support Specialist',
    department: 'Customer Service Desk',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    demoLabel: 'CS Agent A (Technical Specialist)'
  },
  cs_b: {
    id: 'agent-cs-b',
    email: 'cs.b@ciptadra-demo.com',
    password: 'DemoCS123!',
    name: 'Siti Rahmawati',
    role: 'cs_agent',
    agentCode: 'CS B',
    title: 'Billing & Enterprise Settlement Specialist',
    department: 'Customer Service Desk',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    demoLabel: 'CS Agent B (Billing Specialist)'
  },
  supervisor: {
    id: 'user-supervisor-01',
    email: 'supervisor@ciptadra-demo.com',
    password: 'DemoSup123!',
    name: 'Ferry Darmawan',
    role: 'supervisor',
    title: 'Head of Contact Center & Operations Quality',
    department: 'Operations & Quality Intelligence',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    demoLabel: 'CS Supervisor (Ferry Darmawan)'
  },
  marketing: {
    id: 'user-marketing-01',
    email: 'marketing@ciptadra-demo.com',
    password: 'DemoMkt123!',
    name: 'Maya Putri',
    role: 'marketing',
    title: 'Growth & Customer Journey Intelligence Lead',
    department: 'Brand Marketing & Social Analytics',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    demoLabel: 'Marketing Intelligence (Maya Putri)'
  },
  customer: {
    id: 'cust-budi-mega',
    email: 'budi.santoso@megasolusi.co.id',
    password: 'DemoCustomer123!',
    name: 'Budi Santoso',
    role: 'customer',
    title: 'Operations Director (PT Mega Solusi)',
    department: 'Enterprise Customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    demoLabel: 'Customer Portal (Budi Santoso)'
  }
};

const SESSION_STORAGE_KEY = 'ciptadra_user_session';

export function authenticateUser(email: string, password?: string): UserSession | null {
  const cleanEmail = email.toLowerCase().trim();
  const foundKey = Object.keys(DEMO_ACCOUNTS).find(
    (k) => DEMO_ACCOUNTS[k].email.toLowerCase() === cleanEmail
  );

  if (!foundKey) return null;

  const account = DEMO_ACCOUNTS[foundKey];
  if (password && password !== account.password && password !== 'DemoCS123!' && password !== 'DemoSup123!' && password !== 'DemoMkt123!') {
    return null;
  }

  const session: UserSession = {
    id: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
    agentCode: account.agentCode,
    avatar: account.avatar,
    status: account.status,
    title: account.title,
    department: account.department
  };

  saveStoredSession(session);
  return session;
}

export function getStoredSession(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to parse session:', err);
  }
  return null;
}

export function saveStoredSession(session: UserSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save session:', err);
  }
}

export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear session:', err);
  }
}
