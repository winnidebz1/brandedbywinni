import React, { createContext, useContext, useState, useEffect } from 'react';
import { COUNTRY_PRICING_CONFIG, DEFAULT_COUNTRY_CODE } from '../data/countryPricing';

export interface CartItem {
  cartItemId: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  currencyCode: string;
  countryCode: string;
  optionId?: string;
  optionName?: string;
  image?: string; // Optional image field if needed later
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const DEFAULT_CART_CURRENCY = COUNTRY_PRICING_CONFIG[DEFAULT_COUNTRY_CODE].currencyCode;

const isValidStoredCartItem = (item: any): item is CartItem => {
  return Boolean(
    item &&
      typeof item.cartItemId === 'string' &&
      typeof item.productId === 'string' &&
      typeof item.title === 'string' &&
      typeof item.price === 'number' &&
      typeof item.quantity === 'number' &&
      typeof item.currencyCode === 'string' &&
      typeof item.countryCode === 'string'
  );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('bbw_cart');
      if (!stored) {
        return [];
      }

      const parsedItems = JSON.parse(stored);
      if (!Array.isArray(parsedItems)) {
        return [];
      }

      const normalizedItems = parsedItems
        .map((item) => ({
          ...item,
          currencyCode: typeof item.currencyCode === 'string' ? item.currencyCode : DEFAULT_CART_CURRENCY,
          countryCode: typeof item.countryCode === 'string' ? item.countryCode : DEFAULT_COUNTRY_CODE,
        }))
        .filter(isValidStoredCartItem);

      return normalizedItems;
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('bbw_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'cartItemId'>) => {
    setItems((prev) => {
      // Check if same product + option already exists
      const existingItem = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.optionId === item.optionId &&
          i.currencyCode === item.currencyCode &&
          i.countryCode === item.countryCode
      );

      if (existingItem) {
        return prev.map((i) =>
          i.cartItemId === existingItem.cartItemId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      // Generate a unique ID for the cart item
      const newItem = { ...item, cartItemId: Date.now().toString() };
      return [...prev, newItem];
    });
    
    // Auto open cart when item added
    setIsCartOpen(true);
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
