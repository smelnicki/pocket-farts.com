/* globals window, fetch */

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

var buffers = [];

function saveAudioBuffer (audioBuffer) {
  buffers.push(audioBuffer);
}

function fetchSounds () {
  for (var i = 1; i < 6; i++) {
    var filename = 'fart' + i + '.mp3';
    var url = 'sounds/' + filename;

    fetch(url)
      .then(function (response) {
        return response.arrayBuffer();
      })
      .then(function (response) {
        return audioContext.decodeAudioData(response, saveAudioBuffer);
      });
  }
}

function selectRandomAudioBuffer () {
  var index = Math.floor(Math.random() * buffers.length);
  return buffers[index];
}

function Fart () {
  fetchSounds();
}

Fart.prototype.play = function () {
  var source = audioContext.createBufferSource();

  source.buffer = selectRandomAudioBuffer();
  source.connect(audioContext.destination);

  source.loop = false;

  source.start();
};

function FartButton (fartElement) {
  this.fart = new Fart();

  this.el = fartElement;
  this.el.addEventListener('mousedown', this.start.bind(this));
  this.el.addEventListener('mouseup', this.stop.bind(this));
}

FartButton.prototype.start = function () {
  this.el.classList.add('tapped');

  this.fart.play();
};

FartButton.prototype.stop = function () {
  // this.el.classList.remove('tapped');
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