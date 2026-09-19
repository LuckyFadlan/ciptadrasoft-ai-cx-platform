'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Trash2, 
  Sparkles, 
  Minimize2, 
  Maximize2,
  Expand,
  Shrink,
  Minus,
  Paperclip,
  FileText,
  Image as ImageIcon,
  UploadCloud,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { 
  ChatMessage as ChatMessageType, 
  Role, 
  ChatWindowMode, 
  FileAttachment 
} from '@/types/chatbot';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import { TypingIndicator } from './TypingIndicator';
import { trackEvent } from '@/lib/analytics';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  windowMode: ChatWindowMode;
  onSetWindowMode: (mode: ChatWindowMode) => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm Ciptadra AI. Ask me about CiptadraSoft's solutions, products, industries, services, or upload documents and screenshots to analyze.",
  timestamp: Date.now(),
};

// Built-in Sample Demo Attachments for 1-Click Testing
const DEMO_SAMPLE_ATTACHMENTS: FileAttachment[] = [
  {
    id: 'sample-doc-profile',
    name: 'Ciptadra-Profile-Overview.pdf',
    size: 2457600,
    type: 'application/pdf',
    category: 'document',
    textContent: `PT Ciptadra Software (CiptadraSoft) Profile Overview
Portofolio Solusi Utama:
1. Onebox CX & Contact Center Omnichannel: Platform komunikasi terpadu mendukung integrasi WhatsApp Business API, WebRTC telephony, Email, Webchat, dan Social Media dalam satu meja agen.
2. Ciptadra Flow BPM: Workflow automation engine berbasis BPMN 2.0 untuk approval matrix dan integrasi ERP.
3. Ciptadra Insight BI: Platform business intelligence real-time analitik dan pipeline data skala enterprise.
4. Core Enterprise Architecture: Sistem perbankan dan financial switching berstandar ISO/IEC.
Klien & Prestasi: Lebih dari 200 klien aktif di Indonesia (perbankan, e-commerce, telekomunikasi, pemerintahan) serta pasar ekspor di Hong Kong, Thailand, Spanyol, dan Tiongkok.`
  },
  {
    id: 'sample-img-sip',
    name: 'Screenshot-SIP-503-Error.png',
    size: 842000,
    type: 'image/png',
    category: 'image',
    dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    textContent: 'Tangkapan layar dashboard Onebox Contact Center menampilkan pesan kesalahan dialog pop-up merah: "SIP 503 Service Unavailable: Signaling Proxy Socket Timeout on WebRTC Inbound Queue. 20 Inbound Agents Disconnected."'
  },
  {
    id: 'sample-csv-tickets',
    name: 'Rekap-Keluhan-Pelanggan-2024.csv',
    size: 154000,
    type: 'text/csv',
    category: 'dataset',
    textContent: `Kategori_Keluhan,Jumlah_Tiket,Persentase,Kanal_Terbanyak,Rata_Rata_Resolusi_Menit
Billing & Payment,456,34%,WhatsApp,19
Technical Support,399,28%,Webchat,24
Account & Access,271,19%,Email,12
Product Inquiry,200,14%,Webchat,8
Complaint / Escalation,102,7%,WhatsApp,45
TOTAL,1428,100%,WhatsApp (54%),18.5`
  }
];

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  windowMode,
  onSetWindowMode,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatusText, setLoadingStatusText] = useState<string>('Thinking...');
  const [dynamicPrompts, setDynamicPrompts] = useState<string[]>([]);

  // Attachments State
  const [pendingAttachments, setPendingAttachments] = useState<FileAttachment[]>([]);
  const [conversationFiles, setConversationFiles] = useState<FileAttachment[]>([]);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputDocRef = useRef<HTMLInputElement>(null);
  const fileInputImgRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, isOpen]);

  // Handle Adding Native Files (Documents or Images)
  const processFiles = async (fileList: FileList | File[]) => {
    setUploadError(null);
    const newAttachments: FileAttachment[] = [];
    const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

    for (const file of Array.from(fileList)) {
      if (file.size > MAX_SIZE) {
        setUploadError(`File ${file.name} melebihi batas maksimal 20 MB.`);
        continue;
      }

      const isImage = file.type.startsWith('image/');
      const isCsv = file.name.endsWith('.csv') || file.type.includes('csv');
      const isText = file.type.startsWith('text/') || file.name.endsWith('.txt');
      const isDoc = file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.xlsx');

      if (!isImage && !isCsv && !isText && !isDoc) {
        setUploadError(`Format file ${file.name} tidak didukung. Gunakan PDF, DOCX, CSV, TXT, atau Gambar.`);
        continue;
      }

      try {
        let dataUrl: string | undefined;
        let textContent: string | undefined;

        if (isImage) {
          dataUrl = await readFileAsDataUrl(file);
        } else if (isCsv || isText) {
          textContent = await readFileAsText(file);
        } else {
          // For PDF/DOCX, extract dataUrl for base64 transmission
          dataUrl = await readFileAsDataUrl(file);
          textContent = `[Dokumen terlampir: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]`;
        }

        const att: FileAttachment = {
          id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          name: file.name,
          size: file.size,
          type: file.type || (isCsv ? 'text/csv' : 'application/octet-stream'),
          category: isImage ? 'image' : isCsv ? 'dataset' : 'document',
          dataUrl,
          textContent,
          status: 'ready'
        };

        newAttachments.push(att);
      } catch (err) {
        console.error('Error reading file:', err);
        setUploadError(`Gagal membaca file ${file.name}.`);
      }
    }

    if (newAttachments.length > 0) {
      setPendingAttachments((prev) => [...prev, ...newAttachments]);
      setIsAttachmentMenuOpen(false);
    }
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  // Add 1-Click Sample File
  const handleAddSampleFile = (sample: FileAttachment) => {
    setUploadError(null);
    setPendingAttachments((prev) => {
      if (prev.some((p) => p.name === sample.name)) return prev;
      return [...prev, sample];
    });
    setIsAttachmentMenuOpen(false);
  };

  const removePendingAttachment = (id: string) => {
    setPendingAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // Send Message Logic with Attachments & Progress Status
  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if ((!text && pendingAttachments.length === 0) || isLoading) return;

    const currentSendingAttachments = [...pendingAttachments];
    setPendingAttachments([]); // clear pending

    // Combine active files for conversation memory
    const updatedConversationFiles = [
      ...conversationFiles,
      ...currentSendingAttachments
    ].filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    setConversationFiles(updatedConversationFiles);

    const userMessage: ChatMessageType = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: text || (currentSendingAttachments.length > 0 ? `[Lampiran file: ${currentSendingAttachments.map((a) => a.name).join(', ')}]` : ''),
      timestamp: Date.now(),
      attachments: currentSendingAttachments.length > 0 ? currentSendingAttachments : undefined
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    // Dynamic realistic staged status transitions
    if (currentSendingAttachments.length > 0) {
      const hasImg = currentSendingAttachments.some((a) => a.category === 'image');
      setLoadingStatusText(hasImg ? 'Understanding image & visual context...' : 'Analyzing document & extracting data...');
    } else {
      setLoadingStatusText('Searching Ciptadra & Web knowledge...');
    }

    const timer1 = setTimeout(() => {
      setLoadingStatusText('Synthesizing grounded facts & citations...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setLoadingStatusText('Generating executive answer...');
    }, 2400);

    try {
      const payloadMessages = newMessages
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.role as Role,
          content: m.content,
          attachments: m.attachments
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          activeAttachments: updatedConversationFiles
        }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessageType = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: data.reply || "Ciptadra AI is temporarily unavailable. Please try again or contact our team.",
        timestamp: Date.now(),
        isError: Boolean(data.error),
        suggestedFollowUps: data.suggestedFollowUps,
        showLeadForm: data.showLeadForm,
        groundedSources: data.groundedSources,
        citations: data.citations,
        sourceBreakdown: data.sourceBreakdown
      };

      setMessages((prev) => [...prev, assistantMessage]);
      trackEvent('message_received', { isError: Boolean(data.error) });

      if (data.suggestedFollowUps && data.suggestedFollowUps.length > 0) {
        setDynamicPrompts(data.suggestedFollowUps);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessageType = {
        id: `msg_${Date.now()}_err`,
        role: 'assistant',
        content: "Ciptadra AI is temporarily unavailable. Please try again or contact our team.",
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
      setLoadingStatusText('Thinking...');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([
      {
        ...WELCOME_MESSAGE,
        timestamp: Date.now(),
      },
    ]);
    setDynamicPrompts([]);
    setPendingAttachments([]);
    setConversationFiles([]);
  };

  const retryLastMessage = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      sendMessage(lastUserMsg.content);
    }
  };

  // Dimensions based on windowMode
  const getContainerDimensions = () => {
    switch (windowMode) {
      case 'fullscreen':
        return 'w-full h-full rounded-2xl sm:rounded-3xl';
      case 'expanded':
        return 'w-[94vw] sm:w-[760px] md:w-[820px] h-[720px] max-h-[86vh] rounded-3xl';
      case 'compact':
      default:
        return 'w-[92vw] sm:w-[410px] h-[590px] sm:h-[620px] max-h-[85vh] rounded-3xl';
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        if (e.dataTransfer.files) {
          processFiles(e.dataTransfer.files);
        }
      }}
      className={`flex flex-col bg-white shadow-2xl border border-slate-200/90 overflow-hidden relative transition-all duration-300 ${getContainerDimensions()}`}
      style={{
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.2), 0 0 25px rgba(37, 99, 235, 0.15)',
      }}
    >
      {/* DRAG AND DROP OVERLAY */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-50 bg-blue-600/90 backdrop-blur-xs flex flex-col items-center justify-center text-white border-2 border-dashed border-white m-3 rounded-2xl animate-in fade-in">
          <UploadCloud className="w-14 h-14 mb-2 animate-bounce" />
          <p className="font-extrabold text-lg">Drop file here to analyze</p>
          <p className="text-xs text-blue-100 mt-1">Supports PDF, DOCX, TXT, CSV, XLSX, PNG, JPG (Max 20MB)</p>
        </div>
      )}

      {/* HEADER WITH 4-ACTION WINDOW CONTROLS */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Bot className="w-5 h-5 text-blue-200" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-900 rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white leading-tight">Ciptadra AI</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded font-medium">
                Online
              </span>
              {conversationFiles.length > 0 && (
                <span className="text-[10px] bg-blue-400/20 text-blue-200 border border-blue-400/30 px-1.5 py-0.2 rounded font-medium flex items-center gap-1">
                  <FileText className="w-2.5 h-2.5" />
                  <span>{conversationFiles.length} file in memory</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-blue-200/80">AI Customer Experience Assistant</p>
          </div>
        </div>

        {/* HEADER CONTROLS: [−] Minimize, [□] Expand, [⛶] Fullscreen, [Trash], [×] Close */}
        <div className="flex items-center gap-1">
          {/* [−] MINIMIZE */}
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Minimize to button [−]"
            aria-label="Minimize"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* [□] EXPAND / RESTORE */}
          <button
            onClick={() => {
              if (windowMode === 'expanded') {
                onSetWindowMode('compact');
              } else {
                onSetWindowMode('expanded');
              }
            }}
            className={`p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer ${
              windowMode === 'expanded' ? 'text-white bg-white/20' : ''
            }`}
            title={windowMode === 'expanded' ? 'Restore to compact' : 'Expand window [□]'}
            aria-label="Expand"
          >
            {windowMode === 'expanded' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* [⛶] FULLSCREEN / RESTORE */}
          <button
            onClick={() => {
              if (windowMode === 'fullscreen') {
                onSetWindowMode('compact');
              } else {
                onSetWindowMode('fullscreen');
              }
            }}
            className={`p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer ${
              windowMode === 'fullscreen' ? 'text-white bg-white/20' : ''
            }`}
            title={windowMode === 'fullscreen' ? 'Exit fullscreen' : 'Fullscreen workspace [⛶]'}
            aria-label="Fullscreen"
          >
            {windowMode === 'fullscreen' ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
          </button>

          {/* CLEAR CONVERSATION */}
          <button
            onClick={handleClearConversation}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* [×] CLOSE */}
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Close chatbot [×]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BODY: Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50/60 flex flex-col justify-between">
        <div>
          {/* Active Conversation Files Notice Badge */}
          {conversationFiles.length > 0 && (
            <div className="mb-3 p-2 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold">
                  Memori Dokumen Aktif ({conversationFiles.length}):
                </span>
                <span className="truncate max-w-[220px]">
                  {conversationFiles.map((f) => f.name).join(', ')}
                </span>
              </div>
              <button
                onClick={() => setConversationFiles([])}
                className="text-[10px] text-blue-600 hover:text-red-600 font-semibold"
                title="Hapus memori dokumen"
              >
                Reset Memori
              </button>
            </div>
          )}

          {/* Render all messages */}
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onRetry={msg.isError ? retryLastMessage : undefined}
            />
          ))}

          {/* Realistic Staged Typing Indicator */}
          {isLoading && (
            <div className="my-2 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 animate-pulse px-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{loadingStatusText}</span>
              </div>
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {!isLoading && (
          <div className="mt-4 pt-2 border-t border-slate-200/60">
            <SuggestedPrompts
              prompts={dynamicPrompts}
              onSelectPrompt={(prompt) => sendMessage(prompt)}
              disabled={isLoading}
            />
          </div>
        )}
      </div>

      {/* PRE-SEND ATTACHMENTS PREVIEW BAR */}
      {pendingAttachments.length > 0 && (
        <div className="px-3.5 py-2 bg-slate-100/90 border-t border-slate-200 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Lampiran Siap Kirim:
          </span>
          {pendingAttachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-2 p-1.5 pr-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs group"
            >
              {att.category === 'image' && att.dataUrl ? (
                <img src={att.dataUrl} alt={att.name} className="w-7 h-7 rounded-lg object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
              )}
              <div className="flex flex-col max-w-[130px]">
                <span className="truncate font-semibold text-slate-800 text-[11px]">{att.name}</span>
                <span className="text-[9px] text-slate-400">{(att.size / 1024).toFixed(1)} KB</span>
              </div>
              <button
                type="button"
                onClick={() => removePendingAttachment(att.id)}
                className="text-slate-400 hover:text-red-600 p-0.5 rounded-full hover:bg-slate-100"
                title="Hapus lampiran"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD ERROR NOTIFICATION */}
      {uploadError && (
        <div className="px-4 py-1.5 bg-red-50 text-red-700 text-xs border-t border-red-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="text-red-500 font-bold text-xs">✕</button>
        </div>
      )}

      {/* ATTACHMENT POPOVER MENU */}
      {isAttachmentMenuOpen && (
        <div className="p-3 bg-white border-t border-slate-200 shadow-xl space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="font-bold text-slate-800 text-xs">Pilih Tipe Unggahan (Maks 20MB)</span>
            <button onClick={() => setIsAttachmentMenuOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fileInputDocRef.current?.click()}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 transition-all text-left flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-[11px]">Upload Dokumen</div>
                <div className="text-[9px] text-slate-400">PDF, DOCX, CSV, TXT</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => fileInputImgRef.current?.click()}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/60 transition-all text-left flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-[11px]">Upload Gambar</div>
                <div className="text-[9px] text-slate-400">Screenshot, PNG, JPG</div>
              </div>
            </button>
          </div>

          {/* 1-CLICK DEMO SAMPLE FILES FOR INSTANT TESTING */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              ⚡ File Sampel Uji Coba Cepat (1-Click Test):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_SAMPLE_ATTACHMENTS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleAddSampleFile(sample)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 text-[10px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>{sample.name}</span>
                  <span className="text-blue-600 font-bold">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HIDDEN FILE INPUTS */}
      <input
        ref={fileInputDocRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,application/pdf,text/plain,text/csv"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={fileInputImgRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {/* FOOTER: Input Box & Attachment Button */}
      <div className="p-3 bg-white border-t border-slate-200/80 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-end gap-2 bg-slate-50 rounded-2xl p-2 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
        >
          {/* Attachment Toggle Button */}
          <button
            type="button"
            onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
              isAttachmentMenuOpen || pendingAttachments.length > 0
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title="Attach file or screenshot (PDF, CSV, Image)"
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <textarea
            ref={inputRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              pendingAttachments.length > 0
                ? 'Tanyakan tentang file ini (misal: "Jelaskan isi dokumen...", "Kenapa error ini muncul?")...'
                : 'Ask Ciptadra AI anything or attach file / screenshot...'
            }
            disabled={isLoading}
            className="flex-1 bg-transparent border-none resize-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none max-h-24 py-1 px-1 custom-scrollbar leading-snug"
          />

          <button
            type="submit"
            disabled={(!inputText.trim() && pendingAttachments.length === 0) || isLoading}
            className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
          <span>Enter to send, Shift + Enter for newline • Drag & drop supported</span>
          <span className="text-slate-400 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-blue-500" />
            <span>Multimodal AI Grounding</span>
          </span>
        </div>
      </div>
    </div>
  );
};
