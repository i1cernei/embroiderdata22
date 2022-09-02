import React, { Component } from 'react';
import Question from './Question';
import QuestionNav from './QuestionNav';
import Papa from 'papaparse';
import Canvas from '../canvas/Canvas';

import classes from './Questions.module.css';
class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      questionValues: [],
      currentQuestion: 0,
    };

    this.questionChange = (event, index) => {
      console.log(event.target.value, index);
      const currentValues = this.state.questionValues;

      currentValues[index] = Number(event.target.value);
      this.setState({questionValues: currentValues})
      // console.log(`Question ${index} has changed value to${value}`);
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

    fetch('https://dev.blackandfield.com/embroider/wp-json/wp/v2/question/?per_page=100').then(response => response.json())
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
      complete: function(results) {
        console.log(results);
        $this.setState({ countries: results.data });
      }
    })
  }

  render() {
    // const { data } = this.state;
    const questions = [];
    // console.log('data', data);
    // const values = [];

    const { data } = this.props.state;
    for (let question in data) {
      // console.log(data[question].acf.question_body);
      questions.push(data[question])
      // this.values.push(0);
    }

    // console.log(questions[this.state.currentQuestion].acf)

    // this.setState({questionValues: values})

      // console.log(this.props);
      return (
        <div className='formQuestions flex grow-1 flex-col items-center justify-start'>
          <header className='mb-8 w-full px-12 flex flex-row items-start justify-start mt-12'>
            {/* <Canvas className="" stitch='x' /> */}
            <h2 className='text-3xl'>Living & Location</h2>
          </header>
          {/* <ul className='flex flex-col content-start gap-y-8 ml-8 flex-1 min-w-3xl'>
            {questions.map((question, index) =>
              // <li key={index}> {question.acf.question_body} : {question.acf.question_type} </li>
              <Question change={(e, index) => this.questionChange(e, index)} key={index} acf={question.acf} index={index} type={question.acf.question_type}></Question>
              )}
          </ul> */}
          <ul className='mb-8 px-12'>
          { questions[this.state.currentQuestion] !== undefined ? <Question change={(e, index) => this.props.questionChange(e, index)}
            key={this.state.currentQuestion}
            countries={this.state.countries}
            acf={questions[this.state.currentQuestion].acf}
            index={this.state.currentQuestion}
            type={questions[this.state.currentQuestion].acf.question_type}></Question> : ''}
          </ul>
          <QuestionNav questionNav={this.questionNav} ></QuestionNav>
        </div>
     );
};
}
export default Questions;