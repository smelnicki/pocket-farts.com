/* globals window, Request, fetch */

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// const audioBuffer;

function getRandomFartFilename () {
  const min = 1;
  const max = 5;

  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return `fart${number}.mp3`;
}

function loadSound () {
  const filename = getRandomFartFilename();
  const req = new Request(`/sounds/${filename}`);

  return fetch(req)
    .then((response) => response.arrayBuffer())
    .then((response) => audioContext.decodeAudioData(response));
}

class Fart {
  constructor () {
    this.source = null;
  }

  start () {
    return loadSound().then((audioBuffer) => {
      this.source = audioContext.createBufferSource();

      this.source.connect(audioContext.destination);
      this.source.buffer = audioBuffer;

      this.source.onended = () => this.stop();

      this.source.start();
    });
  }

  stop () {
    console.log('stop audio source');
  }
}

export default Fart;
