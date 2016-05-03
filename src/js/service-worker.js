/* globals self, fetch, caches */

import { version } from '../../package.json';

const cacheName = `pocket-farts-${version}`;
const filesToCache = [
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

this.addEventListener('install', (event) => {
  console.log('ServiceWorker: install');

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('ServiceWorker: caching app files');
      return cache.addAll(filesToCache);
    })
  );
});

this.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

this.addEventListener('fetch', (event) => {
  console.log('ServiceWorker: fetch', event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

