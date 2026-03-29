import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon — DebtMeltPro',
  description: 'Melt Your Debt. Build Your Freedom.',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="maintenance-wrapper">
      <style>{`
        .maintenance-wrapper {
          position: fixed;
          inset: 0;
          font-family: 'Inter', -apple-system, sans-serif;
          background: #0a0f1e;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 60%);
          z-index: 0;
        }

        .container { position: relative; z-index: 1; text-align: center; padding: 2rem; max-width: 650px; }

        /* --- UPDATED LOGO STYLES --- */
        .logo {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 3rem;
        }

        .logo-icon {
          width: 56px;
          height: 56px;
          background: #22c55e;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(34,197,94,0.3);
        }

        .logo-text {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .logo-text span {
          color: #22c55e;
        }

        /* --- UI COMPONENTS --- */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          color: #22c55e;
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }

        h1 { font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 850; line-height: 1; margin-bottom: 1.5rem; letter-spacing: -0.04em; }
        .highlight { color: #22c55e; }

        .desc { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 3rem; max-width: 500px; margin-left: auto; margin-right: auto; }

        .progress-bar { height: 8px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 10px; overflow: hidden; }
        .progress-fill { height: 100%; width: 85%; background: #22c55e; border-radius: 10px; }
        
        .footer { margin-top: 4rem; font-size: 0.8rem; color: #475569; }
      `}</style>

      <div className="bg" />

      <div className="container">
        {/* Logo Section - Matches your image */}
        <div className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
              <polyline points="17 18 23 18 23 12"></polyline>
            </svg>
          </div>
          <div className="logo-text">
            Debt<span>MeltPro</span>
          </div>
        </div>

        <div className="badge">
          <div className="badge-dot" />
          System Launching Soon
        </div>

        <h1>Melt Your Debt.<br /><span className="highlight">Build Freedom.</span></h1>

        <p className="desc">
          The ultimate financial toolkit is almost ready. 
          Professional-grade calculators for Debt Payoff, FIRE, and Mortgages.
        </p>

        <div className="progress-section" style={{maxWidth: '300px', margin: '0 auto'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold'}}>
            <span>Launch Progress</span>
            <span>85%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        </div>

        <div className="footer">
          © 2025 DebtMeltPro · Secure Infrastructure
        </div>
      </div>
    </div>
  );
}