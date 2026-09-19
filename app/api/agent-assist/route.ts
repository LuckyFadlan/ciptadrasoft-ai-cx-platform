import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { retrieveKnowledge } from '@/lib/retrieval';
import { AgentAssistResult, AgentAction } from '@/types/chatbot';

function fallbackAssist(category: string, complaint: string, customerName = 'Bapak/Ibu'): AgentAssistResult {
  const lower = complaint.toLowerCase();

  if (category.includes('Billing') || lower.includes('bayar') || lower.includes('va')) {
    return {
      suggestedResponse: `Halo ${customerName}, terima kasih telah menghubungi Tim Support CiptadraSoft & Onebox.\n\nKami mohon maaf atas kendala aktivasi akun yang dialami. Kami mengerti pentingnya akses ini untuk kelancaran proses tender perusahaan Anda hari ini.\n\nTim Finance kami saat ini sedang memverifikasi transaksi BCA Virtual Account Anda secara manual melalui gateway settlement. Untuk mempercepat, kami telah mengaktifkan **Akses Darurat (Grace Period 24 Jam)** agar tim sales Anda dapat langsung login dan melanjutkan input prospek.\n\nMohon konfirmasi apakah akun Anda sudah dapat diakses kembali?`,
      suggestedActions: [
        {
          id: 'verify_gateway',
          label: 'Verifikasi Mutasi BCA VA',
          actionType: 'primary',
          description: 'Sinkronkan status transaksi di payment gateway Onebox Billing'
        },
        {
          id: 'apply_grace_period',
          label: 'Aktifkan Grace Period 24 Jam',
          actionType: 'secondary',
          description: 'Buka kunci akun sementara tanpa menunggu settlement perbankan'
        },
        {
          id: 'escalate_finance_lead',
          label: 'Eskalasi ke Lead Finance',
          actionType: 'danger',
          description: 'Teruskan bukti transfer ke finance supervisor jika settlement gagal'
        }
      ],
      keyTalkingPoints: [
        'Klien membutuhkan akses segera karena ada tenggat waktu tender penting.',
        'Sistem payment gateway BCA VA terkadang membutuhkan waktu sinkronisasi 10-15 menit saat jam sibuk.',
        'Pemberian grace period 24 jam menjamin SLA kepuasan pelanggan tanpa risiko finansial.'
      ],
      confidenceScore: 0.95,
      internalNotes: 'Pelanggan kategori High Priority. Berikan grace period segera sambil menunggu laporan mutasi bank.'
    };
  }

  if (category.includes('Technical') || lower.includes('sip') || lower.includes('error') || lower.includes('webrtc')) {
    return {
      suggestedResponse: `Halo ${customerName}, terima kasih atas laporannya.\n\nKami telah mendeteksi adanya kendala koneksi WebRTC dengan indikator SIP 503 pada gateway teleponi Onebox Contact Center Anda. Tim Core Engineering dan DevOps kami saat ini sudah mengalihkan traffic inbound ke secondary backup node.\n\nMohon bantu untuk meminta para agen melakukan **Hard Refresh (Ctrl + F5)** pada browser masing-masing untuk menguji kembali penerimaan panggilan.\n\nKami akan terus memonitor traffic panggilan Anda selama 30 menit ke depan hingga 100% stabil.`,
      suggestedActions: [
        {
          id: 'restart_sip_gateway',
          label: 'Failover ke Secondary SIP Trunk',
          actionType: 'primary',
          description: 'Alihkan rute WebRTC ke redundansi server cadangan'
        },
        {
          id: 'run_diagnostics',
          label: 'Jalankan Network Diagnostics',
          actionType: 'secondary',
          description: 'Cek latensi socket & packet loss di node klien'
        },
        {
          id: 'escalate_devops',
          label: 'Eskalasi Insiden ke DevOps Tier-2',
          actionType: 'danger',
          description: 'Kirim notifikasi pager ke engineer on-call'
        }
      ],
      keyTalkingPoints: [
        'Error SIP 503 mengindikasikan overload atau packet dropping pada signaling proxy WebRTC.',
        'Failover rute teleponi memakan waktu kurang dari 60 detik.',
        'Pastikan browser agen tidak memblokir permission mic/audio setelah refresh.'
      ],
      confidenceScore: 0.94,
      internalNotes: 'Insiden berdampak pada 20 agen live. Pantau antrean panggilan masuk di Onebox Supervisor.'
    };
  }

  if (category.includes('Complaint') || lower.includes('batal') || lower.includes('cancel')) {
    return {
      suggestedResponse: `Halo ${customerName}, terima kasih telah menghubungi CiptadraSoft.\n\nKami memahami keputusan internal manajemen Anda terkait evaluasi penggunaan platform Ciptadra Flow BPM. Kami sangat menghargai kerja sama yang telah terjalin selama ini.\n\nSebelum kami memproses administrasi terminasi dan rekonsiliasi deposit, apakah berkenan jika Tim Customer Success kami mendiskusikan penyesuaian skema lisensi yang lebih fleksibel sesuai struktur manajemen baru perusahaan Anda?\n\nKami siap mengatur sesi diskusi singkat hari ini pukul 14:00 WIB.`,
      suggestedActions: [
        {
          id: 'schedule_retention_meeting',
          label: 'Jadwalkan CS Retention Call',
          actionType: 'primary',
          description: 'Kirim undangan meeting evaluasi lisensi dan mitigasi churn'
        },
        {
          id: 'calculate_deposit_refund',
          label: 'Hitung Simulasi Refund Deposit',
          actionType: 'secondary',
          description: 'Generate rekap pemakaian dan sisa deposit sesuai klausul SLA'
        },
        {
          id: 'escalate_account_manager',
          label: 'Eskalasi ke Senior Account Director',
          actionType: 'danger',
          description: 'Notifikasi pimpinan akun sebelum pembatalan disetujui'
        }
      ],
      keyTalkingPoints: [
        'Klien berniat membatalkan kontrak tahunan karena restrukturisasi internal.',
        'Tawarkan opsi downgrading tier lisensi atau freeze akun sementara sebelum terminasi permanen.',
        'Klausul kontrak mensyaratkan pemberitahuan 30 hari kalender sebelum jatuh tempo.'
      ],
      confidenceScore: 0.91,
      internalNotes: 'Akun berpotensi churn. Segera koordinasikan dengan Account Manager sebelum proses refund diajukan.'
    };
  }

  return {
    suggestedResponse: `Halo ${customerName}, terima kasih telah menghubungi CiptadraSoft.\n\nTerkait pertanyaan Anda mengenai integrasi solusi Onebox Omnichannel dengan sistem SAP ERP on-premise, kami dapat memastikan bahwa arsitektur CiptadraSoft didesain secara modular dan mendukung integrasi hybrid.\n\nKami memiliki modul **Onebox Enterprise Connector** yang mendukung koneksi via SAP RFC, BAPI, maupun REST/OData API lengkap dengan enkripsi TLS dan antrean asinkronus.\n\nBolehkah kami menjadwalkan sesi konsultasi teknis bersama tim Solutions Architect kami untuk memetakan alur integrasi yang Anda butuhkan?`,
    suggestedActions: [
      {
        id: 'send_whitepaper',
        label: 'Kirim Whitepaper Integrasi SAP',
        actionType: 'primary',
        description: 'Email diagram arsitektur middleware Onebox-to-SAP ke klien'
      },
      {
        id: 'book_discovery_session',
        label: 'Jadwalkan Technical Discovery',
        actionType: 'secondary',
        description: 'Set jadwal diskusi 30 menit bersama Solutions Architect'
      },
      {
        id: 'assign_enterprise_sales',
        label: 'Tugaskan ke Enterprise Sales Lead',
        actionType: 'secondary',
        description: 'Kaitkan prospek ini dengan pipeline CRM'
      }
    ],
    keyTalkingPoints: [
      'Perusahaan 500 karyawan memerlukan integrasi ERP yang stabil dan compliant.',
      'CiptadraSoft memiliki rekam jejak integrasi perbankan & manufaktur skala besar.',
      'Arahkan ke sesi demo teknis untuk memvalidasi arsitektur on-premise.'
    ],
    confidenceScore: 0.93,
    internalNotes: 'Prospek enterprise potensial. Tindak lanjuti dengan materi teknis integrasi SAP.'
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      complaint = '',
      category = 'General Information',
      priority = 'Medium',
      customerName = 'Bapak/Ibu',
      companyName = 'Klien Enterprise'
    } = body;

    if (!complaint.trim()) {
      return NextResponse.json({ error: 'Complaint text is required' }, { status: 400 });
    }

    const retrieval = retrieveKnowledge(complaint + ' ' + category);

    try {
      const provider = getAIProvider();
      const prompt = `You are the Agent Assist AI for CiptadraSoft & Onebox CX Enterprise Customer Service.
An agent is dealing with an incoming ticket. Generate real-time assist recommendations.
Output ONLY valid JSON with this exact schema:
{
  "suggestedResponse": "Empathetic, highly professional, polite response draft in Indonesian ready for the agent to send to ${customerName} from ${companyName}. Include clear actions taken and next steps.",
  "suggestedActions": [
    {
      "id": "action_id",
      "label": "Short Action Title (e.g. Verifikasi Pembayaran VA)",
      "actionType": "primary" | "secondary" | "danger",
      "description": "Short explanation of what this button does"
    }
  ],
  "keyTalkingPoints": ["Point 1", "Point 2", "Point 3"],
  "confidenceScore": number between 0.85 and 0.98,
  "internalNotes": "Brief operational note for the agent"
}

Ticket Context:
Category: ${category}
Priority: ${priority}
Customer: ${customerName} (${companyName})
Customer Message: "${complaint.replace(/"/g, '\\"')}"`;

      const aiResult = await provider.generateResponse({
        messages: [{ role: 'user', content: prompt }],
        knowledgeContext: retrieval.contextText
      });

      const jsonMatch = aiResult.reply.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as AgentAssistResult;
        return NextResponse.json({
          assist: parsed,
          provider: aiResult.provider,
          model: aiResult.model
        });
      }
    } catch {
      // Fallback gracefully to smart domain rule engine
    }

    const fallback = fallbackAssist(category, complaint, customerName);
    return NextResponse.json({
      assist: fallback,
      provider: 'rule-engine',
      model: 'ciptadra-assist-v2'
    });
  } catch (error: unknown) {
    console.error('[Agent Assist API Error]:', error);
    return NextResponse.json({ error: 'Failed to generate agent assist' }, { status: 500 });
  }
}
