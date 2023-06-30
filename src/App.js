import React from "react";
import Weather from "./Weather";
import "./App.css";
import "./Weather.css";

export default function App() {
  const city = "Tehran";
  return (
    <div className="App">
      <div className="container">
        <Weather city={city} />
        <p className="footer">
          <a
            href="https://github.com/biotech-Dlvr/PulusProject-Weatherapp"
            target="_blank"
          >
            GitHub repository
          </a>
          {""} by Azar Delavari
        </p>
      </div>
    </div>
  );
}
