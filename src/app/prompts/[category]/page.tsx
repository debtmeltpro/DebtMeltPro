import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { PromptCard } from '@/components/prompts/PromptCard';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import {
  PROMPT_CATEGORIES, getPromptsByCategory, getCategory,
  generatePromptCategoryMetadata,
} from '@/lib/prompts';

import { generateFaqSchema, generateWebPageSchema, SITE_URL } from '@/lib/seo';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return PROMPT_CATEGORIES.map(c => ({ category: c.slug }));
} 

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generatePromptCategoryMetadata(params.category);
}

export default function PromptCategoryPage({ params }: Props) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const prompts = getPromptsByCategory(params.category);
  const otherCategories = PROMPT_CATEGORIES.filter(c => c.slug !== params.category);

  const faqItems = [
    { q: `How do I use ${category.shortTitle.toLowerCase()} AI prompts?`, a: `Copy any prompt, replace the [BRACKETED] placeholders with your actual financial numbers, and paste into ChatGPT, Claude, or Gemini. The AI will generate personalized ${category.shortTitle.toLowerCase()} advice based on your inputs.` },
    { q: `Which AI model is best for ${category.shortTitle.toLowerCase()} prompts?`, a: `Both ChatGPT (GPT-4) and Claude work well for ${category.shortTitle.toLowerCase()} analysis. ChatGPT is slightly better for creative scenarios, while Claude excels at detailed step-by-step calculations.` },
    { q: 'Should I trust AI financial advice?', a: 'Use AI prompts as a starting point for research and planning, not as a substitute for professional advice. Always verify important calculations with our free calculators and consult a licensed financial advisor for major decisions.' },
  ];
  const faqSchema = generateFaqSchema(faqItems);
  const categoryPageSchema = generateWebPageSchema({
    title: category.title,
    description: category.metaDescription,
    url: `${SITE_URL}/prompts/${category.slug}`,

  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryPageSchema) }} />

      <Breadcrumb items={[
        { label: 'AI Finance Prompts', href: '/prompts' },
        { label: category.shortTitle, href: `/prompts/${category.slug}` },
      ]} />

      {/* Hero */}
      <section className={`bg-gradient-to-b ${category.gradient} to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" /> {prompts.length} Free Prompt{prompts.length !== 1 ? 's' : ''}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {category.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {category.description} Copy any prompt, customize it with your numbers, and paste into
            ChatGPT, Claude, or Gemini for instant personalized results.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>

      {/* Prompts Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prompts.map(prompt => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>

        {prompts.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Prompts coming soon for this category.</p>
          </div>
        )}
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {category.shortTitle} Prompts FAQ
        </h2>
        <div className="space-y-3">
          {faqItems.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-purple-600 transition-colors">
                {q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Other Categories */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
            Explore Other Prompt Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherCategories.map(cat => (
              <Link key={cat.slug} href={`/prompts/${cat.slug}`}
                className="group p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow text-center">
                <h3 className="font-semibold text-slate-900 dark:text-white text-xs group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {cat.shortTitle}
                </h3>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {getPromptsByCategory(cat.slug).length} prompts
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/prompts" className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors">
              View All Categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
