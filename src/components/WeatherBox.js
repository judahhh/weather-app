import React from "react";

const WeatherBox = ({ weather }) => {
  console.log(weather);
  return (
    <div className="weather-box">
      <div>{weather && weather.name}</div>
      <h2>{weather && weather.main.temp} 도씨</h2>
      <h3>{weather && weather.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
