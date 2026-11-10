// FoodStrick PWA — cache exclusivo dos ícones.
// Nenhuma página HTML, API, Supabase, pedido ou dado financeiro é armazenado.
const CACHE = 'foodstrick-pwa-icons-v1';
const ICONS = ['/icons/foodstrick-192.png', '/icons/foodstrick-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ICONS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('foodstrick-pwa-icons-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || !ICONS.includes(url.pathname)) return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
