"use client";

import Image from "next/image";
import { useState } from "react";

export function Avatar({
  name,
  src,
  size = 56,
  className = "",
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={`sp-avatar-img ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`sp-avatar-fallback ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
