import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent } from '@/types/chatbot';

const localAnalyticsStore: AnalyticsEvent[] = [];

export async function POST(req: NextRequest) {
  try {
    const event = (await req.json()) as AnalyticsEvent;
    if (!event || !event.event) {
      return NextResponse.json({ error: 'Missing event payload' }, { status: 400 });
    }

    localAnalyticsStore.push(event);
    if (localAnalyticsStore.length > 200) {
      localAnalyticsStore.shift();
    }

    console.log(`📊 [Analytics] ${event.event} at ${new Date(event.timestamp).toLocaleTimeString()}`, event.properties || '');

    return NextResponse.json({ success: true, count: localAnalyticsStore.length });
  } catch {
    return NextResponse.json({ error: 'Invalid analytics request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    totalEvents: localAnalyticsStore.length,
    events: localAnalyticsStore.slice(-50)
  });
}
