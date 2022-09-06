import Paper from "paper";

class Stitch {
  constructor(radius, center, color, stroke, type, scope = null) {
    this.radius = radius;
    this.center = center;
    this.color = color;
    this.stroke = stroke;
    this.type = type;
    this.paths = [];
    this.scope = scope;
  }

  draw = () => {

    const _this = this;

    switch (this.type) {
      case "x":
        drawX(this);
        break;
      default:
        drawX(this);
        break;
    }



  };
}

function drawX (stitch) {
  let stitchPath = new Paper.Path();
  let stitchPathTwo = new Paper.Path();

  if (this !== undefined && this.scope !== null) {
    stitchPath = new this.scope.Path();
    stitchPathTwo = new this.scope.Path();
  }

  const pointOffset = Math.sqrt((stitch.radius ** 2) / 2);

    const firstPoint = new Paper.Point(
        stitch.center.x - pointOffset,
        stitch.center.y - pointOffset
    )
    const secondPoint = new Paper.Point(
      stitch.center.x + pointOffset,
      stitch.center.y + pointOffset
    )
    const thirdPoint = new Paper.Point(
      stitch.center.x + pointOffset,
      stitch.center.y - pointOffset
  )
    const fourthPoint = new Paper.Point(
      stitch.center.x - pointOffset,
      stitch.center.y + pointOffset
    )


    stitchPath.addSegments([firstPoint, secondPoint]);
    stitchPathTwo.addSegments([thirdPoint, fourthPoint]);
    stitchPath.strokeColor = stitch.color;
    stitchPath.strokeWidth = stitch.stroke;
    stitchPathTwo.strokeColor = stitch.color;
  stitchPathTwo.strokeWidth = stitch.stroke;

  stitch.paths.push({
    stitch_one: stitchPath,
    stitch_two: stitchPathTwo,
  })
}

export default Stitch;