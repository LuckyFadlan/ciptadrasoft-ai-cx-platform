import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { retrieveKnowledge } from '@/lib/retrieval';
import { detectLeadIntent, generateFollowUpSuggestions } from '@/lib/chatbotPrompt';
import { ChatRequestPayload, ChatApiResponse } from '@/types/chatbot';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequestPayload;

    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required.' },
        { status: 400 }
      );
    }

    const { messages } = body;
    const latestUserMessage = [...messages].reverse().find(m => m.role === 'user');

    if (!latestUserMessage || !latestUserMessage.content.trim()) {
      return NextResponse.json(
        { error: 'No user message content found.' },
        { status: 400 }
      );
    }

    // 1. Retrieve grounded knowledge from local knowledge base
    const retrieval = retrieveKnowledge(latestUserMessage.content);

    // 2. Check for commercial / lead intent
    const hasLeadIntent = detectLeadIntent(latestUserMessage.content);

    // 3. Call active AI provider (Gemini or OpenAI)
    const provider = getAIProvider();
    
    let reply = '';
    let isFallback = false;

    try {
      const result = await provider.generateResponse({
        messages,
        knowledgeContext: retrieval.contextText
      });
      reply = result.reply;
    } catch (apiError: unknown) {
      const errMsg = apiError instanceof Error ? apiError.message : String(apiError);
      console.error('[Chat API Error]:', errMsg);
      
      // UX requirement: "Ciptadra AI is temporarily unavailable. Please try again or contact our team."
      reply = "Ciptadra AI is temporarily unavailable. Please try again or contact our team directly at info@ciptadrasoft.com or +62 21 555 0192.";
      isFallback = true;
    }

    // 4. Generate dynamic follow-up chips
    const followUps = generateFollowUpSuggestions(latestUserMessage.content, reply);

    const responsePayload: ChatApiResponse = {
      reply,
      suggestedFollowUps: followUps,
      showLeadForm: hasLeadIntent,
      groundedSources: retrieval.sourceTitles,
      error: isFallback ? 'API_UNAVAILABLE' : undefined
    };

    return NextResponse.json(responsePayload);
  } catch (error: unknown) {
    console.error('[Unhandled Chat Route Error]:', error);
    return NextResponse.json(
      {
        reply: "Ciptadra AI is temporarily unavailable. Please try again or contact our team.",
        error: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}
