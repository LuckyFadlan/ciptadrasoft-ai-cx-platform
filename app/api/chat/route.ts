import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { retrieveKnowledge } from '@/lib/retrieval';
import { searchWeb } from '@/lib/webSearch';
import { detectLeadIntent, generateFollowUpSuggestions } from '@/lib/chatbotPrompt';
import { ChatRequestPayload, ChatApiResponse, CitationSource } from '@/types/chatbot';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequestPayload;

    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required.' },
        { status: 400 }
      );
    }

    const { messages, activeAttachments = [] } = body;
    const latestUserMessage = [...messages].reverse().find(m => m.role === 'user');

    if (!latestUserMessage || !latestUserMessage.content.trim()) {
      return NextResponse.json(
        { error: 'No user message content found.' },
        { status: 400 }
      );
    }

    // Also collect attachments from latest user message if sent there
    const allAttachments = [
      ...activeAttachments,
      ...(latestUserMessage.attachments || [])
    ].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

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

    // 4. Call active AI provider (Gemini, OpenAI, or Mock) with attachments
    const provider = getAIProvider();
    
    let reply = '';
    let isFallback = false;

    try {
      const result = await provider.generateResponse({
        messages,
        knowledgeContext: combinedContext,
        attachments: allAttachments
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

    // Combine grounded sources and structured citations
    const citations: CitationSource[] = [];

    // Add uploaded files as primary citations if present
    if (allAttachments.length > 0) {
      for (const att of allAttachments) {
        citations.push({
          id: `cite-file-${att.id}`,
          title: `📄 File: ${att.name}`,
          sourceType: 'policy',
          excerpt: `File yang diunggah (${(att.size / 1024).toFixed(1)} KB) untuk analisis dokumen kontekstual.`,
          isVerified: true
        });
      }
    }
    
    // Top local snippets
    for (let i = 0; i < Math.min(retrieval.snippets.length, 2); i++) {
      const snip = retrieval.snippets[i];
      const isOnebox = snip.type === 'onebox' || snip.title.toLowerCase().includes('onebox');
      citations.push({
        id: `cite-local-${i}`,
        title: isOnebox ? `Onebox — ${snip.title}` : `CiptadraSoft — ${snip.title}`,
        url: isOnebox ? 'https://onebox.co.id/' : 'https://ciptadrasoft.com/',
        sourceType: isOnebox ? 'onebox' : 'ciptadra',
        excerpt: snip.content.slice(0, 160) + '...',
        isVerified: true
      });
    }

    // Top web results if any
    for (let j = 0; j < Math.min(webSourceTitles.length, 1); j++) {
      citations.push({
        id: `cite-web-${j}`,
        title: `Google / Web — ${webSourceTitles[j]}`,
        url: 'https://google.com/search?q=' + encodeURIComponent(latestUserMessage.content),
        sourceType: 'web',
        excerpt: 'Verified search index reference for external domain information.',
        isVerified: false
      });
    }

    const citationLabels = citations.map(c => `• ${c.title}`);

    // Source breakdown distinguishing file, official, web, inference
    const sourceBreakdown = {
      fromFile: allAttachments.map(a => a.name),
      fromOfficial: retrieval.snippets.slice(0, 2).map(s => s.title),
      fromWeb: webSourceTitles.slice(0, 1),
      inferences: ['Analisis dan penalaran arsitektur sistem CiptadraSoft']
    };

    const responsePayload: ChatApiResponse = {
      reply,
      suggestedFollowUps: followUps,
      showLeadForm: hasLeadIntent,
      groundedSources: citationLabels,
      citations,
      sourceBreakdown,
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
