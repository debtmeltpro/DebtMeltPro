// ============================================================
// DebtMeltPro — Maintenance Page
// Shown when NEXT_PUBLIC_MAINTENANCE_MODE=true
// Matches the existing dark theme with green accents.
// ============================================================

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Maintenance — DebtMeltPro',
  description: 'DebtMeltPro is currently undergoing scheduled maintenance. We will be back shortly.',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }

          :root {
            --bg-primary: #0a0f1a;
            --bg-secondary: #111827;
            --bg-card: #1a2332;
            --green-400: #4ade80;
            --green-500: #22c55e;
            --green-600: #16a34a;
            --green-900: #14532d;
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            --border: #1e293b;
          }

          body {
            font-family: 'DM Sans', -apple-system, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
          }

          /* Animated background */
          .bg-grid {
            position: fixed;
            inset: 0;
            background-image:
              linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
            background-size: 60px 60px;
            animation: gridMove 20s linear infinite;
            pointer-events: none;
          }

          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }

          .bg-glow-1 {
            position: fixed;
            top: -200px;
            right: -200px;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            animation: float1 8s ease-in-out infinite;
            pointer-events: none;
          }

          .bg-glow-2 {
            position: fixed;
            bottom: -150px;
            left: -150px;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 70%);
            border-radius: 50%;
            animation: float2 10s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-30px, 30px) scale(1.1); }
          }

          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.05); }
          }

          .container {
            position: relative;
            z-index: 10;
            max-width: 580px;
            width: 100%;
            padding: 20px;
            text-align: center;
          }

          /* Logo */
          .logo {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 48px;
            animation: fadeDown 0.8s ease-out;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
            background: var(--green-500);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .logo-icon svg {
            width: 20px;
            height: 20px;
            color: white;
          }

          .logo-text {
            font-family: 'DM Sans', sans-serif;
            font-weight: 700;
            font-size: 22px;
            color: var(--text-primary);
          }

          .logo-text span {
            color: var(--green-400);
          }

          /* Wrench animation */
          .icon-wrap {
            margin-bottom: 32px;
            animation: fadeDown 0.8s ease-out 0.1s both;
          }

          .wrench-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05));
            border: 1px solid rgba(34, 197, 94, 0.2);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            animation: pulse 3s ease-in-out infinite;
          }

          .wrench-circle svg {
            width: 36px;
            height: 36px;
            color: var(--green-400);
            animation: wrenchTurn 4s ease-in-out infinite;
          }

          @keyframes wrenchTurn {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
          }

          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.1); }
            50% { box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
          }

          /* Typography */
          h1 {
            font-family: 'Playfair Display', serif;
            font-size: 40px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 16px;
            animation: fadeDown 0.8s ease-out 0.2s both;
          }

          h1 em {
            font-style: italic;
            color: var(--green-400);
          }

          .subtitle {
            font-size: 16px;
            color: var(--text-secondary);
            line-height: 1.7;
            margin-bottom: 40px;
            animation: fadeDown 0.8s ease-out 0.3s both;
          }

          /* Status card */
          .status-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            animation: fadeDown 0.8s ease-out 0.4s both;
          }

          .status-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 16px;
          }

          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #f59e0b;
            animation: blink 2s ease-in-out infinite;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }

          .status-label {
            font-size: 13px;
            font-weight: 600;
            color: #f59e0b;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }

          .progress-bar-bg {
            width: 100%;
            height: 4px;
            background: var(--bg-primary);
            border-radius: 4px;
            overflow: hidden;
          }

          .progress-bar {
            height: 100%;
            width: 60%;
            background: linear-gradient(90deg, var(--green-500), var(--green-400));
            border-radius: 4px;
            animation: progressAnim 3s ease-in-out infinite;
          }

          @keyframes progressAnim {
            0% { width: 20%; }
            50% { width: 80%; }
            100% { width: 20%; }
          }

          .status-info {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
          }

          .status-info-item {
            text-align: center;
          }

          .status-info-item .label {
            font-size: 11px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }

          .status-info-item .value {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
          }

          /* Contact */
          .contact {
            animation: fadeDown 0.8s ease-out 0.5s both;
          }

          .contact p {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 16px;
          }

          .contact a {
            color: var(--green-400);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
          }

          .contact a:hover {
            color: var(--green-500);
            text-decoration: underline;
          }

          .social-links {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-top: 16px;
          }

          .social-link {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            color: var(--text-muted);
          }

          .social-link:hover {
            border-color: var(--green-500);
            color: var(--green-400);
            transform: translateY(-2px);
          }

          .social-link svg {
            width: 18px;
            height: 18px;
          }

          /* Footer */
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 16px;
            text-align: center;
            font-size: 12px;
            color: var(--text-muted);
            border-top: 1px solid var(--border);
            background: rgba(10, 15, 26, 0.8);
            backdrop-filter: blur(8px);
          }

          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 640px) {
            h1 { font-size: 30px; }
            .subtitle { font-size: 14px; }
            .status-info { flex-direction: column; gap: 12px; }
          }
        `}} />
      </head>
      <body>
        {/* Background effects */}
        <div className="bg-grid" />
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />

        <div className="container">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div className="logo-text">
              Debt<span>MeltPro</span>
            </div>
          </div>

          {/* Wrench icon */}
          <div className="icon-wrap">
            <div className="wrench-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1>We&apos;re Making Things <em>Even Better</em></h1>

          <p className="subtitle">
            Our financial calculators are being upgraded with powerful new features.
            We&apos;ll be back online shortly — your data is safe and sound.
          </p>

          {/* Status card */}
          <div className="status-card">
            <div className="status-row">
              <div className="status-dot" />
              <span className="status-label">Maintenance in Progress</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar" />
            </div>
            <div className="status-info">
              <div className="status-info-item">
                <div className="label">Status</div>
                <div className="value">Upgrading</div>
              </div>
              <div className="status-info-item">
                <div className="label">Expected</div>
                <div className="value">~30 min</div>
              </div>
              <div className="status-info-item">
                <div className="label">Data</div>
                <div className="value">Safe ✓</div>
              </div>
            </div>
          </div>
         
          
        </div>

        {/* Footer */}
        <div className="footer">
          © {new Date().getFullYear()} DebtMeltPro. All calculators will be restored after maintenance.
        </div>
      </body>
    </html>
  );
}
