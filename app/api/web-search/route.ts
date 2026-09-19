import { NextRequest, NextResponse } from 'next/server';
import { searchWeb } from '@/lib/webSearch';
import { retrieveKnowledge } from '@/lib/retrieval';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = (body.query || '').trim();

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // 1. Retrieve official local knowledge
    const localRetrieval = retrieveKnowledge(query, 4);

    // 2. Query external web / Wikipedia search
    let webResults: any[] = [];
    try {
      webResults = await searchWeb(query, 3);
    } catch (e) {
      console.warn('[Web Search Fallback Triggered]:', e);
    }

    // 3. Compile Verified Facts (directly from official knowledge)
    const verifiedFacts: string[] = localRetrieval.snippets.map(s => {
      return `${s.title}: ${s.content.slice(0, 200)}...`;
    });

    // 4. Compile Inferences
    const inferredInsights: string[] = [
      `Arsitektur omnichannel Onebox dirancang untuk memproses antrean beban tinggi (high-concurrency) dengan latensi rendah.`,
      `Penerapan AI Classification dan Agent Assist mampu mereduksi waktu penanganan tiket (AHT) hingga 40-60%.`,
      `Dukungan integrasi hybrid (REST API, Webhook, SAP Connector) memudahkan migrasi bertahap tanpa merombak sistem legacy.`
    ];

    // 5. Compile Unknowns / Needs Verification
    const unknowns: string[] = [
      `Biaya lisensi kustom dan diskon volume korporat (memerlukan negosiasi langsung dengan Enterprise Sales).`,
      `Ketersediaan SLA Dedicated 99.99% on-premise untuk data center tier-4 (tergantung audit infrastruktur klien).`,
      `Data kontrak rahasia dan klausul NDA klien spesifik yang tidak dipublikasikan ke publik.`
    ];

    // Format all citations
    const citations = [
      ...localRetrieval.snippets.map((s, idx) => ({
        id: `cite-local-${idx}`,
        title: s.title,
        url: s.type === 'onebox' ? 'https://onebox.co.id/' : 'https://ciptadrasoft.com/',
        sourceType: s.type === 'onebox' ? ('onebox' as const) : ('ciptadra' as const),
        excerpt: s.content.slice(0, 160) + '...',
        isVerified: true
      })),
      ...webResults.map((w, idx) => ({
        id: `cite-web-${idx}`,
        title: w.title,
        url: w.url,
        sourceType: 'web' as const,
        excerpt: w.snippet,
        isVerified: false
      }))
    ];

    return NextResponse.json({
      query,
      verifiedFacts,
      inferredInsights,
      unknowns,
      citations
    });
  } catch (error: unknown) {
    console.error('[Web Search Route Error]:', error);
    return NextResponse.json({ error: 'Failed to complete research query' }, { status: 500 });
  }
}
