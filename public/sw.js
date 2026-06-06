const CACHE_NAME = "restaurant-cache-v1";
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

function extractAssetUrls(html) {
  const urls = new Set();
  const patterns = [
    /href="(\/_next\/static\/css\/[^"]+\.css)"/g,
    /src="(\/_next\/static\/chunks\/[^"]+\.js)"/g,
    /href="(\/_next\/static\/media\/[^"]+)"/g,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      urls.add(match[1]);
    }
  }

  return Array.from(urls);
}

async function precacheMainAssets(cache) {
  await cache.addAll(PRECACHE_URLS);

  try {
    const response = await fetch("/", { cache: "no-store" });
    if (!response.ok) return;

    const html = await response.text();
    await cache.put("/", response.clone());

    const assetUrls = extractAssetUrls(html);
    await Promise.all(
      assetUrls.map(async (url) => {
        try {
          await cache.add(url);
        } catch {
          /* skip assets that fail during install */
        }
      })
    );
  } catch {
    /* offline during install — base precache still applies */
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => precacheMainAssets(cache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok && request.method === "GET") {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    if (request.mode === "navigate") {
      const fallback = await caches.match("/");
      if (fallback) return fallback;
    }
    throw new Error("Network unavailable and no cache match");
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(cacheFirst(event.request));
});
