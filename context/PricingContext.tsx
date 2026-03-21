import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  COUNTRY_PRICING_CONFIG,
  DEFAULT_COUNTRY_CODE,
  detectCountryFromIP,
  detectPreferredCountry,
  isSupportedCountryCode,
  SUPPORTED_COUNTRY_OPTIONS,
  SupportedCountryCode,
} from '../data/countryPricing';
import {
  GATEWAY_RULES,
  GatewayRule,
  resolveGateway,
  SupportedGateway,
} from '../data/paymentGateway';

interface PricingContextType {
  countryCode: SupportedCountryCode;
  setCountryCode: (nextCountry: SupportedCountryCode) => void;
  currencyCode: string;
  isLoading: boolean;
  /** True while the IP geo-detection request is in flight */
  isDetectingCountry: boolean;
  getServicePrice: (serviceId: string, fallbackPrice: number, optionId?: string) => number;
  formatPrice: (amount: number) => string;
  /** The resolved gateway for the current country */
  activeGateway: SupportedGateway;
  /** Full gateway rule for the current country */
  gatewayRule: GatewayRule;
}

interface ServiceCountryPriceRow {
  service_id: string;
  option_id: string | null;
  currency_code: string;
  amount: number | string;
}

const COUNTRY_STORAGE_KEY = 'bbw_country_code';
/** How long (ms) a stored country is trusted before we re-detect */
const COUNTRY_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const COUNTRY_CACHE_TIME_KEY = 'bbw_country_set_at';
const BASE_PRICE_KEY_SUFFIX = '__base__';
const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

const buildPriceLookupKey = (serviceId: string, optionId?: string) => {
  return `${serviceId}:${optionId || BASE_PRICE_KEY_SUFFIX}`;
};

