import React, { Component } from 'react';
import Question from './Question';
import QuestionNav from './QuestionNav';
import SectionNav from './SectionNav';
import Papa from 'papaparse';
import BannerCanvas from '../canvas/BannerCanvas'
import SVGElement from '../hoc/svg';

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

    // for (let element in this.props.svg) {
    //   svg.push(this.props.svg[element]);
    // }

      return (
        <div className='formQuestions max-w-screen-md flex shrink flex-col items-start justify-center relative w-1/2'>

        {/* <BannerCanvas origin={this.props.origin} residence={this.props.residence} resize="false" questionvalues={this.props.questionvalues} className='bannerCanvas relative h-64 ml-12 top-0' stitch='x' /> */}
          <header className='mb-4 w-full text-left pl-12 pr-8 flex flex-row items-start justify-between mt-12 overflow-hidden'>
            {/* <Canvas className="" stitch='x' /> */}

            <section className='flex grow-1 flex-col items-start justify-start'>
              <h2 className='text-3xl mb-4'>{this.props.sections[this.props.currentSection].title}</h2>
              <p className=' w-2/3'>{this.props.sections[this.props.currentSection].description}</p>
            </section>
            <section className=' w-20 grow-1'>
              <h2 className=' w-20 text-4xl'>{this.props.currentQuestion + 1} / {questions.length} </h2>
            </section>


          </header>
          {/* <ul className='flex flex-col content-start gap-y-8 ml-8 flex-1 min-w-3xl'>
            {questions.map((question, index) =>
              // <li key={index}> {question.acf.question_body} : {question.acf.question_type} </li>
              <Question change={(e, index) => this.questionChange(e, index)} key={index} acf={question.acf} index={index} type={question.acf.question_type}></Question>
              )}
          </ul> */}

          <ul className='mt-4 mb-4 px-12'>


            {questions[this.props.currentQuestion] !== undefined ?
              <Question
                change={(e, index) => this.props.changeHandle(e, index)}
                countryChange={(e) => this.props.changeCountryHandle(e)}
                changeJob={(value, index, jobs) => this.props.changeJobHandle(value, index, jobs)}
                key={this.props.currentQuestion}
                countries={this.props.countries}
                section={this.props.currentSection}
                acf={questions[this.props.currentQuestion].acf}
                index={this.props.currentQuestion}
                type={questions[this.props.currentQuestion].acf.question_type}
                values={this.props.questionvalues}
              >
              </Question> : ''}
          </ul>
          <QuestionNav questionNav={(navdata) => this.props.questionNav(navdata)} ></QuestionNav>
          <SectionNav className="w-full" currentQuestion={this.props.currentQuestion} sections={this.props.sections} currentSection={this.props.currentSection}  sectionNav={(navdata) => this.props.sectionNav(navdata)} ></SectionNav>
          {/* <p className=' max-w-lg'>{JSON.stringify(this.props.origin)}</p> */}


        </div>
     );
}
}
export default Questions;