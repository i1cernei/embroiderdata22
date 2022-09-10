import React, { Component } from 'react';
import Paper from 'paper';

import StepPathTwo from '../drawings/StepPathTwo';
import { StepDiamond } from '../drawings/StepDiamond';
// import Stitch from '../drawings/Stitch';
import vUp from '../drawings/vUp';
import vDown from '../drawings/vDown';
import vLeft from '../drawings/vLeft';
import vRight from '../drawings/vRight';
// import { ZigZagHorizontal } from '../drawings/ZigZagHoriz';
// import { ZigZagVertical } from '../drawings/ZigZagVert';
// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
// import { RemoteChunkSize } from 'papaparse';
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


class PaperCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: {},

    }

    this.scope= new Paper.PaperScope();

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

    this.originCountryDiamonds = [];
    this.canvasRef = React.createRef();
    this.canvas = {};
    this.popSymbol = Math.round(mapRange(this.props.origin.population / 1000000, 0, 210, 7, 25));

    this.oMinMap = 0;

    this.originData = {
      popSymbol: Math.round(mapRange(20, 0, 210, 7, 16)),
      minoritiesPerc: Math.round(mapRange(14, 0, 50, 3, 10)),
      percContinent: Math.round(mapRange(0.1, 0, 34, 20000000 / 1000000 + 2, 15))
    }

    this.residenceData = {};
    this.residenceData.popSymbol = Math.round(mapRange(this.props.residence.population / 1000000, 0, 210, 7, 25));
    this.residenceData.minoritiesPerc = Math.round(mapRange(this.props.residence['minority_percent'], 0, 50, 3, 10));
      this.residenceData.percContinent = Math.round(mapRange(this.props.residence.perc_continent_pop, 0, 34, this.residenceData.popSymbol + 2, 30));

      const spreadable = [
        this.residenceData.popSymbol,
        this.residenceData.minoritiesPerc,
        this.residenceData.percContinent
      ];
    this.residenceMax = Math.max(...spreadable);


    this.originMax = Math.max([this.originData.popSymbol, this.originData.minoritiesPerc, this.originData.percContinent]);
    this.radius = this.residenceMax > 15 || this.originMax > 10 ? 3 : 7;

    // this.residenceMax = Math.max([this.residenceData.popSymbol, this.residenceData.minoritiesPerc, this.residenceData.percContinent]);
    // console.log(this.originMax);

    this.exportSVG = () => {
      const svg = Paper.project.activeLayer.exportSVG({asString:true});
      this.props.svgOut(svg);

      // console.log(svg);
    }


    this.drawOriginCountryData = (origin) => {

      this.originCountryDiamonds = [];

      const popmil = Number(this.props.origin.population) / 1000000;
      this.originData.popSymbol = Math.round(mapRange(popmil, 0, 210, 7, 15));
      this.originData.minoritiesPerc = mapRange(this.props.origin['minority_percent'], 0, 50, 3, 10);
      this.originData.percContinent = Math.round(mapRange(this.props.origin.perc_continent_pop, 0, 34, this.originData.popSymbol + 2, 18));

      /* It's creating an object with the properties of radius, colors, and steps. */
      const diamonds = {
        radius: this.radius,
        colors: this.palettes[`${this.props.origin.cultural_group}`],
        steps: [
          this.originData.popSymbol,
          this.originData.minoritiesPerc,
          this.originData.percContinent,
          // Math.round(this.props.origin.minority_percent),
        ]
      };

      this.originMax = Math.max(...diamonds.steps);
      this.radius = this.residenceMax > 15 || this.originMax > 10 ? 6 : 10;
      let colors = diamonds.colors || ['black'];
      let radius = this.radius;

      // console.log(popmil);
      diamonds.steps.map((diamond, index) => {
        const originDiamonds = origin.clone();

        if (this.palettes[`${this.props.origin.cultural_group}`] !== undefined) {
          colors = this.palettes[`${this.props.origin.cultural_group}`];
        }


        const stepDiamond = new StepDiamond(
          originDiamonds,
          {
            radius,
            steps: diamond,
            colors: [colors[index]]
          },
          {
            x: radius * (this.originMax - diamond) / 2,
            y: radius * this.originMax / 2
          }).init();
        stepDiamond.draw();
        this.originCountryDiamonds.push(stepDiamond);
        // console.log(stepDiamond.paths);
      })

      // console.log(this.originCountryDiamonds[2].paths.topL);
      const length = 3;
      let gdpCalc = Math.abs(mapRange(this.props.origin.gdp, 18000000, 1000000, 0.5, 0.3))

      if (this.props.origin.gdp < 100000) {
        gdpCalc = Math.abs(mapRange(this.props.origin.gdp, 10000, 100000, 0.4, 0.7))
      } else if (this.props.origin.gdp < 700000) {
        gdpCalc = Math.abs(mapRange(this.props.origin.gdp, 100000, 700000, 0.7, 0.4))
      }

      /* It's drawing the lines on the diamonds according to GDP. */
      for (let i = 0; i < this.originCountryDiamonds[2].paths.topL.length; i += this.originCountryDiamonds[2].paths.topL.length * gdpCalc) {


        const center = this.originCountryDiamonds[2].paths.topL.getPointAt(i);

        const path = new StepPathTwo(center, length, radius, { x: -1, y: -1 }, diamonds.colors, 'x');
        path.init().draw();

      }

      for (let i = 0; i < this.originCountryDiamonds[2].paths.topR.length; i += this.originCountryDiamonds[2].paths.topR.length * gdpCalc) {


        const center = this.originCountryDiamonds[2].paths.topR.getPointAt(i);

        const path = new StepPathTwo(center, length, radius, { x: 1, y: -1 }, diamonds.colors, 'x');
        path.init().draw();

      }

      for (let i = 0; i < this.originCountryDiamonds[2].paths.bottomR.length; i += this.originCountryDiamonds[2].paths.bottomR.length * gdpCalc) {


        const center = this.originCountryDiamonds[2].paths.bottomR.getPointAt(i);

        const path = new StepPathTwo(center, length, radius, { x: 1, y: 1 }, diamonds.colors, 'x');
        path.init().draw();

      }

      for (let i = 0; i < this.originCountryDiamonds[2].paths.bottomL.length; i += this.originCountryDiamonds[2].paths.bottomL.length * gdpCalc) {


        const center = this.originCountryDiamonds[2].paths.bottomL.getPointAt(i);

        const path = new StepPathTwo(center, length, radius, { x: -1, y: 1 }, diamonds.colors, 'x');
        path.init().draw();

      }


      // Encode minorities number in upper and lower triangles

      const minMap = Math.round(mapRange(this.props.origin.minorities, 1, 20, 1, 7));
      this.oMinMap = minMap;

      for (let i = 0; i < minMap; i++) {
        const center = new Paper.Point(origin.x + (this.originMax * radius / 2) - i / 2 * radius - radius / 2, origin.y + i * radius + this.originMax * radius);

        const path = new StepPathTwo(
          center,
          i,
          radius,
          { x: 1, y: 0 },
          [diamonds.colors[i], diamonds.colors[1]],
          'x'
        ).init().draw();

      }


      for (let i = minMap; i > 0; i--) {
        const center = new Paper.Point(origin.x + (this.originMax * radius / 2) - i / 2 * radius - radius / 2, origin.y - i * radius);

        const path = new StepPathTwo(
          center,
          i,
          radius,
          { x: 1, y: 0 },
          [diamonds.colors[i], diamonds.colors[1]],
          'x'
        ).init().draw();

      }

    };

    this.drawResidenceCountryData = (origin) => {
      if (this.props.residence !== '') {
        this.residenceCountryX = [];

      this.residenceData.popSymbol = Math.round(mapRange(this.props.residence.population / 1000000, 0, 210, 7, 25));
      this.residenceData.minoritiesPerc = Math.round(mapRange(this.props.residence['minority_percent'], 0, 50, 3, 10));
        this.residenceData.percContinent = Math.round(mapRange(this.props.residence.perc_continent_pop, 0, 34, this.residenceData.popSymbol + 2, 30));

        const spreadable = [
          this.residenceData.popSymbol,
          this.residenceData.minoritiesPerc,
          this.residenceData.percContinent
        ];
        this.residenceMax = Number(Math.max(...spreadable));
        this.radius = this.residenceMax > 15 || this.originMax > 10 ? 6 : 10;

      const config = {
        radius: this.radius,
        steps: this.residenceMax,
        colors: this.palettes[`${this.props.residence.cultural_group}`],
        offset: {
          x:  this.originMax * this.radius - this.radius + this.originMax * this.radius - this.originMax * this.radius * 0.5  + this.radius ,
          y: 0,
          }
      }

        // console.log(this.originMax)

        const _vUp = new vUp(
          origin,
          config).init();

        _vUp.draw();


        const _vDown = new vDown(
          origin,
          config).init();

        _vDown.draw();

        const length = 3;
        let gdpCalc = Math.abs(mapRange(this.props.residence.gdp, 18000000, 1000000, 0.5, 0.15));
        const gdpColor = [config.colors[3]];

        if (this.props.residence.gdp < 100000) {
          gdpCalc = Math.abs(mapRange(this.props.residence.gdp, 10000, 100000, 0.4, 0.7))
        } else if (this.props.residence.gdp < 700000) {
          gdpCalc = Math.abs(mapRange(this.props.residence.gdp, 100000, 700000, 0.7, 0.4))
        }

        for (let i = 0; i < _vUp.paths.left.length; i += _vUp.paths.left.length * gdpCalc) {

          const center = _vUp.paths.left.getPointAt(i);

          const pathOut = new StepPathTwo(center, length, this.radius, { x: -1, y: 1 }, gdpColor, 'x');
          // const pathIn = new StepPathTwo(center, length, this.radius, { x: 1, y: -1 }, ['black'], 'x');
          pathOut.init().draw();
          // pathIn.init().draw();

        }

        for (let i = 0; i < _vUp.paths.right.length; i += _vUp.paths.right.length * gdpCalc) {


          const center = _vUp.paths.right.getPointAt(i);

          // const pathOut = new StepPathTwo(center, length, this.radius, { x: -1, y: -1 }, ['black'], 'x');
          const pathIn = new StepPathTwo(center, length, this.radius, { x: 1, y: 1 }, gdpColor, 'x');
          // pathOut.init().draw();
          pathIn.init().draw();

        }

        for (let i = 0; i < _vDown.paths.left.length; i += _vDown.paths.left.length * gdpCalc) {

          const center = _vDown.paths.left.getPointAt(i);

          // const pathOut = new StepPathTwo(center, length, this.radius, { x: -1, y: 1 }, ['black'], 'x');
          const pathIn = new StepPathTwo(center, length, this.radius, { x: -1, y: -1 }, gdpColor, 'x');
          // pathOut.init().draw();
          pathIn.init().draw();

        }

        for (let i = 0; i < _vDown.paths.right.length; i += _vDown.paths.right.length * gdpCalc) {

          const center = _vDown.paths.right.getPointAt(i);

          // const pathOut = new StepPathTwo(center, length, this.radius, { x: -1, y: 1 }, ['black'], 'x');
          const pathIn = new StepPathTwo(center, length, this.radius, { x: 1, y: -1 }, gdpColor, 'x');
          // pathOut.init().draw();
          pathIn.init().draw();

        }


      }



    }

    this.drawHomeData = (origin) => {
      const colors = this.palettes[`${this.props.residence.cultural_group}`] || ['black', 'purple', 'red'];
      this.radius = this.residenceMax > 15 || this.originMax > 10 ? 6 : 10;
      const measure = this.originMax - 7 + this.props.livingdata[4] * 2;
      const config = {
        radius: this.radius,
        steps: measure,
        colors: [colors[3], colors[4]],
        offset: {
          x: 0,
          y: 0
        }
      };

        const stepDiamond = new StepDiamond(
          origin,
          config,
         config.offset
          ).init();
      stepDiamond.draw();


        for (let i = 0; i < 1; i++) {
          const center = new Paper.Point(
            origin.x + this.radius * measure - this.radius,
            origin.y + i * this.radius + config.offset.y);

          const path = new StepPathTwo(
            center,
            this.props.livingdata[7] + 3 ,
            this.radius,
            { x: 1, y: 0 },
            colors,
            'x'
          ).init()

          path.draw();
          // console.log(path.path.length);



          if (this,props.livingdata[2] !== 0) {
            const path = new StepPathTwo(
              new Paper.Point(center.x - 4 * this.radius, center.y),
              3 ,
              this.radius,
              { x: 1, y: 0 },
              [colors[2]],
              'x'
            ).init()

            path.draw();
            const _path = new StepPathTwo(
              new Paper.Point(center.x - 2 * this.radius, center.y - 2 * this.radius ),
              3 ,
              this.radius,
              { x: 0, y: 1 },
              [colors[2]],
              'x'
            ).init()

            _path.draw();
          }

          if (this.props.livingdata[3] !== 0) {

            let cols;
            if (this,props.livingdata[2] > 0) {
              cols = [colors[this.props.livingdata[2]]];
            } else {
              cols = colors;
            }

            const vConf = {
              radius: this.radius,
              steps: measure / 2,
              colors: cols,
              offset: {
                x: this.originMax * this.radius / 4,
                y: 0
              }
            };
            const end = path.path.getPointAt(path.path.length);
            const _vLeft = new vRight(center, vConf);
            _vLeft.init();
            _vLeft.draw();


          const _vConf = {
            radius: this.radius,
            steps: measure / 3,
            colors: cols,
            offset: {
              x: this.originMax * this.radius - 3 * this.radius,
              y: 0
            }
          };
          // const end = path.path.getPointAt(path.path.length);
          const _vRight = new vRight(center, _vConf);
          _vRight.init();
          _vRight.draw();

          }

          if (this.props.livingdata[5] !== 0) {

            const vConf = {
              radius: this.radius,
              steps: this.props.livingdata[5] ,
              colors,
              offset: {
                x: this.originMax * this.radius / 2,
                y: 0
              }
            };
            const end = path.path.getPointAt(path.path.length);
            const _vLeft = new vRight(center, vConf);
            _vLeft.init();
            _vLeft.draw();

          }

          if (this.props.livingdata[6] !== 0) {

            const vConf = {
              radius: this.radius,
              steps: this.props.livingdata[6] - 2,
              colors:[colors[3], colors[2]],
              offset: {
                x: - this.props.livingdata[6] * this.radius + 2 * this.radius,
                y: 0
              }
            };
            const end = path.path.getPointAt(path.path.length);
            const _vleft = new vLeft(center, vConf);
            _vleft.init();
            _vleft.draw();

          }

          if (this.props.livingdata[7] !== 0) {

            const vConf = {
              radius: this.radius,
              steps: this.props.livingdata[6] - 1,
              colors:[colors[3], colors[2]],
              offset: {
                x: - this.props.livingdata[6] * this.radius / 2,
                y: 0
              }
            };
            const end = path.path.getPointAt(path.path.length);
            const _vleft = new vLeft(center, vConf);
            // _vleft.init();
            // _vleft.draw();

          }

          if (this.props.livingdata[8] !== 0) {

            const end = path.path.getPointAt(path.path.length);

            const vConf = {
              radius: this.radius,
              steps:this.props.livingdata[8] - 3,
              colors: [colors[3]],
              offset: {
                x: this.originMax * this.radius + this.props.livingdata[7]/2 * this.radius - 2 * this.radius,
                y: 0
              }
            };

            const _vLeft = new vLeft(center, vConf);
            _vLeft.init();
            _vLeft.draw();
            // const _vDown = new vDown(center, vConf);
            // _vDown.init();
            // _vDown.draw();

          }




      }
    }

  }

  componentDidMount() {

    this.canvas = this.canvasRef.current;

    this.scope.setup(this.canvas);
    this.scope.activate();
    // console.log(this.props.questionvalues);
    if (Paper !== undefined) {
      this.scope.project.activeLayer.removeChildren();
      // this.drawOriginCountryData(new Paper.Point(0, 200));
      for (let i = 0; i < 3; i++) {
        this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.residenceMax * this.radius* i , this.radius * this.originMax * 2));
        // this.drawOriginCountryData(new Paper.Point(i * 2 * this.originMax * this.radius, 200));
        this.drawResidenceCountryData(new Paper.Point(i * this.originMax * this.radius + this.residenceMax * this.radius * i , this.radius * this.originMax * 2 + this.originMax * this.radius / 2));
      }

      for (let i = 0; i < 3; i++) {
        this.drawHomeData(new Paper.Point( 10 +i * this.originMax * this.radius + (this.originMax - 5) * this.radius * i + i * this.props.livingdata[7] * this.radius, this.radius * this.originMax * 2 - this.originMax * this.radius +  this.radius ));
        this.drawHomeData(new Paper.Point(10+ i * this.originMax * this.radius + (this.originMax - 5) * this.radius * i + i *  this.props.livingdata[7] * this.radius , this.radius * this.originMax * 2 + this.originMax * this.radius * 1.5 + 4 * this.radius ));
      }
    }


  }

  componentDidUpdate() {

    this.scope.activate()
    this.scope.project.activeLayer.removeChildren();
      if (Paper !== undefined) {
        // this.drawOriginCountryData(new Paper.Point(0, 200));
        for (let i = 0; i < 3; i++) {
          this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius* i , this.radius * this.originMax * 2));
          if (this.props.residence !== '') {
            this.drawResidenceCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius * i ,  this.radius * this.originMax * 2 + this.originMax * this.radius / 2));
          }
          // this.drawHomeData(new Paper.Point(i * this.originMax * this.radius + (this.originMax - 5) * this.radius * i , 2 * this.originMax * this.radius + 2 * this.radius ));
          // this.drawResidenceCountryData(new Paper.Point(i * 2 * this.originMax * this.radius, 200));


        }

        for (let i = 0; i < 3; i++) {
          this.drawHomeData(new Paper.Point( 10 +i * this.originMax * this.radius + (this.originMax - 5) * this.radius * i + i * (this.props.livingdata[7] + 4)* this.radius, this.radius * this.originMax * 2 - this.originMax * this.radius +  this.radius ));
          this.drawHomeData(new Paper.Point(10+ i * this.originMax * this.radius + (this.originMax - 5) * this.radius * i + i *  (this.props.livingdata[7] + 4) * this.radius , this.radius * this.originMax * 2 + this.originMax * this.radius * 1.5 + 4 * this.radius ));
        }

        // this.exportSVG();
      }
    }

  render() {
    if (Paper.view !== null) {
      Paper.view.draw();
    }
    return (

        <canvas ref={this.canvasRef} {...this.props} id="canvas" resize="true" width={'100%'} height='auto' />

    )
  }
}

export default PaperCanvas;