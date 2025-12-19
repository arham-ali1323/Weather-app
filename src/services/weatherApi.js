<<<<<<< HEAD
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
=======
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!API_KEY) {
  // Non-fatal: UI will surface a nicer message but this helps in dev tools
  // eslint-disable-next-line no-console
  console.warn('VITE_OPENWEATHER_API_KEY is not set. Weather requests will fail.');
}

const toQuery = (city) => city.trim();

const handleResponse = async (res) => {
  if (!res.ok) {
    const payload = await res.json().catch(() => undefined);
    const message = payload?.message || 'Unable to fetch weather data';
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const fetchCurrentWeather = async (city) => {
  if (!API_KEY) {
    throw new Error('Missing OpenWeather API key. Please configure VITE_OPENWEATHER_API_KEY.');
  }

  const q = toQuery(city);
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(q)}&appid=${API_KEY}&units=metric`;
  const data = await handleResponse(await fetch(url));
  return data;
};

export const fetchForecast = async (city) => {
  if (!API_KEY) {
    throw new Error('Missing OpenWeather API key. Please configure VITE_OPENWEATHER_API_KEY.');
  }

  const q = toQuery(city);
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(q)}&appid=${API_KEY}&units=metric`;
  const data = await handleResponse(await fetch(url));

  const byDate = new Map();

  for (const entry of data.list || []) {
    const dt = new Date(entry.dt * 1000);
    const dateKey = dt.toISOString().slice(0, 10);

    const existing = byDate.get(dateKey);
    if (!existing) {
      byDate.set(dateKey, { ...entry, samples: 1 });
    } else {
      const samples = existing.samples + 1;
      byDate.set(dateKey, {
        ...entry,
        main: {
          ...entry.main,
          temp: (existing.main.temp * existing.samples + entry.main.temp) / samples,
        },
        samples,
      });
    }
  }

  const days = Array.from(byDate.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .slice(0, 5)
    .map(([date, entry]) => ({ ...entry, date }));

  return {
    city: data.city,
    days,
  };
};

export const buildWeatherModel = (current, forecast) => {
  if (!current) return null;

  return {
    location: {
      name: current.name,
      country: current.sys?.country,
    },
    current,
    forecast,
  };
};
>>>>>>> 924d53e04b3b4293443adedaf40983de8bf4ec1b
