"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type SwipeCarouselProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/** Lets vertical page scroll win over horizontal carousel when the user swipes up/down on a card. */
export function SwipeCarousel({ children, className, ...props }: SwipeCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let axis: "x" | "y" | null = null;

    const reset = () => {
      axis = null;
      el.style.overflowX = "";
      el.style.touchAction = "";
    };

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      axis = null;
      el.style.overflowX = "";
      el.style.touchAction = "";
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
        el.style.overflowX = "hidden";
        el.style.touchAction = "pan-y";
        return;
      }

      el.style.overflowX = "auto";
      el.style.touchAction = "pan-x";
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
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
