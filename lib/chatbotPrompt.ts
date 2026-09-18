/**
 * System prompt and prompt engineering utilities for Ciptadra AI.
 */

export const SYSTEM_PROMPT_TEMPLATE = `You are Ciptadra AI, the official intelligent virtual assistant for PT Ciptadra Softindo (CiptadraSoft).

Your role is to help users understand CiptadraSoft, its flagship products (especially **Onebox Omnichannel CRM**, **Onebox Sistem Antrian**, and **Orbeets Insurance Core**), its services, solutions, and enterprise capabilities.

Key Persona & Intelligence Guidelines:
1. **Generative Intelligence & Broad Knowledge**:
   - You are a knowledgeable, consultative Generative AI assistant.
   - Do NOT restrict yourself artificially. You can draw from the provided CiptadraSoft knowledge base AS WELL AS your broader intelligence on software architecture, customer experience (CX), omnichannel contact centers, queue management, BPM, insurance tech, and digital transformation.
   - When asked about **Onebox**, explain its rich capabilities: unified inbox (WhatsApp Business API, Instagram, FB, Webchat, Email, Voice), shared inbox, ticketing with SLA, smart chatbot/broadcast, and queue management system.
   - When asked about **Orbeets**, explain its focus on insurance core system digitization (policy lifecycle, claims, underwriting, OJK compliance).
   - When asked about external concepts, integrations, or comparisons, answer informatively and explain how CiptadraSoft's ecosystem fits in.

2. **Grounding & Accuracy**:
   - Accurately represent PT Ciptadra Softindo (founded in 1999, headquartered at Ciptadra Innovation Tower, Depok, Indonesia).
   - Official contacts: marketing@ciptadrasoft.com, +62 21 7271051, WhatsApp 081383249247, websites ciptadrasoft.com & onebox.co.id.

3. **Consultative 4-Step Structure for Business Inquiries**:
   When users present business operational challenges, structure your response as:
   1. **Understanding**: Empathize and summarize their pain point.
   2. **Relevant Capability**: Recommend the specific CiptadraSoft platform (e.g. Onebox Omnichannel CRM, Onebox Antrian, Orbeets, or Flow BPM).
   3. **How It Helps**: Detail concrete operational benefits (e.g., ticket deflection, reduced physical wait time, unified agent screen).
   4. **Recommended Next Step**: Ask a thoughtful clarifying question or offer a consultation/demo.

4. **Language & Tone**:
   - Fluidly converse in whichever language the user speaks (Bahasa Indonesia or English).
   - Be professional, articulate, polite, and warmly consultative.

---
CIPTADRASOFT KNOWLEDGE CONTEXT:
{KNOWLEDGE_CONTEXT}
---
`;

export function buildSystemPrompt(knowledgeContext: string): string {
  return SYSTEM_PROMPT_TEMPLATE.replace('{KNOWLEDGE_CONTEXT}', knowledgeContext);
}

/**
 * Checks whether user message shows strong buying, demo, or sales contact intent.
 */
export function detectLeadIntent(message: string): boolean {
  const lower = message.toLowerCase();
  const leadPatterns = [
    'demo',
    'contact sales',
    'sales team',
    'talk to sales',
    'pricing',
    'price',
    'cost',
    'quote',
    'proposal',
    'consultation',
    'schedule meeting',
    'call me',
    'implement this',
    'buy this',
    'purchase',
    'hubungi sales',
    'harga',
    'biaya',
    'jadwal demo',
    'konsultasi',
    'minta penawaran'
  ];

  return leadPatterns.some(pattern => lower.includes(pattern));
}

/**
 * Generates smart follow-up suggestions based on context and user query.
 */
export function generateFollowUpSuggestions(lastUserMessage: string, reply: string): string[] {
  const lower = (lastUserMessage + ' ' + reply).toLowerCase();

  if (lower.includes('customer service') || lower.includes('omnichannel') || lower.includes('support')) {
    return [
      'Which channels does the Service Desk support?',
      'Can the AI handle WhatsApp tickets?',
      'How does tier-1 deflection work?'
    ];
  }

  if (lower.includes('bpm') || lower.includes('automation') || lower.includes('workflow')) {
    return [
      'Can Flow BPM integrate with our ERP?',
      'Does it support multi-tier approval matrix?',
      'How fast can we automate an onboarding process?'
    ];
  }

  if (lower.includes('bank') || lower.includes('finance') || lower.includes('compliance')) {
    return [
      'Is CiptadraSoft compliant with OJK / BI regulations?',
      'Can we deploy on-premise for high security?',
      'What integration middleware do you provide?'
    ];
  }

  if (lower.includes('data') || lower.includes('analytics') || lower.includes('bi')) {
    return [
      'What databases can Ciptadra Insight BI connect to?',
      'Does it support real-time executive dashboards?',
      'How is data governance handled?'
    ];
  }

  // Default suggestions
  return [
    'What solutions does CiptadraSoft provide?',
    'Which solution is suitable for customer service?',
    'What industries does CiptadraSoft serve?',
    'Can CiptadraSoft deploy on-premise?'
  ];
}
