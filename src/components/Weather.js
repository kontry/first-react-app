import React from "react";
import {string as propString, number as propNumber} from 'prop-types' // you can define libs as different name

const Weather = ({time, temperature, humidity, description, error}) => (
  <div className="weather__info">
    <p className="weather__key">Time:
      <span className="weather__value"> { time }</span>
    </p>
    <p className="weather__key">Temperature:
      <span className="weather__value"> { temperature }</span>
    </p>
    <p className="weather__key">Humidity:
      <span className="weather__value"> { humidity }</span>
    </p>
    <p className="weather__key">Conditions:
      <span className="weather__value"> { description }</span>
      <br/>
    </p>
    <p className="weather__key">
      <span className="weather__error">{ error }</span>
    </p>
  </div>
)

// add prop types
Weather.propTypes = {
  time: propString,
  temperature: propNumber,
  humidity: propNumber,
  description: propString,
  error: propString,
}

export default Weather