const getInitialCountryCode = (): SupportedCountryCode => {
  if (typeof window === 'undefined') return DEFAULT_COUNTRY_CODE;

  // Check if there's a recently stored country (within TTL)
  const storedCountry = localStorage.getItem(COUNTRY_STORAGE_KEY);
  const storedAt = localStorage.getItem(COUNTRY_CACHE_TIME_KEY);
  const ageMs = storedAt ? Date.now() - parseInt(storedAt, 10) : Infinity;

  if (storedCountry && isSupportedCountryCode(storedCountry) && ageMs < COUNTRY_CACHE_TTL_MS) {
    return storedCountry;
  }

  // Instant detection (no network, best-effort)
  return detectPreferredCountry();
};

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countryCode, setCountryCodeState] = useState<SupportedCountryCode>(() =>
    getInitialCountryCode()
  );
  const [currencyCode, setCurrencyCode] = useState(
    COUNTRY_PRICING_CONFIG[getInitialCountryCode()].currencyCode
  );
  const [priceLookup, setPriceLookup] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDetectingCountry, setIsDetectingCountry] = useState(false);

  // ── IP geo-detection (async, runs once on mount if no stored preference) ──
  useEffect(() => {
    const storedCountry = localStorage.getItem(COUNTRY_STORAGE_KEY);
    const storedAt = localStorage.getItem(COUNTRY_CACHE_TIME_KEY);
    const ageMs = storedAt ? Date.now() - parseInt(storedAt, 10) : Infinity;

    // Skip IP detection if there's a fresh manually-set or cached country
    if (storedCountry && isSupportedCountryCode(storedCountry) && ageMs < 24 * 60 * 60 * 1000) {
      return;
    }

    let isMounted = true;
    setIsDetectingCountry(true);

    detectCountryFromIP().then((detectedCode) => {
      if (!isMounted) return;
      setIsDetectingCountry(false);

      if (detectedCode && detectedCode !== countryCode) {
        setCountryCodeState(detectedCode);
        setCurrencyCode(COUNTRY_PRICING_CONFIG[detectedCode].currencyCode);
        localStorage.setItem(COUNTRY_STORAGE_KEY, detectedCode);
        localStorage.setItem(COUNTRY_CACHE_TIME_KEY, Date.now().toString());
      }
    });

    return () => {
      isMounted = false;
    };
    // We only want this running once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Persist country code ─────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(COUNTRY_STORAGE_KEY, countryCode);
    localStorage.setItem(COUNTRY_CACHE_TIME_KEY, Date.now().toString());
  }, [countryCode]);

  // ── Load Supabase country prices ─────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    const defaultCurrency = COUNTRY_PRICING_CONFIG[countryCode].currencyCode;

    const loadCountryPrices = async () => {
      if (!isSupabaseConfigured) {
        if (isMounted) {
          setCurrencyCode(defaultCurrency);
          setPriceLookup({});
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('service_country_prices')
          .select('service_id, option_id, currency_code, amount')
          .eq('country_code', countryCode);

        if (error) throw error;
        if (!isMounted) return;

        let detectedCurrency = defaultCurrency;
        const nextLookup: Record<string, number> = {};

        (data as ServiceCountryPriceRow[] | null)?.forEach((row) => {
          const parsedAmount = Number(row.amount);
          if (Number.isFinite(parsedAmount)) {
            nextLookup[buildPriceLookupKey(row.service_id, row.option_id || undefined)] =
              parsedAmount;
          }
          if (row.currency_code) {
            detectedCurrency = row.currency_code;
          }
        });

        setPriceLookup(nextLookup);
        setCurrencyCode(detectedCurrency);
      } catch (error) {
        console.error('Failed to load country pricing from Supabase:', error);
        if (isMounted) {
          setPriceLookup({});
          setCurrencyCode(defaultCurrency);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCountryPrices();
    return () => {
      isMounted = false;
    };
  }, [countryCode]);

  // ── setCountryCode (manual override) ─────────────────────────────────────
  const setCountryCode = useCallback((nextCountry: SupportedCountryCode) => {
    setCountryCodeState(nextCountry);
    const fallbackCurrency = COUNTRY_PRICING_CONFIG[nextCountry].currencyCode;
    setCurrencyCode(fallbackCurrency);
    // Mark this as a user-set preference so IP detection doesn't override it
    localStorage.setItem(COUNTRY_STORAGE_KEY, nextCountry);
    localStorage.setItem(COUNTRY_CACHE_TIME_KEY, Date.now().toString());
  }, []);

  // ── Price helpers ─────────────────────────────────────────────────────────
  const getServicePrice = useCallback(
    (serviceId: string, fallbackPrice: number, optionId?: string) => {
      const optionKey = buildPriceLookupKey(serviceId, optionId);
      const baseKey = buildPriceLookupKey(serviceId);

      if (Object.prototype.hasOwnProperty.call(priceLookup, optionKey)) {
        return priceLookup[optionKey];
      }
      if (Object.prototype.hasOwnProperty.call(priceLookup, baseKey)) {
        return priceLookup[baseKey];
      }
      return fallbackPrice;
    },
    [priceLookup]
  );

  const formatPrice = useCallback(
    (amount: number) => {
      const locale = COUNTRY_PRICING_CONFIG[countryCode]?.locale || 'en-US';
      try {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
          maximumFractionDigits: 2,
        }).format(amount);
      } catch {
        return `${currencyCode} ${amount.toFixed(2)}`;
      }
    },
    [countryCode, currencyCode]
  );

  // ── Gateway info ─────────────────────────────────────────────────────────
  const activeGateway = useMemo(() => resolveGateway(countryCode), [countryCode]);
  const gatewayRule = useMemo(() => GATEWAY_RULES[countryCode], [countryCode]);

  const value = useMemo<PricingContextType>(
    () => ({
      countryCode,
      setCountryCode,
      currencyCode,
      isLoading,
      isDetectingCountry,
      getServicePrice,
      formatPrice,
      activeGateway,
      gatewayRule,
    }),
    [
      countryCode,
      setCountryCode,
      currencyCode,
      isLoading,
      isDetectingCountry,
      getServicePrice,
      formatPrice,
      activeGateway,
      gatewayRule,
    ]
  );

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

export { SUPPORTED_COUNTRY_OPTIONS };
