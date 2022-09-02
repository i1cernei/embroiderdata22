import Paper from "paper";
import Mainline from "./mainPath";
import BranchPath from "./branchPath";

const draw2 = ( papersize ) => {

  console.log(papersize);
  const viewCenter = Paper.view.center;
  // console.log(Paper.project);
  // console.log(Paper.view.center);

  // console.log(Paper.project.addLayer()

  // Paper.view.onMouseDown = (event) => {
  //   myPath.strokeColor = "black";
  //   myPath.strokeWidth = 3;
  //   new Paper.Path.Rectangle({
  //     position: event.point,
  //     size: 10,
  //     fillColor: 'red'
  // });
  // };



  // const dist = 10;

  // for (let i = 0; i < bigPath.length; i++) {

  //   if (i % dist === 0) {

  //     let center = bigPath.getPointAt(i);


  //     const stitch1_1 = new Paper.Point(center - dist * 0.5, center - dist * 0.5);
  //     const stitch1_2 = new Paper.Point(center + dist * 0.5, center + dist * 0.5);
  //     const stitch2_1 = new Paper.Point(center + dist * 0.5, center - dist * 0.5);
  //     const stitch2_2 = new Paper.Point(center - dist * 0.5, center + dist * 0.5);

  //     const path1 = new Paper.Path.Line(stitch1_1, stitch1_2);
  //     const path2 = new Paper.Path.Line(stitch2_1, stitch2_2);

  //     path1.strokeColor = '#00ff00';
  //     path2.strokeColor = '#00ff00';
  //     path1.strokeWidth = 3;
  //     path2.strokeWidth = 3;
  //   }

    // new Paper.Path.Rectangle({
    //   position: new Paper.Point(Math.sin(i) * Math.PI * 0.5 , Math.cos(i) * Math.PI * 0.5),
    //   size: 10,
    //   fillColor: 'red'
    // });




  const mainline = new Mainline(papersize, 300);
  let count = 0;


  mainline.draw();

  const spacing = 100;
  const secondLine = new Paper.Path();
  let lastMainlinePoint = new Paper.Point(0, 0);

  for (let i = 0; i < mainline.path.length; i++) {
    if (i % spacing === 0) {
      count++;

      if (count <= 3) {
        const branch = new BranchPath({
          /* this.papersize = args.papersize;
          this.endPoint = new Paper.Point(0,0);
          this.origin = args.origin;
          this.parentTop = args.parentTop;
          this.angle = args.angle;
          this.radians = args.angle * Math.PI / 180;
          this.length = args.length; */

          papersize,
          origin: mainline.path.getPointAt(i),
          normal: mainline.path.getNormalAt(i),
          angle: 270,
          endingAngle: 180,
          length: 60,
          footLength: 20,

        });

        // const otherBranch = new BranchPath({

        //   papersize,
        //   origin: mainline.path.getPointAt(i),
        //   normal: mainline.path.getNormalAt(i),
        //   angle: 0,
        //   endingAngle: 90,
        //   length: 50,
        // });

        // otherBranch.draw();
        branch.draw();
      }
    }
  }




  Paper.view.draw();
};

export default draw2;