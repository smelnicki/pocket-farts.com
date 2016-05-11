/* globals window, fetch */

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

/**
 * Hardcoding our list of sound files for now.
 * Will need to revist in the near future
 */
var soundUrls = [
  'sounds/fart1.mp3',
  'sounds/fart2.mp3',
  'sounds/fart3.mp3',
  'sounds/fart4.mp3',
  'sounds/fart5.mp3'
];

/*
 * array of all the decoded audio data buffers.
 * we'll randomly select an item to connect and play from.
 */
var buffers = [];

function saveAudioBuffer (audioBuffer) {
  buffers.push(audioBuffer);
}

/*
 * Makes a network request for each file under the 'sounds' directory.
 * Then decodes the audio data into a buffer and saves it.
 *
 * TODO: Error handling.
 * Need to come up with some graceful crash, or something to that effect.
 */
function fetchSounds () {
  soundUrls.forEach(function (url) {
    fetch(url)
      .then(function (response) {
        return response.arrayBuffer();
      })
      .then(function (response) {
        return audioContext.decodeAudioData(response, saveAudioBuffer);
      });
  });
}

function selectRandomAudioBuffer () {
  var index = Math.floor(Math.random() * buffers.length);
  return buffers[index];
}

function Fart () {
  fetchSounds();
}

// See apple documentation link for reference (under the header of 'Playing Sounds'):
// https://developer.apple.com/library/iad/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html
Fart.prototype.play = function () {
  var source = audioContext.createBufferSource();

  source.buffer = selectRandomAudioBuffer();
  source.connect(audioContext.destination);

  source.loop = false;

  source.start();
};

export default new Fart();

