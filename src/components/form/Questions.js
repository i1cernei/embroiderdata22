import React, { Component } from 'react';
import Question from './Question';
import QuestionNav from './QuestionNav';
import Papa from 'papaparse';
import Canvas from '../canvas/Canvas';

import classes from './Questions.module.css';
class Questions extends Component {
  constructor(props) {
    super(props);

    }


  render() {
    // const { data } = this.state;
    const questions = [];
    // console.log('data', data);
    // const values = [];
    for (let question in this.props.data) {
      // console.log(data[question].acf.question_body);
      questions.push(this.props.data[question])
      // this.values.push(0);
    }

      return (
        <div className='formQuestions flex grow-1 flex-col items-start justify-start'>
          <header className='mb-8 w-full text-left px-12 flex flex-row items-center justify-between mt-12'>
            {/* <Canvas className="" stitch='x' /> */}
            <section className='flex grow-1 flex-col items-start justify-start'>
              <h2 className='text-3xl mb-4'>Living & Location</h2>
              <p className=' w-2/3'>This is the living and location section of the pattern. A section is made up of motifs and symmetries.
                Motifs are generated using answers to questions in the section, such as this one. Watch the pattern on the right to see how your answers change the design.</p>
            </section>
            <section className=' w-fit grow-1'>
              <h2 className=' min-w-fit text-4xl'>{this.props.currentQuestion + 1} / {questions.length} </h2>
            </section>


          </header>
          {/* <ul className='flex flex-col content-start gap-y-8 ml-8 flex-1 min-w-3xl'>
            {questions.map((question, index) =>
              // <li key={index}> {question.acf.question_body} : {question.acf.question_type} </li>
              <Question change={(e, index) => this.questionChange(e, index)} key={index} acf={question.acf} index={index} type={question.acf.question_type}></Question>
              )}
          </ul> */}
          <ul className='mb-8 px-12'>
            {questions[this.props.currentQuestion] !== undefined ?
              <Question
                change={(e, index) => this.props.changeHandle(e, index)}
                countryChange={(e) => this.props.changeCountryHandle(e)}
                key={this.props.currentQuestion}
                countries={this.props.countries}
                acf={questions[this.props.currentQuestion].acf}
                index={this.props.currentQuestion}
                type={questions[this.props.currentQuestion].acf.question_type}
                values={this.props.questionvalues}
              >
              </Question> : ''}
          </ul>
          <QuestionNav questionNav={(data) => this.props.questionNav(data)} ></QuestionNav>
          <p className=' max-w-lg'>{JSON.stringify(this.props.origin)}</p>
        </div>
     );
}
}
export default Questions;