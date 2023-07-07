import React, { useState, useEffect } from "react";

export default function ForecastDay(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });

  useEffect(() => {
    if (props.data) {
      handleResponse(props.data);
    }
  }, [props.data]);

  function handleResponse(data) {
    console.log(data);
    if (data.weather && data.weather.length > 0) {
      setWeatherData({
        ready: true,
        icon: data.weather[0].icon,
      });
    } else {
      setWeatherData({
        ready: false,
        icon: null,
      });
    }
  }

  function maxTemperature() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}°`;
  }

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  return (
    <div>
      <div className="weather-forecast-date">{day()}</div>
      {weatherData.ready && (
        <img
          src={weatherData.icon}
          id="icon"
          alt="Weather Icon"
          width={42}
          style={{ display: "block", margin: "0 auto" }}
        />
      )}
      <div className="weather-forecast-temperatures">
        <span className="weather-forecast-temperature-max">
          {" "}
          {maxTemperature()}{" "}
        </span>
        <span className="weather-forecast-temperature-min">
          {" "}
          {minTemperature()}{" "}
        </span>
      </div>
    </div>
  );
}
