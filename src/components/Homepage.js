// Homepage.js

import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherAPI'; // Import the fetchWeather function
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../styles/HomePage.css'; // Import CSS file for styling

function Homepage() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Delhi'); // Default city
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch weather data from a weather API
    const fetchWeatherData = async () => {
      try {
        const data = await fetchWeather(city); // Call fetchWeather with the current city
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city]); // Fetch weather data whenever the city changes

  const handleSearch = async () => {
    // Call fetchWeather with the updated city when the search button is clicked
    await fetchWeather(city);
  };

  const handleNext = () => {
    // Navigate to the UserTable page when the Next button is clicked
    navigate('/users');
  };

  return (
    <div className="container">
      <div className="input-container">
        <input 
          className="input-field" 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
          style={{ color: 'white', '::placeholder': { color: 'white' } }}
        />
      </div>
      {weather && (
        <div className="weather-container">
          <div className="temperature">
            <h1>{weather.main.temp} <sup className="small">°C</sup></h1>
            <p className="city">{weather.name}</p>
          </div>
          <div className="details">
            <div className="detail">
              <p className="value">{weather.main.feels_like} <sup className="small">°F</sup></p>
              <p className="label">Feels Like</p>
            </div>
            <div className="detail">
              <p className="value">{weather.main.humidity}%</p>
              <p className="label">Humidity</p>
            </div>
            <div className="detail">
              <p className="value">{weather.wind.speed} m/s</p>
              <p className="label">Wind Speed</p>
            </div>
          </div>
          {/* Transparent button for navigation */}
          <button className="transparent-button" onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Homepage;
