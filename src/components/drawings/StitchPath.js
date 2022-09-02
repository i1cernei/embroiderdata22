import Paper from "paper";
import Stitch from "./Stitch";

class StitchPath  {
  constructor( radius, from, to, type) {

    this.radius = radius;
    this.from = from;
    this.to = to;
    this.lastPoint = new Paper.Point(0, 0);
    this.path = '';
    this.type = type;
    this.color = new Paper.Color('#ff40b3');
    this.offset = Math.sqrt((this.radius ** 2) / 2);
  }

  draw = () => {

    this.path = new Paper.Path();
    this.path.addSegments([this.from, this.to]);

    for (let i = 0; i < this.path.length; i+=this.offset*2) {

        const center = this.path.getPointAt(i);
        this.lastPoint = center.clone();

        const stitch = new Stitch(this.radius, center, this.color , 2, this.type);
        stitch.draw();

    }

    return this;
  }
}

export default StitchPath;