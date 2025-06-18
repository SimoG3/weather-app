import React, { useState } from "react";
import './app.css';

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  async function getWeather(query) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?key=2PAFL2H3LXD8B4X42HJEXYLYV`,
        { mode: 'cors' }
      );
      const data = await response.json();
      const tempC = ((data.days[0].temp - 32) * 5 / 9).toFixed(2);

      setWeather({
        address: data.address,
        condition: data.days[0].conditions,
        description: data.description,
        temp: tempC,
      });
    } catch (error) {
      console.error(error);
      setWeather({ error: "Could not retrieve weather data." });
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeather(location.trim());
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Weather App</h1>
        <input
          className="input"
          type="text"
          value={location}
          placeholder="Enter a location"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {weather && (
          <div className="weather">
            {weather.error ? (
              <p>{weather.error}</p>
            ) : (
              <>
                <h2>Weather in {weather.address}</h2>
                <h2>Condition: {weather.condition}</h2>
                <h2>Description: {weather.description}</h2>
                <h2>Temperature: {weather.temp}°C</h2>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
