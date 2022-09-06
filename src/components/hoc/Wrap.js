import React, { Component } from "react";
import Papa from 'papaparse';
import Questions from "../form/Questions";
import NewCanvas from "../canvas/NewCanvas";

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




componentDidMount() {
    // let result = {};
      let localData = '';
  const values = [];

  const sectionIDs = [2, 4, 3, 5];
  const sections = [];






  sectionIDs.map(  (id, index) => {
    const values = [];
    const descriptions = [];



    fetch(`https://dev.blackandfield.com/embroider/wp-json/wp/v2/categories/${id}`).then(response => response.json())
      .then(cat => {
        descriptions.push({ desc: cat.description, title: cat.name });
      })


    fetch(`https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/?per_page=100&categories=${id}&order=asc`).then(response => response.json())
    .then(data => {

      for (let question in data) {
        values.push(0);
      }

      if(descriptions[index] !== undefined) {
        sections[index] = { data: data, questionValues: values, description: descriptions[index].desc, title: descriptions[index].title }
      }
    });

      this.setState({ sections });

      // const $this = this;

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
      <div className="wrap w-full flex flex-row flex-nowrap gap-x-12 relative">
        {
          (this.state.sections[this.state.currentSection] !== undefined) ?
        <Questions
          data={this.state.sections[this.state.currentSection].data}
          countries={this.state.countries}
          changeHandle={(e, index) => this.questionChange(e, index)}
          changeCountryHandle={(e) => this.countryChange(e)}
              questionNav={(navdata) => this.questionNav(navdata)}
             sectionNav={(sectionnavdata) => this.sectionNav(sectionnavdata)}
              currentQuestion={this.state.currentQuestion}
              sections={this.state.sections} currentSection={this.state.currentSection}
          questionvalues={this.state.questionValues}
          origin={this.state.origin} residence={this.state.residence} svg={this.svg}
          ></Questions>
         : ''}
        {/*  svgOut={(svgdata) => this.handleSVG(svgdata)}  */}
        { (this.state.sections[this.state.currentSection] !== undefined) ?
          <NewCanvas className='w-full' origin={this.state.origin} residence={this.state.residence} questionvalues={this.state.sections[this.state.currentSection].questionValues}  stitch='x' />
         : ''}
        </div>
    )
  }
}

export default Wrap;