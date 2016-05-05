import Fart from './fart.js';

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

export default FartButton;
