import React, { Component } from "react";
import { MultiSelect } from 'react-multi-select-component';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 0,
      checkBoxSum: 0,
      selectedJobs: [],
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

    this.setSelect = (data, index) => {
      // console.log('select data', data)
      let totalValue = 0;

      data.map((job) => {
        totalValue += Number(job.value);
      })

      this.props.changeJob(totalValue, index, data )

      this.setState({ selectedJobs: data });

    }
    this.setSelect = this.setSelect.bind(this);
  }

  render() {
    let input;
    // console.log(this.props.type)

    switch (Number(this.props.type)) {
      case 0:

        let max = 10;

        switch (this.props.section) {
          case 0:
            max = 7;
            break;
          case 2:
            if (this.props.index > 0) {
              max = 100;
            } else {
              max = 7;
            }
            break;
          default:
            max = 7;
        }

        input = (
          <input key={this.props.index} onChange={(event) => this.props.change(event, this.props.index)}
            className="text-4xl border-2 border-blue-400 p-6 w-32 bg-transparent rounded-full"
            type='number' min="0" max={max}
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
                className='appearance-none rounded-full h-8 w-8 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              ></input>
              <label
                htmlFor={`radio-${this.props.index}-${qindex}`}
                className='ml-2 text-sm'>

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

        theoptions.push({
          label: q.choice_label, value: q.choice_value
        })
      });
        input = (

          <MultiSelect
            options={theoptions}
            value={this.state.selectedJobs}
            hasSelectAll={false}
            disableSearch={true}

            onChange={(e) => this.setSelect(e, this.props.index)}
            // labelledBy={"Select"}
          />
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

            <select class='text-4xl text-blue-700 bg-transparent' onChange={(e) => this.props.countryChange(e, this.props.index)} name="country" id="">
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
      <li key={this.props.index} className='border rounded-xl w-full p-16 flex-col gap-y-6 drop-shadow-sm h-96'>
         <div className="question_body w-full text-left text-2xl font-bold">
                  <p className="mb-8">{this.props.acf.question_body}</p>
                  </div>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-6">
                {input}
                </div>

      </li>
    )
  }
}

export default Question;