import Fart from './fart.js';

function FartButton (fartElement) {
  this.fart = new Fart();

  this.el = fartElement;
  this.el.addEventListener('mousedown', this.start.bind(this));
}

FartButton.prototype.start = function () {
  this.fart.play();
};

export default FartButton;
