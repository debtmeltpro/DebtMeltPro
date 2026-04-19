import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { PromptCard } from '@/components/prompts/PromptCard';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import {
  PROMPTS, getPrompt, getCategory, getRelatedPrompts,
  generatePromptMetadata, generatePromptSchema, getAllPromptPaths,
} from '@/lib/prompts';
import { SITE_URL } from '@/lib/seo';
import { Lightbulb, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface Props {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  return getAllPromptPaths().map(p => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generatePromptMetadata(params.category, params.slug);
}

export default function PromptPage({ params }: Props) {
  const prompt = getPrompt(params.category, params.slug);
  const category = getCategory(params.category);
  if (!prompt || !category) notFound();

  const related = getRelatedPrompts(prompt.slug, 4);
  const howToSchema = generatePromptSchema(prompt);
/*
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: prompt.title,
    description: prompt.description,
    datePublished: `${prompt.dateAdded}T00:00:00Z`,
    dateModified: `${prompt.dateUpdated}T00:00:00Z`,
    author: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/prompts/${params.category}/${params.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '987',
    },

  };
*/
// Article schema. NOTE: aggregateRating removed — fabricated ratings on
// an Article parent violate Google's structured data policy AND trigger
// the "Invalid object type for field '<parent_node>'" GSC error.
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: prompt.title,
  description: prompt.description,
  datePublished: `${prompt.dateAdded}T00:00:00Z`,
  dateModified: `${prompt.dateUpdated}T00:00:00Z`,
  author: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: 'DebtMeltPro',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/prompts/${params.category}/${params.slug}`,
  },
  inLanguage: 'en-US',
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Breadcrumb items={[
        { label: 'AI Finance Prompts', href: '/prompts' },
        { label: category.shortTitle, href: `/prompts/${category.slug}` },
        { label: prompt.title, href: `/prompts/${params.category}/${params.slug}` },
      ]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href={`/prompts/${category.slug}`}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 transition-colors">
              {category.shortTitle}
            </Link>
            <span className="text-xs text-slate-400">
              Updated {new Date(prompt.dateUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
            {prompt.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {prompt.description}
          </p>
        </header>

        <AdSlotLeaderboard />

        {/* Full Prompt Card */}
        <div className="my-8">
          <PromptCard prompt={prompt} showFull />
        </div>

        {/* How to Use This Prompt */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" /> How to Use This Prompt
          </h2>
          <ol className="space-y-3">
            {[
              `Copy the prompt above using the "Copy Prompt" button`,
              `Replace all [BRACKETED] placeholders with your actual numbers`,
              `Open ${prompt.aiModels[0]} (or ${prompt.aiModels.slice(1).join(', ')}) and paste the prompt`,
              'Review the AI output and ask follow-up questions to refine',
              prompt.relatedToolSlug
                ? 'Verify key numbers with our free calculator for precision'
                : 'Save the output and revisit it weekly to track progress',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Pro Tips */}
        {prompt.tips.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
              Pro Tips for Better Results
            </h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
              <ul className="space-y-2">
                {prompt.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-amber-900 dark:text-amber-200">
                    <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Use Cases */}
        {prompt.useCases.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> Who Should Use This Prompt
            </h2>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
              <ul className="space-y-2">
                {prompt.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-green-500 mt-0.5 shrink-0">•</span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <AdSlotInContent />
        {/* Related Calculator CTA */}
        {prompt.relatedToolSlug && (
          <section className="mt-8 p-5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl">
            <h2 className="font-semibold text-green-900 dark:text-green-100 mb-2">Verify with Our Free Calculator</h2>
            <p className="text-sm text-green-800 dark:text-green-300 mb-3">
              After generating your AI output, verify key numbers with our free calculator for mathematical precision.
            </p>
            <Link href={`/tools/${prompt.relatedToolSlug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-green-700 dark:text-green-400 hover:text-green-800 transition-colors">
              Open Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {/* Related Prompts */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
              Related Finance Prompts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(p => (
                <PromptCard key={p.slug} prompt={p} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/prompts" className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors">
                Browse All {PROMPTS.length} Prompts <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        )}

        <p className="mt-10 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> AI-generated financial analysis is for educational purposes only.
          Always verify important calculations and consult a licensed financial professional before
          making financial decisions. Prompts are provided as-is with no guarantee of accuracy.
        </p>
      </div>
    </>
  );
}
