/* globals document, navigator */

import FartButton from './fart-button.js';

var $ = document.querySelector.bind(document);
var fartElement;
var fartButton; // eslint-disable-line no-unused-vars

// Wait for the DOM to load, then initialize our fart button.
document.addEventListener('DOMContentLoaded', function () {
  fartElement = $('.outer');
  fartButton = new FartButton(fartElement);
});

// Register our service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js', { scope: '/' })
    .then(function () {
      console.log('ServiceWorker: registered');
    });

  navigator.serviceWorker.ready
    .then(function () {
      console.log('ServiceWorker: ready');
    });
}

