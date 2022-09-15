import React, { Component } from 'react';
import Paper from 'paper';

import StepPathTwo from '../drawings/StepPathTwo';
import { StepDiamond } from '../drawings/StepDiamond';

import vUp from '../drawings/vUp';
import vDown from '../drawings/vDown';

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


class RelationshipCanvas extends Component {
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


    this.drawOriginCountryData = (origin) => {

      this.originCountryDiamonds = [];

      const popmil = Number(this.props.origin.population) / 1000000;
      this.originData.popSymbol = Math.round(mapRange(popmil, 0, 210, 7, 15));
      this.originData.minoritiesPerc = mapRange(this.props.origin['minority_percent'], 0, 50, 3, 10);
      this.originData.percContinent = Math.round(mapRange(this.props.origin.perc_continent_pop, 0, 34, this.originData.popSymbol + 2, 18));

      /* It's creating an object with the properties of radius, colors, and steps. */
      const diamonds = {
        radius: 12,
        colors: this.palettes[`${this.props.origin.cultural_group}`],
        steps: [
          this.originData.popSymbol,
          this.originData.minoritiesPerc,
          this.originData.percContinent,
          // Math.round(this.props.origin.minority_percent),
        ]
      };

      this.originMax = Math.max(...diamonds.steps)
      let colors = diamonds.colors || ['black'];
      let radius = 10;

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
          }, this.canvasScope).init();
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

        const path = new StepPathTwo(center, length, radius, { x: -1, y: -1 }, diamonds.colors, 'x', this.canvasScope);
        path.init().draw();

      }

      for (let i = 0; i < this.originCountryDiamonds[2].paths.topR.length; i += this.originCountryDiamonds[2].paths.topR.length * gdpCalc) {


        const center = this.originCountryDiamonds[2].paths.topR.getPointAt(i);

        const path = new StepPathTwo(center, length, radius, { x: 1, y: -1 }, diamonds.colors, 'x', this.canvasScope);
        path.init().draw();

      }

      for (let i = 0; i < this.originCountryDiamonds[2].paths.bottomR.length; i += this.originCountryDiamonds[2].paths.bottomR.length * gdpCalc) {


        const center = this.originCountryDiamonds[2].paths.bottomR.getPointAt(i);

        const path = new StepPathTwo(center, length, radius, { x: 1, y: 1 }, diamonds.colors, 'x', this.canvasScope);
        path.init().draw();

      }

      for (let i = 0; i < this.originCountryDiamonds[2].paths.bottomL.length; i += this.originCountryDiamonds[2].paths.bottomL.length * gdpCalc) {


        const center = this.originCountryDiamonds[2].paths.bottomL.getPointAt(i);

        const path = new StepPathTwo(center, length, radius, { x: -1, y: 1 }, diamonds.colors, 'x', this.canvasScope);
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
          'x',
          this.canvasScope
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
          'x',
          this.canvasScope

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

      const config = {
        radius: this.radius,
        steps: this.residenceMax,
        colors: this.palettes[`${this.props.residence.cultural_group}`],
        offset: {
          x:  this.originMax * this.radius - this.radius + this.originMax * this.radius - this.originMax * this.radius * 0.5  + this.radius ,
          y: 0,
          }
      }

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
  }

  componentDidMount() {

    this.newCanvas = this.newRef.current;

    this.livingScope.setup(this.newCanvas);
    // this.canvasScope.activate();
    // console.log(this.props.questionvalues);
    if (Paper !== undefined) {
      this.livingScope.project.activeLayer.removeChildren();
      this.radius = this.livingScope.view.viewSize.width / 300;
      // this.drawOriginCountryData(new Paper.Point(0, 200));
      for (let i = 0; i < 5; i++) {
        this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius* i , this.radius * this.originMax / 2 ), this.canvasScope);
      }
      for (let i = 0; i < 4; i++) {
        if (this.props.residence !== '') {
          this.drawResidenceCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius * i ,  this.radius * this.originMax / 2 + this.originMax * this.radius / 2));
        }
      }
    }


  }

  componentDidUpdate() {
    this.livingScope.activate();
    this.livingScope.project.activeLayer.removeChildren();
      if (Paper !== undefined) {
        // this.drawOriginCountryData(new Paper.Point(0, 200));
        for (let i = 0; i < 5; i++) {
          this.drawOriginCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius* i , this.radius * this.originMax / 2 ), this.canvasScope);
        }
        for (let i = 0; i < 4; i++) {
          if (this.props.residence !== '') {
            this.drawResidenceCountryData(new Paper.Point(i * this.originMax * this.radius + this.originMax * this.radius * i ,  this.radius * this.originMax / 2 + this.originMax * this.radius / 2));
          }
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

export default RelationshipCanvas;