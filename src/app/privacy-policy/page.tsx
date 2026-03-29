import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DebtFreedom Privacy Policy — GDPR and CCPA compliant. We explain what data we collect, how it\'s used, and your rights.',
  robots: { index: true, follow: false },
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `**Information You Do Not Provide:** DebtFreedom calculators operate entirely within your browser. No financial data you enter (balances, rates, income, debt amounts) is ever transmitted to our servers, stored in databases, or shared with any third party. All calculations occur locally on your device.

**Automatically Collected Information:** When you visit DebtFreedom, we automatically collect:
- Browser type and version, operating system
- Pages viewed, time spent, referring URLs
- IP address (anonymized where legally required)
- Device type (mobile, desktop, tablet)

This information is collected through cookies and web analytics tools (Google Analytics) to understand how users interact with our site.`,
  },
  {
    title: '2. Cookies and Tracking Technologies',
    content: `We use the following types of cookies:

**Essential Cookies:** Required for the site to function. Includes your cookie consent preference stored in localStorage. Cannot be disabled without affecting site functionality.

**Analytics Cookies:** Google Analytics (GA4) cookies that help us understand traffic patterns and improve the site. These cookies are only set after you provide explicit consent via our cookie banner.

**Advertising Cookies:** Google AdSense cookies that serve relevant advertisements. These are third-party cookies set by Google and governed by Google's Privacy Policy. Only activated with your consent.

**Your Choices:** You can manage cookie preferences through our cookie consent banner. You can also control cookies through your browser settings. Note that disabling cookies may affect site functionality.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use automatically collected data to:
- Analyze site traffic and user behavior to improve our tools
- Serve contextually relevant advertisements
- Monitor site performance and security
- Comply with legal obligations

We do NOT use your data to:
- Sell to third parties for marketing purposes
- Build individual user profiles for targeting
- Make automated decisions about your financial situation`,
  },
  {
    title: '4. Third-Party Services',
    content: `**Google Analytics:** We use GA4 to analyze site usage. Data is processed in accordance with Google's data processing terms. You can opt out at tools.google.com/dlpage/gaoptout.

**Google AdSense:** We display advertisements served by Google AdSense. Google uses cookies to serve ads based on prior visits. You can opt out at myaccount.google.com/data-and-privacy.

**Google Fonts:** Fonts are loaded from Google's CDN. Google may receive your IP address when fonts are loaded.

These services have their own privacy policies independent of ours.`,
  },
  {
    title: '5. Your Rights (GDPR / CCPA)',
    content: `Depending on your location, you have the following rights:

**GDPR (EU/EEA Residents):**
- Right to access personal data we hold about you
- Right to rectification of inaccurate data
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object to processing
- Rights related to automated decision-making

**CCPA (California Residents):**
- Right to know what personal information is collected
- Right to know whether personal information is sold or disclosed
- Right to opt-out of the sale of personal information
- Right to equal service and price (non-discrimination)

To exercise any of these rights, contact us at privacy@debtmeltpro.com. We respond within 30 days.

**Note:** Because our calculators do not collect or store any financial data you enter, we have minimal personal data to provide or delete in most cases.`,
  },
  {
    title: '6. Data Security',
    content: `We implement industry-standard security measures including:
- HTTPS encryption for all data in transit
- Content Security Policy (CSP) headers to prevent XSS attacks
- HTTP Strict Transport Security (HSTS) with preloading
- No storage of sensitive financial inputs on our servers
- Regular security audits and dependency updates`,
  },
  {
    title: '7. Data Retention',
    content: `Analytics data is retained for 14 months in Google Analytics, after which it is automatically deleted. Cookie consent preferences are stored in your browser's localStorage and are retained until you clear your browser data or withdraw consent.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `DebtFreedom is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected data from a child, contact us immediately at privacy@debtmeltpro.com.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy periodically. We will notify you of material changes by updating the "Last Updated" date below and, where appropriate, posting a notice on our site. Continued use of DebtFreedom after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '10. Contact Us',
    content: `For privacy inquiries, data requests, or to exercise your rights:

Email: privacy@debtmeltpro.com
Response time: Within 30 days of receiving your request.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Last Updated: <time dateTime="2024-01-15">January 15, 2024</time> · Effective Date: January 15, 2024
      </p>

      <div className="card p-6 mb-8 border-l-4 border-l-brand-500">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-2">Our Core Privacy Commitment</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          DebtFreedom is a privacy-first financial tool. The numbers you enter into our calculators
          — your debts, income, balances, and personal financial data — <strong>never leave your
          browser</strong>. No financial data is stored on our servers. This is by design, not policy.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map(({ title, content }) => (
          <section key={title}>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">{title}</h2>
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
              {content.split('\n\n').map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{
                  __html: para
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 dark:text-slate-200">$1</strong>')
                    .replace(/\n/g, '<br />')
                }} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
