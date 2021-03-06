/* globals fetch, caches */

import { version } from '../../package.json';

// cache namespace we'll save our resources under
var cacheName = 'pocket-farts-' + version;

// all app resources we want to available in the cache
var filesToCache = [
  '/',
  '/index.html',
  '/styles/app.css',
  '/vendor/es6-promise.js',
  '/vendor/fetch.js',
  '/js/app.js',
  '/img/icon.png',
  '/sounds/fart1.mp3',
  '/sounds/fart2.mp3',
  '/sounds/fart3.mp3',
  '/sounds/fart4.mp3',
  '/sounds/fart5.mp3'
];

// populate the browser's offline cache with our app files
this.addEventListener('install', function (event) {
  console.log('ServiceWorker: install');

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('ServiceWorker: caching app files');
      return cache.addAll(filesToCache);
    })
  );
});

// delete any old caches we've saved under current `cacheName`
this.addEventListener('activate', function (event) {
  console.log('ServiceWorker: activate');

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// hijack http request to serve cached versions of the resource (if available)
this.addEventListener('fetch', function (event) {
  console.log('ServiceWorker: fetch', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

