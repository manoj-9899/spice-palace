"use client";

import { ORDER_CATALOG } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const {
    cart,
    itemCount,
    total,
    orderUrl,
    drawerOpen,
    closeDrawer,
    updateCartQty,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!drawerOpen) return null;

  const entries = Object.entries(cart).filter(([id, qty]) => qty > 0 && ORDER_CATALOG[id]);

  return (
    <div className="sp-cart-overlay" onClick={closeDrawer} role="presentation">
      <aside
        className="sp-cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header className="sp-cart-header">
          <div>
            <h2 id="cart-drawer-title">Your Order</h2>
            <p className="sp-cart-subtitle">
              {itemCount === 0 ? "No items yet" : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
            </p>
          </div>
          <button type="button" className="sp-cart-close" onClick={closeDrawer} aria-label="Close cart">
            ✕
          </button>
        </header>

        <div className="sp-cart-body">
          {entries.length === 0 ? (
            <div className="sp-cart-empty">
              <p>Your cart is empty.</p>
              <a href="#menu" className="sp-cart-browse" onClick={closeDrawer}>
                Browse menu →
              </a>
            </div>
          ) : (
            <ul className="sp-cart-list">
              {entries.map(([id, qty]) => {
                const item = ORDER_CATALOG[id];
                return (
                  <li key={id} className="sp-cart-item">
                    <div className="sp-cart-item-info">
                      <span className="sp-cart-item-name">{item.name}</span>
                      <span className="sp-cart-item-unit">{formatPrice(item.price)} each</span>
                    </div>
                    <div className="sp-cart-item-actions">
                      <div className="sp-qty-control sp-qty-control-cart" aria-label={`Quantity for ${item.name}`}>
                        <button
                          type="button"
                          className="sp-qty-btn"
                          onClick={() => updateCartQty(id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="sp-qty-num">{qty}</span>
                        <button
                          type="button"
                          className="sp-qty-btn"
                          onClick={() => updateCartQty(id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="sp-cart-item-line">{formatPrice(item.price * qty)}</span>
                      <button
                        type="button"
                        className="sp-cart-remove"
                        onClick={() => removeFromCart(id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="sp-cart-footer">
          <div className="sp-cart-total-row">
            <span>Estimated total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`sp-cart-checkout${itemCount === 0 ? " is-disabled" : ""}`}
            aria-disabled={itemCount === 0}
            onClick={(e) => itemCount === 0 && e.preventDefault()}
          >
            Order on WhatsApp
          </a>
          {itemCount > 0 && (
            <button type="button" className="sp-cart-clear" onClick={clearCart}>
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </div>
  );
}
