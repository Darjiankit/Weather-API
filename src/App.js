import React from "react";
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"


const API_KEY = "52038072e9f2b3066006be83e1d6b57f"
export default class App extends React.Component {

  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: ""
  }
  getweather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values"
      });
    }
  }


  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-6 title">
                <Titles />
              </div>
              <div className="col-6 bg-dark ">
                <Form getweather={this.getweather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}


