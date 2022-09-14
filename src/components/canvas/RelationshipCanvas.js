import React, { Component } from 'react';
import Paper from 'paper';

import { CircleDiamond } from '../drawings/CircleDiamond';
import StitchPath from '../drawings/StitchPath';


// import vUp from '../drawings/vUp';

// Color Palettes



/**
 *
 * @param {Number} _in :Number
 * @param {Number} in_min :Number
 * @param {Number} in_max Number
 * @param {Number} out_min
 * @param {Number} out_max
 * @returns Number
 *
 */

function mapRange (_in, in_min, in_max, out_min, out_max) {
  return (_in - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


class WorkCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: {},

    }

    this.relationshipCanvasScope = new Paper.PaperScope();

    this.radius = 4;
    this.palettes = {
      northern: [
        '#ffca00',
        '#1f69fe',
        '#fe940d',
        '#c50f0e',
        '#101415'
      ],
      mestizo: [
        '#97ab74',
        '#657fd6',
        '#1f6db7',
        '#fda81a',
        '#1b1521',
      ],
      indoamerican: [
        '#fa880e',
        '#8bc6b2',
        '#e50537',
        '#8bc6b2',


        '#e71167',

      ],
      iberoamerican: [
        '#54b0af',
        '#7eafd0',
        '#f7da74',
        '#03257e',
        '#d6d8d5'
      ],
      creole: [
        '#d92e50',
        '#46b78c',
        '#bde686',
        '#65daee',
        '#40377a'
      ],
      central: [
        '#55a491',
        '#b9cbcf',
        '#34566f',
        '#afb090',
        '#42433e'
      ],
      caucasus: [
        '#a04846',
        '#b88491',
        '#347579',
        '#c6aa83',
        '#3b3630'
      ],
      baltic: [
        '#e35f5b',
        '#c4dff0',
        '#e2c780',
        '#6599d2',
        '#2a2f33'

      ],
      western: [
        '#203e5f',
        '#ffcc00',
        '#eaeaea',
        '#fee5b1',
        '#1a2634'
      ],
      southern: [
        '#2039c7',
        '#f2dcde',

        '#e8987f',
        '#121888',
        '#ca8d22',


      ],
      eastern: [
        '#b5b3a7',
        '#ce5f51',
        '#bd6964',
        '#fafafa',
        '#1a1c1a'
      ],
      southeastern: [
        '#305ee0',
        '#ffe8e7',
        '#c41815',
        '#c4cbe0',
        '#000000'
      ]

    }

    this.originColors = this.props.colors !== undefined ? this.props.colors[`${this.props.origin.cultural_group}`] : ['#b5b3a7','#ce5f51','#bd6964','#fafafa','#1a1c1a'];
    this.residenceColors = this.props.colors !== undefined ? this.props.colors[`${this.props.residence.cultural_group}`] : ['#203e5f','#ffcc00','#eaeaea', '#fee5b1', '#1a2634' ];

    this.workRef = React.createRef();
    this.newCanvas = {};


    this.export = () => {
      // const svg = Paper.project.activeLayer.exportSVG();

      // console.log(svg);
    }


    this.drawDecorations = (origin) => {

      const circle = new CircleDiamond(
        origin,
        {
          baseRadius: (4 + this.props.data[4]) * this.radius,
          radius: this.radius,
          skipOne: true,
          outer: this.props.data[2][0] < 20,
          inner: true,
          oddOnly: this.props.data[2][0] > 20,
          startRadians: 0,
          radianLimit: 2 * Math.PI,
          color: this.residenceColors !== undefined ? this.residenceColors[0] : '#b5b3a7',
        }, { x: 0, y: 0}
      ).init();

      const circle2 = new CircleDiamond(
        origin,
        {
          baseRadius: this.props.data[3] * 0.8 * this.radius,
          radius: this.radius,
          skipOne: false,
          inner: true,
          outer: false,
          oddOnly: false,
          startRadians: 0,
          radianLimit: 2 * Math.PI,
          color: this.residenceColors !== undefined ? this.residenceColors[2] : '#b5b3a7'
        }, { x: 0, y: 0}
      ).init();

      const circle3 = new CircleDiamond(
        origin,
        {
          baseRadius: 18 * this.radius,
          radius: this.radius,
          skipOne: true,
          inner: true,
          outer: true,
          oddOnly: false,
          startRadians: 0,
          radianLimit: 2 * Math.PI,
          color: this.residenceColors !== undefined ? this.residenceColors[1] : '#b5b3a7'
        }, { x: 0, y: 0}
      ).init();

      circle.draw();
      circle2.draw();
      circle3.draw();
    }

    this.drawStarSymbol = (origin) => {
      const circle = new CircleDiamond(
        origin,
        {
          baseRadius:18 * this.radius,
          radius: this.radius,
          skipOne: false,
          outer: false,
          inner: false,
          oddOnly: true,
          startRadians: 0,
          radianLimit: 2 * Math.PI,
          color: this.residenceColors !== undefined ? this.residenceColors[1] : '#b5b3a7',
        }, { x: 0, y: 0}
      ).init();

      circle.draw();

      const innerCircle = new CircleDiamond(
        origin,
        {
          baseRadius:this.props.data[2][0] / 4 * this.radius,
          radius: this.radius,
          skipOne: false,
          outer: false,
          inner: false,
          oddOnly: true,
          startRadians: 0,
          radianLimit: 2 * Math.PI,
          color: this.residenceColors !== undefined ? this.residenceColors[1] : '#b5b3a7'
        }, { x: 0, y: 0}
      ).init();

      innerCircle.draw();

      let count = 0;
      if (this.props.data[2][1] !== undefined)
      {
        const divider = this.props.data[2][1].length > 0 ? Math.PI / this.props.data[2][1].length / 2 : Math.PI * 0.25;
        for (let i = 0; i <= 2 * Math.PI; i += divider) {
          // const posX = this.origin.x + Math.cos(i) * this.config.baseRadius;
          // const posY = this.origin.y + Math.sin(i) * this.config.baseRadius;


          const startRadius = this.props.data[2][0] / this.props.data[2][1].length / 2 * this.radius;
          const xPos = startRadius * Math.cos(i) + origin.x;
          const yPos = startRadius * Math.sin(i) + origin.y;

          const starOrigin = new Paper.Point(xPos, yPos);
          const size = (count % 2 === 0) ? 5 : 2;
          let color = this.originColors !== undefined ? this.originColors[2] : '#b5b3a7';

          if (count % 2 === 0) {
            color = this.residenceColors !== undefined ? this.residenceColors[1] : '#b5b3a7'
          }

          const starCircle = new CircleDiamond(
            starOrigin,
            {
              baseRadius: size * this.radius,
              radius: this.radius,
              skipOne: false,
              outer: false,
              inner: false,
              oddOnly: false,
              startRadians: 0,
              radianLimit: 2 * Math.PI,
              color,
            }, { x: 0, y: 0 }
          ).init();

          starCircle.draw();
          count++;
        }
      }
    }

    this.drawBorderDown = (origin, index) => {

      const size = (index % 2 !== 0) ? 18 : 18 ;

        const starCircle = new CircleDiamond(
          origin,
          {
            baseRadius: (size + 1 + this.props.data[3] / 6) * this.radius,
            radius: this.radius,
            skipOne: false,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: Math.PI,
            radianLimit: 2 * Math.PI,
            color: this.originColors !== undefined ? this.originColors[3] : '#b5b3a7',
          }, { x: 0, y: 0 }
        ).init();

        const starCircle2 = new CircleDiamond(
          origin,
          {
            baseRadius: (size/3 + this.props.data[0]/3) * this.radius,
            radius: this.radius,
            skipOne: true,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: Math.PI,
            radianLimit: 2 * Math.PI,
            color: this.originColors !== undefined ? this.originColors[1] : '#b5b3a7',
          }, { x: 0, y: 0 }
        ).init();

        const starCircle3 = new CircleDiamond(
          origin,
          {
            baseRadius: (size/4 + this.props.data[1]/3) * this.radius,
            radius: this.radius,
            skipOne: true,
            outer:true,
            inner: true,
            oddOnly: false,
            startRadians:  Math.PI,
            radianLimit: 2 * Math.PI,
            color: this.originColors !== undefined ? this.originColors[0] : '#b5b3a7',
          }, { x: 0, y: 0 }
        ).init();

      starCircle.draw();
      starCircle2.draw();
      starCircle3.draw();
    }

    this.drawBorderUp = (origin, index) => {

      const size = (index % 2 !== 0) ? 18 : 18 ;

        const starCircle = new CircleDiamond(
          origin,
          {
            baseRadius: (size + 1 + this.props.data[3] / 6) * this.radius,
            radius: this.radius,
            skipOne: false,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: 0,
            radianLimit: Math.PI,
            color: this.originColors !== undefined ? this.originColors[3] : '#b5b3a7',
          }, { x: 0, y: 0 }
        ).init();

        const starCircle2 = new CircleDiamond(
          origin,
          {
            baseRadius: (size/3 + this.props.data[0]/3) * this.radius,
            radius: this.radius,
            skipOne: true,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: 0,
            radianLimit: Math.PI,
            color: this.originColors !== undefined ? this.originColors[1] : '#b5b3a7',
          }, { x: 0, y: 0 }
        ).init();

        const starCircle3 = new CircleDiamond(
          origin,
          {
            baseRadius: (size/4 + this.props.data[1]/3) * this.radius,
            radius: this.radius,
            skipOne: true,
            outer:true,
            inner: true,
            oddOnly: false,
            startRadians: 0,
            radianLimit: Math.PI,
            color: this.originColors !== undefined ? this.originColors[0] : '#b5b3a7',
          }, { x: 0, y: 0 }
        ).init();

      starCircle.draw();
      starCircle2.draw();
      starCircle3.draw();
    }

    this.drawTree = (origin, index = 0) => {
      const trunk = new StitchPath(8, this.relationshipCanvasScope, origin, new Paper.Point(origin.x + this.radius * 200, origin.y), 'x');
      trunk.draw()

      let count = 0;
      for (let i = 0; i < trunk.path.length - trunk.path.length / 10; i += trunk.path.length / 10) {
        const _pathPoint = trunk.path.getPointAt(i);
        let posX, posY;

        const length = 20 * this.radius;

        posX = _pathPoint.x + Math.cos(Math.PI / 3) * length;
        posY = _pathPoint.y + Math.sin(Math.PI / 3) * length;

        if (count % 2 !== 0) {
          posX = _pathPoint.x + Math.cos(-Math.PI / 3) *  length;
          posY = _pathPoint.y + Math.sin(-Math.PI / 3) * length;
        }

        const _to = new Paper.Point(posX, posY);

        const branch = new StitchPath(8, this.relationshipCanvasScope, _pathPoint, _to, 'x' , this.originColors !== undefined ? this.originColors[0] : '#b5b3a7')
        branch.draw();

        const _endPoint = branch.path.getPointAt(branch.path.length);
        const _endPointTo = new Paper.Point(_endPoint.x + length / 2, _endPoint.y);

        const endBranch = new StitchPath(8, this.relationshipCanvasScope, _endPoint, _endPointTo, 'x', this.originColors !== undefined ? this.originColors[0] : '#b5b3a7');
        endBranch.draw();

        const endFlower = new CircleDiamond(endBranch.path.getPointAt(endBranch.path.length), {
          baseRadius: 6 * (this.radius),
          radius: this.radius ,
          skipOne: true,
          inner: true,
          outer: true,
          oddOnly: false,
          startRadians: 0,
          radianLimit: 2 * Math.PI,
          color: this.residenceColors !== undefined ? this.residenceColors[3] : '#b5b3a7'
        },
          {
            x: this.radius * 4,
            y: 0,
          }, this.relationshipCanvasScope).init();

        endFlower.draw();

        count++;
      }

      let miniCount = 0
      for (let i = 0; i < trunk.path.length - trunk.path.length / 20; i += trunk.path.length / 30) {
        const _pathPoint = trunk.path.getPointAt(i);
        let posX, posY;

        const length = 10 * this.radius;

        posX = _pathPoint.x + Math.cos(Math.PI / 3) * length;
        posY = _pathPoint.y + Math.sin(Math.PI / 3) * length;

        if (miniCount % 2 !== 0) {
          posX = _pathPoint.x + Math.cos(-Math.PI / 3) * length;
          posY = _pathPoint.y + Math.sin(-Math.PI / 3) * length;
        }

        const _to = new Paper.Point(posX, posY);

        const branch = new StitchPath(8, this.relationshipCanvasScope, _pathPoint, _to, 'x', this.originColors !== undefined ? this.originColors[0] : '#b5b3a7')
        branch.draw();

        const _endPoint = branch.path.getPointAt(branch.path.length);
        const _endPointTo = new Paper.Point(_endPoint.x - length / 2, _endPoint.y);

        const endBranch = new StitchPath(8, this.relationshipCanvasScope, _endPoint, _endPointTo, 'x', this.originColors !== undefined ? this.originColors[2] : '#b5b3a7');
        endBranch.draw();

        miniCount++;
      }

      const endFlower = new CircleDiamond(trunk.path.getPointAt(trunk.path.length), {
        baseRadius: 6 * (this.radius),
        radius: this.radius ,
        skipOne: true,
        inner: true,
        outer: true,
        oddOnly: false,
        startRadians: 0,
        radianLimit: 2 * Math.PI,
        color: this.residenceColors !== undefined ? this.residenceColors[3] : '#b5b3a7'
      },
        {
          x: this.radius * 14,
          y: 0,
        }, this.relationshipCanvasScope).init();

      endFlower.draw();

      let flowerCount = 0;
      for (let i = 0; i <= 2 * Math.PI; i += Math.PI / 4) {
        // const posX = this.origin.x + Math.cos(i) * this.config.baseRadius;
        // const posY = this.origin.y + Math.sin(i) * this.config.baseRadius;


        const startRadius = 12 * this.radius
        const xPos = startRadius * Math.cos(i) + trunk.path.getPointAt(trunk.path.length).x;
        const yPos = startRadius * Math.sin(i) + trunk.path.getPointAt(trunk.path.length).y;

        const starOrigin = new Paper.Point(xPos, yPos);
        const size = (flowerCount % 2 === 0) ? 5 : 2;
        let color = this.originColors !== undefined ? this.originColors[2] : '#b5b3a7';

        if (count % 2 === 0) {
          color = this.residenceColors !== undefined ? this.residenceColors[1] : '#b5b3a7'
        }

        const starCircle = new CircleDiamond(
          starOrigin,
          {
            baseRadius: size * this.radius,
            radius: 8,
            skipOne: false,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: 0,
            radianLimit: 2 * Math.PI,
            color,
          }, { x: 14 * this.radius, y: 0 }
        ).init();

        starCircle.draw();
        flowerCount++;
      }



    }


  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  componentDidMount() {

    this.newCanvas = this.workRef.current;

    this.relationshipCanvasScope.setup(this.newCanvas);
    // this.canvasScope.activate();
    // console.log(this.props.questionvalues);
    if (Paper !== undefined) {
      this.relationshipCanvasScope.project.activeLayer.removeChildren();
      this.drawTree(new Paper.Point(this.radius, this.relationshipCanvasScope.view.center.y));
      // this.drawOriginCountryData(new Paper.Point(0, 200));
      for (let i = 0; i < 2; i++) {
        // this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius* i , this.radius * this.originMax / 2 ), this.canvasScope);
        // this.drawFirstSymbol(new Paper.Point(this.radius + i * this.radius * 68, 10 * this.radius));
        // this.drawSecondSymbol(new Paper.Point(this.radius * 55 + i * this.radius * 68, 10 * this.radius));
        // this.drawDecorations(new Paper.Point(54 * this.radius + i * this.radius * 72, 27 * this.radius));
        // this.drawStarSymbol(new Paper.Point(18 * this.radius + i * this.radius * 72, 27 * this.radius));
        // this.drawBorder(new Paper.Point( this.radius + i * this.radius * 35, 54 * this.radius));
      }

      for (let i = 0; i < 5; i++) {

        const posX = (i  % 2 !== 0) ? 18 : 18 ;

        // this.drawBorderDown(new Paper.Point( i * this.radius * posX * 2, 51 * this.radius), i);
        // this.drawBorderUp(new Paper.Point( i * this.radius * posX * 2, this.radius * 2), i);

      }


      // this.drawFirstSymbol(new Paper.Point(this.radius, 10 * this.radius));
      // this.drawSecondSymbol(new Paper.Point(this.radius * 55,  10 * this.radius));
    }


  }

  componentDidUpdate() {
    this.originColors = this.props.colors[`${this.props.origin.cultural_group}`];
    this.residenceColors = this.props.colors[`${this.props.residence.cultural_group}`];
    this.relationshipCanvasScope.activate();
    this.relationshipCanvasScope.project.activeLayer.removeChildren();
      if (Paper !== undefined) {
        // this.drawOriginCountryData(new Paper.Point(0, 200));
        // for (let i = 0; i < 2; i++) {
        //   // this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius* i , this.radius * this.originMax / 2 ), this.canvasScope);
        //   // this.drawFirstSymbol(new Paper.Point(this.radius + i * this.radius * 68, 10 * this.radius));
        //   // this.drawSecondSymbol(new Paper.Point(this.radius * 55 + i * this.radius * 68, 10 * this.radius));
        //   // this.drawDecorations(new Paper.Point(54 * this.radius + i * this.radius * 72, 27 * this.radius));
        //   // this.drawStarSymbol(new Paper.Point(18 * this.radius + i * this.radius * 72, 27 * this.radius));
        //   // this.drawBorder(new Paper.Point( this.radius + i * this.radius * 35, 54 * this.radius));
        // }

        this.drawTree(new Paper.Point(this.radius, this.relationshipCanvasScope.view.center.y));

        // for (let i = 0; i < 5; i++) {

        //   const posX = (i  % 2 !== 0) ? 18 : 18 ;

        //   this.drawBorderDown(new Paper.Point( i * this.radius * posX * 2, 51 * this.radius), i);
        //   this.drawBorderUp(new Paper.Point( i * this.radius * posX * 2, this.radius * 2), i);

        // }

      }
    }

  render() {
    if (this.relationshipCanvasScope.view !== null) {
      this.relationshipCanvasScope.view.draw();
    }
    return (
        <canvas className=' ' ref={this.workRef} {...this.props} id="workcanvas" resize='true'/>
    )
  }
}

export default WorkCanvas;