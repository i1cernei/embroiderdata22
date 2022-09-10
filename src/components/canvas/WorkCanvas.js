import React, { Component } from 'react';
import Paper from 'paper';

import StepPathTwo from '../drawings/StepPathTwo';
import { StepDiamond } from '../drawings/StepDiamond';

import vUp from '../drawings/vUp';
import vDown from '../drawings/vDown';
import vLeft from '../drawings/vLeft';
import vRight from '../drawings/vRight';

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

    this.workCanvasScope = new Paper.PaperScope();

    this.radius = 10;
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

    this.workRef = React.createRef();
    this.newCanvas = {};


    this.export = () => {
      // const svg = Paper.project.activeLayer.exportSVG();

      // console.log(svg);
    }

    this.drawFirstSymbol = (origin) => {
      const livingColors = this.palettes[`${this.props.residence.cultural_group}`] || ['black', 'purple', 'red'];
      const originColors = this.palettes[`${this.props.origin.cultural_group}`] || ['black', 'purple', 'red'];
      const elements = [];


      const bigVUp = new vUp(origin, {
        radius: this.radius,
        steps: 30,
        colors:[originColors[1], originColors[2]],
        offset: {
                x: 20 * this.radius,
                y: 2 * this.radius
              },
      })


      const bigVDown = new vDown(origin, {
        radius: this.radius,
        steps: 30,
        colors:[originColors[1], originColors[2]],
        offset: {
                x: 20 * this.radius,
                y: 32 * this.radius
              },
      })

      const smallVDown = new vDown(origin, {
        radius: this.radius,
        steps: 14,
        colors:[originColors[3], originColors[2]],
        offset: {
                x: 20 * this.radius,
                y: 15.5 * this.radius
              },
      })

      const smallVUp = new vUp(origin, {
        radius: this.radius,
        steps: 15,
        colors:[originColors[3], originColors[2]],
        offset: {
                x: 20 * this.radius,
                y: 17.5 * this.radius
              },
      })

      const otherVDown = new vDown(origin, {
        radius: this.radius,
        steps: 20,
        colors:[originColors[0], originColors[2]],
        offset: {
                x: 20 * this.radius,
                y: 9 * this.radius
              },
      })

      // const firstLeftV = new vLeft(origin, {
      //   radius: this.radius,
      //   steps: 10,
      //   colors:[originColors[3], originColors[2]],
      //   offset: {
      //           x: 25 * this.radius,
      //           y: 17 * this.radius
      //         },
      // })

      const secondLeftV = new vLeft(origin, {
        radius: this.radius,
        steps: 22,
        colors:[originColors[0], originColors[2]],
        offset: {
                x: 26 * this.radius,
                y: 17 * this.radius
              },
      })

      // const firstRightV = new vRight(origin, {
      //   radius: this.radius,
      //   steps: 15,
      //   colors:[originColors[3], originColors[2]],
      //   offset: {
      //           x: 7.5 * this.radius,
      //           y: 17 * this.radius
      //         },
      // })

      const secondRightV = new vRight(origin, {
        radius: this.radius,
        steps: 22,
        colors:[originColors[0], originColors[2]],
        offset: {
                x: 14 * this.radius,
                y: 17 * this.radius
              },
      })



      const otherVUp = new vUp(origin, {
        radius: this.radius,
        steps: 22,
        colors:[originColors[0], originColors[2]],
        offset: {
                x: 20 * this.radius,
                y: 24 * this.radius
              },
      })
      //firstLeftV, firstRightV

      elements.push(smallVDown, otherVDown, secondLeftV, secondRightV, smallVUp, otherVUp, bigVDown, bigVUp);

      elements.map(el => {
        el.init().draw();
        return null;
      })
      // smallVDown.init();
      // smallVDown.draw();
      // otherVDown.init();
      // otherVDown.draw();
      // bigVUp.init().draw();
      // bigVDown.init().draw();

    }

    this.drawSecondSymbol = (origin) => {
      // const livingColors = this.palettes[`${this.props.residence.cultural_group}`] || ['black', 'purple', 'red'];
      const originColors = this.palettes[`${this.props.origin.cultural_group}`] || ['black', 'purple', 'red'];
      const elements = [];


      const bigRightV = new vLeft(origin, {
        radius: this.radius,
        steps: 40,
        colors:[originColors[1], originColors[2]],
        offset: {
                x: -15 * this.radius,
                y: 17 * this.radius
              },
      })

      const bigRightV2 = new vLeft(origin, {
        radius: this.radius,
        steps: 40,
        colors:[originColors[1], originColors[2]],
        offset: {
                x: -14 * this.radius,
                y: 17 * this.radius
              },
      })

      const bigLeftV = new vRight(origin, {
        radius: this.radius,
        steps: 40,
        colors:[originColors[1], originColors[2]],
        offset: {
                x: 15 * this.radius,
                y: 17 * this.radius
              },
      })

      const smallTopV = new vDown(origin, {
        radius: this.radius,
        steps: 20,
        colors:[originColors[1], originColors[2]],
        offset: {
                x: 0,
                y: 10 * this.radius
              },
      })

      const smallBottomV = new vUp(origin, {
        radius: this.radius,
        steps: 20,
        colors:[originColors[1], originColors[2]],
        offset: {
                x: 0,
                y: 24 * this.radius
              },
      })

      const smallLeftV = new vRight(origin, {
        radius: this.radius,
        steps: 22,
        colors:[originColors[0], originColors[2]],
        offset: {
                x: -5 * this.radius,
                y: 17 * this.radius
              },
      })

      const smallRightV = new vLeft(origin, {
        radius: this.radius,
        steps: 22,
        colors:[originColors[0], originColors[2]],
        offset: {
                x: 5 * this.radius,
                y: 17 * this.radius
              },
      })


      elements.push(bigLeftV, bigRightV, smallTopV, smallBottomV, smallLeftV, smallRightV);

      elements.map(el => {
        el.init().draw();
        return null;
      })
    }


  }

  componentDidMount() {

    this.newCanvas = this.workRef.current;

    this.workCanvasScope.setup(this.newCanvas);
    // this.canvasScope.activate();
    // console.log(this.props.questionvalues);
    if (Paper !== undefined) {
      this.workCanvasScope.project.activeLayer.removeChildren();
      // this.drawOriginCountryData(new Paper.Point(0, 200));
      // for (let i = 0; i < 5; i++) {
      //   // this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius* i , this.radius * this.originMax / 2 ), this.canvasScope);
      // }
      this.drawFirstSymbol(new Paper.Point(this.radius, 10 * this.radius));
      this.drawSecondSymbol(new Paper.Point(this.radius * 55,  10 * this.radius));
    }


  }

  componentDidUpdate() {
    this.workCanvasScope.activate();
    this.workCanvasScope.project.activeLayer.removeChildren();
      if (Paper !== undefined) {
        // this.drawOriginCountryData(new Paper.Point(0, 200));
        for (let i = 0; i < 5; i++) {
          // this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius* i , this.radius * this.originMax / 2 ), this.canvasScope);
        }
        this.drawFirstSymbol(new Paper.Point(this.radius, 10 * this.radius));
        this.drawSecondSymbol(new Paper.Point(this.radius * 55,  10 * this.radius));
      }
    }

  render() {
    if (this.workCanvasScope.view !== null) {
      this.workCanvasScope.view.draw();
    }
    return (
        <canvas className=' ' ref={this.workRef} {...this.props} id="workcanvas" resize='true'/>
    )
  }
}

export default WorkCanvas;