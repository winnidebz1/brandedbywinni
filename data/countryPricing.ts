export type SupportedCountryCode = 'GH' | 'NG' | 'KE' | 'ZA' | 'US' | 'GB' | 'AU';

export interface CountryPricingConfig {
  code: SupportedCountryCode;
  name: string;
  currencyCode: string;
  locale: string;
}

export const COUNTRY_PRICING_CONFIG: Record<SupportedCountryCode, CountryPricingConfig> = {
  GH: { code: 'GH', name: 'Ghana', currencyCode: 'GHS', locale: 'en-GH' },
  NG: { code: 'NG', name: 'Nigeria', currencyCode: 'NGN', locale: 'en-NG' },
  KE: { code: 'KE', name: 'Kenya', currencyCode: 'KES', locale: 'en-KE' },
  ZA: { code: 'ZA', name: 'South Africa', currencyCode: 'ZAR', locale: 'en-ZA' },
  US: { code: 'US', name: 'United States / International', currencyCode: 'USD', locale: 'en-US' },
  GB: { code: 'GB', name: 'United Kingdom', currencyCode: 'GBP', locale: 'en-GB' },
  AU: { code: 'AU', name: 'Australia', currencyCode: 'AUD', locale: 'en-AU' },
};

export const SUPPORTED_COUNTRY_OPTIONS = Object.values(COUNTRY_PRICING_CONFIG);

/**
 * Countries where Paystack is actively supported.
 * Used by the CountryCurrencySelector when in 'paystack' mode.
 */
export const PAYSTACK_SUPPORTED_COUNTRY_CODES: SupportedCountryCode[] = ['GH', 'NG', 'KE', 'ZA'];
export const PAYSTACK_SUPPORTED_COUNTRY_OPTIONS = SUPPORTED_COUNTRY_OPTIONS.filter((option) =>
  PAYSTACK_SUPPORTED_COUNTRY_CODES.includes(option.code)
);

export const DEFAULT_COUNTRY_CODE: SupportedCountryCode = 'GH';

// ─── Timezone → Country mapping ──────────────────────────────────────────────

const TIME_ZONE_COUNTRY_MAP: Partial<Record<string, SupportedCountryCode>> = {
  'Africa/Accra': 'GH',
  'Africa/Abidjan': 'GH', // Often shared with Ghana timezone
  'Africa/Lagos': 'NG',
  'Africa/Abuja': 'NG',
  'Africa/Nairobi': 'KE',
  'Africa/Johannesburg': 'ZA',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'Europe/London': 'GB',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Brisbane': 'AU',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const isSupportedCountryCode = (value: string): value is SupportedCountryCode => {
  return Object.prototype.hasOwnProperty.call(COUNTRY_PRICING_CONFIG, value);
};

export const detectCountryFromLocale = (locale?: string): SupportedCountryCode | undefined => {
  if (!locale) return undefined;
  const normalizedLocale = locale.toUpperCase();
  const localeParts = normalizedLocale.split('-');
  const maybeCountry = localeParts[localeParts.length - 1];
  return maybeCountry && isSupportedCountryCode(maybeCountry) ? maybeCountry : undefined;
};

export const detectCountryFromTimeZone = (timeZone?: string): SupportedCountryCode | undefined => {
  if (!timeZone) return undefined;
  return TIME_ZONE_COUNTRY_MAP[timeZone];
};

// ─── Synchronous detection (instant, no network) ─────────────────────────────

export const detectPreferredCountry = (): SupportedCountryCode => {
  if (typeof window === 'undefined') return DEFAULT_COUNTRY_CODE;

  // 1. Browser language/locale
  const userLocale = navigator.languages?.[0] || navigator.language;
  const localeCountry = detectCountryFromLocale(userLocale);
  if (localeCountry) return localeCountry;

  // 2. Timezone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zoneCountry = detectCountryFromTimeZone(userTimeZone);
  if (zoneCountry) return zoneCountry;

  return DEFAULT_COUNTRY_CODE;
};

// ─── Async IP-based geo-detection ────────────────────────────────────────────

/**
 * Try to detect the visitor's country from their IP address.
 * Uses ipapi.co (free tier: 1,000 req/day, no API key needed).
 * Falls back gracefully if the request fails or times out.
 *
 * Returns the detected SupportedCountryCode or undefined.
 */
export async function detectCountryFromIP(): Promise<SupportedCountryCode | undefined> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return undefined;

    const data = await response.json();
    const countryCode: string | undefined = data?.country_code;

    if (countryCode && isSupportedCountryCode(countryCode)) {
      return countryCode;
    }

    return undefined;
  } catch {
    // Network error, timeout, or ad-blocker — silently ignore
    return undefined;
  }
}
