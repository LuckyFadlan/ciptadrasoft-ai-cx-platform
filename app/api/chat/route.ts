import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { retrieveKnowledge } from '@/lib/retrieval';
import { searchWeb } from '@/lib/webSearch';
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

    // 1. Retrieve grounded knowledge from local knowledge base (CiptadraSoft & Onebox)
    const retrieval = retrieveKnowledge(latestUserMessage.content);

    // 2. Perform live internet & external web search in parallel
    let webContext = '';
    const webSourceTitles: string[] = [];
    try {
      const webResults = await searchWeb(latestUserMessage.content, 3);
      if (webResults.length > 0) {
        webContext = webResults
          .map(r => `[Internet Source: ${r.source} - ${r.title}]\n${r.snippet}`)
          .join('\n\n');
        for (const r of webResults) {
          webSourceTitles.push(`${r.source}: ${r.title}`);
        }
      }
    } catch {
      // Graceful fallback if web search times out
    }

    // Combine local official knowledge with live internet search context
    const combinedContext = [
      retrieval.contextText,
      webContext ? `--- LIVE INTERNET & EXTERNAL SEARCH RESULTS ---\n${webContext}` : ''
    ].filter(Boolean).join('\n\n');

    // 3. Check for commercial / lead intent
    const hasLeadIntent = detectLeadIntent(latestUserMessage.content);

    // 4. Call active AI provider (Gemini or OpenAI)
    const provider = getAIProvider();
    
    let reply = '';
    let isFallback = false;

    try {
      const result = await provider.generateResponse({
        messages,
        knowledgeContext: combinedContext
      });
      reply = result.reply;
    } catch (apiError: unknown) {
      const errMsg = apiError instanceof Error ? apiError.message : String(apiError);
      console.error('[Chat API Error]:', errMsg);
      
      // Fallback
      reply = "Ciptadra AI is temporarily unavailable. Please try again or contact our team directly at marketing@ciptadrasoft.com or +62 21 7271051.";
      isFallback = true;
    }

    // 5. Generate dynamic follow-up chips
    const followUps = generateFollowUpSuggestions(latestUserMessage.content, reply);

    // Combine grounded sources from local knowledge base and web search
    const allSources = Array.from(new Set([...retrieval.sourceTitles, ...webSourceTitles]));

    const responsePayload: ChatApiResponse = {
      reply,
      suggestedFollowUps: followUps,
      showLeadForm: hasLeadIntent,
      groundedSources: allSources,
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
