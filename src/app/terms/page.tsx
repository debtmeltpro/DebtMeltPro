import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'DebtMeltPro Terms of Service. Read our terms of use, disclaimers, and limitations of liability.',
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-slate-500 mb-8">Last Updated: <time dateTime="2026-08-23">August 23, 2026</time></p>

      <div className="space-y-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using DebtMeltPro ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the Service immediately.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
          <p>DebtMeltPro provides free, web-based financial calculators for educational and informational purposes. The Service includes debt payoff calculators, mortgage analysis tools, investment projection calculators, credit card optimization tools, loan calculators, and student loan comparison tools. All calculations execute locally on your device.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">3. Financial Disclaimer — IMPORTANT</h2>
          <div className="border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 text-amber-900 dark:text-amber-200">
            <p className="font-semibold mb-2">NOT FINANCIAL, TAX, OR LEGAL ADVICE</p>
            <p>The tools, calculators, and content provided by DebtMeltPro are for <strong>educational and informational purposes only</strong> and do not constitute financial, investment, tax, accounting, or legal advice. Results are mathematical estimates based solely on the inputs you provide.</p>
            <p className="mt-2">DebtMeltPro is not a registered investment advisor, broker-dealer, financial planner, tax advisor, or legal professional. You should consult with a licensed financial advisor, accountant, or attorney before making any financial decision.</p>
            <p className="mt-2">Actual results will vary based on interest rate changes, fees, lender terms, tax laws, market conditions, and individual circumstances not captured by these calculators.</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">4. Accuracy of Calculations</h2>
          <p>We strive to ensure our calculations are mathematically accurate using standard financial formulas. However, we make no warranty, express or implied, regarding the accuracy, completeness, or reliability of any calculation result. Calculator outputs are estimates only and should not be relied upon as the sole basis for any financial decision.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">5. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, DebtMeltPro and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service, including but not limited to: financial losses resulting from decisions made based on calculator results, errors or inaccuracies in calculations, or inability to access the Service.</p>
          <p className="mt-2">Our total liability to you for all claims shall not exceed the amount you paid to use the Service (which is $0, as the Service is free).</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">6. Permitted Use</h2>
          <p>You may use the Service for lawful, personal, non-commercial purposes. You may not: reverse engineer or attempt to extract source code, scrape or bulk-download content using automated tools, use the Service to provide commercial financial advisory services without our written consent, or attempt to circumvent any security measures.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">7. Third-Party Links & Disclaimers</h2>
          <p>The Service may contain informational links to external regulatory or educational resources (e.g., FTC, RBI). We do not control or endorse the content of external websites and are not responsible for their availability or policies.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">8. Intellectual Property</h2>
          <p>All content, tools, and design elements of DebtMeltPro are owned by or licensed to us and protected by applicable intellectual property laws. You may share links to our tools but may not reproduce, copy, or redistribute our content without written permission.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">9. Governing Law</h2>
          <p>These Terms are governed by applicable laws without regard to conflict of law principles. Any dispute arising out of or relating to these Terms shall be resolved in a court of competent jurisdiction.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">10. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Material changes will be indicated by updating the "Last Updated" date. Continued use of the Service after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">11. Contact</h2>
          <p>For inquiries regarding these Terms: support@debtmeltpro.com</p>
        </section>
      </div>
    </div>
  );
}
