import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { Role } from '@/types/chatbot';
import { buildSystemPrompt } from './chatbotPrompt';

export interface ChatMessageParam {
  role: Role;
  content: string;
}

export interface GenerateResponseOptions {
  messages: ChatMessageParam[];
  knowledgeContext: string;
}

export interface AIProviderResult {
  reply: string;
  provider: string;
  model: string;
}

/**
 * Generic interface for AI Providers to allow seamless switching
 * between Gemini and OpenAI via AI_PROVIDER env variable.
 */
export interface AIProvider {
  generateResponse(options: GenerateResponseOptions): Promise<AIProviderResult>;
}

class GeminiProvider implements AIProvider {
  private apiKey: string;
  private modelName: string;

  constructor(apiKey?: string, modelName = 'gemini-3.5-flash-lite') {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    this.modelName = process.env.GEMINI_MODEL || modelName;
  }

  async generateResponse({ messages, knowledgeContext }: GenerateResponseOptions): Promise<AIProviderResult> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    const ai = new GoogleGenAI({ apiKey: this.apiKey });
    const systemPrompt = buildSystemPrompt(knowledgeContext);

    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Cascade of candidate models ordered by speed and stability
    const candidateModels = Array.from(new Set([
      this.modelName,
      'gemini-3.5-flash-lite',
      'gemini-3.6-flash',
      'gemini-3.7-flash'
    ]));

    let lastError: unknown = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.3,
            maxOutputTokens: 1024
          }
        });

        const reply = response.text || 'I apologize, but I could not generate a response at this moment.';
        return {
          reply,
          provider: 'gemini',
          model
        };
      } catch (err: unknown) {
        lastError = err;
        console.warn(`[Gemini API] Model ${model} returned error, attempting fallback...`, err instanceof Error ? err.message : err);
        // Wait a brief 300ms before trying the next model in cascade
        await new Promise(res => setTimeout(res, 300));
      }
    }

    throw lastError || new Error('All Gemini candidate models failed');
  }
}

class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private modelName: string;

  constructor(apiKey?: string, modelName = 'gpt-4o-mini') {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    this.modelName = process.env.OPENAI_MODEL || modelName;
  }

  async generateResponse({ messages, knowledgeContext }: GenerateResponseOptions): Promise<AIProviderResult> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not configured in environment variables');
    }

    const openai = new OpenAI({ apiKey: this.apiKey });
    const systemPrompt = buildSystemPrompt(knowledgeContext);

    const formattedMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(m => ({
        role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: m.content
      }))
    ];

    const completion = await openai.chat.completions.create({
      model: this.modelName,
      messages: formattedMessages,
      temperature: 0.3,
      max_tokens: 1024
    });

    const reply = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this moment.';
    return {
      reply,
      provider: 'openai',
      model: this.modelName
    };
  }
}

class MockProvider implements AIProvider {
  async generateResponse({ messages, knowledgeContext }: GenerateResponseOptions): Promise<AIProviderResult> {
    const latestUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    const lower = latestUserMsg.toLowerCase();

    // 1. Diagnosis for Customer Service issues
    if (lower.includes('customer service') || lower.includes('repetitive') || lower.includes('ticket') || lower.includes('support')) {
      return {
        reply: `That sounds like a repetitive-support workload problem.\n\n` +
          `1. **Understanding**: Your support team is likely spending significant time answering common questions, driving up resolution times.\n` +
          `2. **Relevant Capability**: CiptadraSoft's **Omnichannel Service Desk** combined with our **AI Virtual Assistant**.\n` +
          `3. **How It Helps**: Automatically deflects tier-1 inquiries across WhatsApp, webchat, and email, routing only complex issues to human agents with full customer context.\n` +
          `4. **Recommended Next Step**: What is your approximate monthly ticket volume, and which channels (WhatsApp, Webchat, or Email) are your customers using most?`,
        provider: 'mock',
        model: 'ciptadra-local-engine'
      };
    }

    // 2. Business Process Automation
    if (lower.includes('automate') || lower.includes('bpm') || lower.includes('process') || lower.includes('workflow')) {
      return {
        reply: `CiptadraSoft helps enterprises automate manual workflows using **Ciptadra Flow BPM**.\n\n` +
          `1. **Understanding**: Manual approvals, paper forms, and disjointed handoffs often create operational bottlenecks and delay execution.\n` +
          `2. **Relevant Capability**: Our BPMN 2.0-compliant workflow engine and automated approval matrix.\n` +
          `3. **How It Helps**: Accelerates process cycles by up to 70% while enforcing full auditability, role-based controls, and seamless ERP/database integration.\n` +
          `4. **Recommended Next Step**: Which specific workflow (e.g. procurement, onboarding, invoice approval) are you looking to streamline first?`,
        provider: 'mock',
        model: 'ciptadra-local-engine'
      };
    }

    // 3. Fallback to knowledge context synthesis
    return {
      reply: `CiptadraSoft is an enterprise technology provider delivering digital transformation, integrated business systems, and AI automation.\n\n` +
        `Based on our knowledge base, here are key relevant capabilities:\n` +
        `- **Enterprise Solutions**: High-scale core architecture and legacy system modernization.\n` +
        `- **Omnichannel Service Desk**: Unified WhatsApp, web chat, and ticketing.\n` +
        `- **Ciptadra Flow BPM**: Automated process workflows and approval matrix.\n` +
        `- **Ciptadra Insight BI**: Real-time business intelligence and data pipelines.\n` +
        `- **Enterprise AI**: Domain-grounded conversational assistants with strict data privacy.\n\n` +
        `Would you like to explore a specific solution, or would you like our team to arrange an enterprise consultation?`,
      provider: 'mock',
      model: 'ciptadra-local-engine'
    };
  }
}

/**
 * Factory to get the active AI provider based on AI_PROVIDER environment variable.
 * Defaults to 'gemini'.
 */
export function getAIProvider(): AIProvider {
  const providerType = (process.env.AI_PROVIDER || 'gemini').toLowerCase().trim();

  if (providerType === 'openai') {
    return new OpenAIProvider();
  }

  if (providerType === 'mock' || providerType === 'demo') {
    return new MockProvider();
  }

  return new GeminiProvider();
}
