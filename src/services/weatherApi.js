const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'your-api-key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchWeatherData = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: 'metric',
    lang: 'en',
  });

  const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch weather data');
  }

  return response.json();
};

export const fetchCurrentWeather = async (query) => {
  return fetchWeatherData('weather', {
    q: query,
  });
};

export const fetchForecast = async (query) => {
  return fetchWeatherData('onecall', {
    q: query,
    exclude: 'minutely,alerts',
  });
};

export const buildWeatherModel = (currentData, forecastData) => {
  if (!currentData || !forecastData) return null;

  return {
    current: {
      temp: currentData.main.temp,
      feels_like: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      wind_speed: currentData.wind.speed,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      sunrise: currentData.sys.sunrise,
      sunset: currentData.sys.sunset,
    },
    daily: forecastData.daily.map(day => ({
      dt: day.dt,
      temp: {
        day: day.temp.day,
        min: day.temp.min,
        max: day.temp.max,
      },
      weather: day.weather,
      pop: day.pop, // probability of precipitation
    })),
    hourly: forecastData.hourly.map(hour => ({
      dt: hour.dt,
      temp: hour.temp,
      weather: hour.weather,
      pop: hour.pop,
    })),
  };
};
