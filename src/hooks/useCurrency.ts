'use client';

// ============================================================
// DebtMeltPro — useCurrency Hook
// Detects user's currency from:
//   1. IP geolocation API (most accurate)
//   2. Browser navigator.language fallback
//   3. USD default
// ============================================================

import { useState, useEffect } from 'react';

export interface CurrencyInfo {
  code: string;       // e.g. "INR", "USD", "EUR"
  symbol: string;     // e.g. "₹", "$", "€"
  locale: string;     // e.g. "en-IN", "en-US", "de-DE"
  name: string;       // e.g. "Indian Rupee"
  loading: boolean;
}

// Country code → currency mapping (covers 95%+ of users)
const COUNTRY_TO_CURRENCY: Record<string, { code: string; locale: string; name: string }> = {
  // Asia
  IN: { code: 'INR', locale: 'en-IN', name: 'Indian Rupee' },
  CN: { code: 'CNY', locale: 'zh-CN', name: 'Chinese Yuan' },
  JP: { code: 'JPY', locale: 'ja-JP', name: 'Japanese Yen' },
  KR: { code: 'KRW', locale: 'ko-KR', name: 'South Korean Won' },
  SG: { code: 'SGD', locale: 'en-SG', name: 'Singapore Dollar' },
  HK: { code: 'HKD', locale: 'en-HK', name: 'Hong Kong Dollar' },
  TH: { code: 'THB', locale: 'th-TH', name: 'Thai Baht' },
  MY: { code: 'MYR', locale: 'ms-MY', name: 'Malaysian Ringgit' },
  ID: { code: 'IDR', locale: 'id-ID', name: 'Indonesian Rupiah' },
  PH: { code: 'PHP', locale: 'en-PH', name: 'Philippine Peso' },
  VN: { code: 'VND', locale: 'vi-VN', name: 'Vietnamese Dong' },
  PK: { code: 'PKR', locale: 'ur-PK', name: 'Pakistani Rupee' },
  BD: { code: 'BDT', locale: 'bn-BD', name: 'Bangladeshi Taka' },
  LK: { code: 'LKR', locale: 'si-LK', name: 'Sri Lankan Rupee' },
  NP: { code: 'NPR', locale: 'ne-NP', name: 'Nepalese Rupee' },
  AE: { code: 'AED', locale: 'ar-AE', name: 'UAE Dirham' },
  SA: { code: 'SAR', locale: 'ar-SA', name: 'Saudi Riyal' },
  QA: { code: 'QAR', locale: 'ar-QA', name: 'Qatari Riyal' },
  KW: { code: 'KWD', locale: 'ar-KW', name: 'Kuwaiti Dinar' },
  IL: { code: 'ILS', locale: 'he-IL', name: 'Israeli Shekel' },
  TR: { code: 'TRY', locale: 'tr-TR', name: 'Turkish Lira' },

  // Americas
  US: { code: 'USD', locale: 'en-US', name: 'US Dollar' },
  CA: { code: 'CAD', locale: 'en-CA', name: 'Canadian Dollar' },
  MX: { code: 'MXN', locale: 'es-MX', name: 'Mexican Peso' },
  BR: { code: 'BRL', locale: 'pt-BR', name: 'Brazilian Real' },
  AR: { code: 'ARS', locale: 'es-AR', name: 'Argentine Peso' },
  CL: { code: 'CLP', locale: 'es-CL', name: 'Chilean Peso' },
  CO: { code: 'COP', locale: 'es-CO', name: 'Colombian Peso' },

  // Europe
  GB: { code: 'GBP', locale: 'en-GB', name: 'British Pound' },
  CH: { code: 'CHF', locale: 'de-CH', name: 'Swiss Franc' },
  NO: { code: 'NOK', locale: 'nb-NO', name: 'Norwegian Krone' },
  SE: { code: 'SEK', locale: 'sv-SE', name: 'Swedish Krona' },
  DK: { code: 'DKK', locale: 'da-DK', name: 'Danish Krone' },
  PL: { code: 'PLN', locale: 'pl-PL', name: 'Polish Zloty' },
  CZ: { code: 'CZK', locale: 'cs-CZ', name: 'Czech Koruna' },
  HU: { code: 'HUF', locale: 'hu-HU', name: 'Hungarian Forint' },
  RO: { code: 'RON', locale: 'ro-RO', name: 'Romanian Leu' },
  RU: { code: 'RUB', locale: 'ru-RU', name: 'Russian Ruble' },
  UA: { code: 'UAH', locale: 'uk-UA', name: 'Ukrainian Hryvnia' },

  // Oceania
  AU: { code: 'AUD', locale: 'en-AU', name: 'Australian Dollar' },
  NZ: { code: 'NZD', locale: 'en-NZ', name: 'New Zealand Dollar' },

  // Africa
  ZA: { code: 'ZAR', locale: 'en-ZA', name: 'South African Rand' },
  NG: { code: 'NGN', locale: 'en-NG', name: 'Nigerian Naira' },
  KE: { code: 'KES', locale: 'sw-KE', name: 'Kenyan Shilling' },
  GH: { code: 'GHS', locale: 'en-GH', name: 'Ghanaian Cedi' },
  EG: { code: 'EGP', locale: 'ar-EG', name: 'Egyptian Pound' },
};

