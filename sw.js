const CACHE="hollen-evidence-v2";
const SHELL=["./","./index.html","./manifest.json","./hollen-logo-exact.jpg","./hollen-logo-192.png","./hollen-logo-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(u.origin!==self.location.origin)return;
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,cp));}return r;})));
});