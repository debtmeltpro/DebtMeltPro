// ============================================================
// DebtMeltPro — Maintenance / Coming Soon Page
// src/app/maintenance/page.tsx
// ============================================================

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon — DebtMeltPro',
  description: 'DebtMeltPro is launching soon. Free financial calculators for debt payoff, mortgage, FIRE planning and more.',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0a0f1e;
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          /* Animated background */
          .bg {
            position: fixed;
            inset: 0;
            background: 
              radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.05) 0%, transparent 60%);
            z-index: 0;
          }

          .container {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
          }

          /* Logo */
          .logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 2.5rem;
          }

          .logo-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }

          .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
          }

          .logo-text span {
            color: #22c55e;
          }

          /* Badge */
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(34,197,94,0.1);
            border: 1px solid rgba(34,197,94,0.2);
            color: #22c55e;
            padding: 6px 16px;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
          }

          .badge-dot {
            width: 6px;
            height: 6px;
            background: #22c55e;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }

          /* Heading */
          h1 {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1rem;
            letter-spacing: -1px;
          }

          h1 .highlight {
            background: linear-gradient(135deg, #22c55e, #4ade80);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Description */
          .desc {
            color: #94a3b8;
            font-size: 1.05rem;
            line-height: 1.7;
            margin-bottom: 2.5rem;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
          }

          /* Tools list */
          .tools {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin-bottom: 2.5rem;
          }

          .tool-item {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.875rem;
            color: #cbd5e1;
            transition: border-color 0.2s;
          }

          .tool-item:hover {
            border-color: rgba(34,197,94,0.3);
          }

          .tool-icon {
            font-size: 1.1rem;
          }

          /* Progress bar */
          .progress-section {
            margin-bottom: 2.5rem;
          }

          .progress-label {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #64748b;
            margin-bottom: 8px;
          }

          .progress-bar {
            height: 6px;
            background: rgba(255,255,255,0.06);
            border-radius: 100px;
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            width: 85%;
            background: linear-gradient(90deg, #22c55e, #4ade80);
            border-radius: 100px;
            position: relative;
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% { opacity: 0.8; }
            50% { opacity: 1; }
            100% { opacity: 0.8; }
          }

          /* Notify form */
          .notify-section {
            margin-bottom: 2rem;
          }

          .notify-label {
            font-size: 0.85rem;
            color: #64748b;
            margin-bottom: 12px;
          }

          .notify-form {
            display: flex;
            gap: 8px;
            max-width: 400px;
            margin: 0 auto;
          }

          .notify-input {
            flex: 1;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #fff;
            padding: 10px 16px;
            border-radius: 10px;
            font-size: 0.875rem;
            outline: none;
            transition: border-color 0.2s;
          }

          .notify-input:focus {
            border-color: rgba(34,197,94,0.5);
          }

          .notify-input::placeholder {
            color: #475569;
          }

          .notify-btn {
            background: #22c55e;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            white-space: nowrap;
          }

          .notify-btn:hover {
            background: #16a34a;
          }

          /* Footer */
          .footer {
            font-size: 0.75rem;
            color: #334155;
          }

          .footer a {
            color: #475569;
            text-decoration: none;
          }

          .footer a:hover {
            color: #22c55e;
          }

          /* Floating cards decoration */
          .float-card {
            position: fixed;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 16px 20px;
            font-size: 0.75rem;
            color: #475569;
            animation: float 6s ease-in-out infinite;
          }

          .float-card-1 {
            top: 10%;
            left: 5%;
            animation-delay: 0s;
          }

          .float-card-2 {
            top: 15%;
            right: 5%;
            animation-delay: 2s;
          }

          .float-card-3 {
            bottom: 15%;
            left: 3%;
            animation-delay: 4s;
          }

          .float-card-4 {
            bottom: 20%;
            right: 3%;
            animation-delay: 1s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); opacity: 0.4; }
            50% { transform: translateY(-10px); opacity: 0.7; }
          }

          .card-value {
            font-size: 1.1rem;
            font-weight: 700;
            color: #22c55e;
            margin-bottom: 2px;
          }

          @media (max-width: 640px) {
            .float-card { display: none; }
            .tools { grid-template-columns: 1fr 1fr; }
          }
        `}</style>
      </head>
      <body>
        <div className="bg" />

        {/* Floating decoration cards */}
        <div className="float-card float-card-1">
          <div className="card-value">₹2,40,000</div>
          <div>Interest Saved</div>
        </div>
        <div className="float-card float-card-2">
          <div className="card-value">3.2 yrs</div>
          <div>Faster Payoff</div>
        </div>
        <div className="float-card float-card-3">
          <div className="card-value">🔥 FIRE</div>
          <div>In 18 years</div>
        </div>
        <div className="float-card float-card-4">
          <div className="card-value">₹0</div>
          <div>Always Free</div>
        </div>

        <div className="container">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">📉</div>
            <div className="logo-text">
              Debt<span>Melt</span>Pro
            </div>
          </div>

          {/* Badge */}
          <div className="badge">
            <div className="badge-dot" />
            Coming Soon
          </div>

          {/* Heading */}
          <h1>
            Melt Your Debt.<br />
            <span className="highlight">Build Your Freedom.</span>
          </h1>

          {/* Description */}
          <p className="desc">
            Free professional-grade financial calculators — Debt Payoff, 
            Mortgage vs Rent, FIRE Calculator, Credit Card Optimizer, 
            and Student Loan Refinance. Launching very soon.
          </p>

          {/* Tools */}
          <div className="tools">
            {[
              { icon: '❄️', name: 'Debt Payoff Engine' },
              { icon: '🏡', name: 'Rent vs Buy Pro' },
              { icon: '🔥', name: 'FIRE Calculator' },
              { icon: '💳', name: 'Credit Card Optimizer' },
              { icon: '🎓', name: 'Student Loan Refinance' },
            ].map((tool) => (
              <div key={tool.name} className="tool-item">
                <span className="tool-icon">{tool.icon}</span>
                <span>{tool.name}</span>
              </div>
            ))}
            <div className="tool-item">
              <span className="tool-icon">🌍</span>
              <span>Multi-Currency Support</span>
            </div>
          </div>

          {/* Progress */}
          <div className="progress-section">
            <div className="progress-label">
              <span>Launch Progress</span>
              <span>85%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" />
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            © 2025 DebtMeltPro · 
            <a href="/privacy-policy"> Privacy Policy</a> · 
            <a href="/terms"> Terms of Service</a>
          </div>
        </div>
      </body>
    </html>
  );
}
