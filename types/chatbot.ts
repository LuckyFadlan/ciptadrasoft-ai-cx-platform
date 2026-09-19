export type Role = 'user' | 'assistant' | 'system';

export type ChatWindowMode = 'compact' | 'expanded' | 'fullscreen';

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string; // MIME type
  category: 'document' | 'image' | 'dataset';
  dataUrl?: string; // base64 data url for preview & multimodal API
  textContent?: string; // parsed text for text/csv/docx
  status?: 'ready' | 'processing' | 'error';
}

export interface SourceBreakdown {
  fromFile?: string[];
  fromOfficial?: string[];
  fromWeb?: string[];
  inferences?: string[];
}

export interface CitationSource {
  id: string;
  title: string;
  url?: string;
  sourceType: 'ciptadra' | 'onebox' | 'web' | 'policy';
  excerpt: string;
  isVerified: boolean;
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isError?: boolean;
  suggestedFollowUps?: string[];
  showLeadForm?: boolean;
  groundedSources?: string[];
  citations?: CitationSource[];
  attachments?: FileAttachment[];
  sourceBreakdown?: SourceBreakdown;
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
  id?: string;
  name: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ClientCategory {
  category: string;
  list: string[];
}

export interface ClientData {
  total: string;
  exportMarkets: string[];
  categories: ClientCategory[];
}

export interface KnowledgeBase {
  company: CompanyInfo;
  solutions: SolutionItem[];
  products: ProductItem[];
  platforms?: any[];
  onebox?: any;
  industries: IndustryItem[];
  services: ServiceItem[];
  capabilities: string[];
  faq: FAQItem[];
  clients?: ClientData;
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
    attachments?: FileAttachment[];
  }[];
  activeAttachments?: FileAttachment[];
}

export interface ChatApiResponse {
  reply: string;
  suggestedFollowUps?: string[];
  showLeadForm?: boolean;
  groundedSources?: string[];
  citations?: CitationSource[];
  sourceBreakdown?: SourceBreakdown;
  error?: string;
}

export type AnalyticsEventType =
  | 'chatbot_opened'
  | 'chatbot_closed'
  | 'message_sent'
  | 'message_received'
  | 'suggested_prompt_clicked'
  | 'lead_form_opened'
  | 'lead_submitted'
  | 'ticket_classified'
  | 'agent_assist_used'
  | 'ticket_resolved'
  | 'summary_generated'
  | 'flow_demo_started';

export interface AnalyticsEvent {
  event: AnalyticsEventType;
  timestamp: number;
  properties?: Record<string, unknown>;
}

// ==========================================
// CUSTOMER SERVICE PLATFORM TYPES
// ==========================================

export type TicketPriority = 'Urgent' | 'High' | 'Medium' | 'Low';
export type TicketStatus = 'new' | 'open' | 'in_progress' | 'pending_customer' | 'resolved' | 'escalated';
export type TicketCategory =
  | 'Billing & Payment'
  | 'Technical Support'
  | 'Account & Access'
  | 'Product Inquiry'
  | 'Complaint / Escalation'
  | 'General Information';

export type TicketDepartment =
  | 'Finance & Billing'
  | 'Core Engineering'
  | 'Customer Success'
  | 'IT Security'
  | 'Solutions Architecture'
  | 'Support Operations';

export type CustomerSentiment = 'Positive' | 'Neutral' | 'Frustrated' | 'Angry' | 'Urgent';

export type SupportChannel =
  | 'WhatsApp'
  | 'Instagram'
  | 'Facebook'
  | 'Twitter'
  | 'TikTok'
  | 'Email'
  | 'Webchat'
  | 'Phone'
  | 'Voice'
  | 'GoogleReviews'
  | 'API';

export type AiDecisionCase = 'case_a_auto_answer' | 'case_b_escalate_ticket';

export interface TicketClassification {
  category: TicketCategory;
  priority: TicketPriority;
  department: TicketDepartment;
  slaHours: number;
  sentiment: CustomerSentiment;
  urgencyScore: number; // 0 to 100
  summary: string;
  reasoning: string;
  confidenceScore: number; // e.g. 0.95
}

