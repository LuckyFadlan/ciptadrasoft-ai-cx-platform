import {
  Ticket,
  CustomerProfile360,
  TicketClassification,
  KnowledgeRecommendation,
  TicketSummary,
  OmnichannelConversation,
  AgentPerformanceRecord,
  SupervisorTrainingPlan,
  AiActivityLogItem,
  SupervisorExecutiveSummary,
  ContentSentimentItem,
  CustomerJourneyStage,
  OutboundCampaign,
  CallAnalyticsRecord,
  QualityMonitoringRecord,
  PredictiveCustomerNeed,
  CustomerInvoice,
  ServiceBooking,
  CommunityForumPost,
  FeedbackSubmission,
  IndustryDomain
} from '@/types/chatbot';

export interface DemoScenario {
  id: string;
  name: string;
  shortDesc: string;
  category: string;
  channel: 'WhatsApp' | 'Webchat' | 'Email';
  customerName: string;
  companyName: string;
  initialComplaint: string;
  defaultClassification: TicketClassification;
  suggestedActionLabel: string;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'billing_va',
    name: 'Billing Complaint',
    shortDesc: 'Akun terblokir setelah transfer BCA VA (Tender Mendesak)',
    category: 'Billing & Payment',
    channel: 'WhatsApp',
    customerName: 'Budi Santoso',
    companyName: 'PT Mega Solusi Nusantara',
    initialComplaint:
      'Halo, saya sudah bayar langganan Onebox CRM via BCA Virtual Account tadi pagi pukul 09:15 sebesar Rp 4.500.000, tapi akun perusahaan kami masih terblokir dan tim sales tidak bisa input prospek hari ini. Tolong segera diaktifkan karena ada tender penting siang ini!',
    defaultClassification: {
      category: 'Billing & Payment',
      priority: 'Urgent',
      department: 'Finance & Billing',
      slaHours: 2,
      sentiment: 'Frustrated',
      urgencyScore: 92,
      summary: 'Akun terblokir pasca transaksi BCA VA, tim sales tertahan tender penting.',
      reasoning: 'Keterlambatan notifikasi pembayaran berdampak langsung pada operasional tender klien.',
      confidenceScore: 0.96
    },
    suggestedActionLabel: 'Aktifkan Grace Period 24 Jam'
  },
  {
    id: 'tech_webrtc',
    name: 'Technical Problem',
    shortDesc: 'SIP 503 Service Unavailable pada Onebox Contact Center',
    category: 'Technical Support',
    channel: 'Webchat',
    customerName: 'Siti Rahmawati',
    companyName: 'Bank Digital Bersama',
    initialComplaint:
      'Tim call center kami mendadak tidak bisa menerima panggilan masuk lewat WebRTC Onebox Contact Center sejak 15 menit lalu. Muncul error SIP 503 Service Unavailable di dashboard 20 agen kami. Ini sangat kritis untuk operasional CS kami!',
    defaultClassification: {
      category: 'Technical Support',
      priority: 'Urgent',
      department: 'Core Engineering',
      slaHours: 1,
      sentiment: 'Urgent',
      urgencyScore: 97,
      summary: 'Error SIP 503 WebRTC melumpuhkan 20 agen inbound call center.',
      reasoning: 'Gangguan telephony langsung pada 20 agen live melanggar SLA ketersediaan 99.9%.',
      confidenceScore: 0.98
    },
    suggestedActionLabel: 'Failover ke Secondary SIP Trunk'
  },
  {
    id: 'retention_cancel',
    name: 'Urgent Cancellation',
    shortDesc: 'Permintaan terminasi kontrak tahunan & refund deposit',
    category: 'Complaint / Escalation',
    channel: 'Email',
    customerName: 'Hendro Wijaya',
    companyName: 'PT Logistik Prima Express',
    initialComplaint:
      'Saya ingin membatalkan perpanjangan kontrak tahunan Ciptadra Flow BPM dan refund deposit karena migrasi internal manajemen, mohon diproses hari ini sebelum jatuh tempo otomatis besok pagi.',
    defaultClassification: {
      category: 'Complaint / Escalation',
      priority: 'High',
      department: 'Customer Success',
      slaHours: 4,
      sentiment: 'Frustrated',
      urgencyScore: 84,
      summary: 'Permintaan pembatalan kontrak tahunan Flow BPM dan refund deposit.',
      reasoning: 'Risiko churn akun enterprise dengan tenggat waktu auto-renewal besok pagi.',
      confidenceScore: 0.93
    },
    suggestedActionLabel: 'Jadwalkan CS Retention Call'
  },
  {
    id: 'sap_integration',
    name: 'General Information',
    shortDesc: 'Integrasi Onebox Omnichannel dengan SAP ERP On-Premise',
    category: 'Product Inquiry',
    channel: 'Webchat',
    customerName: 'Dewi Lestari',
    companyName: 'PT Manufaktur Baja Sejahtera',
    initialComplaint:
      'Selamat siang, kami dari perusahaan manufaktur dengan 500 karyawan. Apakah platform Onebox Omnichannel CiptadraSoft bisa diintegrasikan dengan SAP ERP kami yang berjalan on-premise untuk tracking pesanan & tiket komplain?',
    defaultClassification: {
      category: 'Product Inquiry',
      priority: 'Medium',
      department: 'Solutions Architecture',
      slaHours: 8,
      sentiment: 'Positive',
      urgencyScore: 38,
      summary: 'Konsultasi integrasi Onebox Omnichannel dengan SAP ERP On-Premise 500 user.',
      reasoning: 'Inquiry ekspansi solusi enterprise manufaktur potensial untuk integrasi middleware.',
      confidenceScore: 0.94
    },
    suggestedActionLabel: 'Kirim Whitepaper Integrasi SAP'
  }
];

// ServeNow Case Study Baseline Assumptions
export const SERVENOW_CASE_DATA = {
  label: 'ServeNow Case Demo Assumptions',
  totalEmployees: 78,
  criticalComplaintsPerYear: 43,
  slaAchievementRate: '78%',
  targetSlaAchievementRate: '96%+',
  manualSortingTimeBefore: '120 menit / batch (2 jam pemilahan manual)',
  manualSortingTimeAfter: '2.4 detik (Otomatis via AI Classification)',
  efficiencyGain: '98% reduksi waktu klasifikasi tiket',
  keyBottlenecksEliminated: [
    'Kesalahan routing tiket ke departemen yang salah berkurang 85%',
    'Eskalasi keluhan kritis langsung terdeteksi dalam < 5 detik',
    'Agen langsung mendapatkan draf jawaban kontekstual tanpa mencari manual'
  ]
};

// Initial Mock Ticket Queue
export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'tkt-8402',
    ticketNumber: 'TKT-8402',
    channel: 'WhatsApp',
    customer: {
      name: 'Budi Santoso',
      company: 'PT Mega Solusi Nusantara',
      email: 'budi.santoso@megasolusi.co.id',
      phone: '+62 812-3456-7890'
    },
    initialComplaint:
      'Halo, saya sudah bayar langganan Onebox CRM via BCA Virtual Account tadi pagi pukul 09:15 sebesar Rp 4.500.000, tapi akun perusahaan kami masih terblokir dan tim sales tidak bisa input prospek hari ini. Tolong segera diaktifkan karena ada tender penting!',
    createdAt: Date.now() - 14 * 60 * 1000, // 14 mins ago
    updatedAt: Date.now() - 5 * 60 * 1000,
    status: 'open',
    classification: {
      category: 'Billing & Payment',
      priority: 'Urgent',
      department: 'Finance & Billing',
      slaHours: 2,
      sentiment: 'Frustrated',
      urgencyScore: 92,
      summary: 'Akun terblokir pasca transaksi BCA VA, tim sales tertahan tender penting.',
      reasoning: 'Keterlambatan notifikasi pembayaran berdampak langsung pada operasional tender klien.',
      confidenceScore: 0.96
    },
    assignedAgent: 'Rian Pratama (Finance Support)',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        senderName: 'Budi Santoso',
        content:
          'Halo, saya sudah bayar langganan Onebox CRM via BCA Virtual Account tadi pagi pukul 09:15 sebesar Rp 4.500.000, tapi akun perusahaan kami masih terblokir dan tim sales tidak bisa input prospek hari ini. Tolong segera diaktifkan karena ada tender penting!',
        timestamp: Date.now() - 14 * 60 * 1000
      },
      {
        id: 'm2',
        sender: 'system',
        senderName: 'Onebox Auto-Router',
        content:
          'Tiket diklasifikasikan sebagai [Billing & Payment - URGENT] oleh Ciptadra AI Classifier. Ditugaskan ke antrean Finance & Billing (SLA: 2 Jam).',
        timestamp: Date.now() - 13 * 60 * 1000
      }
    ],
    agentDraftResponse:
      'Halo Bapak Budi, terima kasih telah menghubungi Tim Support CiptadraSoft & Onebox. Kami mohon maaf atas kendala aktivasi akun Anda. Kami memahami urgensi proses tender hari ini. Kami telah mengaktifkan Akses Darurat (Grace Period 24 Jam) sehingga tim sales Anda dapat langsung login kembali saat ini juga sambil tim Finance kami menyelesaikan verifikasi BCA VA.',
    appliedActions: ['Verifikasi Mutasi BCA VA'],
    recommendedKnowledge: [
      {
        id: 'kb-bca',
        title: 'SOP Rekonsiliasi Pembayaran BCA Virtual Account & Aktivasi Darurat',
        source: 'SLA & Billing Policy',
        relevanceScore: 98,
        matchReason: 'Prosedur standar penanganan settlement gateway bank dan pemberian grace period 24 jam.',
        excerpt:
          'Jika transaksi BCA VA sukses di sisi nasabah namun belum ter-update di portal Onebox, aktifkan Grace Period 24 Jam di menu Billing Settlement untuk menjaga kelancaran operasional klien.',
        tags: ['Billing', 'BCA VA', 'Grace Period'],
        url: 'https://ciptadrasoft.com/solutions/billing-sop'
      }
    ]
  },
  {
    id: 'tkt-8403',
    ticketNumber: 'TKT-8403',
    channel: 'Webchat',
    customer: {
      name: 'Siti Rahmawati',
      company: 'Bank Digital Bersama',
      email: 'siti.rahma@bankdigital.id',
      phone: '+62 811-9876-5432'
    },
    initialComplaint:
      'Tim call center kami mendadak tidak bisa menerima panggilan masuk lewat WebRTC Onebox Contact Center sejak 15 menit lalu. Muncul error SIP 503 Service Unavailable di dashboard 20 agen kami. Sangat kritis!',
    createdAt: Date.now() - 35 * 60 * 1000,
    updatedAt: Date.now() - 10 * 60 * 1000,
    status: 'open',
    classification: {
      category: 'Technical Support',
      priority: 'Urgent',
      department: 'Core Engineering',
      slaHours: 1,
      sentiment: 'Urgent',
      urgencyScore: 97,
      summary: 'Error SIP 503 WebRTC melumpuhkan 20 agen inbound call center.',
      reasoning: 'Outage teleponi real-time berdampak langsung pada operasional banking klien.',
      confidenceScore: 0.98
    },
    assignedAgent: 'Agus Setiawan (DevOps On-Call)',
    messages: [
      {
        id: 'm1_t2',
        sender: 'customer',
        senderName: 'Siti Rahmawati',
        content:
          'Tim call center kami mendadak tidak bisa menerima panggilan masuk lewat WebRTC Onebox Contact Center sejak 15 menit lalu. Muncul error SIP 503 Service Unavailable di dashboard 20 agen kami. Sangat kritis!',
        timestamp: Date.now() - 35 * 60 * 1000
      }
    ]
  },
  {
    id: 'tkt-8404',
    ticketNumber: 'TKT-8404',
    channel: 'Email',
    customer: {
      name: 'Hendro Wijaya',
      company: 'PT Logistik Prima Express',
      email: 'hendro@logistikprima.com',
      phone: '+62 813-7766-5544'
    },
    initialComplaint:
      'Saya ingin membatalkan perpanjangan kontrak tahunan Ciptadra Flow BPM dan refund deposit karena migrasi internal manajemen, mohon diproses hari ini sebelum jatuh tempo otomatis besok pagi.',
    createdAt: Date.now() - 85 * 60 * 1000,
    updatedAt: Date.now() - 20 * 60 * 1000,
    status: 'in_progress',
    classification: {
      category: 'Complaint / Escalation',
      priority: 'High',
      department: 'Customer Success',
      slaHours: 4,
      sentiment: 'Frustrated',
      urgencyScore: 84,
      summary: 'Permintaan pembatalan kontrak tahunan Flow BPM dan refund deposit.',
      reasoning: 'Risiko churn akun enterprise dengan tenggat waktu auto-renewal besok pagi.',
      confidenceScore: 0.93
    },
    assignedAgent: 'Clara Michelle (CS Lead)',
    messages: [
      {
        id: 'm1_t3',
        sender: 'customer',
        senderName: 'Hendro Wijaya',
        content:
          'Saya ingin membatalkan perpanjangan kontrak tahunan Ciptadra Flow BPM dan refund deposit karena migrasi internal manajemen, mohon diproses hari ini sebelum jatuh tempo otomatis besok pagi.',
        timestamp: Date.now() - 85 * 60 * 1000
      }
    ]
  },
  {
    id: 'tkt-8405',
    ticketNumber: 'TKT-8405',
    channel: 'Webchat',
    customer: {
      name: 'Dewi Lestari',
      company: 'PT Manufaktur Baja Sejahtera',
      email: 'dewi.lestari@bajasejahtera.co.id',
      phone: '+62 815-4433-2211'
    },
    initialComplaint:
      'Selamat siang, kami dari perusahaan manufaktur dengan 500 karyawan. Apakah platform Onebox Omnichannel CiptadraSoft bisa diintegrasikan dengan SAP ERP kami yang berjalan on-premise?',
    createdAt: Date.now() - 140 * 60 * 1000,
    updatedAt: Date.now() - 40 * 60 * 1000,
    status: 'open',
    classification: {
      category: 'Product Inquiry',
      priority: 'Medium',
      department: 'Solutions Architecture',
      slaHours: 8,
      sentiment: 'Positive',
      urgencyScore: 38,
      summary: 'Konsultasi integrasi Onebox Omnichannel dengan SAP ERP On-Premise 500 user.',
      reasoning: 'Inquiry ekspansi solusi enterprise manufaktur potensial untuk integrasi middleware.',
      confidenceScore: 0.94
    },
    assignedAgent: 'Fahmi Reza (Solutions Architect)',
    messages: [
      {
        id: 'm1_t4',
        sender: 'customer',
        senderName: 'Dewi Lestari',
        content:
          'Selamat siang, kami dari perusahaan manufaktur dengan 500 karyawan. Apakah platform Onebox Omnichannel CiptadraSoft bisa diintegrasikan dengan SAP ERP kami yang berjalan on-premise?',
        timestamp: Date.now() - 140 * 60 * 1000
      }
    ]
  }
];

