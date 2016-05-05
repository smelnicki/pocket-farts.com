/* globals window, fetch */

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

function getRandomFartFilename () {
  var min = 1;
  var max = 5;

  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return 'fart' + number + '.mp3';
}

function loadSound (callback) {
  var filename = getRandomFartFilename();
  var url = 'sounds/' + filename;

  return fetch(url)
    .then(function (response) {
      return response.arrayBuffer();
    })
    .then(function (response) {
      return audioContext.decodeAudioData(response, callback);
    });
}

function Fart () {
  this.source = null;
}

Fart.prototype.start = function () {
  return loadSound(function (audioBuffer) {
    this.source = audioContext.createBufferSource();

    this.source.connect(audioContext.destination);
    this.source.buffer = audioBuffer;

    this.source.onended = function () {
      this.stop();
    };

    this.source.start();
  });
};

Fart.prototype.stop = function () { };

var fart = new Fart();

function FartButton (fartElement) {
  this.el = fartElement;

  this.el.addEventListener('mousedown', this.start.bind(this));
  this.el.addEventListener('mouseup', this.stop.bind(this));
}

FartButton.prototype.start = function () {
  this.el.classList.add('tapped');

  fart.start().then(function () {
    this.stop();
  });
};

FartButton.prototype.stop = function () {
  this.el.classList.remove('tapped');

  fart.stop();
};

var $ = document.querySelector.bind(document);
var fartElement;
var fartButton; // eslint-disable-line no-unused-vars

document.addEventListener('DOMContentLoaded', function () {
  fartElement = $('.outer');
  fartButton = new FartButton(fartElement);
});

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