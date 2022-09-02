import Paper from "paper";

class DiagonalPath  {
  constructor( radius, from, to) {

    // this.maxLength = maxLength;
    this.radius = radius;
    this.from = from;
    this.to = to;
    this.lastPoint = new Paper.Point(0, 0);
    this.path = '';
  }

  draw = () => {

    // const lineSize = new Paper.Size(this.maxLength * 0.9, this.maxLength * 0.9);
    // const topLeftPos = new Paper.Point(viewCenter.x - lineSize.width / 2, viewCenter.y - lineSize.height / 2);
    this.path = new Paper.Path();
    this.path.addSegments([this.from, this.to]);

    for (let i = 0; i < this.path.length; i++) {
      if (i % (this.radius * 2) === 0) {

        const center = this.path.getPointAt(i);
        this.lastPoint = center.clone();
        const pointOffset = Math.sqrt((this.radius ** 2) / 2);
        const stitchPath = new Paper.Path();
        const stitchPathTwo = new Paper.Path();
        

        const firstPoint = new Paper.Point(
            center.x - pointOffset,
            center.y - pointOffset
        )
        const secondPoint = new Paper.Point(
          center.x + pointOffset,
          center.y + pointOffset
        )
        const thirdPoint = new Paper.Point(
          center.x + pointOffset,
          center.y - pointOffset
      )
        const fourthPoint = new Paper.Point(
          center.x - pointOffset,
          center.y + pointOffset
        )


        stitchPath.addSegments([firstPoint, secondPoint]);
        stitchPathTwo.addSegments([thirdPoint, fourthPoint]);

        stitchPath.strokeColor = new Paper.Color('red');
        stitchPath.strokeWidth = 2;
        stitchPathTwo.strokeColor = new Paper.Color('red');
        stitchPathTwo.strokeWidth = 2;

      }
    }

    this.path.strokeColor = 'black';
    this.path.strokeWidth = 1;

    return this;
  }
}

export default DiagonalPath;