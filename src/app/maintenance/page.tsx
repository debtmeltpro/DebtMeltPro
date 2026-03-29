export default function MaintenancePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Coming Soon — DebtMeltPro</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0a0f1e;
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .wrapper {
            text-align: center;
            padding: 2rem;
            max-width: 580px;
            width: 100%;
          }
          .logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 2rem;
          }
          .logo-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
          }
          .logo-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
          }
          .logo-name span { color: #22c55e; }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(34,197,94,0.1);
            border: 1px solid rgba(34,197,94,0.25);
            color: #22c55e;
            padding: 6px 18px;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
          }
          .dot {
            width: 6px;
            height: 6px;
            background: #22c55e;
            border-radius: 50%;
            animation: blink 2s infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          h1 {
            font-size: 2.5rem;
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: -1px;
            margin-bottom: 1rem;
          }
          h1 em {
            font-style: normal;
            background: linear-gradient(135deg, #22c55e, #4ade80);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .desc {
            color: #94a3b8;
            font-size: 1rem;
            line-height: 1.75;
            margin-bottom: 2.5rem;
          }
          .tools-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 2.5rem;
            text-align: left;
          }
          .tool {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 10px;
            padding: 12px 14px;
            font-size: 0.85rem;
            color: #cbd5e1;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .progress-wrap { margin-bottom: 2rem; }
          .progress-top {
            display: flex;
            justify-content: space-between;
            font-size: 0.78rem;
            color: #64748b;
            margin-bottom: 8px;
          }
          .progress-bar {
            height: 5px;
            background: rgba(255,255,255,0.06);
            border-radius: 100px;
            overflow: hidden;
          }
          .progress-fill {
            height: 100%;
            width: 85%;
            background: linear-gradient(90deg, #22c55e, #4ade80);
            border-radius: 100px;
          }
          .footer { font-size: 0.75rem; color: #334155; }
          .footer a { color: #475569; text-decoration: none; }
          .footer a:hover { color: #22c55e; }
          @media (max-width: 480px) {
            h1 { font-size: 1.8rem; }
            .tools-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </head>
      <body>
        <div className="wrapper">
          <div className="logo">
            <div className="logo-icon">📉</div>
            <div className="logo-name">Debt<span>Melt</span>Pro</div>
          </div>
          <div className="badge">
            <div className="dot" />
            Coming Soon
          </div>
          <h1>Melt Your Debt.<br /><em>Build Your Freedom.</em></h1>
          <p className="desc">
            Free professional-grade financial calculators —
            Debt Payoff, Mortgage vs Rent, FIRE Calculator,
            Credit Card Optimizer and Student Loan Refinance.
            Launching very soon.
          </p>
          <div className="tools-grid">
            <div className="tool">❄️ Debt Payoff Engine</div>
            <div className="tool">🏡 Rent vs Buy Pro</div>
            <div className="tool">🔥 FIRE Calculator</div>
            <div className="tool">💳 Credit Card Optimizer</div>
            <div className="tool">🎓 Student Loan Refinance</div>
            <div className="tool">🌍 Multi-Currency Support</div>
          </div>
          <div className="progress-wrap">
            <div className="progress-top">
              <span>Launch Progress</span>
              <span>85%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" />
            </div>
          </div>
          <div className="footer">
            © 2025 DebtMeltPro &nbsp;·&nbsp;
            <a href="/privacy-policy">Privacy Policy</a>
            &nbsp;·&nbsp;
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </body>
    </html>
  );
}
