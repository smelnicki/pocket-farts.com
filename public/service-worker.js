var version = "0.0.1";

var cacheName = 'pocket-farts-' + version;
var filesToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/img/icon.png',
  '/sounds/fart1.mp3',
  '/sounds/fart2.mp3',
  '/sounds/fart3.mp3',
  '/sounds/fart4.mp3',
  '/sounds/fart5.mp3'
];

this.addEventListener('install', function (event) {
  console.log('ServiceWorker: install');

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('ServiceWorker: caching app files');
      return cache.addAll(filesToCache);
    })
  );
});

this.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

this.addEventListener('fetch', function (event) {
  console.log('ServiceWorker: fetch', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});