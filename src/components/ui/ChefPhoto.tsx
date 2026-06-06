"use client";

import Image from "next/image";
import { useState } from "react";

export function ChefPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (failed) {
    return (
      <div className="sp-chef-fallback" aria-hidden="true">
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      className="object-cover"
      sizes="340px"
      onError={() => setFailed(true)}
    />
  );
}
