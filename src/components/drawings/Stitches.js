import Paper from "paper";
import StitchPath from "./StitchPath";

class Stitches {
  constructor(radius, enter, exit, type) {
    this.radius = radius;
    this.enter = enter;
    this.exit = exit;
    this.lastPoint = new Paper.Point(enter.x, enter.y);
    this.type = type;
  }

  draw = () => {
    const diagonalPath = new StitchPath( this.radius, this.enter, this.exit, this.type);

    diagonalPath.draw();
    this.path = diagonalPath;
    this.lastPoint = diagonalPath.lastPoint.clone();

    return this;

  };
}


export default Stitches;