export interface AgentAction {
  id: string;
  label: string;
  actionType: 'primary' | 'secondary' | 'danger';
  description: string;
  requiresConfirmation?: boolean;
}

export interface AgentAssistResult {
  suggestedResponse: string;
  suggestedActions: AgentAction[];
  keyTalkingPoints: string[];
  confidenceScore: number;
  internalNotes?: string;
}

export interface KnowledgeRecommendation {
  id: string;
  title: string;
  source?: 'CiptadraSoft Core' | 'Onebox CX Knowledge' | 'External Technical Docs' | 'SLA & Billing Policy' | string;
  category?: string;
  relevanceScore: number; // e.g. 96 (%)
  matchReason?: string;
  excerpt?: string;
  summary?: string;
  recommendedReplySnippet?: string;
  url?: string;
  tags?: string[];
}

export interface TicketSummary {
  ticketId: string;
  issueDescription: string;
  actionsTaken: string[];
  currentStatus: TicketStatus;
  nextAction: string;
  priority: TicketPriority;
  assignedOwner: string;
  resolutionTimeEstimate: string;
  csatPrediction: 'High' | 'Medium' | 'Low';
  executiveSummary: string;
}

export interface CustomerTouchpoint {
  id: string;
  channel: SupportChannel;
  timestamp: number;
  summary: string;
  agentName?: string;
  status: TicketStatus;
}

export interface CustomerProfile360 {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  slaTier: 'Enterprise Platinum' | 'Gold' | 'Silver' | 'Standard';
  tier?: string;
  totalValue?: string;
  nps?: number;
  contractRemainingMonths?: number;
  activeProducts?: string[];
  activeSince: string;
  totalTickets: number;
  resolvedRate: number; // 0-100%
  averageCsat: number; // e.g. 4.8 / 5.0
  sentimentTrend: 'Positive' | 'Neutral' | 'At Risk';
  productsInUse: string[];
  recentTouchpoints: CustomerTouchpoint[];
  aiInsights: {
    churnRisk: 'Low' | 'Medium' | 'High';
    recommendedNextStep: string;
    recurringIssuePatterns: string[];
  };
}

export interface TicketMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system' | 'ai';
  senderName?: string;
  content?: string;
  text?: string;
  timestamp: number;
  suggestedResponse?: boolean;
  isAiResponse?: boolean;
  aiConfidence?: number;
  aiSource?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // e.g. "TKT-8402"
  channel: SupportChannel;
  customer: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  customerName?: string;
  companyName?: string;
  initialComplaint: string;
  customerComplaint?: string;
  createdAt: number;
  updatedAt: number;
  status: TicketStatus | string;
  priority?: TicketPriority;
  category?: TicketCategory | string;
  assignedAgent?: string;
  classification: TicketClassification;
  aiClassification?: {
    category?: string;
    priority?: string;
    confidence: number;
    sentiment?: string;
    urgencyKeywords?: string[];
    routingReason?: string;
    suggestedResponse?: string;
    recommendedRouting?: string;
  };
  messages: TicketMessage[];
  agentDraftResponse?: string;
  appliedActions?: string[];
  recommendedKnowledge?: KnowledgeRecommendation[];
  summary?: TicketSummary;
  slaRemainingMinutes?: number;
}

// ==========================================
// ONEBOX OMNICHANNEL & SUPERVISOR TYPES
// ==========================================

export interface OmnichannelConversation {
  id: string;
  conversationCode: string; // e.g. "OBX-901"
  channel: SupportChannel;
  customer: {
    name: string;
    handleOrPhone: string;
    company?: string;
    avatar?: string;
    slaTier?: 'Enterprise Platinum' | 'Gold' | 'Silver' | 'Standard';
    email?: string;
  };
  subject: string;
  snippet: string;
  category: TicketCategory;
  status: 'ai_answered' | 'new' | 'open' | 'in_progress' | 'resolved' | 'escalated';
  isAiAnswered: boolean;
  aiConfidence?: number;
  aiSource?: string;
  assignedAgent?: {
    id: string;
    name: string;
    avatar?: string;
    code?: string;
  };
  createdAt: number;
  updatedAt: number;
  responseTimeMin: number;
  timeToResponseLabel: string;
  slaStatus: 'on_track' | 'warning' | 'breached';
  ticketId?: string;
  classification?: TicketClassification;
  messages: TicketMessage[];
}

