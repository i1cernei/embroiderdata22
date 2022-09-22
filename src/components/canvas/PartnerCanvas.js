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


class PartnerCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: {},

    }

    this.relationshipCanvasScope = new Paper.PaperScope();
    this.width = 100;

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

    this.updateRadius = () => {
      // this.radius = this.relationshipCanvasScope.view.viewSize.width / 300;
      // this.relationshipCanvasScope.project.activeLayer.removeChildren();
      // this.relationshipCanvasScope.view.draw();
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
      const limit = this.props.data[2] || 2;


      for (let o = 0; o < limit;  o++) {
      // {
        const size = (index % 2 !== 0) ? 10 : 10;

        const upperTriangle = new CircleDiamond(
          origin,
          {
            baseRadius: (size + 1 + this.props.data[2] / 3) * this.radius,
            radius: this.radius,
            skipOne: false,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: 0,
            radianLimit: Math.PI,
            color: this.residenceColors !== undefined ? this.residenceColors[2] : '#b5b3a7',
          }, { x: 70 +  o/2 * this.radius * limit , y: 0 }
        ).init();



        const lowerTriangle = new CircleDiamond(
          origin,
          {
            baseRadius: (size + 1 + this.props.data[2] / 3) * this.radius,
            radius: this.radius,
            skipOne: false,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: Math.PI,
            radianLimit: 2 * Math.PI,
            color: this.residenceColors !== undefined ? this.residenceColors[0] : '#b5b3a7',
          }, { x:70 + o/2  * this.radius * limit , y: (size + this.props.data[2]) * this.radius }
        ).init();

        upperTriangle.draw();
        lowerTriangle.draw();
      }

    }

    this.drawChildren = (origin) => {
      const size = 10;

      for (let o = 0; o < this.props.data[5]; o++)
        {
          const smallTriangle = new CircleDiamond(
            origin,
            {
              baseRadius: size * this.radius,
              radius: this.radius,
              skipOne: false,
              outer: false,
              inner: false,
              oddOnly: false,
              startRadians: Math.PI,
              radianLimit: 2 * Math.PI,
              color: this.originColors !== undefined ? this.originColors[3] : '#b5b3a7',
            },
            // { x: 5 * o / 3 * this.radius * limit, y: - (size / 6 + this.props.data[2] / 6) * this.radius }
            { x:o * this.radius * size , y: 0}
          ).init();

          const pointDiamond = new CircleDiamond(
            origin,
            {
              baseRadius: 3 * this.radius,
              radius: this.radius,
              skipOne: false,
              outer: false,
              inner: false,
              oddOnly: false,
              startRadians: 0,
              radianLimit: 2 * Math.PI,
              color: this.originColors !== undefined ? this.originColors[2] : '#b5b3a7',
            },
            // { x: 5 * o / 3 * this.radius * limit, y: - (size / 6 + this.props.data[2] / 6) * this.radius }
            { x:o * this.radius * size , y: size * this.radius - 14 * this.radius}
          ).init();

          pointDiamond.draw();

          smallTriangle.draw();
      }

      for (let o = 0; o < this.props.data[5]; o++)
      {
        const smallTriangle = new CircleDiamond(
          origin,
          {
            baseRadius: size * this.radius,
            radius: this.radius,
            skipOne: false,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: 0,
            radianLimit: Math.PI,
            color: this.originColors !== undefined ? this.originColors[3] : '#b5b3a7',
          },
          // { x: 5 * o / 3 * this.radius * limit, y: - (size / 6 + this.props.data[2] / 6) * this.radius }
          { x:o * this.radius * size , y: (size + this.props.data[2]) * this.radius + this.radius}
        ).init();

        const pointDiamond = new CircleDiamond(
          origin,
          {
            baseRadius: 3 * this.radius,
            radius: this.radius,
            skipOne: false,
            outer: false,
            inner: false,
            oddOnly: false,
            startRadians: 0,
            radianLimit: 2 * Math.PI,
            color: this.originColors !== undefined ? this.originColors[2] : '#b5b3a7',
          },
          // { x: 5 * o / 3 * this.radius * limit, y: - (size / 6 + this.props.data[2] / 6) * this.radius }
          { x:o * this.radius * size , y: size * this.radius + 8 * this.radius}
        ).init();

        pointDiamond.draw();
        smallTriangle.draw();
      }

    }


  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateRadius);
  }

  componentDidMount() {

    this.newCanvas = this.workRef.current;
    // window.addEventListener("resize", this.updateRadius);

    this.relationshipCanvasScope.setup(this.newCanvas);

    // this.canvasScope.activate();
    // console.log(this.props.questionvalues);
    if (Paper !== undefined) {
      this.relationshipCanvasScope.project.activeLayer.removeChildren();
      // this.radius = this.relationshipCanvasScope.view.viewSize;
      this.radius = this.relationshipCanvasScope.view.viewSize.width / 150;
      this.width = this.relationshipCanvasScope.view.viewSize.width;





      const divide = this.props.data[5] > 0 ? this.props.data[5] : 1;
      const limit = this.width / (this.radius * 10 * divide) ;

      for (let i = 0; i < limit; i++ ) {
        this.drawChildren(new Paper.Point(20 * this.radius + i * this.radius * 20 + i * this.radius * 10 * this.props.data[5], this.radius * 2 + 10 * this.radius));
      }

      for (let i = 0; i < 6; i++) {

        const posX = (i  % 2 !== 0) ? 18 : 18 ;

        // this.drawBorderDown(new Paper.Point( i * this.radius * posX * 2, 51 * this.radius), i);
        this.drawBorderUp(new Paper.Point( i * this.radius * posX * 2, this.radius * 2 + 10 * this.radius), i);

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

        // this.drawTree(new Paper.Point(this.radius, this.relationshipCanvasScope.view.center.y));



        const divide = this.props.data[5] > 0 ? this.props.data[5] : 1;
        const limit = this.width / (this.radius * 10 * divide) ;

        for (let i = 0; i < limit; i++ ) {
          this.drawChildren(new Paper.Point(20 * this.radius + i * this.radius * 20 + i * this.radius * 10 * this.props.data[5], this.radius * 2 + 10 * this.radius));
        }

        for (let i = 0; i < 6; i++) {

          const posX = (i  % 2 !== 0) ? 18 : 18 ;

        //   this.drawBorderDown(new Paper.Point( i * this.radius * posX * 2, 51 * this.radius), i);
          this.drawBorderUp(new Paper.Point( i * this.radius * posX * 2 , this.radius * 2 + 10 * this.radius), i);

        }
      }
    }

  render() {
    if (this.relationshipCanvasScope.view !== null) {
      this.relationshipCanvasScope.view.draw();
    }
    return (
        <canvas className=' ' ref={this.workRef} {...this.props} id="relcanvas" resize='true'/>
    )
  }
}

export default PartnerCanvas;