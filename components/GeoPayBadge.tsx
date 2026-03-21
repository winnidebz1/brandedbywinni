/**
 * GeoPayBadge — read-only indicator showing auto-detected currency + gateway.
 * No dropdown. No manual override. The system routes automatically.
 */
import React from 'react';
import { Loader2, Shield, MapPin } from 'lucide-react';
import { usePricing } from '../context/PricingContext';

interface GeoPayBadgeProps {
  className?: string;
}

const GeoPayBadge: React.FC<GeoPayBadgeProps> = ({ className = '' }) => {
  const { currencyCode, isLoading, isDetectingCountry, activeGateway, gatewayRule } = usePricing();

  const gatewayLabel = activeGateway === 'paystack' ? 'Paystack' : 'Selar';
  const gatewayBadgeClass =
    activeGateway === 'paystack'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-violet-50 text-violet-700 border-violet-200';

  const isUpdating = isDetectingCountry || isLoading;

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs text-brand-muted ${className}`}
      aria-live="polite"
      aria-label={`Prices shown in ${currencyCode}, secured by ${gatewayLabel}`}
    >
      {isUpdating ? (
        <Loader2 size={12} className="animate-spin text-brand-pink shrink-0" />
      ) : (
        <MapPin size={12} className="shrink-0 text-brand-pink" />
      )}

      <span>
        {isUpdating ? (
          'Detecting location…'
        ) : (
          <>
            {gatewayRule?.flag && <span className="mr-1">{gatewayRule.flag}</span>}
            Prices in <strong className="text-brand-dark">{currencyCode}</strong>
          </>
        )}
      </span>

      {!isUpdating && (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold ${gatewayBadgeClass}`}
          style={{ fontSize: '10px' }}
        >
          <Shield size={9} />
          {gatewayLabel}
        </span>
      )}
    </div>
  );
};

export default GeoPayBadge;
