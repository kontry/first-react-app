import React, {Component} from "react";

import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import Cities from "./components/Cities"

const API_KEY = "106845c153dc17d19bec87962cbd6641"
const TIME_API_KEY = "4ORD4ZLPREA8"

/* I think it is better that exporting default directly because someone easy to understand 
  It's exported as soon as reading head of code.
*/
export default class extends Component {
  initialState = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    longitute: undefined,
    latitude: undefined,
    error: undefined,
    time: undefined, // missing
  }

  state = {...this.initialState} // shallow copy

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    /* You may know, using axios is more simple way
      const {data} = await axios.get(URL)
    */
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`);
    const data = await api_call.json();

    // return early to shallow nested code for more readable
    if (!city || !country) {
      this.setState({
        ...this.initialState,
        error: "Please enter values above"
      });
      return
    }

    // set state at once
    const time = await this.setTime(data.coord)

    /* FIND_BETTER_WAY: it little bit complex(hard to understand). Making wrapper function and
      composing these states in that wrapper, for example. */
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      longitute: data.coord.lon,
      latitude: data.coord.lat,
      error: "",
      time, // you can omitted assigned variable if it same name as property name.
    });
  }

  setTime = async ({lon, lat}) => { // you shouldn't define unused variables https://eslint.org/docs/rules/no-unused-vars
    /* another way
      const {data: timeData} = await axios.get(URL)
    */
    const timeApiCall = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_API_KEY}&format=json&by=position&lng=${lon}&lat=${lat}`);
    const {formatted} = await timeApiCall.json(); // camel case is standard of JS
    return formatted
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
                  {/* https://amido.com/blog/using-es6-destructuring-in-your-react-components/ */}
                  <Weather {...this.state} />
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