export interface AgentPerformanceRecord {
  id: string;
  agentId?: string;
  name: string;
  agentName?: string;
  code: string; // 'CS A', 'CS B', etc.
  agentCode?: string;
  role: string;
  avatar: string;
  status: 'online' | 'in_call' | 'busy' | 'offline';
  channels: SupportChannel[];
  ticketsHandledToday: number;
  openTicketsCount?: number;
  resolvedToday?: number;
  avgFirstResponseMin: number;
  avgHandlingTimeMin: number; // AHT in minutes
  avgHandlingTimeMinutes?: number;
  teamAvgHandlingTimeMin: number;
  slaComplianceRate: number; // percentage, e.g. 94.5
  slaAdherencePct?: number;
  escalationRate: number; // %
  fcrPct?: number;
  csatScore: number; // e.g. 4.6
  weakSpotAreas?: string[];
  coachingRecommendation?: string;
  proficiencyByCategory?: Record<
    TicketCategory,
    {
      avgTimeMin: number;
      volume: number;
      proficiency: 'expert' | 'competent' | 'needs_coaching';
    }
  >;
  investigationObservation?: {
    identifiedPattern: string;
    rootCauseAnalysis: string;
    nonPunitiveGuidance: string;
    priority: 'High' | 'Medium' | 'Low';
    recommendedKbModule: string;
    benchmarkComparison: {
      agentTimeMin: number;
      teamAverageMin: number;
      category: TicketCategory;
    };
  };
}

export interface SupervisorTrainingPlan {
  id: string;
  title: string;
  targetAgentId: string;
  targetAgentName: string;
  targetAgentCode: string;
  topic: string;
  kbModule: string;
  targetDate: string;
  status: 'planned' | 'in_progress' | 'completed';
  notes: string;
  createdAt: number;
  createdByName: string;
  completedAt?: number;
  estimatedHours?: number;
  description?: string;
  dueDate?: string;
}

export interface AiActivityLogItem {
  id: string;
  timestamp: number;
  channel: SupportChannel;
  customerName: string;
  customerHandle: string;
  rawInputSnippet: string;
  detectedIntent: string;
  confidenceScore: number;
  decision: 'auto_answered' | 'escalated_ticket';
  decisionReason: string;
  assignedDepartment?: string;
  assignedPriority?: TicketPriority;
  assignedSlaHours?: number;
  assignedAgentName?: string;
  knowledgeSourceUsed?: string;
}

export interface SupervisorExecutiveSummary {
  period: string;
  totalConversations: number;
  aiHandledCount: number;
  aiHandledPercent: number;
  humanHandledCount: number;
  humanHandledPercent: number;
  avgAiResponseSeconds: number;
  avgHumanHandlingMinutes: number;
  slaComplianceRate: number;
  topBottlenecks: string[];
  coachingRecommendations: string[];
  keyHighlights: string[];
}

// ==========================================
// ROLE-BASED PLATFORM & SESSION MODELS
// ==========================================

export type UserRole = 'cs_agent' | 'supervisor' | 'marketing' | 'customer';

export type IndustryDomain =
  | 'all'
  | 'telecom'
  | 'insurance'
  | 'banking'
  | 'ecommerce'
  | 'education';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  agentCode?: string; // e.g. 'CS A'
  avatar: string;
  status: 'online' | 'busy' | 'away';
  title: string;
  department: string;
}

export interface GlobalFiltersState {
  status: string;
  aiDecision: string;
  priority: string;
  category?: string;
  channel: SupportChannel | 'all' | string;
  search?: string;
  searchQuery?: string;
  dateRange?: string;
}

// ==========================================
// MARKETING & SENTIMENT MODELS
// ==========================================

export interface ContentSentimentItem {
  id: string;
  platform: 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'web';
  title: string;
  caption: string;
  thumbnail?: string;
  likes: number;
  comments: number;
  shares: number;
  sentimentBreakdown: {
    positive: number; // percentage e.g. 74
    neutral: number;  // percentage e.g. 16
    negative: number; // percentage e.g. 10
  };
  keywords: {
    positive: string[];
    negative: string[];
  };
  aiInsight: {
    discussionFocus: string;
    identifiedIssue?: string;
    prescriptiveRecommendation: string;
  };
  timestamp: number;
}

