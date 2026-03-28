# DebtFreedom — Production-Ready Financial Platform

> **Stack:** Next.js 14 · TypeScript (Strict) · Tailwind CSS · Recharts · Framer Motion · Zustand · Zod

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local
# → Fill in your values (AdSense ID, GA4 ID, site URL)

# 3. Run development server
npm run dev
# → Open http://localhost:3000

# 4. Type check
npm run type-check

# 5. Run tests
npm test

# 6. Production build
npm run build
```

---

## 📁 Architecture (Atomic Design)

```
src/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout — fonts, metadata, JSON-LD
│   ├── page.tsx                  # Homepage — hero, tool grid, FAQ
│   ├── sitemap.ts                # Dynamic sitemap.xml
│   ├── robots.ts                 # robots.txt
│   ├── globals.css               # Design tokens, component classes
│   ├── tools/
│   │   ├── debt-payoff/          # ⭐ Debt Payoff Engine (benchmark tool)
│   │   │   ├── page.tsx          # Server: metadata, JSON-LD schema, FAQ
│   │   │   └── DebtPayoffCalculator.tsx  # Client: full interactive UI
│   │   ├── mortgage-calculator/  # Rent vs. Buy Pro
│   │   ├── compound-interest/    # FIRE Calculator
│   │   ├── credit-card-payoff/   # Minimum Payment Trap Optimizer
│   │   └── student-loan/         # Refinance Estimator
│   ├── privacy-policy/           # GDPR/CCPA compliant
│   └── terms/                    # Terms of Service with Finance disclaimer
│
├── components/
│   ├── atoms/                    # (extend: Button, Badge, Input atoms)
│   ├── molecules/
│   │   └── AdSlot.tsx            # CLS-safe AdSense integration
│   ├── organisms/                # (extend: ToolCard, StrategyPanel)
│   └── layout/
│       ├── Header.tsx            # Sticky nav, dark mode, mobile menu
│       ├── Footer.tsx            # Legal disclaimer, navigation
│       └── CookieConsent.tsx     # GDPR/CCPA banner
│
├── lib/
│   ├── math-engine/              # 🧮 Central financial formulas
│   │   ├── index.ts              # Barrel + shared formatters
│   │   ├── debt.ts               # Snowball/Avalanche/Hybrid algorithms
│   │   ├── mortgage.ts           # Rent vs. Buy with opportunity cost
│   │   ├── compound.ts           # FIRE + inflation-adjusted compounding
│   │   ├── credit-card.ts        # Minimum payment trap simulation
│   │   └── student-loan.ts       # Refinance break-even analysis
│   ├── validations/
│   │   └── schemas.ts            # Zod schemas — prevent NaN & ReDoS
│   ├── store/
│   │   └── app-store.ts          # Zustand — cookie consent, preferences
│   └── utils.ts                  # cn(), generateId(), safeParseFloat()
│
├── hooks/                        # (extend: useDebounce, useMediaQuery)
└── types/
    └── index.ts                  # All TypeScript interfaces & types
```

---

## 🧮 Math Engine Design

All financial formulas are **centralized** in `src/lib/math-engine/`. This means:
- Bug fixes propagate to all tools instantly
- Formulas are independently unit-tested
- No floating-point errors — uses `round2()` consistently
- ReDoS prevention — no regex in financial inputs

### Adding a New Calculator
1. Create `src/lib/math-engine/new-tool.ts` with your formula
2. Export from `src/lib/math-engine/index.ts`
3. Add Zod schema to `src/lib/validations/schemas.ts`
4. Create `src/app/tools/new-tool/page.tsx` + `NewToolCalculator.tsx`
5. Add to sitemap, nav links, and homepage tool grid

---

## 🔐 Security Features

| Feature | Implementation |
|---------|---------------|
| CSP Headers | `vercel.json` + `next.config.ts` |
| XSS Prevention | CSP + React's built-in escaping |
| ReDoS Prevention | Zod validation; no complex regex on user input |
| HSTS | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` |
| Clickjacking | `X-Frame-Options: DENY` |
| MIME Sniffing | `X-Content-Type-Options: nosniff` |
| No Data Storage | Financial inputs never leave the browser |

---

## ⚡ Performance Targets (Lighthouse)

| Metric | Target | Strategy |
|--------|--------|----------|
| Performance | ≥ 90 | Code splitting, font `display: swap`, image optimization |
| SEO | 100 | metadata, sitemap, robots, JSON-LD, canonical URLs |
| Accessibility | ≥ 95 | ARIA labels, keyboard nav, skip link, color contrast |
| Best Practices | ≥ 90 | HTTPS, CSP, no console errors |
| CLS | < 0.05 | Ad slot dimensions reserved, chart containers sized |
| LCP | < 2.5s | Preconnect to fonts/CDN, hero above fold |