// Euro zone countries
const EURO_COUNTRIES = [
  'DE','FR','IT','ES','NL','BE','AT','PT','FI','IE','GR',
  'SK','SI','EE','LV','LT','LU','MT','CY','HR',
];

const DEFAULT_CURRENCY: CurrencyInfo = {
  code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar', loading: true,
};

// Get currency symbol from Intl API
function getCurrencySymbol(code: string, locale: string): string {
  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(0);
    // Extract symbol by removing digits, commas, spaces
    return formatted.replace(/[\d,.\s]/g, '').trim() || code;
  } catch {
    return code;
  }
}

// Derive currency from browser navigator.language
function getCurrencyFromBrowser(): Omit<CurrencyInfo, 'loading'> {
  try {
    const lang = navigator.language || 'en-US';
    const region = lang.split('-')[1]?.toUpperCase();

    if (region) {
      if (EURO_COUNTRIES.includes(region)) {
        const locale = `${lang.split('-')[0]}-${region}`;
        return { code: 'EUR', locale, symbol: '€', name: 'Euro' };
      }
      const match = COUNTRY_TO_CURRENCY[region];
      if (match) {
        return { ...match, symbol: getCurrencySymbol(match.code, match.locale) };
      }
    }
  } catch { /* fallback below */ }

  return { code: 'USD', locale: 'en-US', symbol: '$', name: 'US Dollar' };
}

// Session cache so we don't refetch on every render
let cachedCurrency: Omit<CurrencyInfo, 'loading'> | null = null;

export function useCurrency(): CurrencyInfo {
  const [currency, setCurrency] = useState<CurrencyInfo>(DEFAULT_CURRENCY);

  useEffect(() => {
    // Use cache if available
    if (cachedCurrency) {
      setCurrency({ ...cachedCurrency, loading: false });
      return;
    }

    // Try IP geolocation first (fast, free, no key needed)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { country_code?: string; currency?: string; languages?: string }) => {
        clearTimeout(timeout);
        const countryCode = data.country_code?.toUpperCase() ?? '';
        let resolved: Omit<CurrencyInfo, 'loading'>;

        if (EURO_COUNTRIES.includes(countryCode)) {
          const lang = data.languages?.split(',')[0] ?? 'de';
          const locale = `${lang}-${countryCode}`;
          resolved = { code: 'EUR', locale, symbol: '€', name: 'Euro' };
        } else {
          const match = COUNTRY_TO_CURRENCY[countryCode];
          if (match) {
            resolved = { ...match, symbol: getCurrencySymbol(match.code, match.locale) };
          } else {
            // Fall back to browser locale
            resolved = getCurrencyFromBrowser();
          }
        }

        cachedCurrency = resolved;
        setCurrency({ ...resolved, loading: false });
      })
      .catch(() => {
        clearTimeout(timeout);
        // Geolocation failed → use browser locale
        const fallback = getCurrencyFromBrowser();
        cachedCurrency = fallback;
        setCurrency({ ...fallback, loading: false });
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return currency;
}

// ── Formatting helpers that use detected currency ─────────────

export function createCurrencyFormatters(info: Omit<CurrencyInfo, 'loading'>) {
  const { code, locale } = info;

  const fmtWhole = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const fmtCents = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatCurrency = (amount: number): string => {
    if (!isFinite(amount) || isNaN(amount)) return fmtWhole.format(0);
    return fmtWhole.format(amount);
  };

  const formatCurrencyExact = (amount: number): string => {
    if (!isFinite(amount) || isNaN(amount)) return fmtCents.format(0);
    return fmtCents.format(amount);
  };

  const formatCurrencyShort = (amount: number): string => {
    if (!isFinite(amount) || isNaN(amount)) return formatCurrency(0);
    const abs = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';
    if (abs >= 1_000_000) return `${sign}${info.symbol}${(abs / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000)     return `${sign}${info.symbol}${(abs / 1_000).toFixed(0)}K`;
    return `${sign}${formatCurrency(abs)}`;
  };

  return { formatCurrency, formatCurrencyExact, formatCurrencyShort };
}