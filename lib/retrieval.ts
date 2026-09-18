import knowledgeData from '@/data/ciptadra-knowledge.json';
import { KnowledgeBase, SolutionItem, ProductItem, IndustryItem, FAQItem } from '@/types/chatbot';

const knowledge: KnowledgeBase = knowledgeData as KnowledgeBase;

export interface RetrievedSnippet {
  type: 'company' | 'solution' | 'product' | 'industry' | 'service' | 'capability' | 'faq';
  title: string;
  content: string;
  score: number;
}

export interface RetrievalResult {
  snippets: RetrievedSnippet[];
  contextText: string;
  sourceTitles: string[];
}

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
  'did', 'can', 'could', 'should', 'would', 'will', 'of', 'how', 'what', 'which', 'who',
  'where', 'why', 'when', 'does', 'please', 'tell', 'me', 'our', 'we', 'us', 'you', 'your',
  'ini', 'itu', 'dan', 'di', 'ke', 'dari', 'yang', 'untuk', 'dengan', 'adalah', 'apakah',
  'bagaimana', 'bisa', 'tolong', 'kami', 'kita', 'saya'
]);

function tokenize(text: string): string[] {
  const tokens = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOPWORDS.has(token));

  const expanded = new Set<string>();
  for (const t of tokens) {
    expanded.add(t);
    // Common plural/singular and lemma expansions
    if (t.endsWith('ies')) expanded.add(t.slice(0, -3) + 'y');
    if (t.endsWith('s') && !t.endsWith('ss')) expanded.add(t.slice(0, -1));
    if (t === 'industry' || t === 'industries') {
      expanded.add('industry');
      expanded.add('industries');
      expanded.add('sector');
      expanded.add('sectors');
    }
    if (t === 'solution' || t === 'solutions') {
      expanded.add('solution');
      expanded.add('solutions');
    }
    if (t === 'product' || t === 'products') {
      expanded.add('product');
      expanded.add('products');
    }
    if (t === 'service' || t === 'services' || t === 'serve' || t === 'serving') {
      expanded.add('service');
      expanded.add('services');
      expanded.add('serve');
    }
  }

  return Array.from(expanded);
}

function calculateScore(queryTokens: string[], text: string, weight = 1.0): number {
  if (!text) return 0;
  const lower = text.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (lower.includes(token)) {
      score += 1 * weight;
      const regex = new RegExp(`\\b${token}\\b`, 'i');
      if (regex.test(lower)) {
        score += 1.5 * weight;
      }
    }
  }

  return score;
}

/**
 * Searches the local CiptadraSoft knowledge base for information matching the query.
 */
