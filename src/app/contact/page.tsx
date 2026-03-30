import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { generateWebPageSchema, SITE_URL } from '@/lib/seo';
import { Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — DebtMeltPro',
  description:
    'Get in touch with the DebtMeltPro team. Report bugs, suggest new tools, or ask questions about our free financial calculators.',
  keywords: ['contact DebtMeltPro', 'financial calculator support'],
  alternates: { canonical: `${SITE_URL}/contact` },
};

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: 'General Inquiries',
    description: 'Questions about our tools, partnership opportunities, or feedback.',
    email: 'support@debtmeltpro.com',
  },
  /*
  {
    icon: AlertTriangle,
    title: 'Bug Reports',
    description: 'Found a calculation error or technical issue? Let us know.',
    email: 'bugs@debtmeltpro.com',
  },
  {
    icon: MessageSquare,
    title: 'Feature Requests',
    description: 'Have an idea for a new calculator or improvement?',
    email: 'features@debtmeltpro.com',
  }, */
] as const;

export default function ContactPage() {
  const schema = generateWebPageSchema({
    title: 'Contact DebtMeltPro',
    description: 'Get in touch with the DebtMeltPro team.',
    url: `${SITE_URL}/contact`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumb items={[{ label: 'Contact', href: '/contact' }]} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Contact Us
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            We would love to hear from you. Whether you have found a bug, want to suggest a feature,
            or just want to say hello — reach out using one of the methods below.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {CONTACT_METHODS.map(({ icon: Icon, title, description, email }) => (
            <div
              key={title}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-950/50 shrink-0">
                <Icon className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{description}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Response Time</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We aim to respond to all inquiries within 48 hours during business days. Bug reports
            affecting calculation accuracy are treated as highest priority. For privacy-related
            requests (GDPR/CCPA), we respond within 30 days as required by law.
          </p>
        </div>

        <p className="mt-8 text-xs text-slate-400 text-center leading-relaxed">
          DebtMeltPro does not provide financial advice via email or any other channel.
          For personalized financial guidance, please consult a certified financial planner.
        </p>
      </div>
    </>
  );
}
