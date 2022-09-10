
import StepPathTwo from "./StepPathTwo";

class vLeft {
  constructor(origin, config) {
    this.origin = origin.clone();
    this.config = config;
    this.paths = [];
  }

  init() {
    this.origin.x = this.origin.x + this.config.offset.x;
    this.origin.y = this.origin.y + this.config.offset.y;

    return this;
  }

  draw() {


    const right = new StepPathTwo(this.origin, this.config.steps, this.config.radius, { x: 1, y: -1 }, this.config.colors, 'x').init();

    // this.origin.x = this.origin.x;
    const left = new StepPathTwo(this.origin, this.config.steps, this.config.radius, { x: 1, y: 1 }, this.config.colors, 'x').init();




    left.draw();
    right.draw();


    this.paths = {
      left: left.path,
      right: right.path,
    };

  }
}

export default vLeft;