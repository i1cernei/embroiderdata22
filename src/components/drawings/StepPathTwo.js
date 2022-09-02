import { toHaveAttribute } from '@testing-library/jest-dom/dist/matchers';
import Stitch from './Stitch';
import Paper from 'paper';

class StepPathTwo {
  constructor(origin, steps, stitchRadius,  directions, colors, type) {
    this.directions = directions;
    this.origin = origin;
    this.walker = origin.clone();
    this.steps = steps;
    this.radius = stitchRadius;
    this.path = new Paper.Path();
    this.colors = colors;
    this.color = new Paper.Color(colors[0]);
    this.stitches = [];
    this.type = type;
  }

  init() {
    return this;
  }

  draw() {
    let count = 0;
    // this.path.strokeWidth = 2;
    // this.path.strokeColor = new Paper.Color('pink');

    while (count < this.steps) {
      // console.log(count);
      // this.path.add(this.walker);
      // this.color.set(this.colors[1]);

      if (this.directions.x === 0 || this.directions.y === 0) {
        this.walker.y = this.walker.y + this.radius * this.directions.y;
        this.walker.x = this.walker.x + this.radius * this.directions.x;
        if (count % 2 !== 0) {
          // this.color.set(this.colors[2]);
        }
      } else {

              if (count % 2 === 0) {
                this.walker.x = this.walker.x + this.radius * this.directions.x;
              } else {
                  this.walker.y = this.walker.y + this.radius * this.directions.y;
                  // this.color.set(this.colors[2]);
              }
      }


      this.path.add(this.walker);

      const stitch = new Stitch(Math.sqrt(2 * (this.radius ** 2)) / 2 - this.radius / 6, this.walker, this.color, this.radius / 2, this.type);
      stitch.draw()

      // const circle = new Paper.Path.Circle(this.walker, 2);
      // circle.fillColor = this.colors[0] || new Paper.Color('pink');
      // circle.strokeWidth = 1;


      count++;
    }

    // console.log(this.color);





    return this;
  }
}

export default StepPathTwo;