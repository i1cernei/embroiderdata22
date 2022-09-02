import React, { Component } from "react";
import Papa from 'papaparse';
import Questions from "../form/Questions";
import Canvas from "../canvas/Canvas";
import NewCanvas from '../canvas/NewCanvas';

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
    };

    this.questionChange = (event, index) => {
      console.log(event.target.value, index);
      const currentValues = this.state.questionValues;

      currentValues[index] = Number(event.target.value);
      this.setState({questionValues: currentValues})
      // console.log(`Question ${index} has changed value to${value}`);
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


    this.questionNav = (data) => {
      if (data === 'next') {


        if ((this.state.currentQuestion + 1) > this.state.questionValues.length - 1) {
          this.setState({ currentQuestion: 0 });
        } else {
          this.setState({ currentQuestion: this.state.currentQuestion + 1 });
        }
      }
      else {
        if (this.state.currentQuestion - 1 < 0) {
          this.setState({currentQuestion: this.state.questionValues.length - 1})
        } else {
          this.setState({ currentQuestion: this.state.currentQuestion - 1 })
          }
        }
    }

    this.questionChange.bind(this);
  }


componentDidMount() {
    // let result = {};
      let localData = '';
      const values = [];

      fetch('https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/?per_page=100&categories=2&order=asc').then(response => response.json())
        .then(data => {

          for (let question in data) {
            values.push(0);
          }
          this.setState({ data, questionValues: values })
        });

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
      <div className="wrap w-full flex flex-row flex-nowrap gap-x-12">
        <Questions
          data={this.state.data}
          countries={this.state.countries}
          changeHandle={(e, index) => this.questionChange(e, index)}
          changeCountryHandle={(e) => this.countryChange(e)}
          questionNav={(data) => this.questionNav(data)}
          currentQuestion={this.state.currentQuestion}
          questionvalues={this.state.questionValues}

        ></Questions>
        <NewCanvas origin={this.state.origin} residence={this.state.residence} questionvalues={this.state.questionValues} className='w-1/2' stitch='x' />
      </div>
    )
  }
}

export default Wrap;