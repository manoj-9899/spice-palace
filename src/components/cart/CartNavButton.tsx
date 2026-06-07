"use client";

import { useCart } from "./CartProvider";

export function CartNavButton() {
  const { itemCount, openDrawer } = useCart();

  return (
    <button
      type="button"
      className="sp-cart-nav-btn"
      onClick={openDrawer}
      aria-label={itemCount > 0 ? `Open cart, ${itemCount} items` : "Open cart"}
    >
      <span className="sp-cart-nav-icon" aria-hidden="true">🛒</span>
      {itemCount > 0 && <span className="sp-cart-nav-badge">{itemCount > 99 ? "99+" : itemCount}</span>}
    </button>
  );
}
