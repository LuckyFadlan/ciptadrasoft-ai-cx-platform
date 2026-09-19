import { NextRequest, NextResponse } from 'next/server';
import knowledgeData from '@/data/ciptadra-knowledge.json';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = searchParams.get('q')?.toLowerCase();

    const data: any = knowledgeData;

    if (category && data[category]) {
      return NextResponse.json({ [category]: data[category] });
    }

    if (query) {
      // Basic filter across solutions, products, industries
      const solutions = data.solutions.filter((s: any) =>
        s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)
      );
      const products = data.products.filter((p: any) =>
        p.name.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query)
      );
      return NextResponse.json({ solutions, products, query });
    }

    return NextResponse.json({
      company: data.company,
      solutionsCount: data.solutions?.length || 0,
      productsCount: data.products?.length || 0,
      industriesCount: data.industries?.length || 0,
      clientsCount: data.clients?.total || '200+',
      oneboxPillars: data.onebox?.pillars?.map((p: any) => p.name) || []
    });
  } catch (error: unknown) {
    console.error('[Knowledge API Error]:', error);
    return NextResponse.json({ error: 'Failed to fetch knowledge' }, { status: 500 });
  }
}
