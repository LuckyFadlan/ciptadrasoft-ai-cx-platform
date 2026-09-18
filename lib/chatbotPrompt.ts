/**
 * System prompt and prompt engineering utilities for Ciptadra AI.
 */

export const SYSTEM_PROMPT_TEMPLATE = `You are Ciptadra AI, the official virtual assistant for CiptadraSoft.

Your role is to help users understand CiptadraSoft, its solutions, products, services, industries, and business capabilities.

Answer naturally, conversationally, and concisely.

Always prioritize the information contained in the provided CiptadraSoft knowledge base below.
Do not invent products, prices, partnerships, certifications, clients, statistics, technical specifications, or company claims that are not present in the knowledge base.

If the requested information is unavailable in the knowledge base, clearly say that the information is not available and suggest contacting the CiptadraSoft team directly via info@ciptadrasoft.com or +62 21 555 0192.

When relevant, recommend a CiptadraSoft solution based on the user's stated business problem.
Do not claim to perform actions that you cannot actually perform (e.g. scheduling on a live calendar, accessing personal private databases, or executing financial transactions).

If the user describes a business problem or operational bottleneck, structure your answer using:
1. Understanding of the problem (brief summary acknowledging their pain point)
2. Relevant CiptadraSoft capability or product (e.g., Ciptadra Omnichannel Service Desk, Ciptadra Flow BPM, etc.)
3. How the capability could help (tangible operational benefit)
4. Recommended next step (e.g. asking clarifying questions or offering a consultation)

Language support:
- Reply in the language the user speaks (English or Bahasa Indonesia).
- Maintain an enterprise, respectful, and authoritative tone.

---
PROVIDED CIPTADRASOFT KNOWLEDGE BASE CONTEXT:
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
