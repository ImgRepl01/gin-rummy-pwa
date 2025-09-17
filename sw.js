// A version number for the cache to ensure updates are handled.
const CACHE_VERSION = 'gin-rummy-v1.1';
const CACHE_FILES = [
    '/',
    '/index.html',
    // Add any other game assets here later, like images or sounds
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            console.log('Service Worker: Caching all content.');
            return cache.addAll(CACHE_FILES);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return the cached response if it exists
            if (response) {
                return response;
            }
            // Otherwise, fetch from the network
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete old caches
                    if (cacheName !== CACHE_VERSION) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
