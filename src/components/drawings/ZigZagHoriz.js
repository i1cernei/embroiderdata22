import Paper from 'paper';
import StepPath from './StepPath';

class ZigZagHorizontal {
  constructor(origin, config, offset) {
    this.config = config;
    this.origin = origin;
    this.modifier = offset;
  }

  init() {
    return this;
  }

  draw() {
    for ( let col = 0; col < window.innerWidth  / (this.config.radius * this.config.steps * 2) ; col++) {
      for (let row = 0; row < this.config.thickness; row++) {
        let conf = {
          ...this.config,
        }

        const origin = new Paper.Point( this.modifier + col * conf.radius * conf.steps * 2, this.modifier + row * conf.radius  * conf.angles.y)
        const leftPath = new StepPath(
          origin,
          new Paper.Point(origin.x - this.modifier, origin.y - this.modifier),
          conf
        )

        leftPath.draw();

        const rightPath = new StepPath(
          origin,
          new Paper.Point(origin.x + this.modifier, origin.y - this.modifier),
          conf
        )

        rightPath.draw();

        }
    }
  }
}

export { ZigZagHorizontal };