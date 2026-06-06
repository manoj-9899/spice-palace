export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k+`.replace("k+", "000+");
  return `${n}${n >= 22 ? "+" : ""}`;
}
