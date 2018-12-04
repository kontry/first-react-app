import React from "react";

const API_KEY = "106845c153dc17d19bec87962cbd6641"

class Cities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: undefined,
    };
  }

  componentDidMount() {
    console.log('test')
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Shenzhen,CN&APPID=${API_KEY}&units=imperial`)
      .then(response => response.json())
      .then((data) => {this.setState({
        temperature: data.main.temp
      });
    });
  }
  render() {
    return (
      <div className="weather__info">
        <p className="weather__key">Shenzhen Weather:
          <span className="weather__value"> {this.state.temperature} </span>
        </p>

      </div>
    );
  }
};

export default Cities;
