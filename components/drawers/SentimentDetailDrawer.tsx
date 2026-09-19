'use client';

import React, { useState } from 'react';
import {
  X,
  Share2,
  Heart,
  MessageCircle,
  Repeat2,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { ContentSentimentItem } from '@/types/chatbot';

interface SentimentDetailDrawerProps {
  isOpen: boolean;
  item: ContentSentimentItem | null;
  onClose: () => void;
  onDraftResponse?: (item: ContentSentimentItem) => void;
}

export const SentimentDetailDrawer: React.FC<SentimentDetailDrawerProps> = ({
  isOpen,
  item,
  onClose,
  onDraftResponse
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformBadge = (plat: string) => {
    switch (plat) {
      case 'LinkedIn':
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300';
      case 'Instagram':
        return 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300';
      case 'Twitter/X':
        return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200';
      case 'TikTok':
        return 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold text-xs text-slate-900 dark:text-white">
                Analisis Sentimen Media Sosial
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Post meta */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${getPlatformBadge(
                    item.platform
                  )}`}
                >
                  {item.platform}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(item.timestamp).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <h3 className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans bg-white p-2.5 rounded-lg border border-slate-200/80 dark:bg-slate-900 dark:border-slate-700">
                &ldquo;{item.caption}&rdquo;
              </p>

              {/* Engagement counts */}
              <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-500" />
                  {item.likes.toLocaleString()} Likes
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5 text-blue-500" />
                  {item.comments.toLocaleString()} Komentar
                </span>
                <span className="flex items-center gap-1">
                  <Repeat2 className="h-3.5 w-3.5 text-emerald-500" />
                  {item.shares.toLocaleString()} Shares
                </span>
              </div>
            </div>

            {/* Sentiment Breakdown Bar */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>Distribusi Sentimen Netizen</span>
                <span className="text-emerald-600 font-bold">
                  {item.sentimentBreakdown.positive}% Positif
                </span>
              </div>

              {/* Stacked bar */}
              <div className="flex h-3 w-full rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 transition-all"
                  style={{ width: `${item.sentimentBreakdown.positive}%` }}
                  title={`Positif: ${item.sentimentBreakdown.positive}%`}
                />
                <div
                  className="bg-slate-300 dark:bg-slate-600 transition-all"
                  style={{ width: `${item.sentimentBreakdown.neutral}%` }}
                  title={`Netral: ${item.sentimentBreakdown.neutral}%`}
                />
                <div
                  className="bg-rose-500 transition-all"
                  style={{ width: `${item.sentimentBreakdown.negative}%` }}
                  title={`Negatif: ${item.sentimentBreakdown.negative}%`}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>Positif ({item.sentimentBreakdown.positive}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  <span>Netral ({item.sentimentBreakdown.neutral}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  <span>Negatif ({item.sentimentBreakdown.negative}%)</span>
                </div>
              </div>
            </div>

            {/* Keyword signals */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <span className="text-[10px] font-semibold uppercase text-emerald-800 dark:text-emerald-300">
                  Kata Kunci Positif
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.keywords.positive.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-white px-2 py-0.5 text-[10px] font-medium text-emerald-700 shadow-2xs dark:bg-slate-900 dark:text-emerald-300 border border-emerald-200/60"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 dark:border-rose-900/40 dark:bg-rose-950/20">
                <span className="text-[10px] font-semibold uppercase text-rose-800 dark:text-rose-300">
                  Pain Points & Komplain
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.keywords.negative.length > 0 ? (
                    item.keywords.negative.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-medium text-rose-700 shadow-2xs dark:bg-slate-900 dark:text-rose-300 border border-rose-200/60"
                      >
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400">Tidak ada komplain mayor</span>
                  )}
                </div>
              </div>
            </div>

            {/* AI Prescriptive Insight */}
            <div className="rounded-xl border border-purple-200 bg-purple-50/30 p-4 dark:border-purple-900/40 dark:bg-purple-950/20 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-950 dark:text-purple-300">
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Rekomendasi Preskriptif AI untuk Marketing</span>
              </div>

              <div className="rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-800 shadow-xs dark:bg-slate-900 dark:text-slate-200 border border-purple-100 dark:border-purple-900/40 space-y-1.5">
                <div>
                  <span className="font-semibold text-purple-900 dark:text-purple-300">
                    Fokus Percakapan:
                  </span>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.aiInsight.discussionFocus}
                  </span>
                </div>

                {item.aiInsight.identifiedIssue && (
                  <div>
                    <span className="font-semibold text-rose-700 dark:text-rose-400">
                      Isu yang Perlu Diperhatikan:
                    </span>{' '}
                    <span className="text-slate-600 dark:text-slate-300">
                      {item.aiInsight.identifiedIssue}
                    </span>
                  </div>
                )}

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Tindakan Preskriptif:
                  </span>{' '}
                  <span className="text-slate-700 dark:text-slate-200">
                    {item.aiInsight.prescriptiveRecommendation}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopyText(
                    `Rekomendasi Preskriptif untuk [${item.platform} - ${item.title}]:\n${item.aiInsight.prescriptiveRecommendation}`
                  )
                }
                className="w-full rounded-lg bg-purple-600 py-2 text-center text-xs font-semibold text-white hover:bg-purple-700 transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Rekomendasi Tersalin' : 'Salin Arahan Kampanye'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
