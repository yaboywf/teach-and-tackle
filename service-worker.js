const CACHE_NAME = 'Cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/index.js',
    '/favicon.png',
    '/logo.webp',
    '/ppf.webp',
    '/fontawesome.css',
    '/code icon.png',
    '/wifi icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache.map(url => {
                return url;
            }))
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }

            return fetch(event.request).catch(() => {
                return new Response('Cannot get resource', { status: 404 });
            });
        }).catch(() => {
            // Handle any errors in the cache match process
            return new Response('Cannot get resource', { status: 404 });
        })
    );
});
