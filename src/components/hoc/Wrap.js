import React, { Component } from "react";
import Papa from 'papaparse';
import Questions from "../form/Questions";
import NewCanvas from "../canvas/NewCanvas";
import WorkCanvas from "../canvas/WorkCanvas";
import RelationshipCanvas from "../canvas/RelationshipCanvas";
import LivingCanvas from "../canvas/LivingCanvas";
import HomeCanvas from "../canvas/HomeCanvas";
import PartnerCanvas from "../canvas/PartnerCanvas";
import SymbolInner from '../Symbol/SymbolInner';
import { SocketContext } from '../../context/socket';

class Wrap extends Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      questionValues: [],
      currentQuestion: 0,
      countries: [],
      origin: '',
      residence: '',
      cultures: '',
      sections: [],
      currentSection: 0,
      svg: '',
      pattern: false,
      rotate: false,
    };

    this.initResetTimeout = '';

    // this.initialState = `{
    //   "data": [],
    //   "questionValues": [
    //     "{country: \"Andorra\", cultural_group: \"southern\", gd…}",
    //     "{country: \"Brazil\", cultural_group: \"mestizo\", gdp:…}"
    //   ],
    //   "currentQuestion": 5,
    //   "countries": [
    //     "{country: \"Åland Islands (Finland)\", cultural_group…}",
    //     "{country: \"Albania\", cultural_group: \"southeastern\"…}",
    //     "{country: \"Andorra\", cultural_group: \"southern\", gd…}",
    //     "{country: \"Antigua and Barbuda\", cultural_group: \"c…}",
    //     "{country: \"Argentina\", cultural_group: \"iberoameric…}",
    //     "{country: \"Armenia\", cultural_group: \"caucasus\", gd…}",
    //     "{country: \"Austria\", cultural_group: \"central\", gdp…}",
    //     "{country: \"Azerbaijan\", cultural_group: \"caucasus\",…}",
    //     "{country: \"Belarus\", cultural_group: \"eastern\", gdp…}",
    //     "{country: \"Belgium\", cultural_group: \"western\", gdp…}",
    //     "{country: \"Bolivia\", cultural_group: \"indoamerican\"…}",
    //     "{country: \"Bosnia and Herzegovina\", cultural_group:…}",
    //     "{country: \"Brazil\", cultural_group: \"mestizo\", gdp:…}",
    //     "{country: \"Bulgaria\", cultural_group: \"southeastern…}",
    //     "{country: \"Canada\", cultural_group: \"western\", gdp:…}",
    //     "{country: \"Chile\", cultural_group: \"mestizo\", gdp: …}",
    //     "{country: \"Colombia\", cultural_group: \"iberoamerica…}",
    //     "{country: \"Costa Rica\", cultural_group: \"mestizo\", …}",
    //     "{country: \"Croatia\", cultural_group: \"central\", gdp…}",
    //     "{country: \"Cuba\", cultural_group: \"iberoamerican\", …}",
    //     "{country: \"Cyprus\", cultural_group: \"southeastern\",…}",
    //     "{country: \"Czech Republic\", cultural_group: \"centra…}",
    //     "{country: \"Denmark\", cultural_group: \"northern\", gd…}",
    //     "{country: \"Dominican Republic\", cultural_group: \"me…}",
    //     "{country: \"Ecuador\", cultural_group: \"southern\", gd…}",
    //     "{country: \"El Salvador\", cultural_group: \"creole\", …}",
    //     "{country: \"Estonia\", cultural_group: \"baltic\", gdp:…}",
    //     "{country: \"Faroe Islands (Denmark)\", cultural_group…}",
    //     "{country: \"Finland\", cultural_group: \"northern\", gd…}",
    //     "{country: \"France\", cultural_group: \"western\", gdp:…}",
    //     "{country: \"French Guiana\", cultural_group: \"western…}",
    //     "{country: \"Georgia\", cultural_group: \"caucasus\", gd…}",
    //     "{country: \"Germany\", cultural_group: \"central\", gdp…}",
    //     "{country: \"Gibraltar (UK)\", cultural_group: \"wester…}",
    //     "{country: \"Greece\", cultural_group: \"southeastern\",…}",
    //     "{country: \"Guadeloupe (France)\", cultural_group: \"w…}",
    //     "{country: \"Guatemala\", cultural_group: \"indoamerica…}",
    //     "{country: \"Guernsey (UK)\", cultural_group: \"western…}",
    //     "{country: \"Haiti\", cultural_group: \"creole\", gdp: \"…}",
    //     "{country: \"Honduras\", cultural_group: \"creole\", gdp…}",
    //     "{country: \"Hungary\", cultural_group: \"central\", gdp…}",
    //     "{country: \"Iceland\", cultural_group: \"northern\", gd…}",
    //     "{country: \"Ireland\", cultural_group: \"western\", gdp…}",
    //     "{country: \"Isle of Man (UK)\", cultural_group: \"west…}",
    //     "{country: \"Italy\", cultural_group: \"southern\", gdp:…}",
    //     "{country: \"Jersey (UK)\", cultural_group: \"western\",…}",
    //     "{country: \"Kazakhstan\", cultural_group: \"eastern\", …}",
    //     "{country: \"Kosovo\", cultural_group: \"southeastern\",…}",
    //     "{country: \"Latvia\", cultural_group: \"baltic\", gdp: …}",
    //     "{country: \"Liechtenstein\", cultural_group: \"central…}",
    //     "{country: \"Lithuania\", cultural_group: \"baltic\", gd…}",
    //     "{country: \"Luxembourg\", cultural_group: \"central\", …}",
    //     "{country: \"Macedonia\", cultural_group: \"southeaster…}",
    //     "{country: \"Malta\", cultural_group: \"southern\", gdp:…}",
    //     "{country: \"Martinique (France)\", cultural_group: \"w…}",
    //     "{country: \"Mexico\", cultural_group: \"mestizo\", gdp:…}",
    //     "{country: \"Moldova\", cultural_group: \"southeastern\"…}",
    //     "{country: \"Monaco\", cultural_group: \"western\", gdp:…}",
    //     "{country: \"Montenegro\", cultural_group: \"southeaste…}",
    //     "{country: \"Netherlands\", cultural_group: \"western\",…}",
    //     "{country: \"Nicaragua\", cultural_group: \"mestizo\", g…}",
    //     "{country: \"Norway\", cultural_group: \"northern\", gdp…}",
    //     "{country: \"Panama\", cultural_group: \"mestizo\", gdp:…}",
    //     "{country: \"Paraguay\", cultural_group: \"mestizo\", gd…}",
    //     "{country: \"Peru\", cultural_group: \"indoamerican\", g…}",
    //     "{country: \"Poland\", cultural_group: \"central\", gdp:…}",
    //     "{country: \"Portugal\", cultural_group: \"southern\", g…}",
    //     "{country: \"Puerto Rico\", cultural_group: \"western\",…}",
    //     "{country: \"Romania\", cultural_group: \"southeastern\"…}",
    //     "{country: \"Russia\", cultural_group: \"eastern\", gdp:…}",
    //     "{country: \"Saint Barthélemy (France)\", cultural_gro…}",
    //     "{country: \"Saint Kitts and Nevis\", cultural_group: …}",
    //     "{country: \"Saint Lucia\", cultural_group: \"southern\"…}",
    //     "{country: \"Saint Martin (France)\", cultural_group: …}",
    //     "{country: \"Saint Vincent and the Grenadines\", cultu…}",
    //     "{country: \"San Marino\", cultural_group: \"southern\",…}",
    //     "{country: \"Serbia\", cultural_group: \"southeastern\",…}",
    //     "{country: \"Slovakia\", cultural_group: \"central\", gd…}",
    //     "{country: \"Slovenia\", cultural_group: \"central\", gd…}",
    //     "{country: \"Spain\", cultural_group: \"southern\", gdp:…}",
    //     "{country: \"Suriname\", cultural_group: \"creole\", gdp…}",
    //     "{country: \"Svalbard and Jan Mayen(Norway)\", cultura…}",
    //     "{country: \"Sweden\", cultural_group: \"northern\", gdp…}",
    //     "{country: \"Switzerland\", cultural_group: \"central\",…}",
    //     "{country: \"The Bahamas\", cultural_group: \"creole\", …}",
    //     "{country: \"Trinidad and Tobago\", cultural_group: \"c…}",
    //     "{country: \"Turkey\", cultural_group: \"caucasus\", gdp…}",
    //     "{country: \"Ukraine\", cultural_group: \"eastern\", gdp…}",
    //     "{country: \"United Kingdom\", cultural_group: \"wester…}",
    //     "{country: \"United States of America\", cultural_grou…}",
    //     "{country: \"Uruguay\", cultural_group: \"southern\", gd…}",
    //     "{country: \"Vatican City\", cultural_group: \"southern…}",
    //     "{country: \"Venezuela\", cultural_group: \"iberoameric…}"
    //   ],
    //   "origin": {
    //     "country": "Andorra",
    //     "population": "78000",
    //     "perc_continent_pop": "0.01",
    //     "minority_percent": "51",
    //     "minorities": "4",
    //     "cultural_group": "southern",
    //     "gdp": "4800"
    //   },
    //   "residence": {
    //     "country": "Brazil",
    //     "population": "204519000",
    //     "perc_continent_pop": "33.07",
    //     "minority_percent": "33.1",
    //     "minorities": "12",
    //     "cultural_group": "mestizo",
    //     "gdp": "3259000"
    //   },
    //   sections: [
    //     "{data: Array(9), description: \"This is the living a…}",
    //     "{data: Array(5), description: \"This the work and ed…}",
    //     "{data: Array(6), description: \"This is the social a…}"
    //   ],
    //   currentSection: 2,
    //   "currentSection": 2,
    //   "cultures": [
    //     "northern",
    //     "southeastern",
    //     "southern",
    //     "creole",
    //     "iberoamerican",
    //     "caucasus",
    //     "central",
    //     "eastern",
    //     "western",
    //     "indoamerican",
    //     "mestizo",
    //     "baltic"
    //   ],

    //   "svg": ""
    // }`;



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

    this.svg = '';
    this.socket = this.context;

    this.questionChange = (event, index) => {
      // console.log(event.target.value, index);

      const currentSections = this.state.sections;
      const currentValues = this.state.sections[this.state.currentSection].questionValues;
      currentValues[index] = Number(event.target.value);
      currentSections[this.state.currentSection].questionValues = currentValues;

      this.setState({ sections: currentSections })

      // console.log(`Question ${index} has changed value to${value}`);
    }


    this.jobChange = (value, index, jobs) => {
      // console.log(event.target.value, index);

      const currentSections = this.state.sections;
      const currentValues = this.state.sections[this.state.currentSection].questionValues;
      currentValues[index] = [value, jobs];
      // console.log('Jobs: ', jobs);
      currentSections[this.state.currentSection].questionValues = currentValues;


      this.setState({sections: currentSections})
      // console.log(`Question ${index} has changed value to${value}`);
    }


    this.handleSVG = (svg) => {
      console.log(svg);
      this.svg = svg;
    }

    this.countryChange = (event, index) => {
      // console.log(this.state.countries[event.target.value]);
      const currentValues = this.state.questionValues;
      currentValues[this.state.currentQuestion] = this.state.countries[event.target.value];

      if (this.state.currentQuestion === 0) {
        this.setState({ origin: this.state.countries[event.target.value], questionValues: currentValues });
      }
      if (this.state.currentQuestion === 1) {
        this.setState({ residence: this.state.countries[event.target.value], questionValues: currentValues });
      }
      // const currentValues = this.state.questionValues;

      // currentValues[index] = Number(event.target.value);
      // this.setState({questionValues: currentValues})
      // // console.log(`Question ${index} has changed value to${value}`);
    }

    this.findAllUniqueCultures = (countries) => {
      let results = [];

      countries.map((country, index) => {
        if (!results.includes(country.cultural_group)) {
          results.push(country.cultural_group);
        }
      });

      return results;
    }


    this.questionNav = (navData) => {
      if (navData === 'next') {


        if ((this.state.currentQuestion + 1) > this.state.sections[this.state.currentSection].questionValues.length - 1) {
          this.setState({ currentQuestion: 0 });
        } else {
          this.setState({ currentQuestion: this.state.currentQuestion + 1});
        }
      }
      else {
        if (this.state.currentQuestion - 1 < 0) {
          this.setState({currentQuestion: this.state.sections[this.state.currentSection].questionValues.length - 1})
        } else {
          this.setState({ currentQuestion: this.state.currentQuestion - 1 })
          }
      }

      if (this.initResetTimeout) {
        clearTimeout(this.initResetTimeout);
      }

      this.initResetTimeout = setTimeout( function () {
        this.setState({currentSection: 0, currentQuestion: 0})
      }.bind(this), 5 * 60 * 1000)
    }

    this.handleBackToInterface = () => {
      this.setState({ pattern: false, currentQuestion: 0, currentSection: 0 });
    }

    this.handleSeePattern = () => {
      this.setState({ pattern: true });
    }

    this.sectionNav = (sectionNavData) => {
      if (sectionNavData === 'next') {
        if ((this.state.currentSection + 1) > this.state.sections.length - 1) {
          this.setState({ currentSection: 0 , currentQuestion: 0});
        } else {
          this.setState({ currentSection: this.state.currentSection + 1, currentQuestion: 0 });
        }
      }
      else {
        if (this.state.currentSection - 1 < 0) {
          this.setState({currentSection: this.state.sections.length - 1, currentQuestion: 0})
        } else {
          this.setState({ currentSection: this.state.currentSection - 1 , currentQuestion: 0})
          }
        }
    }

    this.questionChange.bind(this);
  }



  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  componentDidUpdate() {
    // const socket = this.context;
    // this.props.socket.emit('newData', this.state );
    const sockets = this.context;
    sockets.emit('newData', this.state);
  }

  componentDidMount() {
    const sockets = this.context;
    console.log('socket: ', sockets);
    // this.props.socket.emit('newData', this.state );
  }

