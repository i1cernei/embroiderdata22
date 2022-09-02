import Paper from "paper";

class Mainline  {
  constructor(papersize, maxLength) {
    this.papersize = papersize;
    this.maxLength = 300;
  }

  draw = () => {
    const maxSize = Math.min(this.papersize.width, this.papersize.height);

    const lineSize = new Paper.Size(maxSize * 0.9, maxSize * 0.9);
    const viewCenter = Paper.view.center;
    const topLeftPos = new Paper.Point(viewCenter.x - lineSize.width / 2, viewCenter.y - lineSize.height / 2);

    console.log(viewCenter);

    this.path = new Paper.Path();
    this.path.add(new Paper.Point(topLeftPos));
    this.path.add(lineSize);

    this.path.strokeColor = 'black';
    this.path.strokeWidth = 1;

    return this;
  }
}

export default Mainline;