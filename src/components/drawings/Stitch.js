import Paper from "paper";

class Stitch {
  constructor(radius, center, color, stroke, type) {
    this.radius = radius;
    this.center = center;
    this.color = color;
    this.stroke = stroke;
    this.type = type;
    this.paths = [];
  }

  draw = () => {


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

const drawX = (stitch) => {
  const stitchPath = new Paper.Path();
    const stitchPathTwo = new Paper.Path();
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