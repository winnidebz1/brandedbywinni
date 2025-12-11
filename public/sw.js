
const CACHE_NAME = 'winni-admin-v2'; // Bump version to force update
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/logo-icon.png',
    '/Logo-Small.png',
    '/Mainlogo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // 1. Handle Navigation Requests (HTML pages) -> SPA Strategy
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    // If network fails (Offline), return the Cached App Shell (index.html)
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // 2. Handle Assets (CSS, JS, Images) -> Stale-While-Revalidate
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);

    // Skip external stuff usually, but cache Supabase/CDN assets if needed (optional)
    // For now restrict to origin
    if (!url.origin.includes(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((response) => {
                // Cache new assets for next time
                if (response && response.status === 200 && response.type === 'basic') {
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
