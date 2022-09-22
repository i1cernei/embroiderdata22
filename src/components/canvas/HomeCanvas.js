import React, { Component } from 'react';
import Paper from 'paper';

import StepPathTwo from '../drawings/StepPathTwo';
import { StepDiamond } from '../drawings/StepDiamond';
import { CircleDiamond } from '../drawings/CircleDiamond';

import vUp from '../drawings/vUp';
import vDown from '../drawings/vDown';
import vRight from '../drawings/vRight';
import vLeft from '../drawings/vLeft';
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


class HomeCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: {},

    }

    this.livingScope = new Paper.PaperScope();

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
    this.originOtherCountryDiamonds = [];
    this.newRef = React.createRef();
    this.newCanvas = {};
    this.popSymbol = Math.round(mapRange(this.props.origin.population / 1000000, 0, 210, 7, 25));
    this.radius = 10;
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

    // this.residenceMax = Math.max([this.residenceData.popSymbol, this.residenceData.minoritiesPerc, this.residenceData.percContinent]);
    // console.log(this.originMax);

    this.export = () => {
      // const svg = Paper.project.activeLayer.exportSVG();

      // console.log(svg);
    }

    this.drawHomeData = (origin) => {
      const colors = this.palettes[`${this.props.residence.cultural_group}`] || ['black', 'purple', 'red'];
      this.radius = this.residenceMax > 15 || this.originMax > 10 ? 8 : 10;
      const measure = this.originMax / 1.5 - 7 + this.props.data[4] * 2;
      const config = {
        radius: this.radius,
        steps: measure,
        colors: [colors[3], colors[4]],
        offset: {
          x: 0,
          y: 0
        }
      };

      const homeDiamond = new CircleDiamond(
        origin,
        {
          baseRadius:  measure / 2 * this.radius,
          radius: this.radius / 1.7,
          skipOne: true,
          outer: false,
          inner: false,
          oddOnly: false,
          startRadians: 0,
          radianLimit: 2 * Math.PI,
          color: colors[1],
        }, { x: 0, y: 0}
      ).init();
      homeDiamond.draw();

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
            this.props.data[7] + 3 ,
            this.radius,
            { x: 1, y: 0 },
            colors,
            'x'
          ).init()

          path.draw();
          // console.log(path.path.length);



          if (this,props.data[2] !== 0) {
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

          if (this.props.data[3] !== 0) {

            let cols;
            if (this,props.data[2] > 0) {
              cols = [colors[this.props.data[2]]];
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

          if (this.props.data[5] !== 0) {

            const vConf = {
              radius: this.radius,
              steps: this.props.data[5] ,
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

          if (this.props.data[6] !== 0) {

            const vConf = {
              radius: this.radius,
              steps: this.props.data[6] - 2,
              colors:[colors[3], colors[2]],
              offset: {
                x: - this.props.data[6] * this.radius + 2 * this.radius,
                y: 0
              }
            };
            const end = path.path.getPointAt(path.path.length);
            const _vleft = new vLeft(center, vConf);
            _vleft.init();
            _vleft.draw();

          }

          if (this.props.data[7] !== 0) {

            const vConf = {
              radius: this.radius,
              steps: this.props.data[6] - 1,
              colors:[colors[3], colors[2]],
              offset: {
                x: - this.props.data[6] * this.radius / 2,
                y: 0
              }
            };
            const end = path.path.getPointAt(path.path.length);
            const _vleft = new vLeft(center, vConf);
            // _vleft.init();
            // _vleft.draw();

          }

          if (this.props.data[8] !== 0) {

            const end = path.path.getPointAt(path.path.length);

            const vConf = {
              radius: this.radius,
              steps:this.props.data[8] - 3,
              colors: [colors[3]],
              offset: {
                x: this.originMax * this.radius + this.props.data[7]/2 * this.radius - 2 * this.radius,
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

    this.newCanvas = this.newRef.current;

    this.livingScope.setup(this.newCanvas);
    // this.canvasScope.activate();
    // console.log(this.props.questionvalues);
    if (Paper !== undefined) {
      this.livingScope.project.activeLayer.removeChildren();
      this.radius = this.livingScope.view.viewSize.width / 150;

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

      this.originMax = Math.max(...diamonds.steps)
      // this.radius = this.livingScope.view.viewSize.width / 100;
      // this.drawOriginCountryData(new Paper.Point(0, 200));


      for (let i = 0; i < 8; i++) {
        this.drawHomeData(new Paper.Point( 10 +i * this.originMax / 2 * this.radius + (this.originMax - 5) * this.radius * i + i * (this.props.data[7] + 4)* this.radius, this.livingScope.view.viewSize.height / 2 - this.props.data[4] * this.radius  ));
        this.drawHomeData(new Paper.Point(10+ i * this.originMax / 2 * this.radius + (this.originMax - 5) * this.radius * i + i *  (this.props.data[7] + 4) * this.radius , this.livingScope.view.viewSize.height / 2 + this.props.data[4] * this.radius ));
      }

    }


  }

  componentDidUpdate() {
    this.livingScope.activate();
    this.livingScope.project.activeLayer.removeChildren();
    if (Paper !== undefined) {

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

      this.originMax = Math.max(...diamonds.steps)
        // this.drawOriginCountryData(new Paper.Point(0, 200));

        for (let i = 0; i < 8; i++) {
          this.drawHomeData(new Paper.Point( 10 +i * this.originMax / 2 * this.radius + (this.originMax - 5) * this.radius * i + i * (this.props.data[7] + 4)* this.radius + 6 * this.radius, this.livingScope.view.viewSize.height / 2 - this.props.data[4] * this.radius ));
          this.drawHomeData(new Paper.Point(10+ i * this.originMax / 2 * this.radius + (this.originMax - 5) * this.radius * i + i *  (this.props.data[7] + 4) * this.radius + 6 * this.radius ,this.livingScope.view.viewSize.height / 2 + this.props.data[4] * this.radius ));
        }

      }
    }

  render() {
    if (this.livingScope.view !== null) {
      this.livingScope.view.draw();
    }
    return (
        <canvas className=' ' ref={this.newRef} {...this.props} id="canvas2" resize='true'/>
    )
  }
}

export default HomeCanvas;