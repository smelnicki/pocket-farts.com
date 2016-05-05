/* globals window, fetch */

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function getRandomFartFilename () {
  const min = 1;
  const max = 5;

  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return `fart${number}.mp3`;
}

function loadSound (callback) {
  const filename = getRandomFartFilename();

  return fetch(`/sounds/${filename}`)
    .then((response) => response.arrayBuffer())
    .then((response) => audioContext.decodeAudioData(response, (decodedAudioBuffer) => {
      callback(decodedAudioBuffer);
    }));
}

class Fart {
  constructor () {
    this.source = null;
  }

  start () {
    return loadSound((audioBuffer) => {
      this.source = audioContext.createBufferSource();

      this.source.connect(audioContext.destination);
      this.source.buffer = audioBuffer;

      this.source.onended = () => this.stop();

      this.source.start();
    });
  }

  stop () {
    // console.log('stop audio source');
  }
}

export default Fart;
