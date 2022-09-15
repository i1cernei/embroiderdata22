// import PaperCanvas from "../canvas/NewCanvas";
// import StepPathTwo from "./StepPathTwo";
// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import Paper from 'paper';
import Stitch from './Stitch';

export class CircleRamsHorns {
  constructor(origin, config, offset = {x:0, y:0}, scope = null) {
    this.origin = origin.clone();
    this.config = config;
    this.offset = offset;
    this.path = (scope !== null) ? new scope.Path() : new Paper.Path();
    this.paths = [];
    this.scope = scope;
    this.points = [];
    this.stitches = [];
    this.dir = { x: 0, y: 0 };
  }

  init() {
    this.origin.x = this.origin.x + this.offset.x;
    this.origin.y = this.origin.y + this.offset.y;

    for (let i =  this.config.startRadians; i <= this.config.radianLimit; i += Math.PI * 0.5) {
      // const rad = i * Math.PI / 180;
      const posX = this.origin.x + Math.cos(i) * this.config.baseRadius;
      const posY = this.origin.y + Math.sin(i) * this.config.baseRadius;


      const point = new Paper.Point(posX, posY);

      this.points.push(point);
    }


    return this;
  }

  draw() {

    this.points.map((point, index) => {
      let pointOne = '';
      const path = (this.scope !== null) ? new this.scope.Path() : new Paper.Path();

      if (index === this.points.length - 1) {
        pointOne = this.points[0];

        this.dir.x = 1 * Math.sign(Number(point.x) - Number(pointOne.x));
        this.dir.y = 1 * Math.sign(Number(point.y) - Number(pointOne.y));
      } else {
        pointOne = this.points[index + 1];
        this.dir.x = 1 * Math.sign(Number(point.x) - Number(pointOne.x));
        this.dir.y = 1 * Math.sign(Number(point.y) - Number(pointOne.y));
      }

      // const segment = new Paper.Segment(point, pointOne);
      path.add(origin, pointOne);
      // path.strokeWidth = 10;
      // path.strokeColor = new Paper.Color('black');

      this.paths.push(path);
      let count = 0;

      for (let i = 0; i < path.length; i += Math.sqrt(2 * (this.config.radius ** 2))) {
        const _thePoint = path.getPointAt(i);

        const stitch = new Stitch(this.config.radius, _thePoint, this.config.color || new Paper.Color('black'), this.config.radius / 2, 'x');

        const secondPoint = _thePoint.clone();


        stitch.draw();
        this.stitches.push(stitch);


        const skip = this.config.skipOne ? 2 : 1;
        const check = this.config.oddOnly ? 2 * count + 1 : count;

        if (check % skip !== 0) {
          const secondStitch = new Stitch(this.config.radius, secondPoint, this.config.color || 'black', this.config.radius / 2, 'x');

          if (this.config.outer) {
            secondPoint.x = secondPoint.x - this.dir.y * Math.sqrt(2 * (this.config.radius ** 2));
          } else {
            secondPoint.x = secondPoint.x + this.dir.y * Math.sqrt(2 * (this.config.radius ** 2));
          }

          if (count > 0 && i <= path.length - Math.sqrt(2 * (this.config.radius ** 2))) {
            secondStitch.draw();
          }

          this.stitches.push(secondStitch);

          if (this.config.inner) {
            secondPoint.x = secondPoint.x + this.dir.y * Math.sqrt(2 * (this.config.radius ** 2)) * 2;
            const thirdStitch = new Stitch(this.config.radius, secondPoint, this.config.color || 'black', this.config.radius / 2, 'x');

            if (count > 0 && i <= path.length - Math.sqrt(2 * (this.config.radius ** 2))) {
              thirdStitch.draw();
            }

            this.stitches.push(thirdStitch);
          }
        }

        count++;
      }

      // console.log(index, this.dir)
    })

    // this.paths = {
    //   topL: topLeft.path,
    //   topR: topRight.path,
    //   bottomL: bLeft.path,
    //   bottomR: bRight.path
    // };

  }
}