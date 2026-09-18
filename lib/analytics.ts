import { AnalyticsEvent, AnalyticsEventType } from '@/types/chatbot';

const STORAGE_KEY = 'ciptadra_analytics_events';

/**
 * Dispatches a client-side analytics event.
 * Saves locally in localStorage and optionally forwards to /api/analytics.
 */
export function trackEvent(eventType: AnalyticsEventType, properties?: Record<string, unknown>): void {
  const event: AnalyticsEvent = {
    event: eventType,
    timestamp: Date.now(),
    properties
  };

  // 1. Log to browser console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics Event: ${eventType}]`, event);
  }

  // 2. Persist locally to localStorage (up to 100 recent events)
  if (typeof window !== 'undefined') {
    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      const list: AnalyticsEvent[] = existing ? JSON.parse(existing) : [];
      list.push(event);
      if (list.length > 100) {
        list.shift();
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // Ignore localStorage errors (e.g. storage full or disabled)
    }

    // 3. Send event to local API backend asynchronously
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).catch(() => {
      // Fail silently for analytics backend calls to prevent user disruption
    });
  }
}

export function getLocalAnalyticsEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
