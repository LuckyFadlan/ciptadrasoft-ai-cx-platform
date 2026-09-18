/**
 * Web Search Retriever for Ciptadra AI
 * Provides real-time internet search and external knowledge lookup
 * from web sources and online knowledge bases.
 */

export interface WebSearchResult {
  title: string;
  snippet: string;
  source: string;
  url?: string;
}

/**
 * Searches external internet sources for knowledge related to the query.
 * Falls back gracefully if offline or request times out.
 */
export async function searchWeb(query: string, maxResults = 3): Promise<WebSearchResult[]> {
  const results: WebSearchResult[] = [];
  const cleanQuery = query.trim().replace(/[?!.,]/g, '');

  if (!cleanQuery) return results;

  // 1. Try Indonesian Wikipedia API (fast, reliable, unblocked encyclopedia)
  try {
    const wikiIdUrl = `https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&format=json&utf8=1&srlimit=${maxResults}`;
    const res = await fetch(wikiIdUrl, {
      headers: { 'User-Agent': 'CiptadraAI/1.0 (info@ciptadrasoft.com)' },
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.query?.search && Array.isArray(data.query.search)) {
        for (const item of data.query.search) {
          const cleanSnippet = item.snippet
            .replace(/<span class="searchmatch">/g, '')
            .replace(/<\/span>/g, '')
            .replace(/<[^>]+>/g, '')
            .trim();
          
          if (cleanSnippet) {
            results.push({
              title: item.title,
              snippet: cleanSnippet,
              source: 'Wikipedia Indonesia',
              url: `https://id.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
            });
          }
        }
      }
    }
  } catch {
    // Graceful fallback if timeout or network glitch
  }

  // 2. If results are still few and query has English / tech terms, try English Wikipedia
  if (results.length < maxResults) {
    try {
      const wikiEnUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&format=json&utf8=1&srlimit=2`;
      const res = await fetch(wikiEnUrl, {
        headers: { 'User-Agent': 'CiptadraAI/1.0 (info@ciptadrasoft.com)' },
        signal: AbortSignal.timeout(3000)
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.query?.search && Array.isArray(data.query.search)) {
          for (const item of data.query.search) {
            if (results.some(r => r.title.toLowerCase() === item.title.toLowerCase())) continue;
            const cleanSnippet = item.snippet
              .replace(/<span class="searchmatch">/g, '')
              .replace(/<\/span>/g, '')
              .replace(/<[^>]+>/g, '')
              .trim();

            if (cleanSnippet) {
              results.push({
                title: item.title,
                snippet: cleanSnippet,
                source: 'Wikipedia Global',
                url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
              });
            }
          }
        }
      }
    } catch {
      // Ignore
    }
  }

  // 3. Fallback to Google auto-suggest topics
  if (results.length === 0) {
    try {
      const suggestUrl = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(cleanQuery)}`;
      const res = await fetch(suggestUrl, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.[1]) && data[1].length > 0) {
          const suggestions = data[1].slice(0, 4).join(', ');
          results.push({
            title: `Pencarian Web Terkait: "${cleanQuery}"`,
            snippet: `Topik populer di Google terkait pencarian ini: ${suggestions}.`,
            source: 'Google Web Search'
          });
        }
      }
    } catch {
      // Ignore
    }
  }

  return results.slice(0, maxResults);
}