---

## 💰 Monetization Setup

### Google AdSense Integration
1. Apply at https://adsense.google.com
2. Add your site URL and paste the AdSense script (already handled by `AdSlot.tsx`)
3. Set `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXX` in environment
4. Create ad units in AdSense dashboard and add slot IDs to `.env.local`

### Ad Slot Placements (High CTR Positions)
- **Leaderboard (728×90):** Below page header, above calculator — highest viewability
- **In-Content Rectangle (300×250):** Between calculator results and FAQ — intent-aligned
- **In-Article:** Within FAQ content — native feel, high engagement

### CLS Safety
All ad slots use `contain: layout size` and explicit `min-height` to prevent
layout shift before AdSense loads. This protects your Core Web Vitals score.

---

## 📋 Post-Launch Checklist: AdSense Approval

### ✅ Content Requirements (E-E-A-T)
- [x] Every tool has: How-to guide, Key Definitions, FAQ section
- [x] Financial disclaimer on every page footer
- [x] "Not Financial Advice" in footer AND tool pages
- [x] Privacy Policy (GDPR/CCPA compliant)
- [x] Terms of Service with finance-specific liability clauses
- [x] Cookie consent banner implemented

### ✅ Technical SEO (100/100 Score)
- [x] `<title>` and `<meta description>` on every page
- [x] `sitemap.xml` auto-generated at `/sitemap.xml`
- [x] `robots.txt` at `/robots.txt`
- [x] JSON-LD schema: `FinancialProduct` + `SoftwareApplication`
- [x] FAQ schema on homepage for rich snippets
- [x] Open Graph + Twitter Card meta tags
- [x] Canonical URLs on all pages
- [x] No broken links or 404 errors

### ✅ Security Headers
- [x] Content-Security-Policy
- [x] Strict-Transport-Security
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy

### ✅ Accessibility
- [x] Skip navigation link
- [x] All inputs have associated labels
- [x] ARIA roles on interactive elements
- [x] Color contrast ≥ 4.5:1 (WCAG AA)
- [x] Keyboard navigable
- [x] Mobile responsive (all breakpoints)

### ✅ Monetization Readiness
- [x] AdSense placeholder ad slots in place
- [x] CLS score < 0.05 (ad space reserved before load)
- [x] Cookie consent gates AdSense loading
- [x] "Advertisement" labels above ad slots (FTC compliance)
- [x] No misleading content adjacent to ads

### 🔲 Pre-Submission Manual Steps
- [ ] Replace `NEXT_PUBLIC_ADSENSE_ID` with your real publisher ID
- [ ] Replace ad slot IDs (`NEXT_PUBLIC_AD_SLOT_*`) with real unit IDs
- [ ] Verify Google Search Console ownership
- [ ] Submit sitemap to Google Search Console
- [ ] Request AdSense review after 20+ pages are indexed
- [ ] Add real contact/about information to footer
- [ ] Add Favicon (`/public/favicon.ico`) and OG image (`/public/og-image.png`)

---

## 🔄 CI/CD Pipeline

```
Push to main branch:
  ↓
GitHub Actions:
  1. TypeScript type check (tsc --noEmit)
  2. ESLint (eslint)
  3. Unit tests (jest --ci --coverage)
  4. Production build (next build)
  5. Security audit (npm audit --level=high)
  ↓
Deploy to Vercel (automatic on main)
  ↓
Lighthouse CI audit (post-deploy)
```

**Required GitHub Secrets:**
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_ADSENSE_ID
NEXT_PUBLIC_GA_ID
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:ci

# Watch mode during development
npm test -- --watch

# Run specific test file
npm test -- math-engine.test.ts
```

**Coverage targets:** 80% lines, 70% branches on math-engine

---

## 📝 Adding New Tool — Checklist

```bash
# 1. Create math engine
touch src/lib/math-engine/new-tool.ts

# 2. Add Zod schema
# → src/lib/validations/schemas.ts

# 3. Create page + calculator
mkdir -p src/app/tools/new-tool
touch src/app/tools/new-tool/page.tsx
touch src/app/tools/new-tool/NewToolCalculator.tsx

# 4. Register in navigation
# → src/components/layout/Header.tsx (NAV_LINKS)

# 5. Add to sitemap
# → src/app/sitemap.ts

# 6. Add to homepage grid
# → src/app/page.tsx (TOOLS array)

# 7. Add unit tests
# → __tests__/math-engine.test.ts

# 8. Update metadata
# → page.tsx metadata export with keywords
```

---

## 📜 License

MIT — Free to use, modify, and deploy commercially.

**Financial Disclaimer:** This codebase is provided as-is. The financial formulas are
for educational demonstration. Always have a Certified Financial Planner review any
tool before publishing it for public financial guidance.
