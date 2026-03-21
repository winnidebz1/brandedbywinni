/**
 * Payment Gateway Routing Rules
 * ─────────────────────────────
 * This is the single source of truth for:
 *   - Which currency a country uses
 *   - Which payment gateway is preferred
 *   - Which gateways are available as fallback
 *
 * To add a new country or gateway, add a new entry below.
 */

import type { SupportedCountryCode } from './countryPricing';

export type SupportedGateway = 'paystack' | 'selar';

export interface GatewayRule {
  /** ISO country code */
  countryCode: SupportedCountryCode;
  /** ISO 4217 currency code to charge in */
  currencyCode: string;
  /** Display name for the country */
  countryName: string;
  /** Flag emoji */
  flag: string;
  /** Preferred / primary gateway */
  preferredGateway: SupportedGateway;
  /** Fallback if the preferred gateway cannot process */
  fallbackGateway: SupportedGateway;
  /**
   * True if Paystack is confirmed to support this currency
   * on the merchant's account. When false, skip Paystack and
   * route directly to the fallback.
   */
  paystackSupported: boolean;
  /**
   * True if Selar supports this currency / country.
   */
  selarSupported: boolean;
  /**
   * Optional human-readable note shown subtly on the checkout
   * page (e.g. "Settlement is in USD" for GBP transactions).
   */
  settlementNote?: string;
}

/**
 * The master gateway routing table.
 * Keys are SupportedCountryCode values for fast lookup.
 */
export const GATEWAY_RULES: Record<SupportedCountryCode, GatewayRule> = {
  GH: {
    countryCode: 'GH',
    currencyCode: 'GHS',
    countryName: 'Ghana',
    flag: '🇬🇭',
    preferredGateway: 'paystack',
    fallbackGateway: 'selar',
    paystackSupported: true,
    selarSupported: true,
  },
  NG: {
    countryCode: 'NG',
    currencyCode: 'NGN',
    countryName: 'Nigeria',
    flag: '🇳🇬',
    preferredGateway: 'paystack',
    fallbackGateway: 'selar',
    paystackSupported: true,
    selarSupported: true,
  },
  KE: {
    countryCode: 'KE',
    currencyCode: 'KES',
    countryName: 'Kenya',
    flag: '🇰🇪',
    preferredGateway: 'paystack',
    fallbackGateway: 'selar',
    paystackSupported: true,
    selarSupported: true,
  },
  ZA: {
    countryCode: 'ZA',
    currencyCode: 'ZAR',
    countryName: 'South Africa',
    flag: '🇿🇦',
    preferredGateway: 'paystack',
    fallbackGateway: 'selar',
    paystackSupported: true,
    selarSupported: true,
  },
  GB: {
    countryCode: 'GB',
    currencyCode: 'GBP',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    preferredGateway: 'selar',
    fallbackGateway: 'selar',
    paystackSupported: false, // GBP not supported on this merchant's Paystack account
    selarSupported: true,
    settlementNote: 'International orders are processed via Selar in GBP.',
  },
  AU: {
    countryCode: 'AU',
    currencyCode: 'AUD',
    countryName: 'Australia',
    flag: '🇦🇺',
    preferredGateway: 'selar',
    fallbackGateway: 'selar',
    paystackSupported: false,
    selarSupported: true,
    settlementNote: 'International orders are processed via Selar in USD equivalent.',
  },
  US: {
    countryCode: 'US',
    currencyCode: 'USD',
    countryName: 'United States / International',
    flag: '🌍',
    preferredGateway: 'selar',
    fallbackGateway: 'selar',
    paystackSupported: false, // USD on Paystack requires special merchant setup
    selarSupported: true,
    settlementNote: 'International orders are processed via Selar in USD.',
  },
};

/**
 * Resolve which gateway should actually be used for a given country.
 * Respects paystackSupported flag so we never accidentally route
 * an unsupported currency through Paystack.
 */
export function resolveGateway(countryCode: SupportedCountryCode): SupportedGateway {
  const rule = GATEWAY_RULES[countryCode];
  if (!rule) return 'selar';

  if (rule.preferredGateway === 'paystack' && rule.paystackSupported) {
    return 'paystack';
  }

  return rule.fallbackGateway;
}

/**
 * Human-readable gateway display name.
 */
export function gatewayDisplayName(gateway: SupportedGateway): string {
  return gateway === 'paystack' ? 'Paystack' : 'Selar';
}

/**
 * The Selar store/product base URL.
 * When routing to Selar, we redirect to this URL so the customer
 * completes payment on Selar's hosted checkout.
 *
 * Update this to the actual Selar store URL once configured.
 */
export const SELAR_STORE_URL = import.meta.env.VITE_SELAR_STORE_URL || 'https://selar.co/brandedbywinni';

/**
 * Paystack public key from env.
 */
export const PAYSTACK_PUBLIC_KEY =
  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
