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

export default Fart;

