import Paper from "paper";

class BranchPath  {
  constructor(args) {
    this.papersize = args.papersize;
    this.endPoint = new Paper.Point(0,0);
    this.origin = args.origin;
    this.angle = args.angle;
    this.endingAngle = args.endingAngle;
    this.radians = args.angle * Math.PI / 180;
    this.length = args.length;
    this.normal = args.normal;
    this.footLength = args.footLength;
  }

  draw = () => {
    const maxSize = Math.min(this.papersize.width, this.papersize.height);

    this.path = new Paper.Path();
    // this.path.add(this.origin);
    this.endPoint = new Paper.Point(
      Math.cos(this.radians) * this.length + this.origin.x,
      Math.sin(this.radians) * this.length + this.origin.y);
    this.path.addSegments([this.origin, this.origin.add(this.normal.multiply(this.length))]);
    this.endPoint = this.origin.add(this.normal.multiply(this.length));


    this.path.addSegments([this.origin, this.endPoint]);


    // console.log(PaperScope);

    const divisor = 0.22;

    // for (let i = 0; i < 5; i++) {
      // const ending = new Paper.Point(
      //   Math.cos(this.endingAngle * Math.PI / 180) *  (this.length * divisor) + this.path.getPointAt(this.path.length).x,
      //   Math.sin(this.endingAngle * Math.PI / 180) *  (this.length * divisor) + this.path.getPointAt(this.path.length).y,
      // )

    // const ending = new Paper.Point(
    //   this.path.getPointAt(this.path.length),
    //   this.path.getNormalAt(this.path.length).multiply(this.length * 0.33))

    const end = this.path.getNormalAt(this.path.length).multiply(this.footLength);
    console.log(end);

      this.path.addSegments([this.endPoint, end.add(this.endPoint)])
      // variablePoint = ending.clone();

    // }

      // this.ending = new Paper.Point(
      //   Math.cos(this.endingAngle * Math.PI / 180) * this.length * 0.333333 + this.endPoint.x,
      //   Math.sin(this.endingAngle * Math.PI / 180) * this.length * 0.333333 + this.endPoint.y,
      // )

      // this.endPoint = new Paper.Point(
      //   Math.cos(this.radians) * this.length + this.origin.x,
      //   Math.sin(this.radians) * this.length + this.origin.y)

    // const circle = new Paper.Path.Circle(this.endPoint, this.length * 0.333333);
    // this.path.add(this.endPoint);

    // this.path.add(this.ending);

    // circle.strokeColor = 'red';
    // circle.strokeWidth = 1;
    this.path.strokeColor = 'black';
    this.path.strokeWidth = maxSize * 0.01;
    // this.path.scale(-1,-1, this.origin)

    return this;
  }
}

export default BranchPath;