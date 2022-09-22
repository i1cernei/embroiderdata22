import React, { Component } from 'react';

class QuestionNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='w-full flex flex-row justify-between px-8'>
        <div className="next flex flex-row-reverse items-center flex-nowrap border border-gray-200 rounded-xl pr-4 py-4 ml-4 bg-gray-200">
          <button className='text-xl ml-4' onClick={() => this.props.questionNav('prev')}>Previous Question</button>
          <svg className=' rotate-180 scale-50' width="66" height="45" viewBox="0 0 66 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.679491 22.1914L18 39.5119L35.3205 22.1914L18 4.8709L0.679491 22.1914ZM64.6213 24.3127C65.7929 23.1412 65.7929 21.2417 64.6213 20.0701L45.5294 0.978203C44.3579 -0.193371 42.4584 -0.193371 41.2868 0.978203C40.1152 2.14978 40.1152 4.04927 41.2868 5.22084L58.2574 22.1914L41.2868 39.162C40.1152 40.3335 40.1152 42.233 41.2868 43.4046C42.4584 44.5762 44.3579 44.5762 45.5294 43.4046L64.6213 24.3127ZM18 25.1914H62.5V19.1914H18V25.1914Z" fill="black" />
          </svg>
        </div>
        { this.props.currentQuestion !== this.props.sections[this.props.currentSection].questionValues.length - 1 ?

          <div className="next flex flex-row items-center flex-nowrap border border-gray-200 rounded-xl pl-4 py-4 mr-4 bg-gray-200">
            <button className='text-xl' onClick={() => this.props.questionNav('next')}>Next Question</button>
            <svg className='ml-4 scale-50' width="66" height="45" viewBox="0 0 66 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.679491 22.1914L18 39.5119L35.3205 22.1914L18 4.8709L0.679491 22.1914ZM64.6213 24.3127C65.7929 23.1412 65.7929 21.2417 64.6213 20.0701L45.5294 0.978203C44.3579 -0.193371 42.4584 -0.193371 41.2868 0.978203C40.1152 2.14978 40.1152 4.04927 41.2868 5.22084L58.2574 22.1914L41.2868 39.162C40.1152 40.3335 40.1152 42.233 41.2868 43.4046C42.4584 44.5762 44.3579 44.5762 45.5294 43.4046L64.6213 24.3127ZM18 25.1914H62.5V19.1914H18V25.1914Z" fill="black" />
            </svg>
          </div>
        : ' '}
      </div>

    )
  }
}

export default QuestionNav;