import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { TicketClassification, TicketCategory, TicketPriority, TicketDepartment, CustomerSentiment } from '@/types/chatbot';

function fallbackClassify(text: string): TicketClassification {
  const lower = text.toLowerCase();

  // Urgent keywords
  const isUrgent = /kritis|urgent|darurat|down|mati|rusak total|terblokir|tender|gagal bayar|503|error/i.test(lower);
  const isBilling = /bayar|billing|tagihan|va|virtual account|invoice|rekening|refund|bca|mandiri|transfer/i.test(lower);
  const isTechnical = /error|sip|503|webrtc|bug|crash|api|gagal|timeout|gateway|server|down|tidak bisa|load/i.test(lower);
  const isAccount = /login|password|akun|terkunci|blokir|akses|role|izin|user|aktivasi/i.test(lower);
  const isCancel = /batal|cancel|refund|terminasi|berhenti|stop langganan|putus kontrak/i.test(lower);
  const isSales = /harga|penawaran|sap|integrasi|demo|fitur|beli|sales|quotation|karyawan/i.test(lower);

  let category: TicketCategory = 'General Information';
  let priority: TicketPriority = 'Medium';
  let department: TicketDepartment = 'Support Operations';
  let slaHours = 8;
  let sentiment: CustomerSentiment = 'Neutral';
  let urgencyScore = 45;
  let summary = text.slice(0, 80) + (text.length > 80 ? '...' : '');
  let reasoning = 'Permintaan informasi umum atau bantuan standar.';

  if (isCancel) {
    category = 'Complaint / Escalation';
    priority = 'High';
    department = 'Customer Success';
    slaHours = 4;
    sentiment = 'Frustrated';
    urgencyScore = 80;
    summary = 'Permintaan pembatalan kontrak atau pengembalian dana deposit.';
    reasoning = 'Terdeteksi intensi retensi dan terminasi kontrak berisiko churn tinggi.';
  } else if (isBilling) {
    category = 'Billing & Payment';
    priority = isUrgent ? 'Urgent' : 'High';
    department = 'Finance & Billing';
    slaHours = isUrgent ? 2 : 4;
    sentiment = isUrgent ? 'Frustrated' : 'Neutral';
    urgencyScore = isUrgent ? 90 : 70;
    summary = 'Kendala verifikasi pembayaran / akun belum aktif setelah transaksi.';
    reasoning = 'Melibatkan transaksi finansial BCA VA / invoice yang berdampak pada operasional klien.';
  } else if (isTechnical) {
    category = 'Technical Support';
    priority = isUrgent ? 'Urgent' : 'High';
    department = 'Core Engineering';
    slaHours = isUrgent ? 1 : 4;
    sentiment = isUrgent ? 'Urgent' : 'Neutral';
    urgencyScore = isUrgent ? 95 : 65;
    summary = 'Gangguan teknis sistem / infrastruktur teleponi / error server.';
    reasoning = 'Teridentifikasi pesan error sistem yang mengganggu alur operasional live.';
  } else if (isAccount) {
    category = 'Account & Access';
    priority = 'High';
    department = 'IT Security';
    slaHours = 2;
    sentiment = 'Frustrated';
    urgencyScore = 75;
    summary = 'Kendala hak akses pengguna atau akun terkunci.';
    reasoning = 'Memerlukan verifikasi identitas dan reset hak akses keamanan.';
  } else if (isSales) {
    category = 'Product Inquiry';
    priority = 'Medium';
    department = 'Solutions Architecture';
    slaHours = 8;
    sentiment = 'Positive';
    urgencyScore = 40;
    summary = 'Pertanyaan kapabilitas produk, integrasi SAP / ERP enterprise.';
    reasoning = 'Peluang konsultasi arsitektur solusi enterprise baru.';
  }

  return {
    category,
    priority,
    department,
    slaHours,
    sentiment,
    urgencyScore,
    summary,
    reasoning,
    confidenceScore: 0.92
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body.text || body.content || body.complaint || '';

    if (!text.trim()) {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    // Try AI generation first
    try {
      const provider = getAIProvider();
      const prompt = `You are the enterprise ticket classification AI engine for CiptadraSoft & Onebox CX.
Analyze this incoming customer complaint/inquiry and output ONLY valid JSON matching this exact structure:
{
  "category": "Billing & Payment" | "Technical Support" | "Account & Access" | "Product Inquiry" | "Complaint / Escalation" | "General Information",
  "priority": "Urgent" | "High" | "Medium" | "Low",
  "department": "Finance & Billing" | "Core Engineering" | "Customer Success" | "IT Security" | "Solutions Architecture" | "Support Operations",
  "slaHours": number (e.g. 1 for critical technical outage, 2 for blocked billing, 4 for high, 8 for medium, 24 for low),
  "sentiment": "Positive" | "Neutral" | "Frustrated" | "Angry" | "Urgent",
  "urgencyScore": number between 1 and 100,
  "summary": "1 concise sentence in Indonesian explaining the core issue",
  "reasoning": "1-2 sentences explaining why this category, priority, and department were assigned",
  "confidenceScore": number between 0.85 and 0.99
}

Customer Message:
"${text.replace(/"/g, '\\"')}"`;

      const aiResult = await provider.generateResponse({
        messages: [{ role: 'user', content: prompt }],
        knowledgeContext: 'CiptadraSoft & Onebox CX Enterprise Ticketing Classification Guidelines'
      });

      const jsonMatch = aiResult.reply.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as TicketClassification;
        return NextResponse.json({
          classification: parsed,
          provider: aiResult.provider,
          model: aiResult.model
        });
      }
    } catch {
      // Fallback gracefully to smart rule-based engine
    }

    const fallback = fallbackClassify(text);
    return NextResponse.json({
      classification: fallback,
      provider: 'rule-engine',
      model: 'ciptadra-classifier-v2'
    });
  } catch (error: unknown) {
    console.error('[Ticket Classification Error]:', error);
    return NextResponse.json({ error: 'Failed to classify ticket' }, { status: 500 });
  }
}
