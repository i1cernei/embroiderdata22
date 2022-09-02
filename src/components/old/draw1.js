import Paper from "paper";

const draw1 = () => {
  let myPath = new Paper.Path();

  Paper.view.onMouseDown = (event) => {
    myPath.strokeColor = "black";
    myPath.strokeWidth = 3;
    myPath.add(event.point);
  };

  Paper.view.onMouseDrag = (event) => {
    console.log(event);
    myPath.add(event.point);
  };

  Paper.view.draw();
};

export default draw1;