const CACHE = "hollen-evidence-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./hollen-icon-192.png",
  "./hollen-icon-512.png",
  "./hollen-logo.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Let Supabase/CDN requests go to the network; only cache the local app shell.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      if (response.ok) {
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
