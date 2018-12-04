import React from "react";

import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import Cities from "./components/Cities"

const API_KEY = "106845c153dc17d19bec87962cbd6641"
const TIME_API_KEY = "4ORD4ZLPREA8"

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    longitute: undefined,
    latitude: undefined,
    error: undefined
  };
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`);
    const data = await api_call.json();

    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        longitute: data.coord.lon,
        latitude: data.coord.lat,
        error: ""
      });
      this.getTime();
    } else {
        this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        longitute: undefined,
        latitude: undefined,
        error: "Please enter values above"
      });
    }
  }

  getTime = async (e) => {
    const time_api_call = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_API_KEY}&format=json&by=position&lng=${this.state.longitute}&lat=${this.state.latitude}`);
    const time_data = await time_api_call.json();
    this.setState({
      time: time_data.formatted
    });
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container" id="bootstrap-override">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    time={this.state.time}
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    longitute={this.state.longitute}
                    latitude={this.state.latitude}
                    error={this.state.error}
                  />
                  <Cities className="form-container"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