export function retrieveKnowledge(query: string, maxItems = 5): RetrievalResult {
  const queryTokens = tokenize(query);
  const lowerQuery = query.toLowerCase();
  const candidates: RetrievedSnippet[] = [];

  const isIndustryQuery = queryTokens.some(t => ['industry', 'industries', 'sector', 'sectors'].includes(t));
  const isSolutionQuery = queryTokens.some(t => ['solution', 'solutions'].includes(t));
  const isProductQuery = queryTokens.some(t => ['product', 'products'].includes(t));

  // 1. If industry-wide question, inject comprehensive industry overview
  if (isIndustryQuery) {
    candidates.push({
      type: 'industry',
      title: 'CiptadraSoft Target Industries Overview',
      content: `CiptadraSoft serves 7 key enterprise industries across Indonesia and Southeast Asia:\n` +
        knowledge.industries.map(ind => `- **${ind.name}**: ${ind.tagline} (Popular solutions: ${ind.popularSolutions.join(', ')})`).join('\n'),
      score: 10
    });
  }

  // 2. If solution-wide question, inject comprehensive solutions overview
  if (isSolutionQuery) {
    candidates.push({
      type: 'solution',
      title: 'CiptadraSoft Solutions Portfolio Overview',
      content: `CiptadraSoft provides 6 core enterprise solutions:\n` +
        knowledge.solutions.map(sol => `- **${sol.name}**: ${sol.shortDescription} (Target: ${sol.targetAudience})`).join('\n'),
      score: 10
    });
  }

  // 3. If product-wide question, inject comprehensive products overview
  if (isProductQuery) {
    candidates.push({
      type: 'product',
      title: 'CiptadraSoft Product Portfolio Overview',
      content: `CiptadraSoft offers 6 modular enterprise platforms:\n` +
        knowledge.products.map(prod => `- **${prod.name}** (${prod.category}): ${prod.summary}`).join('\n'),
      score: 10
    });
  }

  // 4. Check Company Profile
  const companyStr = `${knowledge.company.name} ${knowledge.company.tagline} ${knowledge.company.description} ${knowledge.company.values.join(' ')} ${knowledge.company.presence.join(' ')}`;
  const companyScore = calculateScore(queryTokens, companyStr, 1.2);
  if (companyScore > 0 || queryTokens.length === 0) {
    candidates.push({
      type: 'company',
      title: 'CiptadraSoft Company Overview',
      content: `${knowledge.company.description} Headquarters: ${knowledge.company.headquarters}. Locations: ${knowledge.company.presence.join(', ')}. Contact: ${knowledge.company.contact.email}, ${knowledge.company.contact.phone}.`,
      score: companyScore
    });
  }

  // 5. Check Solutions
  for (const sol of knowledge.solutions) {
    const text = `${sol.name} ${sol.shortDescription} ${sol.description} ${sol.keyBenefits.join(' ')} ${sol.capabilitiesIncluded.join(' ')} ${sol.targetAudience}`;
    const score = calculateScore(queryTokens, text, 1.5) + (isSolutionQuery ? 2 : 0);
    candidates.push({
      type: 'solution',
      title: `Solution: ${sol.name}`,
      content: `${sol.name}: ${sol.description} Key Benefits: ${sol.keyBenefits.join('; ')}. Target: ${sol.targetAudience}. Included: ${sol.capabilitiesIncluded.join(', ')}.`,
      score
    });
  }

  // 6. Check Products
  for (const prod of knowledge.products) {
    const text = `${prod.name} ${prod.category} ${prod.summary} ${prod.features.join(' ')} ${prod.deployment}`;
    const score = calculateScore(queryTokens, text, 1.6) + (isProductQuery ? 2 : 0);
    candidates.push({
      type: 'product',
      title: `Product: ${prod.name}`,
      content: `${prod.name} (${prod.category}): ${prod.summary} Key Features: ${prod.features.join('; ')}. Deployment: ${prod.deployment}.`,
      score
    });
  }

  // 7. Check Industries
  for (const ind of knowledge.industries) {
    const text = `${ind.name} ${ind.tagline} ${ind.challengesAddressed} ${ind.popularSolutions.join(' ')}`;
    const score = calculateScore(queryTokens, text, 1.6) + (isIndustryQuery ? 3 : 0);
    candidates.push({
      type: 'industry',
      title: `Industry: ${ind.name}`,
      content: `${ind.name}: ${ind.tagline} Challenges Addressed: ${ind.challengesAddressed}. Recommended Solutions: ${ind.popularSolutions.join(', ')}.`,
      score
    });
  }

  // 8. Check Services
  for (const srv of knowledge.services) {
    const text = `${srv.name} ${srv.description}`;
    const score = calculateScore(queryTokens, text, 1.3);
    candidates.push({
      type: 'service',
      title: `Service: ${srv.name}`,
      content: `${srv.name}: ${srv.description}`,
      score
    });
  }

  // 9. Check FAQs
  for (const faq of knowledge.faq) {
    const text = `${faq.question} ${faq.answer}`;
    const score = calculateScore(queryTokens, text, 1.5);
    candidates.push({
      type: 'faq',
      title: `FAQ: ${faq.question}`,
      content: `Q: ${faq.question} A: ${faq.answer}`,
      score
    });
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  // Pick the top ones with score > 0
  let topSnippets = candidates.filter(c => c.score > 0).slice(0, maxItems);

  // If no specific match was found, return high-level summary snippets
  if (topSnippets.length === 0) {
    topSnippets = [
      {
        type: 'company',
        title: 'CiptadraSoft Overview',
        content: knowledge.company.description,
        score: 0.5
      },
      {
        type: 'solution',
        title: 'Solutions Portfolio',
        content: `Core Solutions: ${knowledge.solutions.map(s => s.name).join(', ')}.`,
        score: 0.5
      },
      {
        type: 'product',
        title: 'Product Portfolio',
        content: `Products: ${knowledge.products.map(p => p.name).join(', ')}.`,
        score: 0.5
      }
    ];
  }

  const contextText = topSnippets
    .map(s => `[Source: ${s.title}]\n${s.content}`)
    .join('\n\n');

  const sourceTitles = topSnippets.map(s => s.title);

  return {
    snippets: topSnippets,
    contextText,
    sourceTitles
  };
}

export function getAllSolutions(): SolutionItem[] {
  return knowledge.solutions;
}

export function getAllProducts(): ProductItem[] {
  return knowledge.products;
}

export function getAllIndustries(): IndustryItem[] {
  return knowledge.industries;
}

export function getCompanyInfo() {
  return knowledge.company;
}
