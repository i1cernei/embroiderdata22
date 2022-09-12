import React, { Component } from "react";
import Papa from 'papaparse';
import Questions from "../form/Questions";
import NewCanvas from "../canvas/NewCanvas";
import WorkCanvas from "../canvas/WorkCanvas";

class Wrap extends Component {
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
    };

    this.svg = '';

    this.questionChange = (event, index) => {
      console.log(event.target.value, index);

      const currentSections = this.state.sections;
      const currentValues = this.state.sections[this.state.currentSection].questionValues;
      currentValues[index] = Number(event.target.value);
      currentSections[this.state.currentSection].questionValues = currentValues;

      this.setState({sections: currentSections})
      // console.log(`Question ${index} has changed value to${value}`);
    }


    this.jobChange = (value, index, jobs) => {
      // console.log(event.target.value, index);

      const currentSections = this.state.sections;
      const currentValues = this.state.sections[this.state.currentSection].questionValues;
      currentValues[index] = value;
      console.log('Jobs: ', jobs);
      currentSections[this.state.currentSection].questionValues = currentValues;


      this.setState({sections: currentSections})
      // console.log(`Question ${index} has changed value to${value}`);
    }


    this.handleSVG = (svg) => {
      console.log(svg);
      this.svg = svg;
    }

    this.countryChange = (event, index) => {
      console.log(this.state.countries[event.target.value]);
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

componentWillMount() {
    // let result = {};
      let localData = '';
  const values = [];

  const sectionIDs = [2, 4, 3, 5];
  const sections = [];
  const descriptions = [];



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

    return (
      <div className="wrap w-full flex flex-row flex-nowrap gap-x-12 relative items-start">
        {
            this.state.sections[this.state.currentSection] !== undefined
             ?
        <Questions
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
          <div className="canvases w-1/2 h-full flex flex-row flex-wrap relative">
            <NewCanvas
              className={'w-full h-96 origin-top-left'}
              origin={this.state.origin}
              residence={this.state.residence}
              livingdata={this.state.sections[0].questionValues}
              sections={this.state.sections}
              questionvalues={this.state.sections[this.state.currentSection].questionValues}
              width="100%"
              height="auto"
              stitch='x' />
            <WorkCanvas
              className={'h-full w-full'}
              origin={this.state.origin}
              residence={this.state.residence}
              data={this.state.sections[1].questionValues !== null ? this.state.sections[1].questionValues : [0,0,0,0,0,0,0] }
              sections={this.state.sections}
              width="100%"
              height="auto"
              stitch='x' />
          </div>
          : ''}
        </div>
    )
  }
}

export default Wrap;