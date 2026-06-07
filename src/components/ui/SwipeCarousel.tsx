"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type SwipeCarouselProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Mobile carousel: vertical swipes scroll the page; horizontal swipes scroll cards.
 * Uses manual scroll because overflow-x containers capture touch on iOS/Android.
 */
export function SwipeCarousel({ children, className, ...props }: SwipeCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let axis: "x" | "y" | null = null;

    const reset = () => {
      axis = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      lastX = touch.clientX;
      lastY = touch.clientY;
      axis = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }

      if (axis === "y") {
        e.preventDefault();
        window.scrollBy(0, lastY - touch.clientY);
        lastY = touch.clientY;
        return;
      }

      e.preventDefault();
      el.scrollLeft += lastX - touch.clientX;
      lastX = touch.clientX;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", reset, { passive: true });
    el.addEventListener("touchcancel", reset, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", reset);
      el.removeEventListener("touchcancel", reset);
    };
  }, []);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
