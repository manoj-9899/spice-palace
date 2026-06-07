import { featuredDishes, menuByCategory, RESTAURANT } from "./data";
import { formatPrice } from "./utils";

export const CART_STORAGE_KEY = "sp-cart-v1";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
};

export function getOrderCatalog(): Record<string, OrderItem> {
  const catalog: Record<string, OrderItem> = {};

  for (const dish of featuredDishes) {
    catalog[dish.id] = { id: dish.id, name: dish.name, price: dish.price };
  }

  for (const items of Object.values(menuByCategory)) {
    for (const item of items) {
      catalog[item.id] = { id: item.id, name: item.name, price: item.price };
    }
  }

  return catalog;
}

export const ORDER_CATALOG = getOrderCatalog();

export function loadCartFromStorage(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([id, qty]) => ORDER_CATALOG[id] && typeof qty === "number" && qty > 0
      )
    );
  } catch {
    return {};
  }
}

export function saveCartToStorage(cart: Record<string, number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function getCartItemCount(cart: Record<string, number>) {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function getCartTotal(cart: Record<string, number>) {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = ORDER_CATALOG[id];
    return sum + (item ? item.price * qty : 0);
  }, 0);
}

export function buildCartMessage(cart: Record<string, number>) {
  const lines = Object.entries(cart).map(([id, qty]) => {
    const item = ORDER_CATALOG[id];
    return item ? `${qty}x ${item.name} — ${formatPrice(item.price * qty)}` : "";
  }).filter(Boolean);

  const total = getCartTotal(cart);
  return lines.join("\n") + (total ? `\n\nEstimated total: ${formatPrice(total)}` : "");
}

export function getCartWhatsAppUrl(cart: Record<string, number>) {
  if (getCartItemCount(cart) === 0) {
    return `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent("Hi Spice Palace, I'd like to place an order.")}`;
  }
  return `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(
    `Hi Spice Palace, I'd like to order:\n${buildCartMessage(cart)}`
  )}`;
}
