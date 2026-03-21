import React, { useEffect, useMemo } from 'react';
import { Globe, Loader2, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SUPPORTED_COUNTRY_OPTIONS, SupportedCountryCode } from '../data/countryPricing';
import { GATEWAY_RULES } from '../data/paymentGateway';
import { usePricing } from '../context/PricingContext';

interface CountryCurrencySelectorProps {
  className?: string;
  /** 'all' = show every supported country; 'paystack' kept for backwards compat but now shows all */
  mode?: 'paystack' | 'all';
  /** compact: just the dropdown, no explanation text */
  compact?: boolean;
}

const CountryCurrencySelector: React.FC<CountryCurrencySelectorProps> = ({
  className = '',
  compact = false,
}) => {
  const { items, clearCart } = useCart();
  const {
    countryCode,
    setCountryCode,
    currencyCode,
    isLoading,
    isDetectingCountry,
    activeGateway,
    gatewayRule,
  } = usePricing();

  // All countries are shown — gateway routing handles the rest
  const countryOptions = useMemo(() => SUPPORTED_COUNTRY_OPTIONS, []);

  // If the stored countryCode is somehow not in options, reset
  useEffect(() => {
    const isAvailable = countryOptions.some((o) => o.code === countryCode);
    if (!isAvailable && countryOptions.length > 0) {
      if (items.length > 0) clearCart();
      setCountryCode(countryOptions[0].code);
    }
  }, [clearCart, countryCode, countryOptions, items.length, setCountryCode]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCountry = event.target.value as SupportedCountryCode;
    if (nextCountry === countryCode) return;

    if (items.length > 0) {
      const ok = window.confirm(
        'Changing country will clear your cart and reload local pricing. Continue?'
      );
      if (!ok) return;
      clearCart();
    }

    setCountryCode(nextCountry);
  };

  const gatewayLabel = activeGateway === 'paystack' ? 'Paystack' : 'Selar';
  const gatewayColor =
    activeGateway === 'paystack'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-violet-50 text-violet-700 border-violet-200';

  const detectingLabel = isDetectingCountry
    ? 'Detecting your location…'
    : isLoading
    ? 'Updating prices…'
    : null;

  return (
    <div className={`rounded-2xl border border-brand-dark/10 bg-white shadow-sm overflow-hidden ${className}`}>
      {/* Top row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 text-brand-muted">
          {detectingLabel ? (
            <Loader2 size={16} className="animate-spin text-brand-pink shrink-0" />
          ) : (
            <Globe size={16} className="shrink-0" />
          )}
          <span className="text-xs uppercase tracking-widest font-medium">
            {detectingLabel || 'Your Location'}
          </span>
        </div>

        <select
          id="country-currency-select"
          value={countryCode}
          onChange={handleCountryChange}
          disabled={isLoading || isDetectingCountry}
          className="rounded-lg border border-brand-dark/15 bg-brand-ivory px-3 py-2 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-pink disabled:opacity-60 transition-all cursor-pointer"
          aria-label="Select country and currency"
        >
          {countryOptions.map((option) => {
            const rule = GATEWAY_RULES[option.code];
            return (
              <option key={option.code} value={option.code}>
                {rule?.flag || '🌍'} {option.name} ({option.currencyCode})
              </option>
            );
          })}
        </select>
      </div>

      {/* Bottom ribbon */}
      {!compact && (
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-brand-ivory/60 border-t border-brand-dark/5 text-xs text-brand-muted">
          <span>
            Prices shown in <strong className="text-brand-dark">{currencyCode}</strong>
            {gatewayRule?.flag ? ` ${gatewayRule.flag}` : ''}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${gatewayColor}`}
          >
            <Shield size={10} />
            {gatewayLabel}
          </span>
        </div>
      )}
    </div>
  );
};

export default CountryCurrencySelector;
