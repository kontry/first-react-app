import React, {Component} from "react";

const API_KEY = "106845c153dc17d19bec87962cbd6641"

/* Child component should avoid having own state.
 Root component should behave a state machine. */
export default class extends Component { // exporting directory is more simple. But it just my opinion.
  // Keep consistence with App.js. And you don't need constructor in new ES syntax.
  state = {
    temperature: undefined,
    description: undefined, // missing
  }

  async componentDidMount () {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Shenzhen,CN&APPID=${API_KEY}&units=imperial`)

    // This is not good code because hard to understand but I want to demonstrate for deconstructure.
    const {main: {temp: temperature}, weather: [{description}, ..._omit]} = await response.json()
    this.setState({
      temperature,
      description, // omit same property name as variables
    });
  }

  render() { // keep space between each methods for more readable. Write down code like a novel.
    const {temperature, description} = this.state

    return (
      <div className="weather__info">
        <p className="weather__key" id="city-display">Shenzhen Weather:
          <span className="weather__value"> {temperature}, {description}</span>
        </p>
      </div>
    );
  }
};
