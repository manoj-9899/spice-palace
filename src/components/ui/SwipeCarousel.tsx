"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type SwipeCarouselProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type TouchState = {
  startX: number;
  startY: number;
  scrollLeftStart: number;
  axis: "x" | "y" | null;
};

/**
 * Mobile carousel: vertical swipes scroll the page; horizontal swipes scroll cards.
 * Native overflow-x scroll steals vertical gestures on iOS/Android, so we handle
 * both axes manually with touch-action: none (see .sp-swipe-carousel in mobile.css).
 */
export function SwipeCarousel({ children, className, ...props }: SwipeCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useRef<TouchState>({
    startX: 0,
    startY: 0,
    scrollLeftStart: 0,
    axis: null,
  });
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reset = () => {
      touch.current.axis = null;
      document.removeEventListener("touchmove", onTouchMove, true);
      document.removeEventListener("touchend", onTouchEnd, true);
      document.removeEventListener("touchcancel", onTouchEnd, true);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;

      const s = touch.current;
      const dx = t.clientX - s.startX;
      const dy = t.clientY - s.startY;

      if (!s.axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        s.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }

      if (s.axis === "y") {
        e.preventDefault();
        window.scrollBy(0, lastY.current - t.clientY);
        lastY.current = t.clientY;
        return;
      }

      e.preventDefault();
      el.scrollLeft = s.scrollLeftStart + (s.startX - t.clientX);
    };

    const onTouchEnd = () => reset();

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;

      touch.current = {
        startX: t.clientX,
        startY: t.clientY,
        scrollLeftStart: el.scrollLeft,
        axis: null,
      };
      lastY.current = t.clientY;

      document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
      document.addEventListener("touchend", onTouchEnd, { capture: true });
      document.addEventListener("touchcancel", onTouchEnd, { capture: true });
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart, true);
      reset();
    };
  }, []);

  return (
    <div ref={ref} className={`sp-swipe-carousel ${className ?? ""}`.trim()} {...props}>
      {children}
    </div>
  );
}