export interface CustomerJourneyStage {
  id: 'attention' | 'interest' | 'desire' | 'action';
  name: string;
  count: number;
  conversionFromPrev: number; // %
  dropOffBarriers: string[];
  analyticsType: {
    descriptive: string;
    predictive: string;
    prescriptive: string;
  };
}

export interface OutboundCampaign {
  id: string;
  name: string;
  type: 'cold_email' | 'event_invite' | 'followup' | 'promo';
  audience: string;
  recipientsCount: number;
  templateSubject: string;
  templateBody: string;
  status: 'draft' | 'scheduled' | 'sent';
  openRate?: number;
  clickRate?: number;
  responseRate?: number;
  lastSent?: number;
}

// ==========================================
// SPEECH ANALYTICS & QUALITY MONITORING
// ==========================================

export interface CallAnalyticsRecord {
  id: string;
  callNumber: string; // e.g. "CALL-8821"
  agentId: string;
  agentName: string;
  customerName: string;
  durationSeconds: number;
  callType: 'cs_support' | 'sales_negotiation';
  topic: string;
  sentiment: CustomerSentiment;
  keyIssues: string[];
  customerRequests: string[];
  repeatedQuestions: string[];
  objections?: string[];
  speakingPaceWpm: number;
  interruptionCount: number;
  resolutionStatus: 'resolved' | 'followup_required' | 'escalated';
  transcriptSnippet: { speaker: 'agent' | 'customer'; text: string; timeSec: number }[];
  aiObservations: string[];
  recommendedImprovements: string[];
  personaInsights: {
    communicationStyle: string;
    languageTone: string;
    formality: 'Formal' | 'Casual' | 'Mixed';
    paceAssessment: 'Normal' | 'Cepat' | 'Lambat';
  };
  salesInsights?: {
    mainRequest: string;
    mainObjection: string;
    requestedFeature: string;
    aidaStage: 'Interest' | 'Desire' | 'Action';
  };
}

export interface QualityMonitoringRecord {
  id: string;
  ticketId: string;
  agentId: string;
  agentName: string;
  customerName: string;
  channel: SupportChannel;
  customerRating: number; // 1 to 5 stars
  customerFeedback?: string;
  aiQualityScore: number; // 0-100
  responseQuality: number; // 0-100
  resolutionQuality: number; // 0-100
  slaMet: boolean;
  trainingNeedFlag?: string;
  evaluatedAt: number;
}

export interface PredictiveCustomerNeed {
  id: string;
  customerId: string;
  customerName: string;
  company: string;
  industry: IndustryDomain;
  riskLevel: 'Low' | 'Medium' | 'High';
  potentialNeed: string;
  aiObservation: string;
  recommendedAction: string;
  dueDate: string;
  status: 'pending' | 'scheduled' | 'completed';
}

// ==========================================
// SELF-SERVICE CUSTOMER PORTAL MODELS
// ==========================================

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  product: string;
  downloadUrl?: string;
}

export interface ServiceBooking {
  id: string;
  bookingCode: string;
  serviceType: string;
  appointmentDate: string;
  technicianName?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export interface CommunityForumPost {
  id: string;
  author: string;
  authorCompany: string;
  title: string;
  category: string;
  repliesCount: number;
  likesCount: number;
  timestamp: number;
  isSolved: boolean;
}

export interface FeedbackSubmission {
  id: string;
  customerName: string;
  category: 'Feature Request' | 'Usability' | 'Bug Report' | 'Praise';
  content: string;
  timestamp: number;
  votes: number;
}

export type PlatformView =
  | 'landing'
  | 'login'
  | 'cs_workspace'
  | 'supervisor_workspace'
  | 'marketing_workspace'
  | 'customer_portal'
  | 'live_demo'
  | 'customer'
  | 'cs_dashboard'
  | 'supervisor_dashboard'
  | 'flow'
  | 'agent'
  | 'operations';

