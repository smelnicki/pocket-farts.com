var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers;

/* globals window, Request, fetch */

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

// const audioBuffer;

function getRandomFartFilename() {
  var min = 1;
  var max = 5;

  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return 'fart' + number + '.mp3';
}

function loadSound() {
  var filename = getRandomFartFilename();
  var req = new Request('/sounds/' + filename);

  return fetch(req).then(function (response) {
    return response.arrayBuffer();
  }).then(function (response) {
    return audioContext.decodeAudioData(response);
  });
}

var Fart = function () {
  function Fart() {
    babelHelpers.classCallCheck(this, Fart);

    this.source = null;
  }

  babelHelpers.createClass(Fart, [{
    key: 'start',
    value: function start() {
      var _this = this;

      return loadSound().then(function (audioBuffer) {
        _this.source = audioContext.createBufferSource();

        _this.source.connect(audioContext.destination);
        _this.source.buffer = audioBuffer;

        _this.source.onended = function () {
          return _this.stop();
        };

        _this.source.start();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      console.log('stop audio source');
    }
  }]);
  return Fart;
}();

var FartButton = function () {
  function FartButton(fartElement) {
    babelHelpers.classCallCheck(this, FartButton);

    this.fart = new Fart();

    fartElement.addEventListener('mousedown', this.start.bind(this));
    fartElement.addEventListener('mouseup', this.stop.bind(this));

    // fartElement.addEventListener('touchstart', this.start.bind(this));
    // fartElement.addEventListener('touchend', this.stop.bind(this));

    this.el = fartElement;
  }

  babelHelpers.createClass(FartButton, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.el.classList.add('tapped');
      this.fart.start().then(function () {
        return _this.stop();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.el.classList.remove('tapped');
      this.fart.stop();
    }
  }]);
  return FartButton;
}();

var $ = document.querySelector.bind(document);
var fartElement = void 0;
var fartButton = void 0; // eslint-disable-line no-unused-vars

document.addEventListener('DOMContentLoaded', function () {
  fartElement = $('#fart');
  fartButton = new FartButton(fartElement);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' }).then(function () {
    return console.log('service worker registered');
  });

  navigator.serviceWorker.ready.then(function () {
    return console.log('service worker ready');
  });
}