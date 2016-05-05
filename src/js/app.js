/* globals document, navigator */

import FartButton from './fart-button.js';

const $ = document.querySelector.bind(document);
let fartElement;
let fartButton; // eslint-disable-line no-unused-vars

document.addEventListener('DOMContentLoaded', () => {
  fartElement = $('.outer');
  fartButton = new FartButton(fartElement);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js', { scope: '/' })
    .then(() => console.log('ServiceWorker: registered'));

  navigator.serviceWorker.ready
    .then(() => console.log('ServiceWorker: ready'));
}