// Customer 360 Initial Profile
export const MOCK_CUSTOMER_360: CustomerProfile360 = {
  id: 'cust-mega-solusi',
  name: 'Budi Santoso',
  company: 'PT Mega Solusi Nusantara',
  email: 'budi.santoso@megasolusi.co.id',
  phone: '+62 812-3456-7890',
  slaTier: 'Gold',
  activeSince: 'Maret 2023 (1.5 Tahun)',
  totalTickets: 18,
  resolvedRate: 94.4,
  averageCsat: 4.8,
  sentimentTrend: 'Positive',
  productsInUse: [
    'Onebox CRM (50 Agen)',
    'Onebox Contact Center Omnichannel',
    'Ciptadra Flow BPM Engine'
  ],
  recentTouchpoints: [
    {
      id: 'tp-01',
      channel: 'WhatsApp',
      timestamp: Date.now() - 14 * 60 * 1000,
      summary: 'Kendala aktivasi akun pasca BCA VA untuk tender penting.',
      agentName: 'Rian Pratama',
      status: 'open'
    },
    {
      id: 'tp-02',
      channel: 'Email',
      timestamp: Date.now() - 12 * 86400 * 1000,
      summary: 'Permintaan penambahan 10 lisensi agen WhatsApp Business API.',
      agentName: 'Siska Amanda',
      status: 'resolved'
    },
    {
      id: 'tp-03',
      channel: 'Webchat',
      timestamp: Date.now() - 45 * 86400 * 1000,
      summary: 'Konfigurasi webhook routing leads tender dari landing page.',
      agentName: 'Fahmi Reza',
      status: 'resolved'
    }
  ],
  aiInsights: {
    churnRisk: 'Low',
    recommendedNextStep:
      'Aktifkan auto-reconciliation webhook BCA VA untuk mencegah terulangnya delay notifikasi saat renewal tahunan.',
    recurringIssuePatterns: [
      'Transaksi bank via VA menjelang deadline jam kerja',
      'Peningkatan volume tiket pada akhir kuartal (tender season)'
    ]
  }
};

// Operations Dashboard Initial Metrics
export const MOCK_DASHBOARD_METRICS = {
  totalTickets: 1428,
  openTickets: 24,
  resolvedToday: 182,
  urgentTickets: 3,
  slaComplianceRate: 96.4,
  aiClassificationAccuracy: 94.2,
  averageResolutionMinutes: 19.5,
  channelDistribution: [
    { channel: 'WhatsApp', count: 771, percentage: 54, color: '#10b981' },
    { channel: 'Webchat', count: 400, percentage: 28, color: '#3b82f6' },
    { channel: 'Email', count: 257, percentage: 18, color: '#8b5cf6' }
  ],
  categoryBreakdown: [
    { category: 'Billing & Payment', count: 456, percentage: 32 },
    { category: 'Technical Support', count: 399, percentage: 28 },
    { category: 'Account & Access', count: 271, percentage: 19 },
    { category: 'Product Inquiry', count: 200, percentage: 14 },
    { category: 'Complaint / Escalation', count: 102, percentage: 7 }
  ],
  priorityBreakdown: [
    { priority: 'Urgent', count: 43, color: '#ef4444' },
    { priority: 'High', count: 285, color: '#f97316' },
    { priority: 'Medium', count: 742, color: '#3b82f6' },
    { priority: 'Low', count: 358, color: '#64748b' }
  ]
};

// =========================================================================
// ONEBOX OMNICHANNEL CONVERSATIONS DATASET (16 Omnichannel Conversations)
// =========================================================================

