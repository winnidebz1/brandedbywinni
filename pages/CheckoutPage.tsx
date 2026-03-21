import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import SEO from '../components/seo/SEO';
import { useCart } from '../context/CartContext';
import { usePricing } from '../context/PricingContext';
import { ArrowLeft, Lock, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PAYSTACK_PUBLIC_KEY,
  SELAR_STORE_URL,
} from '../data/paymentGateway';

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number, currencyCode: string) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
};

// ─────────────────────────────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notes: '',
};

const CheckoutPage: React.FC = () => {
  const { items, cartTotal, clearCart } = useCart();
  const {
    currencyCode: selectedCurrencyCode,
    countryCode,
    activeGateway,
    gatewayRule,
    formatPrice,
  } = usePricing();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isRedirectingToSelar, setIsRedirectingToSelar] = useState(false);

  const cartCurrencyCode = items[0]?.currencyCode || selectedCurrencyCode;
  const hasMixedCurrencies = items.some((i) => i.currencyCode !== cartCurrencyCode);

  // Line items summary for notes/metadata
  const cartSummary = items
    .map(
      (i) =>
        `${i.title}${i.optionName ? ` (${i.optionName})` : ''} x${i.quantity} = ${formatCurrency(
          i.price * i.quantity,
          i.currencyCode
        )}`
    )
    .join(' | ');

  // ── Paystack config ─────────────────────────────────────────────────────
  const paystackConfig = {
    reference: `bbw_${Date.now()}`,
    email: formData.email,
    amount: Math.round(cartTotal * 100), // pesewas / kobo / cents
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: cartCurrencyCode,
    metadata: {
      custom_fields: [
        {
          display_name: 'Customer Name',
          variable_name: 'customer_name',
          value: `${formData.firstName} ${formData.lastName}`,
        },
        {
          display_name: 'Phone',
          variable_name: 'phone_number',
          value: formData.phone,
        },
        {
          display_name: 'Notes',
          variable_name: 'notes',
          value: formData.notes,
        },
      ],
      cartItems: items.map((item) => ({
        id: item.productId,
        name: item.title,
        option: item.optionName,
        quantity: item.quantity,
        price: item.price,
        currency: item.currencyCode,
        country: item.countryCode,
      })),
    },
  };

  const initializePaystack = usePaystackPayment(paystackConfig);

  const checkFormValidity = (data: FormData) => {
    setIsFormValid(!!(data.firstName && data.lastName && data.email && data.phone));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    checkFormValidity(newData);
  };

  // ── Paystack success/close handlers ────────────────────────────────────
  const onPaystackSuccess = (reference: unknown) => {
    console.log('Paystack payment successful:', reference);
    clearCart();
    navigate('/checkout/success', {
      replace: true,
      state: { reference, gateway: 'paystack' },
    });
    // Immediately fall back to services if success page doesn't exist yet
    navigate('/services');
    alert(
      `Payment successful! Reference: ${
        (reference as { reference?: string })?.reference || JSON.stringify(reference)
      }\n\nWe will contact you via email or WhatsApp within 24 hours.`
    );
  };

  const onPaystackClose = () => {
    console.log('Paystack modal closed');
  };

  // ── Selar redirect ─────────────────────────────────────────────────────
  const handleSelarRedirect = () => {
    if (!isFormValid) return;
    setIsRedirectingToSelar(true);

    // Build a Selar URL with prefilled customer info as query params where possible
    const params = new URLSearchParams({
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      note: formData.notes ? `${formData.notes} | Cart: ${cartSummary}` : cartSummary,
    });

    // Open in same tab so the user's session continues
    window.location.href = `${SELAR_STORE_URL}?${params.toString()}`;
  };

  // ── Main submit handler ────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || hasMixedCurrencies) return;

    if (activeGateway === 'paystack') {
      initializePaystack({ onSuccess: onPaystackSuccess, onClose: onPaystackClose });
    } else {
      handleSelarRedirect();
    }
  };

  const canPay = isFormValid && !hasMixedCurrencies && items.length > 0;

  // ── Empty cart ─────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-brand-ivory text-center flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-brand-pink opacity-20 mb-6" />
        <h2 className="text-3xl font-serif text-brand-dark mb-4">Your cart is empty</h2>
        <p className="text-brand-muted mb-8 max-w-md">
          Looks like you haven't added any services yet. Start exploring our packages and find the
          right fit for your business.
        </p>
        <Link
          to="/services"
          className="px-8 py-3 bg-brand-pink text-white rounded-full hover:bg-brand-dark transition-colors font-medium"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  // ── Resolve gateway (used only for routing logic, not shown to customer) ──
  const isPaystack = activeGateway === 'paystack';

  return (
    <div className="pt-24 min-h-screen bg-brand-ivory">
      <SEO
        title="Secure Checkout | Branded By Winni"
        description="Secure payment processing for Branded By Winni services."
        url="/checkout"
      />

      <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
        <Link
          to="/services"
          className="inline-flex items-center text-brand-muted hover:text-brand-pink mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Continue Shopping
        </Link>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Left: Checkout Form ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5"
            >
              <h2 className="text-2xl font-serif text-brand-dark mb-6">Billing Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6" id="checkout-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      First Name <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink bg-transparent"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      Last Name <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink bg-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Email Address <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink bg-transparent"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Phone Number (WhatsApp Preferred){' '}
                    <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink bg-transparent"
                    placeholder="+233 50 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Project Notes / References (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink bg-transparent resize-y"
                    placeholder="Share any ideas, inspiration links, or specific requirements…"
                  />
                </div>

                {/* Warnings */}
                <AnimatePresence>
                  {hasMixedCurrencies && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
                    >
                      Your cart has mixed currencies. Clear your cart and re-add services after
                      selecting one country.
                    </motion.p>
                  )}
                </AnimatePresence>


                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="checkout-pay-button"
                    disabled={!canPay || isRedirectingToSelar}
                    className="w-full py-4 text-center text-white rounded-xl transition-all duration-300 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-brand-pink hover:bg-brand-dark"
                  >
                    {isRedirectingToSelar ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Lock size={18} />
                        Pay {formatCurrency(cartTotal, cartCurrencyCode)} Securely
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Trust badge — generic, no gateway name */}
              <div className="mt-8 pt-6 border-t border-brand-dark/10 flex items-center justify-center gap-2">
                <Lock size={14} className="text-brand-muted" />
                <span className="text-xs font-medium uppercase tracking-widest text-brand-muted">
                  Secure Checkout
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-brand-dark text-white p-8 rounded-2xl shadow-xl sticky top-32"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif">Your Order</h3>
              </div>


              {/* Line items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex justify-between items-start gap-4 text-sm pb-4 border-b border-white/10 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-brand-ivory">{item.title}</p>
                      {item.optionName && (
                        <p className="text-xs text-white/60 mt-1">{item.optionName}</p>
                      )}
                      <p className="text-xs text-white/50 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-mono text-white/90 whitespace-nowrap">
                      {formatCurrency(item.price * item.quantity, item.currencyCode)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-white/20 pt-6 space-y-3 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span className="font-mono">
                    {hasMixedCurrencies
                      ? 'Mixed currencies'
                      : formatCurrency(cartTotal, cartCurrencyCode)}
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Taxes</span>
                  <span className="font-mono text-xs mt-0.5">Included if applicable</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-white pt-4 mt-2 border-t border-white/20">
                  <span>Total</span>
                  <span className="font-mono">
                    {hasMixedCurrencies
                      ? 'Mixed currencies'
                      : formatCurrency(cartTotal, cartCurrencyCode)}
                  </span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-white/70 leading-relaxed text-center">
                  After payment we will contact you via email or WhatsApp within 24 hours to begin
                  your project.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
