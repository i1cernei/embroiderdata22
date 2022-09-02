import Paper from "paper";
import OrtoPath from "./ortoPath";
import RectanglePath from "./rectanglePath";

const drawWithRectangles = (enter, exit) => {
  // let myPath = new Paper.Path();

  const rectPath = new RectanglePath(500, 20, enter, exit);
  const straightPath = new OrtoPath(500, 20, enter, exit);

  if (enter.x === exit.x || enter.y === exit.y) {
    straightPath.draw();
  }
  else {
    rectPath.draw();
  }

  // console.log(rectPath.path.length);

  Paper.view.draw();
};

export default drawWithRectangles;