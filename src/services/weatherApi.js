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
