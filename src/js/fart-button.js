import Fart from './fart.js';

class FartButton {
  constructor (fartElement) {
    this.fart = new Fart();

    fartElement.addEventListener('mousedown', this.start.bind(this));
    fartElement.addEventListener('mouseup', this.stop.bind(this));

    // fartElement.addEventListener('touchstart', this.start.bind(this));
    // fartElement.addEventListener('touchend', this.stop.bind(this));

    this.el = fartElement;
  }

  start () {
    this.el.classList.add('tapped');
    this.fart.start().then(() => this.stop());
  }

  stop () {
    this.el.classList.remove('tapped');
    this.fart.stop();
  }
}

export default FartButton;
