import Paper from 'paper';
import StepPath from './StepPath';

class ZigZagVertical {
  constructor(origin, config, offset) {
    this.config = config;
    this.origin = origin;
    this.modifier = offset;
  }

  init() {
    return this;
  }

  draw() {
    for ( let col = 0; col < this.config.thickness ; col++) {
      for (let row = 0; row < window.innerHeight  / (this.config.radius * this.config.steps * 2); row++) {
        // col < window.innerWidth  / (this.config.radius * this.config.steps * 2) - 2
        let conf = {
          ...this.config,
        }

        conf.colors.stitch.arr = [
          'black','black','#20e5e5'
        ]

        const origin = new Paper.Point( this.modifier + col * conf.radius * conf.angles.x, this.modifier + row * conf.radius  * conf.steps * conf.angles.y)
        const leftPath = new StepPath(
          origin,
          new Paper.Point(origin.x - this.modifier, origin.y - this.modifier),
          conf
        )

        leftPath.draw();

        const bottomPath = new StepPath(
          origin,
          new Paper.Point(origin.x - this.modifier, origin.y + this.modifier),
          conf
        )

        bottomPath.draw();

        }
    }
  }
}

export { ZigZagVertical };