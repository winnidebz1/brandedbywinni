
const CACHE_NAME = 'winni-pwa-v1';
const STATIC_ASSETS = [
    '/logo-icon.png',
    '/manifest.json'
];

// Install - cache only essential static files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate - cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch - Network first, then cache (conservative strategy)
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    // Skip API calls to Supabase
    if (event.request.url.includes('supabase')) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // If we got a valid response, cache it for next time
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // Only if network fails, try cache
                return caches.match(event.request);
            })
    );
});
