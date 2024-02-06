const API_KEY = '7452db51723235280be68e86d5df7dcf'; // Replace with your weather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Return weather data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null; // Return null if there's an error
  }
};

export { fetchWeather };
