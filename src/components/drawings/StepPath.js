import Paper from "paper";
import Stitch from '../drawings/Stitch';

class StepPath  {
  constructor( origin, to, config) {

    // this.maxLength = maxLength;
    this.radius = config.radius;
    this.from = origin;
    this.to = to;
    this.lastPoint = new Paper.Point(0, 0);
    this.vector = new Paper.Point(0, 0);
    this.path = '';
    this.steps = config.steps;
    this.points = [];
    this.colors = config.colors;
    this.angles = config.angles;

    return this;
  }

  draw = () => {

    // const lineSize = new Paper.Size(this.maxLength * 0.9, this.maxLength * 0.9);
    // const topLeftPos = new Paper.Point(viewCenter.x - lineSize.width / 2, viewCenter.y - lineSize.height / 2);
    this.path = new Paper.Path();
    this.vector = this.to.subtract(this.from);
    console.log(this.vector);

    // this.path.addSegments([this.from, this.to]);
    // const pointOffset = Math.sqrt((this.radius ** 2) / 2);
    const offset = Math.sqrt((this.radius ** 2) / 2);

    let count = 0;
    let walker = this.from.clone();
    const destination = this.to.clone();

    let directionX = 1;
    let directionY = 1;
    console.log(this.from.getDistance(this.to));

    let steps = Math.abs(Math.round(this.from.getDistance(this.to) / (this.radius * 2)));
    // console.log("Inner Steps: ", steps);

   if (walker.x > destination.x) {
     directionX = directionX * -1;
   }

   if (walker.y > destination.y) {
    directionY = directionY * -1;
   }


   const stitch = new Stitch(Math.sqrt(2 * (this.radius ** 2))  , new Paper.Point(walker.x, walker.y), this.colors.stitch.user, 2, 'x');
    stitch.draw()
    const circle = new Paper.Path.Circle(new Paper.Point(walker.x, walker.y), 2 );
      circle.fillColor = new Paper.Color(this.colors.stitch.orange) || new Paper.Color('pink');
      circle.strokeWidth = 1;


    while (count < this.steps) {
      const nextPoint = new Paper.Point(walker.x, walker.y);

      this.path.add(nextPoint);
      this.points.push(nextPoint);
      console.table(walker.x, walker.y, directionX, directionY)

      let newWalkerX = walker.x ;
      let newWalkerY = walker.y;
      let stitchColor = new Paper.Color(this.colors.stitch.arr[0]) || new Paper.Color('black');

      for (let colorIndex = 0; colorIndex < this.colors.stitch.arr.length; colorIndex++) {
        if (count % colorIndex === 0 ) stitchColor = new Paper.Color(this.colors.stitch.arr[colorIndex])
      }
      // if (count % 3 === 0 ) stitchColor = new Paper.Color(this.colors.stitch.yellow);

      if (count % 2 === 0) {
        newWalkerX = walker.x + (this.angles.x * this.radius * directionX);

      }
      else {
        newWalkerY = walker.y + (this.angles.y * this.radius * directionY);
      }
      const newPoint = new Paper.Point(newWalkerX, newWalkerY);
      this.path.add(newPoint);
      this.points.push(newPoint);
      walker.x = newWalkerX;
      walker.y = newWalkerY;



      const stitch = new Stitch(Math.sqrt(2 * (this.radius ** 2)) - 3, newPoint, stitchColor, 2, 'x');
      stitch.draw()

      const circle = new Paper.Path.Circle(newPoint, 2 );
      circle.fillColor = new Paper.Color(this.colors.stitch.orange) || new Paper.Color('pink');
      circle.strokeWidth = 1;

      count++;
    }
        // const rect = new Paper.Path.Rectangle(this.path.getPointAt(i).add(this.radius), new Paper.Size(this.radius, this.radius));
        // rect.fillColor = new Paper.Color('red');

    // this.path.strokeColor = new Paper.Color('red');
    // this.path.strokeWidth = 4;
    // this.path.closePath();

    return this;
  }
}

export default StepPath;