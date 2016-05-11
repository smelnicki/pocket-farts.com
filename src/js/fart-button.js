import Fart from './fart.js';

function FartButton (fartElement) {
  this.el = fartElement;
  this.el.addEventListener('mousedown', this.start.bind(this));
}

FartButton.prototype.start = function () {
  Fart.play();
};

export default FartButton;
