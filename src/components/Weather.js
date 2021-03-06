import React from "react";

const Weather = props => (
  <div className="weather__info">
    {
      props.time && <p className="weather__key">Time:
        <span className="weather__value"> { props.time }</span>
      </p>
    }
    {
      props.temperature && <p className="weather__key">Temperature:
        <span className="weather__value"> { props.temperature }</span>
      </p>
    }
    {
      props.humidity && <p className="weather__key">Humidity:
        <span className="weather__value"> { props.humidity }</span>
      </p>
    }
    {
      props.description && <p className="weather__key">Conditions:
        <span className="weather__value"> { props.description }</span>
        <br/>
      </p>
    }
    {
      props.error && <p className="weather__key">
        <span className="weather__error">{ props.error }</span>
      </p>
    }
  </div>
);

export default Weather;
