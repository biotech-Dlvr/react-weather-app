import React, { useState } from "react";
import "./Weather.css";

export default function Temperature(props) {
  const [unit, setUnit] = useState("celsius");
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }
  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }
  function fahrenheit() {
    return (props.celsius * 9) / 5 + 32;
  }
  if (unit === "celsius") {
    return (
      <div className="details">
        <span className="temperature">{Math.round(props.celsius)} </span>
        <span className="celsiusUnits">°C</span>
        <span className="line">|</span>
        <span className="fahrenheitUnits" onClick={showFahrenheit}>
          <a href="/"> °F </a>
        </span>
      </div>
    );
  } else {
    return (
      <span>
        <span className="temperature">{Math.round(fahrenheit())}</span>
        <span className="celsiusUnits" onClick={showCelsius}>
          <a href="/">°C </a>
        </span>
        <span className="line">|</span>
        <span className="fahrenheitUnits">°F</span>
      </span>
    );
  }
}
