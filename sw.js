const CACHE = "hollen-evidence-v3";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./hollen-logo-exact.jpg",
  "./hollen-logo-192.png",
  "./hollen-logo-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});

self.addEventListener("sync", event => {
  if (event.tag === "hollen-upload-queue") {
    event.waitUntil(
      self.clients.matchAll({type:"window", includeUncontrolled:true})
        .then(clients => {
          clients.forEach(client => {
            client.postMessage({type:"HOLLEN_QUEUE_RETRY"});
          });
        })
    );
  }
});
