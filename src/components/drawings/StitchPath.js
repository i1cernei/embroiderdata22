import Paper from "paper";
import Stitch from "./Stitch";

class StitchPath  {
  constructor( radius, scope = null, from, to, type, color = '#ff40b3') {

    this.radius = radius;
    this.from = from;
    this.to = to;
    this.lastPoint = new Paper.Point(0, 0);
    this.path = (scope !== null) ? new scope.Path() : new Paper.Path();
    this.type = type;
    this.color = color;
    this.offset = Math.sqrt((this.radius ** 2) / 2);
  }

  draw = () => {

    // this.path = new Paper.Path();
    this.path.add(this.from, this.to);

    for (let i = 0; i < this.path.length; i+=this.offset*2) {

        const center = this.path.getPointAt(i);
        this.lastPoint = center.clone();

      const stitch = new Stitch(this.radius, center, this.color || new Paper.Color('black'), this.radius / 2, 'x');
      // const stitch = new Stitch(this.config.radius, _thePoint, this.config.color || new Paper.Color('black'), this.config.radius / 2, 'x');
        stitch.draw();

    }

    return this;
  }
}

export default StitchPath;