import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const formatCurrency = (amount: number, currencyCode: string) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
};

const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();
  const navigate = useNavigate();
  const cartCurrencyCode = items[0]?.currencyCode || 'GHS';
  const hasMixedCurrencies = items.some((item) => item.currencyCode !== cartCurrencyCode);

  if (!isCartOpen && items.length === 0) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-brand-ivory z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-dark/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-brand-pink" size={24} />
                <h2 className="text-2xl font-serif text-brand-dark m-0">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-brand-pink/10 hover:text-brand-pink rounded-full transition-colors text-brand-muted"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-brand-muted py-12">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your cart is currently empty.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/services');
                    }}
                    className="px-6 py-2 bg-brand-pink text-white rounded-full hover:bg-brand-dark transition-colors"
                  >
                    Browse Services
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartItemId} className="bg-white border text-sm text-brand-dark border-brand-dark/10 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        {item.optionName && (
                          <span className="text-xs text-brand-muted flex items-center mt-1 bg-brand-pink/5 px-2 py-0.5 rounded border border-brand-pink/10 inline-block">
                            {item.optionName}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-brand-pink whitespace-nowrap">
                        {formatCurrency(item.price * item.quantity, item.currencyCode)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-dark/5">
                      <div className="flex items-center border border-brand-dark/20 rounded-lg overflow-hidden shrink-0">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 font-medium bg-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors flex items-center"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-brand-dark/10 shrink-0">
              <div className="flex justify-between mb-4 items-center">
                  <span className="text-brand-muted">Subtotal</span>
                  <span className="text-2xl font-serif text-brand-dark">
                    {hasMixedCurrencies ? 'Mixed currencies' : formatCurrency(cartTotal, cartCurrencyCode)}
                  </span>
                </div>
                {hasMixedCurrencies && (
                  <p className="mb-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    Your cart contains different currencies. Clear cart and re-add items after selecting one country.
                  </p>
                )}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-4 bg-brand-pink text-white font-medium rounded-full hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
                >
                  <ShoppingBag size={18} /> Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