componentWillMount() {
    // let result = {};
      let localData = '';
  const values = [];

  const sectionIDs = [2, 4, 3, 5];
  const sections = [];
  const descriptions = [];

  // const initialState = JSON.parse(this.initialState);
  // this.setState({ ...initialState });

  const sectionData = [];


  fetch(`https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories/?order_by=id&order=asc`).then(response => response.json())
      .then(data => {
        // descriptions.push({ desc: cat.description, title: cat.name });
        data.map((val, index) => {
          if (val.id !== 1) {
            sectionData.push(val);
          }
        })

        sectionData.sort(function(a, b) {
          return a.id - b.id;
        });


        sectionData.map((value, index) => {
          const values = [];

          fetch(`https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/?per_page=100&categories=${sectionData[index].id}&order=asc`).then(response => response.json())
          .then(data => {

            for (let question in data) {
              values.push(0);
            }

            // if(sectionData[index] !== undefined) {
            sections[index] = { data: data, questionValues: values, description: sectionData[index].description, title: sectionData[index].name }
            this.setState({ sections });
            // }
          }).catch(e => {console.log(e)});

          this.setState({ sections });
          console.log(sections)

          })



        console.log(sectionData);
      }).catch(e => {
        console.log(e);
      })







      // fetch('https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/?per_page=100&categories=2&order=asc').then(response => response.json())
      //   .then(data => {

      //     for (let question in data) {
      //       values.push(0);
      //     }
      //     this.setState({ data, questionValues: values, sections })
      //   });

      const $this = this;

      Papa.parse('/country-data.csv', {
        download: true,
        header: true,
        complete: function (results) {
          // console.log(results);
          const cultures = $this.findAllUniqueCultures(results.data);
          $this.setState({ countries: results.data, cultures  });
        }
      });


    }

  render() {
    let content = (
      <div className="wrap max-w-full flex flex-row flex-nowrap gap-x-12 relative items-start bg-gray-600">

      {
          this.state.sections[this.state.currentSection] !== undefined
           ?
      <Questions seePattern = {this.handleSeePattern}
        data={this.state.sections[this.state.currentSection].data}
        countries={this.state.countries}
        changeHandle={(e, index) => this.questionChange(e, index)}
        changeCountryHandle={(e) => this.countryChange(e)}
        changeJobHandle={(value, index, jobs) => this.jobChange(value, index, jobs)}
        questionNav={(navdata) => this.questionNav(navdata)}
        sectionNav={(sectionnavdata) => this.sectionNav(sectionnavdata)}
        currentQuestion={this.state.currentQuestion}
            sections={this.state.sections}
            currentSection={this.state.currentSection}
            questionvalues={this.state.sections[0].questionValues}
            // livingdata={this.state.sections[0].questionValues}
            origin={this.state.origin}
            residence={this.state.residence} svg={this.svg}
        ></Questions>
        : '' }
      {/*  svgOut={(svgdata) => this.handleSVG(svgdata)}  */}
      { (this.state.sections[this.state.currentSection] !== undefined) ?
        <div className="canvases w-1/2 h-full flex flex-col flex-wrap relative justify-center items-center min-h-screen bg-zinc-700 pl-4 pr-4">
          {/* <NewCanvas
            className={'w-full h-96 origin-top-left'}
            origin={this.state.origin}
            residence={this.state.residence}
            livingdata={this.state.sections[0].questionValues}
            sections={this.state.sections}
            questionvalues={this.state.sections[this.state.currentSection].questionValues}
            width="100%"
            height="auto"
            stitch='x' /> */}
          {this.state.currentSection === 0 ?
            <LivingCanvas
            className={'h-80 w-full'}
            origin={this.state.origin}
            residence={this.state.residence}
            colors={this.palettes}
            data={this.state.sections[0] !== undefined ? this.state.sections[0].questionValues : [0, 0, 0, 0, 0, 0, 0]}
            sections={this.state.sections}
            questionvalues={this.state.sections[this.state.currentSection].questionValues}
            width="100%"
            height="auto"
              stitch='x' />
            : ''}
          {this.state.currentSection === 0 ?
            <HomeCanvas
            className={'h-80 w-full'}
            origin={this.state.origin}
            residence={this.state.residence}
            colors={this.palettes}
            data={this.state.sections[0] !== undefined ? this.state.sections[0].questionValues : [0, 0, 0, 0, 0, 0, 0]}
            sections={this.state.sections}
            questionvalues={this.state.sections[this.state.currentSection].questionValues}
            width="100%"
            height="auto"
            stitch='x' />
            : ''}
          {this.state.currentSection === 1 ?
            <WorkCanvas
            className={' h-80 w-full'}
            origin={this.state.origin}
            residence={this.state.residence}
            colors={this.palettes}
            data={this.state.sections[1] !== undefined ? this.state.sections[1].questionValues : [0,0,0,0,0,0,0] }
            sections={this.state.sections}
            width="100%"
            height="auto"
              stitch='x' />
            : ''}
          {this.state.currentSection === 2 ?
            <PartnerCanvas
            className={' h-72 w-full'}
            origin={this.state.origin}
            residence={this.state.residence}
            colors={this.palettes}
            data={this.state.sections[2] !== undefined ? this.state.sections[2].questionValues : [1, 0, 0, 0, 0, 0, 0]}
            sections={this.state.sections}
            width="100%"
            height="auto"
            stitch='x' />
            : ''}
          {this.state.currentSection === 2 ?
            <RelationshipCanvas
            className={'h-72 w-full -mt-20'}
            origin={this.state.origin}
            residence={this.state.residence}
            colors={this.palettes}
            data={this.state.sections[2] !== undefined ? this.state.sections[2].questionValues : [1,0,0,0,0,0,0] }
            sections={this.state.sections}
            width="100%"
            height="auto"
            stitch='x' /> : ''}
        </div>
        : ''}
      </div>
    )

    if (this.state.pattern) {
      content = (
        <SymbolInner states={this.state} backToInterface={this.handleBackToInterface}/>
      );
    }
    return (
      content
    )
  }
}

export default Wrap;