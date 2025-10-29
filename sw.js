// sw.js (Service Worker)
// A minimal service worker that enables PWA installation.
// For full offline capabilities, you'd add caching strategies here.

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  self.skipWaiting(); // Forces the waiting service worker to become the active service worker
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(clients.claim()); // Take control of un-controlled clients immediately
});

self.addEventListener('fetch', (event) => {
  // For now, we're just letting all network requests pass through.
  // To add offline capabilities, you would implement caching strategies here.
  // Example: event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
  event.respondWith(fetch(event.request));
});
