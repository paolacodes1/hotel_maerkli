// Cache Clearing Service Worker
// This service worker unregisters itself and clears all caches
// to ensure users always get fresh content

self.addEventListener('install', (event) => {
    // Skip waiting to activate immediately
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Clear all caches
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
            
            // Unregister this service worker
            const registration = await self.registration;
            await registration.unregister();
            
            console.log('All caches cleared and service worker unregistered');
        })()
    );
});

// Don't cache anything - always fetch fresh content
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});