export const OMNICHANNEL_CONVERSATIONS: OmnichannelConversation[] = [
  // --- CASE A: AI AUTO-ANSWERED (No Human CS required) ---
  {
    id: 'conv-101',
    conversationCode: 'OBX-101',
    channel: 'WhatsApp',
    customer: {
      name: 'Lisa Humairoh',
      handleOrPhone: '+62 812-9988-1122',
      company: 'CV Niaga Mandiri',
      slaTier: 'Silver',
      email: 'lisa@niagamandiri.id'
    },
    subject: 'Tanya Paket Onebox CRM Starter & Professional',
    snippet: 'Halo, kami ingin tanya perbedaan paket Onebox CRM Starter vs Professional dan biaya lisensi per agen...',
    category: 'Product Inquiry',
    status: 'ai_answered',
    isAiAnswered: true,
    aiConfidence: 0.98,
    aiSource: 'Onebox Official Pricing & Packaging KB',
    createdAt: Date.now() - 32 * 60 * 1000,
    updatedAt: Date.now() - 32 * 60 * 1000,
    responseTimeMin: 0.03, // 1.8 seconds
    timeToResponseLabel: '1.8s (Instant AI)',
    slaStatus: 'on_track',
    messages: [
      {
        id: 'msg-101-1',
        sender: 'customer',
        senderName: 'Lisa Humairoh',
        content: 'Halo selamat siang, kami ingin tanya perbedaan paket Onebox CRM Starter vs Professional dan biaya lisensi per agen bulanan. Apakah ada free trial?',
        timestamp: Date.now() - 32 * 60 * 1000
      },
      {
        id: 'msg-101-2',
        sender: 'ai',
        senderName: 'Ciptadra AI Agent (Auto-Answer)',
        content: 'Halo Ibu Lisa! Terima kasih telah menghubungi CiptadraSoft & Onebox CRM. Berikut ringkasan perbedaan paket:\n\n• Onebox CRM Starter: Cocok untuk tim hingga 10 agen, mencakup multichannel WhatsApp & Webchat, SLA routing dasar, dan ticketing standard.\n• Onebox CRM Professional: Mendukung unlimited agen, integrasi 9 kanal omnichannel lengkap (WhatsApp, IG, FB, X, TikTok, Email, PBX, Webchat, Reviews), AI Ticket Classification, dan SLA Automation.\n• Free Trial: Kami menyediakan Sandbox 14 hari gratis tanpa komitmen kartu kredit.\n\nApakah Ibu Lisa berkenan dijadwalkan demo singkat 15 menit dengan spesialis solusi kami?',
        timestamp: Date.now() - 32 * 60 * 1000 + 1800,
        isAiResponse: true,
        aiConfidence: 0.98,
        aiSource: 'Onebox Official Pricing & Packaging KB'
      }
    ]
  },
  {
    id: 'conv-102',
    conversationCode: 'OBX-102',
    channel: 'Instagram',
    customer: {
      name: 'Rian Tech Venture',
      handleOrPhone: '@techstartup.id',
      company: 'TechStartup Indonesia',
      slaTier: 'Standard',
      email: 'hello@techstartup.id'
    },
    subject: 'Webhook Database Postgres On-Premise',
    snippet: 'Apakah Onebox Omnichannel menyediakan webhook ke PostgreSQL on-premise untuk sync leads?',
    category: 'Product Inquiry',
    status: 'ai_answered',
    isAiAnswered: true,
    aiConfidence: 0.97,
    aiSource: 'Ciptadra Enterprise Middleware Architecture KB',
    createdAt: Date.now() - 54 * 60 * 1000,
    updatedAt: Date.now() - 54 * 60 * 1000,
    responseTimeMin: 0.04,
    timeToResponseLabel: '2.4s (Instant AI)',
    slaStatus: 'on_track',
    messages: [
      {
        id: 'msg-102-1',
        sender: 'customer',
        senderName: '@techstartup.id',
        content: 'Kak, apakah Onebox Omnichannel menyediakan webhook ke PostgreSQL on-premise kami untuk sinkronisasi kontak dan leads otomatis?',
        timestamp: Date.now() - 54 * 60 * 1000
      },
      {
        id: 'msg-102-2',
        sender: 'ai',
        senderName: 'Ciptadra AI Agent (Auto-Answer)',
        content: 'Halo tim @techstartup.id! Ya, platform Onebox menyediakan Webhook Event Bus dan REST API terenkripsi mTLS yang dapat dikonfigurasi untuk mengirim event leads & percakapan secara real-time ke database PostgreSQL on-premise Anda via API gateway atau Ciptadra Flow ESB. Dokumentasi Swagger & Webhook Sandbox dapat diakses melalui portal developer kami di ciptadrasoft.com/developer.',
        timestamp: Date.now() - 54 * 60 * 1000 + 2400,
        isAiResponse: true,
        aiConfidence: 0.97,
        aiSource: 'Ciptadra Enterprise Middleware Architecture KB'
      }
    ]
  },
  {
    id: 'conv-103',
    conversationCode: 'OBX-103',
    channel: 'GoogleReviews',
    customer: {
      name: 'Hendra Gunawan',
      handleOrPhone: 'Hendra Gunawan (Google Local Guide)',
      company: 'PT Sentra Finansial',
      slaTier: 'Gold'
    },
    subject: 'Ulasan Migrasi PBX ke Onebox Cloud Contact Center',
    snippet: 'Sangat puas dengan proses migrasi telephony PBX ke Onebox Cloud, downtime nol...',
    category: 'General Information',
    status: 'ai_answered',
    isAiAnswered: true,
    aiConfidence: 0.99,
    aiSource: 'Corporate Public Relations & CS Guidelines',
    createdAt: Date.now() - 85 * 60 * 1000,
    updatedAt: Date.now() - 85 * 60 * 1000,
    responseTimeMin: 0.02,
    timeToResponseLabel: '1.2s (Instant AI)',
    slaStatus: 'on_track',
    messages: [
      {
        id: 'msg-103-1',
        sender: 'customer',
        senderName: 'Hendra Gunawan',
        content: '⭐⭐⭐⭐⭐ Sangat puas dengan proses migrasi telephony PBX konvensional ke Onebox Cloud Contact Center. Zero downtime dan 80 agen kami langsung lancar terima call. Terima kasih tim CiptadraSoft!',
        timestamp: Date.now() - 85 * 60 * 1000
      },
      {
        id: 'msg-103-2',
        sender: 'ai',
        senderName: 'Ciptadra AI Agent (Auto-Answer)',
        content: 'Terima kasih banyak atas ulasan bintang 5 dan kepercayaannya, Bapak Hendra Gunawan! Tim CiptadraSoft & Onebox bangga dapat mendukung kelancaran operasional contact center PT Sentra Finansial. Kami berkomitmen menjaga SLA 99.9% dan terus menghadirkan inovasi AI Customer Service terbaik untuk perusahaan Anda.',
        timestamp: Date.now() - 85 * 60 * 1000 + 1200,
        isAiResponse: true,
        aiConfidence: 0.99,
        aiSource: 'Corporate Public Relations & CS Guidelines'
      }
    ]
  },
  {
    id: 'conv-104',
    conversationCode: 'OBX-104',
    channel: 'TikTok',
    customer: {
      name: 'Kreatif Media Agency',
      handleOrPhone: '@kreatif_agency',
      company: 'Kreatif Media Group',
      slaTier: 'Standard'
    },
    subject: 'Panduan WhatsApp Business API di Onebox',
    snippet: 'Ada panduan resmi cara menghubungkan WhatsApp Business API centang hijau di Onebox?',
    category: 'General Information',
    status: 'ai_answered',
    isAiAnswered: true,
    aiConfidence: 0.96,
    aiSource: 'Onebox WABA Integration SOP',
    createdAt: Date.now() - 110 * 60 * 1000,
    updatedAt: Date.now() - 110 * 60 * 1000,
    responseTimeMin: 0.03,
    timeToResponseLabel: '1.9s (Instant AI)',
    slaStatus: 'on_track',
    messages: [
      {
        id: 'msg-104-1',
        sender: 'customer',
        senderName: '@kreatif_agency',
        content: 'Halo min, ada tutorial atau panduan resmi cara pasang WhatsApp Business API centang hijau di Onebox dashboard?',
        timestamp: Date.now() - 110 * 60 * 1000
      },
      {
        id: 'msg-104-2',
        sender: 'ai',
        senderName: 'Ciptadra AI Agent (Auto-Answer)',
        content: 'Halo @kreatif_agency! Untuk registrasi WhatsApp Business API (Official Green Tick) di Onebox:\n1. Siapkan Facebook Business Manager yang terverifikasi.\n2. Buka menu Settings > Channels > WhatsApp Business API di portal Onebox.\n3. Masukkan ID BM dan ajukan nomor telepon operasional Anda.\nTim Onboarding Onebox akan memverifikasi dan menerbitkan template pesan resmi dalam 1-2 hari kerja.',
        timestamp: Date.now() - 110 * 60 * 1000 + 1900,
        isAiResponse: true,
        aiConfidence: 0.96,
        aiSource: 'Onebox WABA Integration SOP'
      }
    ]
  },
  {
    id: 'conv-105',
    conversationCode: 'OBX-105',
    channel: 'Webchat',
    customer: {
      name: 'Nusantara Media Corp',
      handleOrPhone: 'Visitor-8832',
      company: 'PT Nusantara Media Corp',
      slaTier: 'Gold',
      email: 'it@nusantaramedia.co.id'
    },
    subject: 'Timeline SLA Implementasi Ciptadra Flow BPM',
    snippet: 'Berapa rata-rata durasi implementasi dan migrasi approval workflow ke Ciptadra Flow BPM?',
    category: 'Product Inquiry',
    status: 'ai_answered',
    isAiAnswered: true,
    aiConfidence: 0.98,
    aiSource: 'Ciptadra Enterprise Services Scope & SLA',
    createdAt: Date.now() - 140 * 60 * 1000,
    updatedAt: Date.now() - 140 * 60 * 1000,
    responseTimeMin: 0.03,
    timeToResponseLabel: '1.6s (Instant AI)',
    slaStatus: 'on_track',
    messages: [
      {
        id: 'msg-105-1',
        sender: 'customer',
        senderName: 'Visitor-8832',
        content: 'Selamat sore, kami dari media enterprise dengan 1500 karyawan. Berapa rata-rata timeline implementasi migrasi workflow approval ke Ciptadra Flow BPM?',
        timestamp: Date.now() - 140 * 60 * 1000
      },
      {
        id: 'msg-105-2',
        sender: 'ai',
        senderName: 'Ciptadra AI Agent (Auto-Answer)',
        content: 'Selamat sore! Rata-rata timeline implementasi Ciptadra Flow BPM untuk skala enterprise (1000+ user) adalah 2 hingga 4 minggu kalender. Tahapan meliputi:\n1. Discovery & Pemetaan Matriks Approval (Minggu 1)\n2. Konfigurasi Visual BPMN 2.0 & Integrasi SSO/LDAP (Minggu 2)\n3. UAT, Migrasi Data & Integrasi Core ERP/SAP (Minggu 3)\n4. Go-Live & Hypercare Support 24/7 (Minggu 4).\nArsitektur kami modular sehingga tidak memerlukan penghentian sistem yang berjalan.',
        timestamp: Date.now() - 140 * 60 * 1000 + 1600,
        isAiResponse: true,
        aiConfidence: 0.98,
        aiSource: 'Ciptadra Enterprise Services Scope & SLA'
      }
    ]
  },

  // --- CASE B: COMPLEX ISSUES ESCALATED TO HUMAN CS QUEUE ---
  {
    id: 'conv-201',
    conversationCode: 'OBX-201',
    channel: 'WhatsApp',
    customer: {
      name: 'Budi Santoso',
      handleOrPhone: '+62 812-3456-7890',
      company: 'PT Mega Solusi Nusantara',
      slaTier: 'Enterprise Platinum',
      email: 'budi.santoso@megasolusi.co.id'
    },
    subject: 'Akun Terblokir Pasca BCA VA — Tender Penting Siang Ini',
    snippet: 'Halo, saya sudah bayar langganan Onebox CRM via BCA Virtual Account tadi pagi pukul 09:15 sebesar Rp 4.500.000...',
    category: 'Billing & Payment',
    status: 'open',
    isAiAnswered: false,
    ticketId: 'TKT-8402',
    assignedAgent: {
      id: 'agent-cs-b',
      name: 'Siti Rahmawati',
      code: 'CS B',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 18 * 60 * 1000,
    updatedAt: Date.now() - 4 * 60 * 1000,
    responseTimeMin: 3.5,
    timeToResponseLabel: '14 min left (SLA Urgent)',
    slaStatus: 'warning',
    classification: {
      category: 'Billing & Payment',
      priority: 'Urgent',
      department: 'Finance & Billing',
      slaHours: 2,
      sentiment: 'Frustrated',
      urgencyScore: 92,
      summary: 'Akun terblokir pasca transaksi BCA VA, tim sales tertahan tender penting.',
      reasoning: 'Keterlambatan notifikasi pembayaran berdampak langsung pada operasional tender klien enterprise.',
      confidenceScore: 0.96
    },
    messages: [
      {
        id: 'msg-201-1',
        sender: 'customer',
        senderName: 'Budi Santoso',
        content: 'Halo, saya sudah bayar langganan Onebox CRM via BCA Virtual Account tadi pagi pukul 09:15 sebesar Rp 4.500.000, tapi akun perusahaan kami masih terblokir dan tim sales tidak bisa input prospek hari ini. Tolong segera diaktifkan karena ada tender penting siang ini!',
        timestamp: Date.now() - 18 * 60 * 1000
      },
      {
        id: 'msg-201-2',
        sender: 'system',
        senderName: 'Ciptadra AI Triage Engine',
        content: '⚠️ AI Decision Gate: Kasus terdeteksi sebagai Billing & Payment Urgent (Urgensi 92%). Tiket #TKT-8402 otomatis dibuat. Mengalihkan percakapan ke Customer Service queue (Siti Rahmawati - CS B).',
        timestamp: Date.now() - 18 * 60 * 1000 + 2000
      },
      {
        id: 'msg-201-3',
        sender: 'ai',
        senderName: 'Ciptadra AI Assistant',
        content: 'Mohon maaf atas ketidaknyamanan ini, Bapak Budi. Kami memahami pentingnya proses tender Anda hari ini. Pesan Anda telah kami eskalasikan dengan prioritas URGENT ke Customer Service Spesialis Keuangan kami (Siti Rahmawati) yang sedang memverifikasi mutasi BCA VA Anda sekarang.',
        timestamp: Date.now() - 18 * 60 * 1000 + 3500
      }
    ]
  },
  {
    id: 'conv-202',
    conversationCode: 'OBX-202',
    channel: 'Webchat',
    customer: {
      name: 'Siti Rahmawati',
      handleOrPhone: 'siti.rahma@bankdigital.id',
      company: 'Bank Digital Bersama',
      slaTier: 'Enterprise Platinum',
      email: 'siti.rahma@bankdigital.id'
    },
    subject: 'SIP 503 WebRTC Service Unavailable pada 20 Agen Call Center',
    snippet: 'Tim call center kami mendadak tidak bisa menerima panggilan masuk lewat WebRTC Onebox Contact Center sejak 15 menit lalu...',
    category: 'Technical Support',
    status: 'escalated',
    isAiAnswered: false,
    ticketId: 'TKT-8403',
    assignedAgent: {
      id: 'agent-cs-a',
      name: 'Andi Wijaya',
      code: 'CS A',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 25 * 60 * 1000,
    updatedAt: Date.now() - 8 * 60 * 1000,
    responseTimeMin: 5.2,
    timeToResponseLabel: '35 min left (SLA 1h)',
    slaStatus: 'warning',
    classification: {
      category: 'Technical Support',
      priority: 'Urgent',
      department: 'Core Engineering',
      slaHours: 1,
      sentiment: 'Urgent',
      urgencyScore: 97,
      summary: 'Error SIP 503 WebRTC melumpuhkan 20 agen inbound call center perbankan.',
      reasoning: 'Gangguan telephony langsung pada 20 agen live melanggar SLA ketersediaan 99.9% industri perbankan.',
      confidenceScore: 0.98
    },
    messages: [
      {
        id: 'msg-202-1',
        sender: 'customer',
        senderName: 'Siti Rahmawati (Head of Contact Center)',
        content: 'Tim call center kami mendadak tidak bisa menerima panggilan masuk lewat WebRTC Onebox Contact Center sejak 15 menit lalu. Muncul error SIP 503 Service Unavailable di dashboard 20 agen kami. Ini sangat kritis untuk nasabah perbankan kami!',
        timestamp: Date.now() - 25 * 60 * 1000
      },
      {
        id: 'msg-202-2',
        sender: 'system',
        senderName: 'Ciptadra AI Triage Engine',
        content: '🚨 AI Decision Gate: Gangguan Kritis Telephony (SIP 503 Outage, Urgensi 97%). Tiket #TKT-8403 dibuat. Mengaktifkan SLA Darurat 1 Jam dan merouting ke Senior Technical CS (Andi Wijaya - CS A).',
        timestamp: Date.now() - 25 * 60 * 1000 + 1500
      },
      {
        id: 'msg-202-3',
        sender: 'ai',
        senderName: 'Ciptadra AI Assistant',
        content: 'Selamat siang Ibu Siti Rahmawati. Sistem kami mendeteksi laporan insiden telephony kritis ini. Tiket #TKT-8403 dengan SLA 1 Jam telah di-assign ke Senior Technical Specialist kami (Andi Wijaya) serta tim Network Operations Center.',
        timestamp: Date.now() - 25 * 60 * 1000 + 2500
      }
    ]
  },
  {
    id: 'conv-203',
    conversationCode: 'OBX-203',
    channel: 'Email',
    customer: {
      name: 'Hendro Wijaya',
      handleOrPhone: 'hendro@logistikprima.com',
      company: 'PT Logistik Prima Express',
      slaTier: 'Gold',
      email: 'hendro@logistikprima.com'
    },
    subject: 'Permintaan Terminasi Kontrak Tahunan & Refund Deposit',
    snippet: 'Saya ingin membatalkan perpanjangan kontrak tahunan Ciptadra Flow BPM dan refund deposit karena migrasi...',
    category: 'Complaint / Escalation',
    status: 'in_progress',
    isAiAnswered: false,
    ticketId: 'TKT-8404',
    assignedAgent: {
      id: 'agent-cs-d',
      name: 'Dewi Lestari',
      code: 'CS D',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 95 * 60 * 1000,
    updatedAt: Date.now() - 15 * 60 * 1000,
    responseTimeMin: 8.0,
    timeToResponseLabel: '2h 15m left (SLA 4h)',
    slaStatus: 'on_track',
    classification: {
      category: 'Complaint / Escalation',
      priority: 'High',
      department: 'Customer Success',
      slaHours: 4,
      sentiment: 'Frustrated',
      urgencyScore: 84,
      summary: 'Permintaan pembatalan kontrak tahunan Flow BPM dan refund deposit sebelum auto-renewal.',
      reasoning: 'Risiko churn akun enterprise dengan tenggat waktu auto-renewal besok pagi.',
      confidenceScore: 0.93
    },
    messages: [
      {
        id: 'msg-203-1',
        sender: 'customer',
        senderName: 'Hendro Wijaya (Procurement Director)',
        content: 'Saya ingin membatalkan perpanjangan kontrak tahunan Ciptadra Flow BPM dan refund deposit karena migrasi internal manajemen, mohon diproses hari ini sebelum jatuh tempo otomatis besok pagi.',
        timestamp: Date.now() - 95 * 60 * 1000
      },
      {
        id: 'msg-203-2',
        sender: 'system',
        senderName: 'Ciptadra AI Triage Engine',
        content: '⚠️ AI Decision Gate: Permintaan Churn / Terminasi Kontrak. Tiket #TKT-8404 dibuat dan dialokasikan ke Senior Retention & Customer Success Lead (Dewi Lestari - CS D).',
        timestamp: Date.now() - 95 * 60 * 1000 + 1200
      }
    ]
  },
  {
    id: 'conv-204',
    conversationCode: 'OBX-204',
    channel: 'Twitter',
    customer: {
      name: 'Rizky Finansia',
      handleOrPhone: '@rizky_fintech',
      company: 'PT Finansia Digital',
      slaTier: 'Gold',
      email: 'support@finansiadigital.co.id'
    },
    subject: 'Batch Transfer Payroll Error 504 Gateway Timeout',
    snippet: 'DM: Min tolong cek batch transfer payroll via ESB gateway error response 504 sejak 20 menit lalu...',
    category: 'Technical Support',
    status: 'open',
    isAiAnswered: false,
    ticketId: 'TKT-8406',
    assignedAgent: {
      id: 'agent-cs-a',
      name: 'Andi Wijaya',
      code: 'CS A',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 40 * 60 * 1000,
    updatedAt: Date.now() - 10 * 60 * 1000,
    responseTimeMin: 4.1,
    timeToResponseLabel: '1h 20m left (SLA 2h)',
    slaStatus: 'on_track',
    classification: {
      category: 'Technical Support',
      priority: 'High',
      department: 'Core Engineering',
      slaHours: 2,
      sentiment: 'Frustrated',
      urgencyScore: 86,
      summary: 'Batch payroll ESB gateway error 504 saat proses transfer gaji bulanan.',
      reasoning: 'Gangguan API middleware perbankan berdampak pada ribuan karyawan klien.',
      confidenceScore: 0.95
    },
    messages: [
      {
        id: 'msg-204-1',
        sender: 'customer',
        senderName: '@rizky_fintech',
        content: 'Min tolong cek batch transfer payroll via ESB gateway error response 504 sejak 20 menit lalu. Kami sedang run transfer gaji akhir bulan untuk 2.400 pegawai!',
        timestamp: Date.now() - 40 * 60 * 1000
      },
      {
        id: 'msg-204-2',
        sender: 'system',
        senderName: 'Ciptadra AI Triage Engine',
        content: 'AI Classified: Technical Support [High] -> Routed to CS A (Andi Wijaya).',
        timestamp: Date.now() - 40 * 60 * 1000 + 1100
      }
    ]
  },
  {
    id: 'conv-205',
    conversationCode: 'OBX-205',
    channel: 'Facebook',
    customer: {
      name: 'Dian Anggraeni',
      handleOrPhone: 'Dian Anggraeni (CV Surya Logistik)',
      company: 'CV Surya Logistik',
      slaTier: 'Silver'
    },
    subject: 'Approval Matrix Flow BPM Tidak Jalan ke Direktur Keuangan',
    snippet: 'Selamat siang, PO pengadaan truk kami tersangkut di sistem Flow BPM, tidak muncul di inbox approval direksi...',
    category: 'Technical Support',
    status: 'open',
    isAiAnswered: false,
    ticketId: 'TKT-8407',
    assignedAgent: {
      id: 'agent-cs-e',
      name: 'Rian Ardiansyah',
      code: 'CS E',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 55 * 60 * 1000,
    updatedAt: Date.now() - 20 * 60 * 1000,
    responseTimeMin: 6.2,
    timeToResponseLabel: '3h 05m left (SLA 4h)',
    slaStatus: 'on_track',
    classification: {
      category: 'Technical Support',
      priority: 'Medium',
      department: 'Solutions Architecture',
      slaHours: 4,
      sentiment: 'Neutral',
      urgencyScore: 62,
      summary: 'PO tersangkut pada workflow approval matrix Flow BPM.',
      reasoning: 'Konfigurasi delegasi user approval perlu di-refresh di modul BPMN.',
      confidenceScore: 0.91
    },
    messages: [
      {
        id: 'msg-205-1',
        sender: 'customer',
        senderName: 'Dian Anggraeni',
        content: 'Selamat siang, pengajuan PO pembelian suku cadang armada kami tersangkut di sistem Ciptadra Flow BPM. Status menunjukkan pending approval tapi tidak muncul di inbox Direktur Keuangan kami. Mohon bantuannya.',
        timestamp: Date.now() - 55 * 60 * 1000
      }
    ]
  },
  {
    id: 'conv-206',
    conversationCode: 'OBX-206',
    channel: 'Phone',
    customer: {
      name: 'Ahmad Subarjo',
      handleOrPhone: '+62 21-5290-8800',
      company: 'PT Mandiri Graha Utama',
      slaTier: 'Enterprise Platinum'
    },
    subject: 'Call Center Audio: Hunting Line PBX Sibuk Terus',
    snippet: '[Audio Call Transcript] Panggilan masuk pelanggan ke hunting line 021-5290xxxx nada sibuk sejak jam 13:00...',
    category: 'Technical Support',
    status: 'open',
    isAiAnswered: false,
    ticketId: 'TKT-8408',
    assignedAgent: {
      id: 'agent-cs-a',
      name: 'Andi Wijaya',
      code: 'CS A',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 22 * 60 * 1000,
    updatedAt: Date.now() - 5 * 60 * 1000,
    responseTimeMin: 2.1,
    timeToResponseLabel: '38 min left (SLA 1h)',
    slaStatus: 'warning',
    classification: {
      category: 'Technical Support',
      priority: 'Urgent',
      department: 'Core Engineering',
      slaHours: 1,
      sentiment: 'Urgent',
      urgencyScore: 94,
      summary: 'Hunting line PBX analog/SIP mengalami loop busy signal.',
      reasoning: 'Panggilan inbound customer terputus total memerlukan trunk failover.',
      confidenceScore: 0.96
    },
    messages: [
      {
        id: 'msg-206-1',
        sender: 'customer',
        senderName: 'Ahmad Subarjo (IT Manager)',
        content: '[Transkrip Panggilan Call Center]: Halo, saya Ahmad dari Mandiri Graha. Hunting line utama kami 021-5290xxxx tiba-tiba bernada sibuk terus untuk semua penelepon sejak jam 13:00. Tolong switch ke SIP trunk backup segera!',
        timestamp: Date.now() - 22 * 60 * 1000
      }
    ]
  },
  {
    id: 'conv-207',
    conversationCode: 'OBX-207',
    channel: 'Instagram',
    customer: {
      name: 'Citra Fashion Official',
      handleOrPhone: '@citra_fashion',
      company: 'Citra Retail Nusantara',
      slaTier: 'Silver'
    },
    subject: 'Akun Supervisor Sales Terkunci Pasca Salah Password',
    snippet: 'DM: Halo min, akun supervisor CS kami terkunci karena salah ketik password 3x, tolong di-resetkan...',
    category: 'Account & Access',
    status: 'open',
    isAiAnswered: false,
    ticketId: 'TKT-8409',
    assignedAgent: {
      id: 'agent-cs-c',
      name: 'Budi Pratama',
      code: 'CS C',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 65 * 60 * 1000,
    updatedAt: Date.now() - 25 * 60 * 1000,
    responseTimeMin: 1.8,
    timeToResponseLabel: '1h 55m left (SLA 3h)',
    slaStatus: 'on_track',
    classification: {
      category: 'Account & Access',
      priority: 'Medium',
      department: 'IT Security',
      slaHours: 3,
      sentiment: 'Neutral',
      urgencyScore: 50,
      summary: 'Reset lockout policy akun supervisor.',
      reasoning: 'Verifikasi keamanan identitas akun sebelum unlock credential.',
      confidenceScore: 0.98
    },
    messages: [
      {
        id: 'msg-207-1',
        sender: 'customer',
        senderName: '@citra_fashion',
        content: 'Halo min, akun supervisor CS kami (citra.admin@citrafashion.co.id) terkunci karena staf salah input password 3x tadi pagi. Mohon bantuan unlock dan kirim link reset password ya min.',
        timestamp: Date.now() - 65 * 60 * 1000
      }
    ]
  },
  {
    id: 'conv-208',
    conversationCode: 'OBX-208',
    channel: 'WhatsApp',
    customer: {
      name: 'Kevin Sanjaya',
      handleOrPhone: '+62 818-0992-3344',
      company: 'PT Finnet Payment',
      slaTier: 'Gold'
    },
    subject: 'Webhook Callback Sandbox Gagal Terkirim',
    snippet: 'Tim dev kami sedang tes integrasi REST API Onebox di environment sandbox, webhook callback tidak tembus...',
    category: 'Technical Support',
    status: 'open',
    isAiAnswered: false,
    ticketId: 'TKT-8410',
    assignedAgent: {
      id: 'agent-cs-a',
      name: 'Andi Wijaya',
      code: 'CS A',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 75 * 60 * 1000,
    updatedAt: Date.now() - 30 * 60 * 1000,
    responseTimeMin: 4.8,
    timeToResponseLabel: '2h 45m left (SLA 4h)',
    slaStatus: 'on_track',
    classification: {
      category: 'Technical Support',
      priority: 'Medium',
      department: 'Solutions Architecture',
      slaHours: 4,
      sentiment: 'Neutral',
      urgencyScore: 58,
      summary: 'Konfigurasi SSL cert handshake pada webhook sandbox.',
      reasoning: 'Payload webhook terblokir sertifikat SSL self-signed klien di sandbox.',
      confidenceScore: 0.93
    },
    messages: [
      {
        id: 'msg-208-1',
        sender: 'customer',
        senderName: 'Kevin Sanjaya (Lead Backend)',
        content: 'Tim dev kami sedang menguji integrasi REST API Onebox di sandbox, tapi event webhook callback tidak tembus ke endpoint staging kami. Mohon dicek outbound IP whitelist Onebox.',
        timestamp: Date.now() - 75 * 60 * 1000
      }
    ]
  },
  {
    id: 'conv-209',
    conversationCode: 'OBX-209',
    channel: 'Email',
    customer: {
      name: 'PT Sejahtera Makmur',
      handleOrPhone: 'procurement@sejahteramakmur.com',
      company: 'PT Sejahtera Makmur',
      slaTier: 'Gold'
    },
    subject: 'Request Penambahan 15 User License Onebox CRM',
    snippet: 'Bersama email ini kami bermaksud mengajukan purchase order tambahan 15 lisensi agen Onebox CRM...',
    category: 'Product Inquiry',
    status: 'resolved',
    isAiAnswered: false,
    ticketId: 'TKT-8411',
    assignedAgent: {
      id: 'agent-cs-c',
      name: 'Budi Pratama',
      code: 'CS C',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 180 * 60 * 1000,
    updatedAt: Date.now() - 60 * 60 * 1000,
    responseTimeMin: 1.5,
    timeToResponseLabel: 'Selesai (24m)',
    slaStatus: 'on_track',
    classification: {
      category: 'Product Inquiry',
      priority: 'Low',
      department: 'Solutions Architecture',
      slaHours: 8,
      sentiment: 'Positive',
      urgencyScore: 35,
      summary: 'PO penambahan 15 lisensi agen Onebox CRM.',
      reasoning: 'Peluang add-on lisensi enterprise ditutup dengan penerbitan quotation resmi.',
      confidenceScore: 0.97
    },
    messages: [
      {
        id: 'msg-209-1',
        sender: 'customer',
        senderName: 'PT Sejahtera Makmur',
        content: 'Selamat pagi, mohon dikirimkan form penambahan 15 lisensi agen Onebox CRM untuk cabang Surabaya.',
        timestamp: Date.now() - 180 * 60 * 1000
      },
      {
        id: 'msg-209-2',
        sender: 'agent',
        senderName: 'Budi Pratama (CS C)',
        content: 'Selamat pagi tim PT Sejahtera Makmur, form penambahan lisensi dan quotation resmi #QT-2026-089 telah kami kirimkan ke email procurement Anda. Lisensi akan aktif otomatis begitu PO approval diunggah.',
        timestamp: Date.now() - 175 * 60 * 1000
      }
    ]
  },
  {
    id: 'conv-210',
    conversationCode: 'OBX-210',
    channel: 'Webchat',
    customer: {
      name: 'Dr. Firman Santoso',
      handleOrPhone: 'firman@kliniksehat.id',
      company: 'Klinik Sehat Bersama',
      slaTier: 'Silver'
    },
    subject: 'Cara Export Data Rekam Pasien ke CSV',
    snippet: 'Bagaimana cara filter dan export riwayat konsultasi pasien bulan lalu ke file CSV atau Excel?',
    category: 'General Information',
    status: 'resolved',
    isAiAnswered: false,
    ticketId: 'TKT-8412',
    assignedAgent: {
      id: 'agent-cs-b',
      name: 'Siti Rahmawati',
      code: 'CS B',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 210 * 60 * 1000,
    updatedAt: Date.now() - 150 * 60 * 1000,
    responseTimeMin: 2.0,
    timeToResponseLabel: 'Selesai (18m)',
    slaStatus: 'on_track',
    classification: {
      category: 'General Information',
      priority: 'Low',
      department: 'Support Operations',
      slaHours: 6,
      sentiment: 'Positive',
      urgencyScore: 28,
      summary: 'Panduan ekspor data CSV laporan.',
      reasoning: 'Pertanyaan operasional solved via panduan menu Reporting Onebox.',
      confidenceScore: 0.99
    },
    messages: [
      {
        id: 'msg-210-1',
        sender: 'customer',
        senderName: 'Dr. Firman Santoso',
        content: 'Halo CS, bagaimana cara export riwayat chat konsultasi telemedicine pasien bulan lalu ke spreadsheet Excel?',
        timestamp: Date.now() - 210 * 60 * 1000
      },
      {
        id: 'msg-210-2',
        sender: 'agent',
        senderName: 'Siti Rahmawati (CS B)',
        content: 'Halo Dokter Firman, silakan buka menu Analytics > Reports > Chat Logs, tentukan rentang tanggal 1 - 31 Agustus, lalu klik tombol "Export to CSV/Excel" di pojok kanan atas.',
        timestamp: Date.now() - 200 * 60 * 1000
      }
    ]
  },
  {
    id: 'conv-211',
    conversationCode: 'OBX-211',
    channel: 'GoogleReviews',
    customer: {
      name: 'Reviewer Bisnis',
      handleOrPhone: 'Reviewer Anonim',
      company: 'Pengguna Onebox',
      slaTier: 'Standard'
    },
    subject: 'Ulasan Kecepatan Respon Weekend',
    snippet: '⭐⭐⭐ Fitur bagus tapi kalau sabtu minggu respon CS agak lama...',
    category: 'Complaint / Escalation',
    status: 'resolved',
    isAiAnswered: false,
    ticketId: 'TKT-8413',
    assignedAgent: {
      id: 'agent-cs-d',
      name: 'Dewi Lestari',
      code: 'CS D',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    createdAt: Date.now() - 300 * 60 * 1000,
    updatedAt: Date.now() - 240 * 60 * 1000,
    responseTimeMin: 4.5,
    timeToResponseLabel: 'Selesai (32m)',
    slaStatus: 'on_track',
    classification: {
      category: 'Complaint / Escalation',
      priority: 'Medium',
      department: 'Customer Success',
      slaHours: 4,
      sentiment: 'Neutral',
      urgencyScore: 45,
      summary: 'Feedback coverage CS weekend.',
      reasoning: 'Respon publik profesional dengan info perluasan jadwal shift 24/7.',
      confidenceScore: 0.94
    },
    messages: [
      {
        id: 'msg-211-1',
        sender: 'customer',
        senderName: 'Reviewer Bisnis',
        content: '⭐⭐⭐ Fitur Onebox sangat lengkap, namun respon tiket saat hari Minggu agak lambat dibanding hari kerja biasa.',
        timestamp: Date.now() - 300 * 60 * 1000
      },
      {
        id: 'msg-211-2',
        sender: 'agent',
        senderName: 'Dewi Lestari (CS D)',
        content: 'Terima kasih atas masukan berharganya. Mulai kuartal ini CiptadraSoft telah meluncurkan fitur AI First-Response 24/7 dan menambah tim on-call akhir pekan agar kendala Anda selalu terlayani seketika.',
        timestamp: Date.now() - 270 * 60 * 1000
      }
    ]
  }
];

// =========================================================================
// MOCK AGENT PERFORMANCE RECORDS & SUPERVISOR INVESTIGATION DATA
// =========================================================================

export const MOCK_AGENTS_PERFORMANCE: AgentPerformanceRecord[] = [
  {
    id: 'agent-cs-a',
    name: 'Andi Wijaya',
    code: 'CS A',
    role: 'Senior Technical Support Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    channels: ['Webchat', 'Phone', 'Twitter', 'WhatsApp'],
    ticketsHandledToday: 28,
    avgFirstResponseMin: 2.1,
    avgHandlingTimeMin: 24.2, // KEY FINDING: 24m vs 14.5m team average!
    teamAvgHandlingTimeMin: 14.5,
    slaComplianceRate: 89.2, // Below target 95%
    escalationRate: 14.3,
    csatScore: 4.4,
    proficiencyByCategory: {
      'Technical Support': { avgTimeMin: 24.2, volume: 18, proficiency: 'needs_coaching' },
      'Billing & Payment': { avgTimeMin: 12.0, volume: 3, proficiency: 'competent' },
      'Account & Access': { avgTimeMin: 7.5, volume: 4, proficiency: 'expert' },
      'Product Inquiry': { avgTimeMin: 8.0, volume: 2, proficiency: 'expert' },
      'Complaint / Escalation': { avgTimeMin: 19.0, volume: 1, proficiency: 'competent' },
      'General Information': { avgTimeMin: 5.0, volume: 0, proficiency: 'expert' }
    },
    investigationObservation: {
      identifiedPattern: 'Waktu penanganan tiket Technical Support mencapai 24.2 menit, lebih lambat 67% dibandingkan rata-rata tim (14.5 menit).',
      rootCauseAnalysis: 'Analisis log AI menunjukkan Andi sering melakukan query CLI manual dan debugging mendalam secara individual saat menangani error SIP 503 WebRTC & PBX trunking, alih-alih mengaktifkan skrip automated failover yang tersedia di Knowledge Base.',
      nonPunitiveGuidance: 'Peluang Peningkatan & Pendampingan: Andi memiliki ketelitian teknis tinggi. Rekomendasikan sesi coaching 1-on-1 mengenai SOP Failover Secondary SIP Trunk dan penggunaan AI Agent Assist 1-klik untuk mempercepat resolusi hingga di bawah 15 menit.',
      priority: 'High',
      recommendedKbModule: 'SOP-TEL-04: Onebox Cloud Telephony Trunk Failover & Error 503 Automated Mitigation',
      benchmarkComparison: {
        agentTimeMin: 24.2,
        teamAverageMin: 14.5,
        category: 'Technical Support'
      }
    }
  },
  {
    id: 'agent-cs-b',
    name: 'Siti Rahmawati',
    code: 'CS B',
    role: 'Billing & Enterprise Settlement Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'in_call',
    channels: ['WhatsApp', 'Email', 'Webchat'],
    ticketsHandledToday: 42,
    avgFirstResponseMin: 1.4,
    avgHandlingTimeMin: 11.8,
    teamAvgHandlingTimeMin: 14.5,
    slaComplianceRate: 98.6,
    escalationRate: 4.8,
    csatScore: 4.9,
    proficiencyByCategory: {
      'Billing & Payment': { avgTimeMin: 9.5, volume: 24, proficiency: 'expert' },
      'Technical Support': { avgTimeMin: 15.0, volume: 5, proficiency: 'competent' },
      'Account & Access': { avgTimeMin: 6.0, volume: 6, proficiency: 'expert' },
      'Product Inquiry': { avgTimeMin: 8.5, volume: 4, proficiency: 'expert' },
      'Complaint / Escalation': { avgTimeMin: 14.0, volume: 2, proficiency: 'competent' },
      'General Information': { avgTimeMin: 4.5, volume: 1, proficiency: 'expert' }
    }
  },
  {
    id: 'agent-cs-c',
    name: 'Budi Pratama',
    code: 'CS C',
    role: 'Omnichannel Fast-Response Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    channels: ['WhatsApp', 'Instagram', 'TikTok', 'GoogleReviews'],
    ticketsHandledToday: 48,
    avgFirstResponseMin: 1.1,
    avgHandlingTimeMin: 8.5,
    teamAvgHandlingTimeMin: 14.5,
    slaComplianceRate: 97.8,
    escalationRate: 3.2,
    csatScore: 4.8,
    proficiencyByCategory: {
      'General Information': { avgTimeMin: 3.5, volume: 18, proficiency: 'expert' },
      'Product Inquiry': { avgTimeMin: 6.2, volume: 15, proficiency: 'expert' },
      'Account & Access': { avgTimeMin: 7.0, volume: 8, proficiency: 'expert' },
      'Billing & Payment': { avgTimeMin: 11.0, volume: 4, proficiency: 'competent' },
      'Technical Support': { avgTimeMin: 18.0, volume: 2, proficiency: 'competent' },
      'Complaint / Escalation': { avgTimeMin: 12.0, volume: 1, proficiency: 'competent' }
    }
  },
  {
    id: 'agent-cs-d',
    name: 'Dewi Lestari',
    code: 'CS D',
    role: 'Enterprise Retention & Escalation Lead',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'busy',
    channels: ['Email', 'Webchat', 'Phone'],
    ticketsHandledToday: 19,
    avgFirstResponseMin: 3.2,
    avgHandlingTimeMin: 27.5,
    teamAvgHandlingTimeMin: 14.5,
    slaComplianceRate: 94.0,
    escalationRate: 8.5,
    csatScore: 4.7,
    proficiencyByCategory: {
      'Complaint / Escalation': { avgTimeMin: 28.5, volume: 11, proficiency: 'expert' },
      'Billing & Payment': { avgTimeMin: 22.0, volume: 4, proficiency: 'expert' },
      'Product Inquiry': { avgTimeMin: 14.0, volume: 2, proficiency: 'expert' },
      'Technical Support': { avgTimeMin: 20.0, volume: 1, proficiency: 'competent' },
      'Account & Access': { avgTimeMin: 9.0, volume: 1, proficiency: 'expert' },
      'General Information': { avgTimeMin: 6.0, volume: 0, proficiency: 'expert' }
    }
  },
  {
    id: 'agent-cs-e',
    name: 'Rian Ardiansyah',
    code: 'CS E',
    role: 'Junior Omnichannel CS Agent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    channels: ['Facebook', 'WhatsApp', 'Email'],
    ticketsHandledToday: 31,
    avgFirstResponseMin: 2.4,
    avgHandlingTimeMin: 18.2,
    teamAvgHandlingTimeMin: 14.5,
    slaComplianceRate: 92.5,
    escalationRate: 11.2,
    csatScore: 4.5,
    proficiencyByCategory: {
      'Account & Access': { avgTimeMin: 12.0, volume: 10, proficiency: 'competent' },
      'Product Inquiry': { avgTimeMin: 15.0, volume: 9, proficiency: 'competent' },
      'General Information': { avgTimeMin: 7.0, volume: 5, proficiency: 'expert' },
      'Billing & Payment': { avgTimeMin: 21.0, volume: 4, proficiency: 'needs_coaching' },
      'Technical Support': { avgTimeMin: 26.0, volume: 2, proficiency: 'needs_coaching' },
      'Complaint / Escalation': { avgTimeMin: 24.0, volume: 1, proficiency: 'competent' }
    }
  }
];

// =========================================================================
// SUPERVISOR COACHING & TRAINING PLANS
// =========================================================================

export const INITIAL_TRAINING_PLANS: SupervisorTrainingPlan[] = [
  {
    id: 'plan-01',
    title: 'WebRTC Telephony SIP 503 Diagnostics & Auto-Failover SOP',
    targetAgentId: 'agent-cs-a',
    targetAgentName: 'Andi Wijaya',
    targetAgentCode: 'CS A',
    topic: 'Onebox Cloud PBX & WebRTC SIP Trunk Diagnostics',
    kbModule: 'SOP-TEL-04: Automated Secondary SIP Trunk Failover Protocols',
    targetDate: '2026-09-25',
    status: 'in_progress',
    notes: 'Fokus pada adopsi tool 1-klik AI Failover di Agent Workspace untuk mereduksi handling time dari 24m menjadi < 15m.',
    createdAt: Date.now() - 48 * 3600 * 1000,
    createdByName: 'Ferry Darmawan (Supervisor Ops)'
  },
  {
    id: 'plan-02',
    title: 'Enterprise Churn Prevention & Escalation Playbook',
    targetAgentId: 'agent-cs-d',
    targetAgentName: 'Dewi Lestari',
    targetAgentCode: 'CS D',
    topic: 'Handling Annual Contract Cancellation and Executive Negotiations',
    kbModule: 'RET-09: Enterprise Value Retention & Grace Period Extension SOP',
    targetDate: '2026-09-18',
    status: 'completed',
    notes: 'Penyegaran negosiasi penawaran hybrid renewal bagi klien perbankan dan logistik.',
    createdAt: Date.now() - 7 * 86400 * 1000,
    completedAt: Date.now() - 1 * 86400 * 1000,
    createdByName: 'Ferry Darmawan (Supervisor Ops)'
  },
  {
    id: 'plan-03',
    title: 'Multi-Channel Fast Triage & Shortcut Productivity',
    targetAgentId: 'agent-cs-e',
    targetAgentName: 'Rian Ardiansyah',
    targetAgentCode: 'CS E',
    topic: 'Omnichannel Inbox Management & Keyboard Shortcuts',
    kbModule: 'CS-FAST-01: Onebox Unified Queue Keyboard Accelerators',
    targetDate: '2026-09-30',
    status: 'planned',
    notes: 'Meningkatkan kelancaran multitasking antara kanal WhatsApp dan Facebook Messenger.',
    createdAt: Date.now() - 12 * 3600 * 1000,
    createdByName: 'Ferry Darmawan (Supervisor Ops)'
  }
];

// =========================================================================
// REAL-TIME AI ACTIVITY LOGS (Chronological Audit Trail)
// =========================================================================

export const MOCK_AI_ACTIVITY_LOGS: AiActivityLogItem[] = [
  {
    id: 'act-01',
    timestamp: Date.now() - 2 * 60 * 1000,
    channel: 'WhatsApp',
    customerName: 'Lisa Humairoh',
    customerHandle: '+62 812-9988-1122',
    rawInputSnippet: 'Tanya perbedaan paket Onebox Starter vs Pro dan biaya lisensi...',
    detectedIntent: 'Sales Inquiry / Pricing & Feature Comparison',
    confidenceScore: 0.98,
    decision: 'auto_answered',
    decisionReason: 'Pertanyaan umum terverifikasi 100% pada Knowledge Base resmi Onebox.',
    knowledgeSourceUsed: 'Onebox Official Pricing & Packaging KB'
  },
  {
    id: 'act-02',
    timestamp: Date.now() - 18 * 60 * 1000,
    channel: 'WhatsApp',
    customerName: 'Budi Santoso',
    customerHandle: '+62 812-3456-7890',
    rawInputSnippet: 'Sudah bayar via BCA VA tapi akun terblokir ada tender penting siang ini...',
    detectedIntent: 'Urgent Billing Dispute / Account Lockout',
    confidenceScore: 0.96,
    decision: 'escalated_ticket',
    decisionReason: 'Dampak bisnis tinggi (tender klien) & perlu rekonsiliasi manual mutasi bank.',
    assignedDepartment: 'Finance & Billing',
    assignedPriority: 'Urgent',
    assignedSlaHours: 2,
    assignedAgentName: 'Siti Rahmawati (CS B)'
  },
  {
    id: 'act-03',
    timestamp: Date.now() - 25 * 60 * 1000,
    channel: 'Webchat',
    customerName: 'Siti Rahmawati (Bank Digital)',
    customerHandle: 'siti.rahma@bankdigital.id',
    rawInputSnippet: 'Error SIP 503 Service Unavailable di dashboard 20 agen call center...',
    detectedIntent: 'Infrastructure Outage / Telephony Voice Failure',
    confidenceScore: 0.98,
    decision: 'escalated_ticket',
    decisionReason: 'Outage operasional langsung pada 20 agen live bank klien enterprise.',
    assignedDepartment: 'Core Engineering',
    assignedPriority: 'Urgent',
    assignedSlaHours: 1,
    assignedAgentName: 'Andi Wijaya (CS A)'
  },
  {
    id: 'act-04',
    timestamp: Date.now() - 54 * 60 * 1000,
    channel: 'Instagram',
    customerName: 'Rian Tech Venture',
    customerHandle: '@techstartup.id',
    rawInputSnippet: 'Apakah Onebox support webhook ke Postgres on-premise?',
    detectedIntent: 'Developer / API Integration Capability',
    confidenceScore: 0.97,
    decision: 'auto_answered',
    decisionReason: 'Fitur arsitektur middleware terjawab tuntas di dokumen pengembang Ciptadra.',
    knowledgeSourceUsed: 'Ciptadra Enterprise Middleware Architecture KB'
  },
  {
    id: 'act-05',
    timestamp: Date.now() - 75 * 60 * 1000,
    channel: 'WhatsApp',
    customerName: 'Kevin Sanjaya',
    customerHandle: '+62 818-0992-3344',
    rawInputSnippet: 'Webhook callback sandbox gagal tembus ke endpoint staging...',
    detectedIntent: 'Technical API Integration Issue',
    confidenceScore: 0.93,
    decision: 'escalated_ticket',
    decisionReason: 'Dibutuhkan pengecekan log SSL gateway dan IP whitelist server sandbox.',
    assignedDepartment: 'Solutions Architecture',
    assignedPriority: 'Medium',
    assignedSlaHours: 4,
    assignedAgentName: 'Andi Wijaya (CS A)'
  },
  {
    id: 'act-06',
    timestamp: Date.now() - 85 * 60 * 1000,
    channel: 'GoogleReviews',
    customerName: 'Hendra Gunawan',
    customerHandle: 'Hendra G (Local Guide)',
    rawInputSnippet: 'Sangat puas migrasi telephony PBX ke Onebox Cloud zero downtime...',
    detectedIntent: 'Positive Sentiment / Testimonial',
    confidenceScore: 0.99,
    decision: 'auto_answered',
    decisionReason: 'Apresiasi publik dijawab langsung dengan template apresiasi berstandar PR.',
    knowledgeSourceUsed: 'Corporate Public Relations & CS Guidelines'
  },
  {
    id: 'act-07',
    timestamp: Date.now() - 95 * 60 * 1000,
    channel: 'Email',
    customerName: 'Hendro Wijaya',
    customerHandle: 'hendro@logistikprima.com',
    rawInputSnippet: 'Ingin membatalkan perpanjangan kontrak tahunan dan refund deposit...',
    detectedIntent: 'Contract Cancellation / Churn Risk',
    confidenceScore: 0.93,
    decision: 'escalated_ticket',
    decisionReason: 'Akun enterprise bernilai tinggi membutuhkan intervensi retensi manajemen.',
    assignedDepartment: 'Customer Success',
    assignedPriority: 'High',
    assignedSlaHours: 4,
    assignedAgentName: 'Dewi Lestari (CS D)'
  },
  {
    id: 'act-08',
    timestamp: Date.now() - 110 * 60 * 1000,
    channel: 'TikTok',
    customerName: 'Kreatif Media Agency',
    customerHandle: '@kreatif_agency',
    rawInputSnippet: 'Tutorial pasang WhatsApp Business API centang hijau di Onebox...',
    detectedIntent: 'How-to / Onboarding Guide',
    confidenceScore: 0.96,
    decision: 'auto_answered',
    decisionReason: 'SOP verifikasi Meta Business Manager tersedia di panduan mandiri.',
    knowledgeSourceUsed: 'Onebox WABA Integration SOP'
  },
  {
    id: 'act-09',
    timestamp: Date.now() - 140 * 60 * 1000,
    channel: 'Webchat',
    customerName: 'Nusantara Media Corp',
    customerHandle: 'Visitor-8832',
    rawInputSnippet: 'Rata-rata timeline implementasi migrasi workflow ke Flow BPM...',
    detectedIntent: 'Consultation / Scope of Work',
    confidenceScore: 0.98,
    decision: 'auto_answered',
    decisionReason: 'Jadwal implementasi standar enterprise tercantum dalam brosur solusi.',
    knowledgeSourceUsed: 'Ciptadra Enterprise Services Scope & SLA'
  },
  {
    id: 'act-10',
    timestamp: Date.now() - 180 * 60 * 1000,
    channel: 'Email',
    customerName: 'PT Sejahtera Makmur',
    customerHandle: 'procurement@sejahteramakmur.com',
    rawInputSnippet: 'Kirimkan form penambahan 15 lisensi agen Onebox CRM...',
    detectedIntent: 'Expansion / License Add-on',
    confidenceScore: 0.97,
    decision: 'escalated_ticket',
    decisionReason: 'Penerbitan surat penawaran harga resmi membutuhkan kalkulasi Sales/CS.',
    assignedDepartment: 'Solutions Architecture',
    assignedPriority: 'Low',
    assignedSlaHours: 8,
    assignedAgentName: 'Budi Pratama (CS C)'
  }
];

// =========================================================================
// SUPERVISOR EXECUTIVE SUMMARY DATA
// =========================================================================

export const MOCK_SUPERVISOR_EXECUTIVE_SUMMARY: SupervisorExecutiveSummary = {
  period: 'Minggu Berjalan (15 - 21 September 2026)',
  totalConversations: 1840,
  aiHandledCount: 773,
  aiHandledPercent: 42.0,
  humanHandledCount: 1067,
  humanHandledPercent: 58.0,
  avgAiResponseSeconds: 1.8,
  avgHumanHandlingMinutes: 14.5,
  slaComplianceRate: 96.8,
  topBottlenecks: [
    'Lonjakan 34% tiket Billing & Payment setiap Senin pukul 09:00 - 11:00 pasca settlement batch perbankan.',
    'Penanganan Technical Support WebRTC membutuhkan waktu 67% lebih lama pada agen yang belum menerapkan modul failover otomatis.',
    'Pertanyaan duplikatif seputar dokumentasi sandbox REST API mendominasi 18% tiket developer baru.'
  ],
  coachingRecommendations: [
    'Jadwalkan sesi pelatihan SOP Failover SIP 503 untuk CS A (Andi Wijaya) guna menurunkan AHT technical dari 24m ke 14m.',
    'Tingkatkan otomatisasi webhook settlement BCA VA agar status payment langsung terverifikasi tanpa tiket CS manual.',
    'Perluas cakupan AI Knowledge Base seputar error code sandbox developer agar lebih banyak terjawab di Case A.'
  ],
  keyHighlights: [
    'AI First-Response berhasil membebaskan 773 percakapan rutin dari antrean agen manusia (efisiensi 42%).',
    'Kepuasan pelanggan (CSAT) bertahan tinggi di angka 4.74 / 5.00 dengan kepatuhan SLA 96.8% terpenuhi.',
    'Waktu respon pertama tercepat tercatat 1.2 detik via AI Google Review and Instagram Direct.'
  ]
};

// =========================================================================
// MARKETING & SENTIMENT ANALYSIS DATASET
// =========================================================================

export const MOCK_MARKETING_SENTIMENT_POSTS: ContentSentimentItem[] = [
  {
    id: 'sent-01',
    platform: 'instagram',
    title: 'Peluncuran Onebox AI Omnichannel CX v4.0',
    caption: 'Tingkatkan efisiensi CS Anda hingga 65% dengan Onebox AI Omnichannel. Satu layar untuk WhatsApp, IG, FB, X, TikTok, dan Call Center. Coba Sandbox gratis 14 hari sekarang!',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80',
    likes: 2420,
    comments: 381,
    shares: 142,
    sentimentBreakdown: { positive: 74, neutral: 16, negative: 10 },
    keywords: {
      positive: ['canggih', 'keren', 'fitur lengkap', 'satset', 'solusi lokal', 'keren banget'],
      negative: ['mahal', 'harga lisensi', 'apakah rumit']
    },
    aiInsight: {
      discussionFocus: 'Apresiasi tinggi pada konsep single-screen omnichannel dan automasi AI classification.',
      identifiedIssue: 'Persepsi harga pada segmen UKM berkembang.',
      prescriptiveRecommendation: 'Sajikan perbandingan ROI dan highlight paket Starter terjangkau pada post komparasi berikutnya.'
    },
    timestamp: Date.now() - 24 * 3600 * 1000
  },
  {
    id: 'sent-02',
    platform: 'instagram',
    title: 'Pengumuman Penyesuaian Tarif Lisensi Per Agen 2026',
    caption: 'Pembaruan struktur lisensi Onebox Enterprise untuk mendukung infrastruktur High Availability 99.99% dan enkripsi mTLS perbankan.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    likes: 1105,
    comments: 504,
    shares: 89,
    sentimentBreakdown: { positive: 32, neutral: 21, negative: 47 },
    keywords: {
      positive: ['keamanan bagus', 'enterprise standard', 'upgrade'],
      negative: ['harga naik', 'mahal', 'anggaran ketat', 'kenapa naik', 'biaya agen']
    },
    aiInsight: {
      discussionFocus: 'Kekhawatiran klien eksisting mengenai lonjakan anggaran perpanjangan tahunan.',
      identifiedIssue: 'Komunikasi kenaikan tarif dirasa mendadak tanpa penegasan nilai tambah SLA.',
      prescriptiveRecommendation: 'Kirimkan email personalisasi dengan penawaran grandfathering price 1 tahun untuk klien setia.'
    },
    timestamp: Date.now() - 48 * 3600 * 1000
  },
  {
    id: 'sent-03',
    platform: 'tiktok',
    title: 'Tutorial Cepat: Hubungkan WhatsApp Business API Centang Hijau',
    caption: 'Bikin CS WhatsApp tokomu serba otomatis dalam 5 menit pakai Onebox! Gak perlu pusing server error.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&auto=format&fit=crop&q=80',
    likes: 5840,
    comments: 210,
    shares: 430,
    sentimentBreakdown: { positive: 88, neutral: 8, negative: 4 },
    keywords: {
      positive: ['gampang', 'sangat jelas', 'bermanfaat', 'makasih min', 'mau coba'],
      negative: ['syaratnya ribet']
    },
    aiInsight: {
      discussionFocus: 'Antusiasme tinggi audiens muda dan agensi terhadap kemudahan registrasi Meta WABA.',
      prescriptiveRecommendation: 'Buat mini-series TikTok lanjutan seputar template broadcast anti-banned.'
    },
    timestamp: Date.now() - 72 * 3600 * 1000
  },
  {
    id: 'sent-04',
    platform: 'twitter',
    title: 'Diskusi: Downtime PBX Konvensional vs Cloud Contact Center',
    caption: 'Banyak call center bank tumbang pasca lonjakan traffic awal bulan. Saatnya beralih ke arsitektur WebRTC multi-trunk yang auto-failover.',
    likes: 890,
    comments: 122,
    shares: 154,
    sentimentBreakdown: { positive: 65, neutral: 25, negative: 10 },
    keywords: {
      positive: ['webrtc stabil', 'uptime tinggi', 'ciptadra handal', 'cloud pbx'],
      negative: ['butuh internet stabil']
    },
    aiInsight: {
      discussionFocus: 'Para praktisi IT sepakat bahwa WebRTC cloud lebih hemat CapEx 60% dibanding SIP box fisik.',
      prescriptiveRecommendation: 'Targetkan whitepaper teknis ini ke komunitas DevOps dan sysadmin via kampanye LinkedIn/X.'
    },
    timestamp: Date.now() - 96 * 3600 * 1000
  },
  {
    id: 'sent-05',
    platform: 'facebook',
    title: 'Studi Kasus: Reduksi 85% Kesalahan Routing di Perbankan BUMN',
    caption: 'Bagaimana integrasi Ciptadra Flow BPM dan AI Classification mengamankan SLA keluhan nasabah prioritas.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80',
    likes: 1520,
    comments: 98,
    shares: 77,
    sentimentBreakdown: { positive: 79, neutral: 15, negative: 6 },
    keywords: {
      positive: ['bumn membanggakan', 'efisien', 'sukses selalu', 'perlu ditiru'],
      negative: ['antrean cs']
    },
    aiInsight: {
      discussionFocus: 'Validasi kredibilitas tinggi di segmen korporasi berkat testimonial bank BUMN.',
      prescriptiveRecommendation: 'Gunakan studi kasus ini sebagai lampiran proposal tender pemerintah.'
    },
    timestamp: Date.now() - 120 * 3600 * 1000
  }
];

// =========================================================================
// CUSTOMER JOURNEY ANALYTICS (AIDA FRAMEWORK)
// =========================================================================

export const MOCK_CUSTOMER_JOURNEY_AIDA: CustomerJourneyStage[] = [
  {
    id: 'attention',
    name: 'Attention (Brand Awareness)',
    count: 10000,
    conversionFromPrev: 100,
    dropOffBarriers: [
      'Traffic non-targeted dari iklan medsos umum',
      'Kurangnya awareness terhadap produk omnichannel terintegrasi',
      'Bounce rate tinggi pada mobile pengguna koneksi lambat'
    ],
    analyticsType: {
      descriptive: '10,000 kunjungan unik tercatat pada landing page CiptadraSoft & Onebox CX.',
      predictive: 'Pencarian kata kunci organik seputar "AI Contact Center Indonesia" diproyeksikan naik 24%.',
      prescriptive: 'Persempit target audience iklan ke manajer operasional dan tingkatkan kecepatan first-contentful paint.'
    }
  },
  {
    id: 'interest',
    name: 'Interest (Solusi & Interaksi)',
    count: 4200,
    conversionFromPrev: 42.0,
    dropOffBarriers: [
      'Fitur teknis terdengar terlalu kompleks bagi bisnis non-IT',
      'Informasi skema implementasi on-premise vs SaaS belum seketika terlihat',
      'Komparasi fitur dengan kompetitor belum eksplisit'
    ],
    analyticsType: {
      descriptive: '4,200 prospek mengeksplorasi kalkulator simulasi harga dan modul produk solusi.',
      predictive: 'Pengunjung yang mencoba AI Chatbot memiliki peluang 3.4x lebih besar menuju tahap proposal.',
      prescriptive: 'Sediakan tombol 1-klik "Jalankan Demo Live AI" langsung di atas banner produk.'
    }
  },
  {
    id: 'desire',
    name: 'Desire (Kebutuhan & Evaluasi)',
    count: 1900,
    conversionFromPrev: 45.2,
    dropOffBarriers: [
      'Kebutuhan approval anggaran belanja modal (CapEx) di level direksi',
      'Persyaratan kepatuhan keamanan data (ISO/IEC 27001 dan audit regulator OJK)',
      'Keraguan durasi masa transisi migrasi data dari sistem lama'
    ],
    analyticsType: {
      descriptive: '1,900 prospek mengunduh profil perusahaan atau mengajukan formulir konsultasi.',
      predictive: '78% penundaan di tahap Desire disebabkan belum tersedianya dokumen kepatuhan ISO di awal.',
      prescriptive: 'Kirimkan secara otomatis paket audit keamanan terverifikasi saat prospek mengunduh brosur.'
    }
  },
  {
    id: 'action',
    name: 'Action (Konversi & Kontrak)',
    count: 540,
    conversionFromPrev: 28.4,
    dropOffBarriers: [
      'Keterbatasan opsi pembayaran invoice (klien meminta termin kredit 30 hari)',
      'Proses penandatanganan NDA dan PKS membutuhkan waktu legal lebih dari 2 minggu',
      'Penyesuaian spesifikasi kustom add-on lisensi agen yang tertunda'
    ],
    analyticsType: {
      descriptive: '540 enterprise dan institusi berhasil onboarding dan mengaktifkan lisensi resmi.',
      predictive: 'Aktivasi otomatis rekonsiliasi payment gateway mempercepat deal closure 4.5 hari.',
      prescriptive: 'Implementasikan e-meterai & e-sign otomatis dalam alur kontrak Flow BPM untuk memangkas birokrasi legal.'
    }
  }
];

// =========================================================================
// OUTBOUND MARKETING CAMPAIGNS
// =========================================================================

export const MOCK_OUTBOUND_CAMPAIGNS: OutboundCampaign[] = [
  {
    id: 'camp-01',
    name: 'Executive Roundtable: AI CX Modernization 2026',
    type: 'event_invite',
    audience: 'VP Customer Experience & Head of IT Banking/Fintech',
    recipientsCount: 450,
    templateSubject: 'Undangan Khusus: Executive Forum AI Omnichannel & Kepatuhan Regulasi',
    templateBody: 'Halo {{name}},\n\nKami mengundang Anda dan tim manajemen {{company}} untuk menghadiri sesi makan siang privat bersama para pemimpin IT industri perbankan pada 28 September di Jakarta.\n\nFokus diskusi: Mitigasi downtime telephony dan integrasi AI Ticket Classification.\n\nKonfirmasi kehadiran Anda melalui tautan berikut.',
    status: 'scheduled',
    openRate: 0,
    clickRate: 0
  },
  {
    id: 'camp-02',
    name: 'Cold Outreach: Modernisasi Contact Center Logistik',
    type: 'cold_email',
    audience: 'Direktur Operasional & IT Perusahaan Ekspedisi Nasional',
    recipientsCount: 820,
    templateSubject: 'Optimalisasi Biaya Call Center Armada {{company}} hingga 50%',
    templateBody: 'Yth. Bapak/Ibu {{name}},\n\nBerdasarkan tren volume pelacakan paket di {{company}}, kami ingin membagikan studi kasus bagaimana Onebox Omnichannel menyatukan WhatsApp dan Call Center dalam satu layar tanpa investasi server fisik.\n\nApakah Anda berkenan untuk demo online singkat 15 menit minggu ini?',
    status: 'sent',
    openRate: 44.2,
    clickRate: 18.5,
    responseRate: 9.4,
    lastSent: Date.now() - 3 * 86400 * 1000
  },
  {
    id: 'camp-03',
    name: 'Follow-up Prospek Sandbox Onebox Trial 14 Hari',
    type: 'followup',
    audience: 'Akun Trial Aktif yang akan berakhir dalam 3 hari',
    recipientsCount: 160,
    templateSubject: 'Trial Onebox Anda Berakhir 3 Hari Lagi — Perpanjang Akses Sandbox Gratis',
    templateBody: 'Halo {{name}},\n\nBagaimana pengalaman tim {{company}} mencoba AI Agent Assist dan routing WhatsApp di Onebox sejauh ini?\n\nKami siap mengaktifkan perpanjangan masa trial 7 hari tambahan atau menyusun simulasi lisensi sesuai kebutuhan spesifik Anda.',
    status: 'sent',
    openRate: 68.0,
    clickRate: 34.2,
    responseRate: 31.2,
    lastSent: Date.now() - 1 * 86400 * 1000
  },
  {
    id: 'camp-04',
    name: 'Promo Kuartal: Add-on 20 Lisensi WhatsApp API Diskon 25%',
    type: 'promo',
    audience: 'Klien Paket Starter dengan Utilisasi Kuota > 80%',
    recipientsCount: 340,
    templateSubject: 'Upgrade Kapasitas CS {{company}} Sebelum Lonjakan Transaksi Akhir Tahun',
    templateBody: 'Halo {{name}},\n\nManfaatkan penawaran khusus diskon 25% untuk penambahan 20 lisensi agen WhatsApp Business API di {{company}} sebelum promo kuartal ditutup.',
    status: 'draft',
    openRate: 0,
    clickRate: 0
  }
];

// =========================================================================
// SPEECH ANALYTICS & CALL TRANSCRIPTS DATASET
// =========================================================================

export const MOCK_CALL_ANALYTICS: CallAnalyticsRecord[] = [
  {
    id: 'call-01',
    callNumber: 'CALL-8821',
    agentId: 'agent-cs-a',
    agentName: 'Andi Wijaya (CS A)',
    customerName: 'Siti Rahmawati',
    durationSeconds: 252, // 4m 12s
    callType: 'cs_support',
    topic: 'Gangguan SIP 503 WebRTC Call Center',
    sentiment: 'Urgent',
    keyIssues: ['SIP 503 Service Unavailable', '20 Agen Terputus', 'Panggilan Nasabah Gagal'],
    customerRequests: ['Pengalihan jalur darurat segera', 'Laporan insiden tertulis'],
    repeatedQuestions: [
      'Berapa lama estimasi pemulihan panggilan masuk? (Ditanyakan 2 kali)',
      'Apakah trunk backup sudah otomatis aktif? (Ditanyakan 2 kali)'
    ],
    speakingPaceWpm: 135,
    interruptionCount: 1,
    resolutionStatus: 'resolved',
    transcriptSnippet: [
      { speaker: 'customer', text: 'Halo selamat siang, tim call center kami mendadak tidak bisa menerima panggilan masuk lewat WebRTC Onebox sejak 15 menit lalu. Muncul error SIP 503 di dashboard 20 agen kami. Ini sangat darurat!', timeSec: 4 },
      { speaker: 'agent', text: 'Selamat siang Ibu Siti, terima kasih laporannya. Kami segera cek status SIP trunk primer dari Network Operations Center sekarang juga.', timeSec: 18 },
      { speaker: 'customer', text: 'Berapa lama estimasi pemulihan panggilan masuk kami? Nasabah perbankan sedang ramai!', timeSec: 35 },
      { speaker: 'agent', text: 'Baik Ibu, kami langsung mengaktifkan pengalihan otomatis ke Secondary SIP Trunk Telkom. Proses peralihan memakan waktu kurang dari 90 detik.', timeSec: 48 },
      { speaker: 'customer', text: 'Apakah trunk backup sudah otomatis aktif sekarang? Saya butuh kepastian.', timeSec: 110 },
      { speaker: 'agent', text: 'Sudah aktif Ibu Siti, status signalling pada 20 dashboard agen Anda saat ini sudah hijau dan panggilan pertama berhasil masuk pukul 14:26.', timeSec: 135 }
    ],
    aiObservations: [
      'Pelanggan menanyakan estimasi waktu sebanyak 2 kali karena tensi bisnis tinggi.',
      'Agen Andi merespon tenang dan mengeksekusi failover sekunder dalam waktu 2 menit.',
      'Disarankan menyampaikan ETA langkah pemulihan di 30 detik pertama panggilan.'
    ],
    recommendedImprovements: [
      'Sampaikan kepastian pengalihan secondary trunk lebih awal sebelum pelanggan mengulang pertanyaan.',
      'Kirimkan tautan status dashboard otomatis via SMS/WhatsApp selama perbaikan berlangsung.'
    ],
    personaInsights: {
      communicationStyle: 'Direct, terstruktur, berorientasi urgensi tinggi (Executive Persona)',
      languageTone: 'Formal & Lugas',
      formality: 'Formal',
      paceAssessment: 'Normal'
    }
  },
  {
    id: 'call-02',
    callNumber: 'CALL-8822',
    agentId: 'user-marketing-01',
    agentName: 'Clara Michelle (Solutions Consultant)',
    customerName: 'Hendro Wijaya',
    durationSeconds: 525, // 8m 45s
    callType: 'sales_negotiation',
    topic: 'Negosiasi Penambahan 80 Lisensi Enterprise Onebox',
    sentiment: 'Neutral',
    keyIssues: ['Keterbatasan Anggaran Q3', 'Komparasi Harga Kompetitor', 'Integrasi SAP ERP'],
    customerRequests: ['Diskon volume 20%', 'Termin pembayaran kredit 45 hari'],
    repeatedQuestions: [
      'Apakah biaya lisensi sudah termasuk biaya server cloud hosting? (Ditanyakan 3 kali)'
    ],
    objections: ['Harga per agen masih di atas plafon procurement tahun berjalan'],
    speakingPaceWpm: 120,
    interruptionCount: 0,
    resolutionStatus: 'followup_required',
    transcriptSnippet: [
      { speaker: 'customer', text: 'Kami berminat menambah 80 user untuk cabang baru, tapi penawaran harga lisensi saat ini masih melebihi alokasi belanja modal Q3 kami.', timeSec: 15 },
      { speaker: 'agent', text: 'Kami memahami pertimbangan anggaran Bapak Hendro. Sebagai bentuk apresiasi kemitraan, kami dapat memberikan paket volume tier dengan diskon 15% serta pembebasan biaya setup middleware SAP.', timeSec: 42 },
      { speaker: 'customer', text: 'Apakah biaya lisensi tersebut sudah include infrastruktur cloud dan backup harian?', timeSec: 90 },
      { speaker: 'agent', text: 'Benar sekali Bapak, seluruh paket Enterprise sudah mencakup managed cloud AWS Jakarta, redundansi data, dan garansi SLA 99.9%.', timeSec: 115 }
    ],
    aiObservations: [
      'Pelanggan sangat fokus pada klausul all-inclusive agar tidak ada biaya tersembunyi.',
      'Sinyal ketertarikan tinggi pada integrasi SAP ERP tanpa biaya implementasi tambahan.'
    ],
    recommendedImprovements: [
      'Tampilkan tabel perbandingan TCO (Total Cost of Ownership) yang membuktikan penghematan 40% dibanding On-Premise.'
    ],
    personaInsights: {
      communicationStyle: 'Metodis, hati-hati terhadap biaya, fokus pada kepastian kontrak.',
      languageTone: 'Formal Korporat',
      formality: 'Formal',
      paceAssessment: 'Normal'
    },
    salesInsights: {
      mainRequest: 'Diskon volume dan kejelasan paket all-in',
      mainObjection: 'Plafon anggaran belanja modal kuartal berjalan',
      requestedFeature: 'Konektor SAP ERP Middleware siap pakai',
      aidaStage: 'Desire'
    }
  },
  {
    id: 'call-03',
    callNumber: 'CALL-8823',
    agentId: 'agent-cs-b',
    agentName: 'Siti Rahmawati (CS B)',
    customerName: 'Budi Santoso',
    durationSeconds: 310, // 5m 10s
    callType: 'cs_support',
    topic: 'Konfirmasi Rekonsiliasi BCA Virtual Account & Grace Period',
    sentiment: 'Frustrated',
    keyIssues: ['Akun Terkunci', 'Tender Mendesak', 'Mutasi Bank Tertunda'],
    customerRequests: ['Buka blokir instan', 'Grace period 24 jam'],
    repeatedQuestions: [
      'Apakah tim sales saya bisa langsung input data sekarang? (Ditanyakan 3 kali)'
    ],
    speakingPaceWpm: 128,
    interruptionCount: 2,
    resolutionStatus: 'resolved',
    transcriptSnippet: [
      { speaker: 'customer', text: 'Mbak Siti, saya baru transfer VA tapi kenapa akun masih suspend? Tender kami jam 1 siang ini!', timeSec: 8 },
      { speaker: 'agent', text: 'Selamat siang Bapak Budi. Kami mohon maaf atas keterlambatan notifikasi perbankan. Akses Darurat Grace Period 24 Jam sudah kami aktifkan detik ini juga di portal akun Anda.', timeSec: 28 },
      { speaker: 'customer', text: 'Beneran sudah bisa login? Coba saya minta staf saya coba dulu ya.', timeSec: 55 },
      { speaker: 'agent', text: 'Silakan Bapak, tim sales Bapak Budi sudah dapat login normal dan input data saat ini juga sementara verifikasi mutasi BCA kami rampungkan di background.', timeSec: 75 }
    ],
    aiObservations: [
      'Pelanggan mengalami kecemasan tinggi akibat batas waktu tender klien.',
      'Solusi Grace Period yang langsung dieksekusi agen berhasil meredakan keluhan dan mengubah sentimen menjadi sangat positif.'
    ],
    recommendedImprovements: [
      'Implementasikan webhook rekonsiliasi instan dari bank agar tidak terjadi jeda notifikasi pembayaran.'
    ],
    personaInsights: {
      communicationStyle: 'Urgensi tinggi, to the point, menghargai solusi cepat tanpa birokrasi.',
      languageTone: 'Campuran Formal & Kasual',
      formality: 'Mixed',
      paceAssessment: 'Cepat'
    }
  }
];

// =========================================================================
// QUALITY MONITORING EVALUATIONS & CSAT DATASET
// =========================================================================

export const MOCK_QM_EVALUATIONS: QualityMonitoringRecord[] = [
  {
    id: 'qm-01',
    ticketId: 'TKT-8402',
    agentId: 'agent-cs-b',
    agentName: 'Siti Rahmawati (CS B)',
    customerName: 'Budi Santoso',
    channel: 'WhatsApp',
    customerRating: 5,
    customerFeedback: 'Sangat cepat tanggap mengaktifkan grace period tender. Penyelamat tender perusahaan kami!',
    aiQualityScore: 98,
    responseQuality: 96,
    resolutionQuality: 100,
    slaMet: true,
    evaluatedAt: Date.now() - 2 * 3600 * 1000
  },
  {
    id: 'qm-02',
    ticketId: 'TKT-8403',
    agentId: 'agent-cs-a',
    agentName: 'Andi Wijaya (CS A)',
    customerName: 'Siti Rahmawati',
    channel: 'Webchat',
    customerRating: 4,
    customerFeedback: 'Kendala teknis berhasil diselesaikan dengan failover, hanya saja waktu awal diagnosa agak lama.',
    aiQualityScore: 84,
    responseQuality: 88,
    resolutionQuality: 92,
    slaMet: true,
    trainingNeedFlag: 'Peningkatan Kecepatan Inisiasi Failover SIP Trunk',
    evaluatedAt: Date.now() - 4 * 3600 * 1000
  },
  {
    id: 'qm-03',
    ticketId: 'TKT-8404',
    agentId: 'agent-cs-d',
    agentName: 'Dewi Lestari (CS D)',
    customerName: 'Hendro Wijaya',
    channel: 'Email',
    customerRating: 5,
    customerFeedback: 'Negosiasi pembatalan ditangani dengan sangat profesional dan solutif.',
    aiQualityScore: 96,
    responseQuality: 98,
    resolutionQuality: 94,
    slaMet: true,
    evaluatedAt: Date.now() - 6 * 3600 * 1000
  },
  {
    id: 'qm-04',
    ticketId: 'TKT-8411',
    agentId: 'agent-cs-c',
    agentName: 'Budi Pratama (CS C)',
    customerName: 'PT Sejahtera Makmur',
    channel: 'Email',
    customerRating: 5,
    customerFeedback: 'Quotation lisensi tambahan diterima dalam 10 menit.',
    aiQualityScore: 97,
    responseQuality: 95,
    resolutionQuality: 98,
    slaMet: true,
    evaluatedAt: Date.now() - 10 * 3600 * 1000
  }
];

export const MOCK_CSAT_METRICS = {
  overallScore: 4.74,
  totalSurveys: 890,
  responseRate: '68.4%',
  starDistribution: [
    { stars: 5, percentage: 68, count: 605 },
    { stars: 4, percentage: 22, count: 196 },
    { stars: 3, percentage: 6, count: 53 },
    { stars: 2, percentage: 3, count: 27 },
    { stars: 1, percentage: 1, count: 9 }
  ],
  byChannel: [
    { channel: 'WhatsApp', score: 4.86 },
    { channel: 'Webchat', score: 4.78 },
    { channel: 'Email', score: 4.62 },
    { channel: 'Phone', score: 4.70 },
    { channel: 'Instagram', score: 4.81 }
  ]
};

// =========================================================================
// PREDICTIVE CUSTOMER SERVICE NEEDS
// =========================================================================

export const MOCK_PREDICTIVE_NEEDS: PredictiveCustomerNeed[] = [
  {
    id: 'pred-01',
    customerId: 'cust-mega-solusi',
    customerName: 'Budi Santoso',
    company: 'PT Mega Solusi Nusantara',
    industry: 'telecom',
    riskLevel: 'Medium',
    potentialNeed: 'Potensi Kebutuhan Rekonsiliasi Otomatis BCA VA saat Jatuh Tempo Tahunan',
    aiObservation: 'Klien mengalami keterlambatan aktivasi akibat settlement manual menjelang tender penting.',
    recommendedAction: 'Jadwalkan aktivasi webhook BCA VA auto-reconciliation sebelum siklus invoice berikutnya.',
    dueDate: '2026-09-30',
    status: 'pending'
  },
  {
    id: 'pred-02',
    customerId: 'cust-bank-digital',
    customerName: 'Siti Rahmawati',
    company: 'Bank Digital Bersama',
    industry: 'banking',
    riskLevel: 'High',
    potentialNeed: 'Prediksi Lonjakan Panggilan 300% pada Periode Payroll Tanggal 25',
    aiObservation: 'Data historis 3 bulan terakhir menunjukkan lonjakan volume voice WebRTC hingga mendekati kapasitas batas trunk primer.',
    recommendedAction: 'Jadwalkan pre-alokasi bandwidth trunk sekunder pada H-2 tanggal payroll (23 September).',
    dueDate: '2026-09-23',
    status: 'scheduled'
  },
  {
    id: 'pred-03',
    customerId: 'cust-logistik-prima',
    customerName: 'Hendro Wijaya',
    company: 'PT Logistik Prima Express',
    industry: 'insurance',
    riskLevel: 'Medium',
    potentialNeed: 'Kebutuhan Klaim Asuransi Kargo Otomatis via API Webhook',
    aiObservation: 'Klien menanyakan dokumen klaim kehilangan berulang kali via email.',
    recommendedAction: 'Kirimkan tautan integrasi klaim digital otomatis yang langsung mengunggah foto resi.',
    dueDate: '2026-10-05',
    status: 'pending'
  }
];

// =========================================================================
// WORKFORCE MANAGEMENT & AGENT SCHEDULING
// =========================================================================

export const MOCK_WORKFORCE_DATA = {
  shifts: [
    { name: 'Shift Pagi (08:00 - 17:00)', activeAgents: ['Andi Wijaya', 'Siti Rahmawati', 'Budi Pratama'] },
    { name: 'Shift Siang (13:00 - 21:00)', activeAgents: ['Dewi Lestari', 'Rian Ardiansyah'] },
    { name: 'On-Call Weekend (24/7 Standby)', activeAgents: ['Andi Wijaya (Technical)', 'Rian Ardiansyah'] }
  ],
  workloadDistribution: [
    { agentName: 'Andi Wijaya (CS A)', activeTickets: 7, capacity: 10, status: 'Optimal' },
    { agentName: 'Siti Rahmawati (CS B)', activeTickets: 4, capacity: 10, status: 'Underutilized' },
    { agentName: 'Budi Pratama (CS C)', activeTickets: 9, capacity: 10, status: 'High Load' },
    { agentName: 'Dewi Lestari (CS D)', activeTickets: 3, capacity: 6, status: 'Optimal' },
    { agentName: 'Rian Ardiansyah (CS E)', activeTickets: 5, capacity: 8, status: 'Optimal' }
  ],
  aiDelegationAdvice: 'Budi Pratama (CS C) menangani 9 tiket aktif mendekati kapasitas maksimal. Disarankan mendelegasikan 2 tiket Product Inquiry ke Siti Rahmawati (CS B) yang memiliki 4 tiket aktif.'
};

// =========================================================================
// SELF-SERVICE CUSTOMER PORTAL DATASET
// =========================================================================

export const MOCK_CUSTOMER_INVOICES: CustomerInvoice[] = [
  { id: 'inv-01', invoiceNumber: 'INV-2026-0881', date: '01 Agustus 2026', amount: 'Rp 4.500.000', status: 'paid', product: 'Onebox CRM Enterprise (50 Agen)' },
  { id: 'inv-02', invoiceNumber: 'INV-2026-0740', date: '01 Juli 2026', amount: 'Rp 4.500.000', status: 'paid', product: 'Onebox CRM Enterprise (50 Agen)' },
  { id: 'inv-03', invoiceNumber: 'INV-2026-0612', date: '01 Juni 2026', amount: 'Rp 4.500.000', status: 'paid', product: 'Onebox CRM Enterprise (50 Agen)' },
  { id: 'inv-04', invoiceNumber: 'INV-2026-0910', date: '01 September 2026', amount: 'Rp 4.500.000', status: 'pending', product: 'Onebox CRM Enterprise (50 Agen)' }
];

export const MOCK_SERVICE_BOOKINGS: ServiceBooking[] = [
  { id: 'bk-01', bookingCode: 'SRV-5541', serviceType: 'Kunjungan On-Site Arsitek Solusi Ciptadra', appointmentDate: '24 September 2026, 10:00 WIB', technicianName: 'Fahmi Reza (Solutions Architect)', status: 'confirmed', notes: 'Review integrasi middleware SAP ERP dan webhook CRM di kantor pusat Jakarta.' },
  { id: 'bk-02', bookingCode: 'SRV-4812', serviceType: 'Audit Keamanan & Penetrasi Gateway API', appointmentDate: '15 Agustus 2026, 14:00 WIB', technicianName: 'Agus Setiawan (Security Engineer)', status: 'completed', notes: 'Audit sertifikasi enkripsi mTLS berhasil lolos pengujian tanpa celah keamanan.' }
];

export const MOCK_COMMUNITY_POSTS: CommunityForumPost[] = [
  { id: 'post-01', author: 'Budi Santoso', authorCompany: 'PT Mega Solusi', title: 'Tips Menghubungkan Onebox Webhook ke Dashboard Metabase Internal', category: 'Tutorial & Integrasi', repliesCount: 14, likesCount: 38, timestamp: Date.now() - 5 * 86400 * 1000, isSolved: true },
  { id: 'post-02', author: 'Dr. Firman', authorCompany: 'Klinik Sehat', title: 'Format CSV Paling Efisien untuk Export Log Pasien Telemedicine', category: 'Best Practice', repliesCount: 8, likesCount: 21, timestamp: Date.now() - 9 * 86400 * 1000, isSolved: true },
  { id: 'post-03', author: 'Kevin Sanjaya', authorCompany: 'PT Finnet Payment', title: 'Cara Setting SSL Handshake pada Sandbox Callback Endpoint', category: 'Developer Q&A', repliesCount: 19, likesCount: 45, timestamp: Date.now() - 14 * 86400 * 1000, isSolved: true }
];

export const MOCK_FEEDBACK_SUBMISSIONS: FeedbackSubmission[] = [
  { id: 'fb-01', customerName: 'Budi Santoso (PT Mega Solusi)', category: 'Feature Request', content: 'Mohon ditambahkan fitur auto-reconciliation langsung dengan bank BCA/Mandiri agar akun tidak ter-suspend saat jeda settlement akhir pekan.', timestamp: Date.now() - 4 * 86400 * 1000, votes: 42 },
  { id: 'fb-02', customerName: 'Siti Rahmawati (Bank Digital)', category: 'Usability', content: 'Fitur 1-klik switch SIP Trunk di Agent Workspace sangat membantu saat insiden telephony. Mohon dipertahankan dan ditambahkan log indikator latensi real-time.', timestamp: Date.now() - 7 * 86400 * 1000, votes: 35 }
];

// =========================================================================
// INDUSTRY CONFIGURATION PRESETS
// =========================================================================

export const INDUSTRY_PRESETS: Record<IndustryDomain, {
  name: string;
  badge: string;
  keyTerminology: string[];
  sampleWorkflows: string[];
  regulatoryContext: string;
}> = {
  all: {
    name: 'Semua Sektor Industri',
    badge: 'Lintas Sektor & Enterprise',
    keyTerminology: ['Omnichannel', 'AI Classification', 'Agent Assist', 'Speech Analytics', 'ISO 27001', 'SLA Adherence'],
    sampleWorkflows: ['Triage Tiket Otomatis', 'Speech-to-Text Analytics', 'Preskriptif Customer Journey'],
    regulatoryContext: 'Standar Tata Kelola Operasional Enterprise & Privasi Data UU PDP'
  },
  telecom: {
    name: 'Telecommunications & ISP',
    badge: 'Telephony & Network SLA',
    keyTerminology: ['WebRTC Signaling', 'SIP 503 Outage', 'PBX Hunting Line', 'Bandwidth Quota', 'FTTH Latency', 'WABA Green Tick'],
    sampleWorkflows: ['Secondary Trunk Failover', 'Provisioning Kuota Darurat', 'Eskalasi NOC 24/7'],
    regulatoryContext: 'Kepatuhan Regulasi Kominfo & Standar Ketersediaan Jaringan 99.9%'
  },
  insurance: {
    name: 'Insurance & Healthcare',
    badge: 'Policy & Claim Automation',
    keyTerminology: ['Klaim Kargo', 'Polis Tahunan', 'Premi Asuransi', 'Grace Period', 'Plafon Klaim', 'Underwriting'],
    sampleWorkflows: ['Verifikasi Foto Bukti Klaim', 'Notifikasi Jatuh Tempo Polis', 'Fast-Track Otorisasi Rawat Inap'],
    regulatoryContext: 'Kepatuhan Regulasi OJK IKNB & Standar Perlindungan Data Medis Pasien'
  },
  banking: {
    name: 'Banking & Financial Technology',
    badge: 'Core Banking & Payment Gateway',
    keyTerminology: ['BCA Virtual Account', 'Settlement Batch', 'mTLS Enkripsi', 'ESB Gateway 504', 'Rekonsiliasi Mutasi', 'Fraud Alert'],
    sampleWorkflows: ['Buka Blokir Akses Transaksi', 'Rekonsiliasi Otomatis Settlement', 'Eskalasi Investigasi Transfer Gagal'],
    regulatoryContext: 'Standar Keamanan Bank Indonesia (BI), OJK & ISO/IEC 27001'
  },
  ecommerce: {
    name: 'E-Commerce & Digital Retail',
    badge: 'Order Tracking & Logistics',
    keyTerminology: ['Resi Otomatis', 'Pengembalian Dana (Refund)', 'Retur Barang', 'Stok Gudang', 'Chatbot CSAT', 'Flash Sale'],
    sampleWorkflows: ['Pembatalan Pesanan Otomatis', 'Penerbitan Voucher Retur', 'Pelacakan Status Kurir Real-Time'],
    regulatoryContext: 'Peraturan Perlindungan Konsumen Perdagangan Elektronik (Kemendag RI)'
  },
  education: {
    name: 'Higher Education & EdTech',
    badge: 'Campus Admissions & Student Portal',
    keyTerminology: ['Pendaftaran Mahasiswa', 'Biaya Kuliah (UKT)', 'Kartu Rencana Studi (KRS)', 'Open House', 'Beasiswa Prestasi'],
    sampleWorkflows: ['Kirim Informasi Jalur Beasiswa Otomatis', 'Verifikasi Dokumen Ijazah', 'Jadwal Konsultasi Dosen Wali'],
    regulatoryContext: 'Standar Akreditasi Pendidikan Tinggi Kemendikbudristek'
  }
};

// =========================================================================
// ALIAS EXPORTS FOR ROLE-BASED WORKSPACES & DRAWERS
// =========================================================================

export const MOCK_AGENT_PERFORMANCE: AgentPerformanceRecord[] = MOCK_AGENTS_PERFORMANCE.map((ag) => ({
  ...ag,
  agentId: ag.id,
  agentName: ag.name,
  agentCode: ag.code,
  openTicketsCount: ag.code === 'CS A' ? 4 : ag.code === 'CS B' ? 3 : 5,
  resolvedToday: ag.ticketsHandledToday,
  slaAdherencePct: ag.slaComplianceRate,
  fcrPct: ag.code === 'CS A' ? 82.5 : ag.code === 'CS B' ? 88.0 : 84.0,
  avgHandlingTimeMinutes: ag.avgHandlingTimeMin,
  weakSpotAreas: ag.code === 'CS A' ? ['WebRTC SIP Trunk Diagnostics', 'Secondary Trunk Failover'] : ['SLA Escalation Reversal'],
  coachingRecommendation: ag.code === 'CS A' 
    ? 'Fokus pada adopsi tool 1-klik AI Failover di Agent Workspace untuk mereduksi handling time dari 24m menjadi < 15m.'
    : 'Penyegaran negosiasi penawaran hybrid renewal bagi klien perbankan dan logistik.'
}));

export const MOCK_TRAINING_PLANS: SupervisorTrainingPlan[] = INITIAL_TRAINING_PLANS.map((tp) => ({
  ...tp,
  description: tp.notes,
  estimatedHours: 4,
  dueDate: tp.targetDate
}));

export const MOCK_AI_ACTIVITY_LOG = MOCK_AI_ACTIVITY_LOGS.map((act) => ({
  id: act.id,
  timestamp: act.timestamp,
  action: act.decision === 'auto_answered' ? `AI Auto-Answer [${act.channel}]` : `AI Ticket Triage [${act.assignedDepartment || 'CS Desk'}]`,
  details: act.decisionReason,
  actor: 'Ciptadra AI Kernel'
}));

export const MOCK_EXECUTIVE_SUMMARY = {
  keyIncidents: MOCK_SUPERVISOR_EXECUTIVE_SUMMARY.keyHighlights[0] || 'SIP 503 Outage WebRTC berhasil di-failover ke secondary trunk dalam 2.4 menit.',
  rootCause: MOCK_SUPERVISOR_EXECUTIVE_SUMMARY.topBottlenecks[0] || 'Lonjakan 34% tiket Billing pasca settlement batch perbankan BCA VA.',
  actionItems: MOCK_SUPERVISOR_EXECUTIVE_SUMMARY.coachingRecommendations[0] || 'Tugaskan modul SOP Failover SIP Trunk untuk CS A Andi Wijaya.'
};

export const MOCK_INITIAL_TICKETS: Ticket[] = INITIAL_TICKETS.map((t) => ({
  ...t,
  customerName: t.customer?.name || 'Pelanggan Enterprise',
  companyName: t.customer?.company || 'Korporasi',
  customerComplaint: t.initialComplaint,
  priority: t.classification?.priority || 'Medium',
  category: t.classification?.category || 'Technical Support',
  slaRemainingMinutes: t.classification?.slaHours ? t.classification.slaHours * 60 - 20 : 45,
  assignedAgent: t.ticketNumber === 'TKT-8402' ? 'CS B' : t.ticketNumber === 'TKT-8403' ? 'CS A' : 'Unassigned',
  aiClassification: {
    category: t.classification?.category || 'Technical Support',
    priority: t.classification?.priority || 'Medium',
    confidence: t.classification?.confidenceScore || 0.95,
    sentiment: t.classification?.sentiment || 'Neutral',
    urgencyKeywords: ['downtime', 'urgent', 'settlement', 'failover'],
    routingReason: t.classification?.reasoning || 'Otomatis dianalisis oleh Ciptadra AI Classifier',
    suggestedResponse: t.agentDraftResponse || 'Terima kasih atas laporan Anda. Tim teknis CiptadraSoft sedang memproses mitigasi.',
    recommendedRouting: t.ticketNumber === 'TKT-8403' ? 'CS A (Technical Specialist)' : 'CS B (Billing Specialist)'
  }
}));

export const MOCK_CUSTOMER_360_LIST: CustomerProfile360[] = [
  MOCK_CUSTOMER_360,
  {
    id: 'cust-bank-digital',
    name: 'Siti Rahmawati',
    company: 'Bank Digital Bersama',
    email: 'siti.rahma@bankdigital.id',
    phone: '+62 811-9876-5432',
    slaTier: 'Enterprise Platinum',
    activeSince: 'Januari 2022 (2.5 Tahun)',
    totalTickets: 32,
    resolvedRate: 96.8,
    averageCsat: 4.9,
    sentimentTrend: 'Positive',
    productsInUse: ['Onebox Contact Center (200 Agen)', 'Telephony SIP Trunk HA', 'Flow BPM Enterprise'],
    recentTouchpoints: [],
    aiInsights: {
      churnRisk: 'Low',
      recommendedNextStep: 'Presentasikan modul AI Speech Analytics untuk tim QA perbankan.',
      recurringIssuePatterns: ['Peningkatan call traffic saat tanggal gajian']
    }
  }
];

export const MOCK_KNOWLEDGE_RECOMMENDATIONS: KnowledgeRecommendation[] = [
  {
    id: 'kb-01',
    title: 'SOP Rekonsiliasi Settlement Virtual Account BCA & Mandiri',
    category: 'Billing & Payment',
    summary: 'Prosedur pembukaan blokir darurat (grace period 24 jam) bagi akun korporasi yang tertahan delay mutasi bank.',
    relevanceScore: 98,
    recommendedReplySnippet: 'Yth. Bapak/Ibu, kami telah mengaktifkan Akses Darurat (Grace Period 24 Jam) agar tim Anda dapat langsung beroperasi kembali sementara mutasi BCA VA kami selesaikan.'
  },
  {
    id: 'kb-02',
    title: 'Troubleshooting SIP 503 WebRTC & Trunk Failover',
    category: 'Technical Support',
    summary: 'Langkah cepat failover ke secondary SIP Trunk dan verifikasi firewall port 5060 UDP untuk memulihkan 20+ agen.',
    relevanceScore: 96,
    recommendedReplySnippet: 'Mohon lakukan verifikasi switch trunk ke Secondary SIP Gateway di menu Settings > Telephony. Downtime akan terpulihkan dalam < 2 menit.'
  },
  {
    id: 'kb-03',
    title: 'Panduan Integrasi REST API & Sandbox Webhook Callback',
    category: 'Technical Support',
    summary: 'Spesifikasi teknis verifikasi handshake SSL dan IP Whitelist untuk callback endpoint developer sandbox.',
    relevanceScore: 92,
    recommendedReplySnippet: 'Pastikan endpoint callback Anda telah memasukkan IP 103.24.18.0/24 ke daftar whitelist firewall dan sertifikat SSL valid.'
  },
  {
    id: 'kb-04',
    title: 'Prosedur Penawaran Kontrak Retensi & Diskon Multi-Year',
    category: 'Complaint / Escalation',
    summary: 'Pedoman penawaran paket hybrid on-premise dan termin pembayaran lunak untuk mencegah churn klien korporasi.',
    relevanceScore: 89,
    recommendedReplySnippet: 'Kami menawarkan opsi termin pembayaran 30 hari dan diskon perpanjangan 15% untuk paket tahunan perusahaan Anda.'
  }
];


