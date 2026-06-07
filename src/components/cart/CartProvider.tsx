"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getCartItemCount,
  getCartTotal,
  getCartWhatsAppUrl,
  loadCartFromStorage,
  ORDER_CATALOG,
  saveCartToStorage,
} from "@/lib/cart";

type CartContextValue = {
  cart: Record<string, number>;
  itemCount: number;
  total: number;
  orderUrl: string;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (id: string, qty?: number) => void;
  updateCartQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(loadCartFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCartToStorage(cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0 || !ORDER_CATALOG[id]) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  }, []);

  const addToCart = useCallback((id: string, qty = 1) => {
    if (!ORDER_CATALOG[id] || qty < 1) return;
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + qty }));
  }, []);

  const updateCartQty = useCallback(
    (id: string, delta: number) => {
      setCart((prev) => {
        const next = { ...prev };
        const newQty = (prev[id] ?? 0) + delta;
        if (newQty <= 0) delete next[id];
        else next[id] = newQty;
        return next;
      });
    },
    []
  );

  const removeFromCart = useCallback((id: string) => setQty(id, 0), [setQty]);

  const clearCart = useCallback(() => setCart({}), []);

  const itemCount = getCartItemCount(cart);
  const total = getCartTotal(cart);
  const orderUrl = useMemo(() => getCartWhatsAppUrl(cart), [cart]);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      total,
      orderUrl,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
    }),
    [cart, itemCount, total, orderUrl, drawerOpen, addToCart, updateCartQty, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
