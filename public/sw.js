
const CACHE_NAME = 'winni-admin-v3'; // Bump version to force update
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
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // 2. Handle Assets (CSS, JS, Images) -> Stale-While-Revalidate
    // Allow caching specific external CDNs (Tailwind, Fonts)
    const url = new URL(event.request.url);
    const isExternalAllowed =
        url.hostname.includes('cdn.tailwindcss.com') ||
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.hostname.includes('aistudiocdn.com'); // internal CDN

    if (event.request.method !== 'GET') return;

    // If external and NOT allowed, skip
    if (!url.origin.includes(self.location.origin) && !isExternalAllowed) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((response) => {
                // Only cache valid responses
                if (response && response.status === 200 && response.type === 'basic' || (response.type === 'cors' && isExternalAllowed)) {
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
