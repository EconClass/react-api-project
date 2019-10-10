import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    if (this.props.weather === null) {
      this.state = null
    } else if (this.props.weather.cod === '404' || this.props.weather.cod === '400') {
      this.state = Error("Something went wrong!")
    } else {
      const { main, description, icon } = this.props.weather.weather[0]
      const { temp, humidity, temp_min, temp_max } = this.props.weather.main
      this.state = { main, description, icon, temp, humidity, temp_min, temp_max }
    }
  }

  renderSuccess() {
    const { main, description, icon, temp, humidity, temp_min, temp_max } = this.state

    return (
      <div className="result">
        <div>Title: {main}</div>
        <div>Desc: {description}</div>
        <div>Icon: {icon}</div>
        <div>Temp: {temp}</div>
        <div>Humidity: {humidity}</div>
        <div>Today's Low: {temp_min} High:{temp_max}</div>
      </div>
    )
  }

  render() {
    if (this.state === null) {
      console.log("Weather is null", this.state)
      return <div className="error-message">No Data</div>
    } else if (this.state === Error) {
      return <div className="error-message">{this.props.weather.message}</div>
    } else {
      return this.renderSuccess();
    }
  }
}


export default Weather;