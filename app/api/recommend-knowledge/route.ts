import { NextRequest, NextResponse } from 'next/server';
import { retrieveKnowledge } from '@/lib/retrieval';
import { KnowledgeRecommendation } from '@/types/chatbot';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || body.complaint || '';
    const category = body.category || '';

    const lower = (query + ' ' + category).toLowerCase();

    // Base recommendations repository
    const allArticles: KnowledgeRecommendation[] = [
      {
        id: 'kb-billing-01',
        title: 'SOP Rekonsiliasi Pembayaran BCA Virtual Account & Aktivasi Darurat',
        source: 'SLA & Billing Policy',
        relevanceScore: 97,
        matchReason: 'Sangat cocok untuk penanganan keterlambatan notifikasi webhook BCA VA dan aktivasi grace period 24 jam.',
        excerpt: 'Jika transaksi BCA VA telah sukses di sisi nasabah namun belum ter-update di portal Onebox, lakukan verifikasi manual di menu Billing Settlement dan berikan Grace Period 24 Jam untuk menjaga kelancaran operasional klien.',
        tags: ['Billing', 'BCA VA', 'Settlement', 'Grace Period'],
        url: 'https://ciptadrasoft.com/solutions/billing-sop'
      },
      {
        id: 'kb-tech-02',
        title: 'Panduan Troubleshooting WebRTC & Penanganan Error SIP 503 Service Unavailable',
        source: 'External Technical Docs',
        relevanceScore: 95,
        matchReason: 'Solusi spesifik untuk kegagalan rute signaling telephony Onebox Contact Center dan prosedur failover node.',
        excerpt: 'Error SIP 503 pada WebRTC mengindikasikan signaling overload atau port exhaustion. Lakukan pengalihan trunk ke backup node, lalu instruksikan agen melakukan hard refresh browser untuk memulihkan sesi socket.',
        tags: ['Telephony', 'SIP 503', 'WebRTC', 'Failover'],
        url: 'https://onebox.co.id/docs/webrtc-troubleshooting'
      },
      {
        id: 'kb-cx-03',
        title: 'Onebox CX Omnichannel Contact Center: Panduan Arsitektur & Antrean Panggilan',
        source: 'Onebox CX Knowledge',
        relevanceScore: 89,
        matchReason: 'Menjelaskan alur distribusi panggilan dan pengelolaan antrean omnichannel bagi call center.',
        excerpt: 'Onebox Contact Center mendukung distribusi panggilan otomatis (ACD), integrasi PABX, rekaman suara real-time, serta dashboard supervisor untuk memantau waktu tunggu pelanggan dan kinerja agen.',
        tags: ['Onebox CX', 'Contact Center', 'Omnichannel', 'ACD'],
        url: 'https://onebox.co.id/solutions/cx-architecture'
      },
      {
        id: 'kb-retention-04',
        title: 'Protokol Retensi Klien & Ketentuan Terminasi Kontrak Layanan SaaS',
        source: 'SLA & Billing Policy',
        relevanceScore: 92,
        matchReason: 'Menjelaskan klausul kontrak pemberitahuan 30 hari, perhitungan sisa deposit, dan strategi negosiasi lisensi.',
        excerpt: 'Sebelum memproses pengembalian deposit atau terminasi lisensi Ciptadra Flow BPM, Tim Customer Success diwajibkan menawarkan penyesuaian paket (flexi-tier) atau opsi pause langganan sementara.',
        tags: ['Retention', 'Kontrak', 'Refund', 'Customer Success'],
        url: 'https://ciptadrasoft.com/sla-policy'
      },
      {
        id: 'kb-integ-05',
        title: 'Arsitektur Integrasi Middleware Onebox Enterprise dengan SAP ERP (RFC/REST API)',
        source: 'CiptadraSoft Core',
        relevanceScore: 94,
        matchReason: 'Menjawab kebutuhan integrasi sistem CRM/Omnichannel dengan SAP on-premise untuk perusahaan manufaktur.',
        excerpt: 'Modul Onebox Enterprise Connector menyediakan antarmuka aman berbasis SAP NetWeaver RFC dan RESTful API terenkripsi untuk pertukaran data master pelanggan, pesanan, dan status tiket secara dua arah.',
        tags: ['SAP Integration', 'ERP', 'Enterprise Middleware', 'RFC API'],
        url: 'https://ciptadrasoft.com/solutions/enterprise-integration'
      },
      {
        id: 'kb-core-06',
        title: 'Kompilasi Solusi & Portofolio 7 Platform Unggulan CiptadraSoft',
        source: 'CiptadraSoft Core',
        relevanceScore: 84,
        matchReason: 'Ringkasan menyeluruh portofolio produk CiptadraSoft untuk konsultasi digital transformation.',
        excerpt: 'CiptadraSoft menyediakan solusi terintegrasi: Core Enterprise Platform, Onebox CX Omnichannel, Ciptadra Flow BPM, Ciptadra Insight BI, dan Secure Financial Switching yang melayani lebih dari 200 klien aktif.',
        tags: ['CiptadraSoft', 'Produk', 'Platform', 'Enterprise'],
        url: 'https://ciptadrasoft.com/'
      }
    ];

    // Compute dynamic scores based on query keywords
    const scored = allArticles.map(article => {
      let score = 50;
      for (const tag of (article.tags || [])) {
        if (lower.includes(tag.toLowerCase())) score += 20;
      }
      if (lower.includes('bca') || lower.includes('va') || lower.includes('bayar')) {
        if (article.id === 'kb-billing-01') score = 98;
      }
      if (lower.includes('sip') || lower.includes('503') || lower.includes('webrtc') || lower.includes('telepon')) {
        if (article.id === 'kb-tech-02') score = 97;
        if (article.id === 'kb-cx-03') score = 91;
      }
      if (lower.includes('batal') || lower.includes('cancel') || lower.includes('refund')) {
        if (article.id === 'kb-retention-04') score = 96;
      }
      if (lower.includes('sap') || lower.includes('integrasi') || lower.includes('manufaktur')) {
        if (article.id === 'kb-integ-05') score = 98;
      }

      return {
        ...article,
        relevanceScore: Math.min(score, 99)
      };
    });

    scored.sort((a, b) => b.relevanceScore - a.relevanceScore);
    const topArticles = scored.slice(0, 3);

    return NextResponse.json({
      recommendations: topArticles,
      totalFound: topArticles.length
    });
  } catch (error: unknown) {
    console.error('[Knowledge Recommendation API Error]:', error);
    return NextResponse.json({ error: 'Failed to retrieve recommendations' }, { status: 500 });
  }
}
