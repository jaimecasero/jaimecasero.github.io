const CACHE_NAME = 'fretnot-v1.5.0';
const ASSETS_TO_CACHE = [
    './guitar.html',
    './guitar.js',
    './guitar.css',
    './guitar_manifest.json',
    './img/guitar_192.png',
    './img/guitar_512.png',
];

// CDN scripts to pre-cache (cross-origin)
const CDN_ASSETS = [
    'https://cdn.jsdelivr.net/npm/midi.js',
    'https://unpkg.com/@tonejs/midi',
    'https://unpkg.com/meyda/dist/web/meyda.min.js',
];

// Domains whose responses we cache dynamically (e.g. soundfonts)
const CACHEABLE_ORIGINS = [
    'https://gleitz.github.io',
];

// Install: cache all assets (local + CDN)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('[SW] Caching local assets');
            await cache.addAll(ASSETS_TO_CACHE);

            console.log('[SW] Caching CDN assets');
            for (const url of CDN_ASSETS) {
                try {
                    const response = await fetch(url, { mode: 'cors' });
                    if (response.ok) {
                        await cache.put(url, response);
                    }
                } catch (err) {
                    console.warn('[SW] Failed to cache CDN asset:', url, err);
                }
            }
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
    const url = new URL(event.request.url);

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200) {
                    return response;
                }
                // Cache same-origin responses and responses from cacheable origins (soundfonts)
                const shouldCache = response.type === 'basic'
                    || CACHEABLE_ORIGINS.some((origin) => url.href.startsWith(origin));
                if (shouldCache) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            });
        })
    );
});