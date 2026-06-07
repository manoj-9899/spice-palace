"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type SwipeCarouselProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Transform-based mobile carousel — no overflow-x scroll container, so vertical
 * page scroll stays native and smooth. Horizontal drag moves the track 1:1 with
 * the finger; release eases to the nearest card (proximity snap, not hard jump).
 */
export function SwipeCarousel({ children, className, ...props }: SwipeCarouselProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const startOffset = useRef(0);
  const axis = useRef<"x" | "y" | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const gap = () => {
      const styles = getComputedStyle(track);
      return parseFloat(styles.columnGap || styles.gap || "12") || 12;
    };

    const maxOffset = () => Math.max(0, track.scrollWidth - outer.clientWidth);

    const clamp = (value: number) => Math.min(maxOffset(), Math.max(0, value));

    const applyTransform = (x: number, animate: boolean) => {
      track.style.transition = animate ? "transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none";
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
    };

    const snapPositions = () => {
      const positions: number[] = [0];
      let pos = 0;
      const g = gap();
      for (let i = 0; i < track.children.length - 1; i++) {
        pos += (track.children[i] as HTMLElement).offsetWidth + g;
        positions.push(clamp(pos));
      }
      return positions;
    };

    const snapToNearest = () => {
      const positions = snapPositions();
      const current = offset.current;
      let nearest = positions[0];
      let minDist = Infinity;
      for (const p of positions) {
        const d = Math.abs(current - p);
        if (d < minDist) {
          minDist = d;
          nearest = p;
        }
      }
      offset.current = nearest;
      applyTransform(offset.current, true);
    };

    const reset = () => {
      dragging.current = false;
      axis.current = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      startX.current = t.clientX;
      startY.current = t.clientY;
      startOffset.current = offset.current;
      axis.current = null;
      dragging.current = true;
      track.style.transition = "none";
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      if (!t) return;

      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;

      if (!axis.current) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis.current === "y") {
          dragging.current = false;
          return;
        }
      }

      if (axis.current === "x") {
        e.preventDefault();
        offset.current = clamp(startOffset.current - dx);
        applyTransform(offset.current, false);
      }
    };

    const onTouchEnd = () => {
      if (axis.current === "x") snapToNearest();
      reset();
    };

    outer.addEventListener("touchstart", onTouchStart, { passive: true });
    outer.addEventListener("touchmove", onTouchMove, { passive: false });
    outer.addEventListener("touchend", onTouchEnd, { passive: true });
    outer.addEventListener("touchcancel", onTouchEnd, { passive: true });

    const onResize = () => {
      offset.current = clamp(offset.current);
      applyTransform(offset.current, false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      outer.removeEventListener("touchstart", onTouchStart);
      outer.removeEventListener("touchmove", onTouchMove);
      outer.removeEventListener("touchend", onTouchEnd);
      outer.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={outerRef} className={`sp-swipe-carousel ${className ?? ""}`.trim()} {...props}>
      <div ref={trackRef} className="sp-swipe-carousel-track">
        {children}
      </div>
    </div>
  );
}
