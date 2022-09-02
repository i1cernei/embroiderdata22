import React, { Component } from "react";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 0,
      checkBoxSum: 0,
    }

    this.valueChanged = (event) => {
      this.setState({
        selectedOption: event.target.value,
      })
    }

    this.checkboxChanged = (event, value) => {
      let sum = this.state.checkBoxSum;
      sum = event.target.checked ? sum + value : sum - value;
      this.setState({
        checkBoxSum: sum
      });
    }
  }

  render() {
    let input;
    // console.log(this.props.type)

    switch (Number(this.props.type)) {
      case 0:
        input = (
          <input key={this.props.index} onChange={(event) => this.props.change(event, this.props.index)}
            className="text-4xl border-2 border-blue-400 p-6 w-32 bg-transparent rounded-full"
            type='number' max={7}
            defaultValue={0}
          ></input>);
        break;
      case 1:
        input = (
          <input
            type='range'
            min={this.props.acf.question_range_min}
            max={this.props.acf.question_range_max} step='1'></input>
        )
        break;
      case 2:
        const options = [];

        this.props.acf.question_options.map((q, qindex) => {
          options.push((
            <div className="flex items-center flex-row max-w-fit" onChange={(event) => this.props.change(event, this.props.index)} >
              <input
                type='radio' name={`radio-${this.props.index}-${qindex}`}
                onChange={this.valueChanged} checked={this.state.selectedOption === q.choice_value}
                value={q.choice_value}
                id={`radio-${this.props.index}-${qindex}`}
                className='w-8 h-8'
              ></input>
              <label
                htmlFor={`radio-${this.props.index}-${qindex}`}
                className='ml-2 text-xl'>

                {q.choice_label}</label>
            </div>
          ))
        });

        for (let q of this.props.acf.question_options) {

          }
          input = (

                <div className="flex flex-row flex-wrap max-w-3xl gap-x-4 gap-y-6">
                  {options}
                </div>
          )
          break;
      case 3:
        const theoptions = [];
      this.props.acf.question_options.map((q, qindex) => {
        theoptions.push((
          <div className="flex items-center flex-row max-w-fit" >
            <input
              type='checkbox'
              onChange={(event) => this.checkboxChanged(event, q.choice_value)}
              value={q.choice_value}
              id={`checkbox-${this.props.index}-${qindex}`}
              className='w-8 h-8'
            ></input>
            <label
              htmlFor={`checkbox-${this.props.index}-${qindex}`}
              className='ml-2 text-xl'>

              {q.choice_label}</label>
          </div>
        ))
      });

      for (let q of this.props.acf.question_options) {

        }
        input = (

              <div className="flex flex-row flex-wrap max-w-3xl gap-x-4 gap-y-6">
                {theoptions}
              </div>
        )
        break;
      case 4:

        const thecountries = [];
        this.props.countries.map((country, cindex) => {
          thecountries.push((
            <option value={cindex}>{country.country}</option>
          ))
        });

          input = (

            <select onChange={(e) => this.props.countryChange(e, this.props.index)} name="country" id="">
                {thecountries}
            </select>
          )

        break;
      default:
        input = ('');
    }
    // if (Number(this.props.type) === 0) {
    //   console.log(Number(this.props.type))
    //   input = (<input type='number' value="0"></input>);
    // }
    return (
      <li key={this.props.index} className='border rounded-xl w-full p-8 flex-col gap-y-6 drop-shadow-sm'>
         <div className="question_body w-full text-left text-2xl font-bold">
                  <p className="mb-8">{this.props.acf.question_body}</p>
                  </div>
                <div className="flex flex-row flex-wrap  gap-x-4 gap-y-6">
                {input}
                </div>

      </li>
    )
  }
}

export default Question;