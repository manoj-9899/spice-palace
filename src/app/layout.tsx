import type { Metadata } from "next";
import { RESTAURANT } from "@/lib/data";
import "./globals.css";
import "./mobile.css";

export const metadata: Metadata = {
  metadataBase: new URL(RESTAURANT.url),
  title: "Spice Palace — Authentic Indian Restaurant Pune | Order Online",
  description:
    "Authentic Indian cuisine crafted fresh daily in Pune. Order online, book a table, or call +91 88053 48821. 4.9★ rating, 1200+ happy customers.",
  keywords: ["Indian restaurant Pune", "order food Pune", "biryani Pune", "Spice Palace", "MG Road restaurant"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: RESTAURANT.url,
    siteName: RESTAURANT.name,
    title: "Spice Palace — Authentic Indian Cuisine Pune",
    description: "Fresh Indian food, expert chefs, 4.9★ rating. Order online or book your table today.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Spice Palace — Dal Makhani" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spice Palace — Order Indian Food in Pune",
    description: "Authentic Indian cuisine crafted fresh every day.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  image: `${RESTAURANT.url}/og.png`,
  telephone: RESTAURANT.phone,
  email: RESTAURANT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.address,
    addressLocality: RESTAURANT.city,
    addressCountry: "IN",
  },
  servesCuisine: "Indian",
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1200",
  },
  openingHours: "Mo-Su 12:00-23:00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2D4A3E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" href="/icons/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icons/icon-512.png" sizes="512x512" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/images/hero/dal-makhani-hero.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <form name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="bot-field" />
          <input type="email" name="email" />
          <input type="hidden" name="form-name" value="newsletter" />
        </form>
        <a href="#main-content" className="sp-skip-link">
          Skip to main content
        </a>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js').catch(function () {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
