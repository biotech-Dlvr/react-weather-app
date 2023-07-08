import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import Forecast from "./Forecast";
import axios from "axios";
import Temperature from "./Temperature";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.city);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }
  function search() {
    let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="app-container">
        <div className="card" style={{ width: 650, height: 480 }}>
          <div className="card-body">
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter city here"
                id="city-input"
                onChange={handleCityChange}
              />
              <input className="btn" type="submit" defaultValue="Search" />
              <button id="currentLocation">Current</button>
            </form>
            <h1 className="city"> {weatherData.city} </h1>
            <h2 className="currentTime">
              Last updated {""}
              <FormattedDate date={weatherData.date} />
            </h2>
            <div className="containerdetails">
              <div className="row units">
                <div className="col details">
                  <img src={weatherData.iconUrl} id="icon" alt="Weather Icon" />
                  <Temperature celsius={Math.round(weatherData.temperature)} />
                </div>
                <div className="col details">
                  <ul>
                    <li className="text-capitalize">
                      {weatherData.description}
                    </li>
                    <li className="humidity">
                      Humidity: {weatherData.humidity}%
                    </li>
                    <li className="wind"> Wind: {weatherData.wind} km/h </li>
                  </ul>
                </div>
              </div>
              <Forecast coordinates={weatherData.coordinates} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
