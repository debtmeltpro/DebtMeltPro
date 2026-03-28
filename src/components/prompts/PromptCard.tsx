'use client';

// ============================================================
// DebtFreedom — Prompt Card Component
// Interactive card with one-click copy, difficulty badges,
// AI model compatibility tags, and viral indicator.
// ============================================================

import { useState, useCallback } from 'react';
import { Copy, Check, Zap, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { PromptDef } from '@/lib/prompts';

interface PromptCardProps {
  prompt: PromptDef;
  showFull?: boolean;
}

const DIFFICULTY_STYLES = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
} as const;

export function PromptCard({ prompt, showFull = false }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = prompt.prompt;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [prompt.prompt]);

  if (!showFull) {
    // Compact card for grids/lists
    return (
      <Link
        href={`/prompts/${prompt.category}/${prompt.slug}`}
        className="group block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-2 mb-3">
          {prompt.isViral && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
              <Zap className="w-2.5 h-2.5" /> VIRAL
            </span>
          )}
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', DIFFICULTY_STYLES[prompt.difficulty])}>
            {prompt.difficulty}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {prompt.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
          {prompt.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {prompt.aiModels.slice(0, 3).map(model => (
              <span key={model} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                {model}
              </span>
            ))}
          </div>
          <span className="text-xs text-green-600 dark:text-green-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View →
          </span>
        </div>
      </Link>
    );
  }

  // Full prompt display with copy button
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {prompt.isViral && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
                <Zap className="w-3 h-3" /> Viral Prompt
              </span>
            )}
            <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', DIFFICULTY_STYLES[prompt.difficulty])}>
              {prompt.difficulty}
            </span>
          </div>
          <div className="flex gap-1.5">
            {prompt.aiModels.map(model => (
              <span key={model} className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-medium">
                {model}
              </span>
            ))}
          </div>
        </div>
        <h2 className="font-semibold text-lg text-slate-900 dark:text-white">
          {prompt.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {prompt.description}
        </p>
      </div>

      {/* Prompt Text */}
      <div className="relative">
        <div className="p-5 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Prompt Template
            </span>
            <button
              onClick={handleCopy}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900'
              )}
              aria-label={copied ? 'Copied!' : 'Copy prompt to clipboard'}
            >
              {copied ? (
                <><Check className="w-3.5 h-3.5" /> Copied!</>
              ) : (
                <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>
              )}
            </button>
          </div>
          <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
            {prompt.prompt}
          </pre>
        </div>
      </div>

      {/* Example Output */}
      {prompt.exampleOutput && (
        <div className="p-5 border-t border-slate-100 dark:border-slate-700">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Example AI Output
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
            &ldquo;{prompt.exampleOutput}&rdquo;
          </p>
        </div>
      )}

      {/* Related Tool CTA */}
      {prompt.relatedToolSlug && (
        <div className="p-5 border-t border-slate-100 dark:border-slate-700 bg-green-50 dark:bg-green-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                Verify with our free calculator
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Cross-check AI results with precise financial math
              </p>
            </div>
            <Link
              href={`/tools/${prompt.relatedToolSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
            >
              Open Calculator <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
