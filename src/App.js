
import React, { Component } from 'react';
import Weather from './Weather'

import './App.css';

/** 
 * This example illustrates a simple react project 
 * that works with an external API. 
 * 
 * Take note of the comments they point common 
 * problems you will need to solve with React. 
 * 
 * There are two ideas here
 * - Input/Controlled Component Pattern
 * - Conditionally Rendering components 
 * 
 * The project has an input field where a user will
 * input a zip code. It finds weather data for that
 * zip and displays it in a component. 
 * 
 * */

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '94108',
      weatherData: null,
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
    const zip = this.state.inputValue
    const base = "https://api.openweathermap.org/data/2.5/weather?"
    const url = `${base}zip=${zip},us&appid=${apikey}`
    fetch(url).then(res => {
      // Handle the response stream as JSON
      return res.json()
    }).then((json) => {
      this.setState({ weatherData: json })
      console.log("Set state to json res", this.state.weatherData)
    }).catch((err) => {
      this.setState({ weatherData: null })
      console.log('-- Error fetching --')
      console.log(err.message)
    })
  }

  render() {
    const data = this.state.weatherData
    console.log("Data", data)
    return (
      <div className="App">
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
            type="text"
            pattern="(\d{5}([\-]\d{4})?)"
            placeholder="enter zip"
          />

          <button type="submit">Submit</button>

        </form>
        <Weather weather={data} />

      </div>
    );
  }
}

export default App;
