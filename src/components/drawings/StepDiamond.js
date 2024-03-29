import StepPathTwo from "./StepPathTwo";

export class StepDiamond {
  constructor(origin, config, offset, scope = null) {
    this.origin = origin.clone();
    this.config = config;
    this.offset = offset;
    this.paths = [];
    this.scope = scope;
  }

  init() {
    this.origin.x = this.origin.x + this.offset.x;
    this.origin.y = this.origin.y + this.offset.y;

    return this;
  }

  draw() {

    const bLeft = new StepPathTwo(this.origin, this.config.steps, this.config.radius, { x: 1, y: 1 }, this.config.colors, 'x', this.scope).init();
    const topLeft = new StepPathTwo(this.origin, this.config.steps, this.config.radius, { x: 1, y: -1 }, this.config.colors, 'x', this.scope).init();

    this.origin.x += this.config.steps * this.config.radius;
    const topRight = new StepPathTwo(this.origin, this.config.steps, this.config.radius, { x: -1, y: -1 }, this.config.colors, 'x', this.scope).init();
    const bRight = new StepPathTwo(this.origin, this.config.steps, this.config.radius, { x: -1, y: 1 }, this.config.colors, 'x', this.scope).init();


    topLeft.draw();
    topRight.draw();
    bLeft.draw();
    bRight.draw();

    this.paths = {
      topL: topLeft.path,
      topR: topRight.path,
      bottomL: bLeft.path,
      bottomR: bRight.path
    };

  }
}