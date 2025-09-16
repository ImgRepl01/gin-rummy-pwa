const CACHE_NAME = 'gin-rummy-cache-v1';
const urlsToCache = [
  './gin_rummy.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  // Perform installation steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
