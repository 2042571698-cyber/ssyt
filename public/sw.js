const CACHE_NAME = 'yiyangjia-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 暂时关闭复杂的缓存，确保线上能跑通
  event.respondWith(fetch(event.request));
});
