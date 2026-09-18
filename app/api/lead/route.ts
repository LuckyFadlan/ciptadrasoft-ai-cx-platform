import { NextRequest, NextResponse } from 'next/server';
import { LeadFormData } from '@/types/chatbot';

// In-memory leads storage for prototype development
const localLeadsStore: (LeadFormData & { submittedAt: string; id: string })[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<LeadFormData>;

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: body.name.trim(),
      company: body.company ? body.company.trim() : 'N/A',
      email: body.email.trim(),
      phone: body.phone ? body.phone.trim() : 'N/A',
      need: body.need ? body.need.trim() : 'General Inquiry',
      submittedAt: new Date().toISOString()
    };

    localLeadsStore.push(leadRecord);

    // Print to server console for local prototype monitoring
    console.log('----------------------------------------------------');
    console.log('📌 [NEW ENTERPRISE LEAD CAPTURED]');
    console.log(`ID:        ${leadRecord.id}`);
    console.log(`Name:      ${leadRecord.name}`);
    console.log(`Company:   ${leadRecord.company}`);
    console.log(`Email:     ${leadRecord.email}`);
    console.log(`Phone:     ${leadRecord.phone}`);
    console.log(`Need:      ${leadRecord.need}`);
    console.log(`Timestamp: ${leadRecord.submittedAt}`);
    console.log('----------------------------------------------------');

    return NextResponse.json({
      success: true,
      message: 'Thank you! A CiptadraSoft solution specialist will reach out to your team promptly.',
      leadId: leadRecord.id
    });
  } catch (err) {
    console.error('[Lead Submission Error]:', err);
    return NextResponse.json(
      { error: 'Failed to process enterprise consultation request.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalLeads: localLeadsStore.length,
    leads: localLeadsStore
  });
}
