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

export default Fart;

