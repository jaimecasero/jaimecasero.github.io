const CACHE_NAME = 'berimbau-v1.0.0';
const ASSETS_TO_CACHE = [
    './berimbau.html',
    './berimbau.js',
    './berimbau.css',
    './berimbau_manifest.json',
    './img/berimbau_192.svg',
    './img/berimbau_512.svg',
    './audio/gunga-chi.wav',
    './audio/gunga-din.wav',
    './audio/gunga-don.wav',
    './audio/medio-chi.wav',
    './audio/medio-din.wav',
    './audio/medio-don.wav',
    './audio/viola-chi.wav',
    './audio/viola-din.wav',
    './audio/viola-don.wav',
    './audio/atabaqueDak.wav',
    './audio/atabaqueDum.wav',
    './audio/pandeiro-slap.wav',
    './audio/pandeiro-tum.wav',
    './audio/agogo_dom.wav',
    './audio/agogo_dim.wav',
    './audio/palma.wav',
    './audio/metro-1.wav',
    './audio/metro-n.wav',
];

// Install: cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching all assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    self.clients.claim();
});

// Fetch: serve from cache first, fall back to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});
