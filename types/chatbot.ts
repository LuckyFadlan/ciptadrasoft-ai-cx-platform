export type Role = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isError?: boolean;
  suggestedFollowUps?: string[];
  showLeadForm?: boolean;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  founded: string;
  headquarters: string;
  address?: string;
  presence: string[];
  mission: string;
  values: string[];
  contact: {
    email: string;
    salesEmail?: string;
    supportEmail?: string;
    phone: string;
    whatsapp?: string;
    address: string;
    websites?: string[];
    businessHours: string;
  };
}

export interface SolutionItem {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  keyBenefits: string[];
  capabilitiesIncluded: string[];
  targetAudience: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  features: string[];
  deployment: string;
  summary: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  challengesAddressed: string;
  popularSolutions: string[];
}

export interface ServiceItem {
  name: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface KnowledgeBase {
  company: CompanyInfo;
  solutions: SolutionItem[];
  products: ProductItem[];
  industries: IndustryItem[];
  services: ServiceItem[];
  capabilities: string[];
  faq: FAQItem[];
}

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  need: string;
}

export interface ChatRequestPayload {
  messages: {
    role: Role;
    content: string;
  }[];
}

export interface ChatApiResponse {
  reply: string;
  suggestedFollowUps?: string[];
  showLeadForm?: boolean;
  groundedSources?: string[];
  error?: string;
}

export type AnalyticsEventType =
  | 'chatbot_opened'
  | 'chatbot_closed'
  | 'message_sent'
  | 'message_received'
  | 'suggested_prompt_clicked'
  | 'lead_form_opened'
  | 'lead_submitted';

export interface AnalyticsEvent {
  event: AnalyticsEventType;
  timestamp: number;
  properties?: Record<string, unknown>;
}
