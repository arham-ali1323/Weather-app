import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LayoutShell from './components/LayoutShell';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastGrid from './components/ForecastGrid';
import StateMessage from './components/StateMessage';
import { fetchCurrentWeather, fetchForecast, buildWeatherModel } from './services/weatherApi';
import { getWeatherTheme } from './utils/getWeatherTheme';

const DEFAULT_CITY = 'Karachi';

const App = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (targetCity) => {
    const query = targetCity.trim();
    if (!query) return;

    setIsLoading(true);
    setError(null);

    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(query),
        fetchForecast(query),
      ]);

      setCity(query);
      setWeather(buildWeatherModel(current, forecast));
    } catch (err) {
      const message = err?.message || 'Failed to fetch weather data. Please try again.';
      setError(message);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const theme = useMemo(() => getWeatherTheme(weather), [weather]);

  const footerContent = (
    <>
      <p>
        Data by{' '}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 text-sky-300 hover:text-sky-200"
        >
          OpenWeather
        </a>
      </p>
      <p className="text-slate-500">
        Built with React + Tailwind CSS. Units in °C and km/h.
      </p>
    </>
  );

  return (
    <LayoutShell theme={theme} footer={footerContent}>
      <header className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
              Weather Overview
              <span className="inline-flex h-6 px-2 items-center rounded-full bg-sky-500/20 text-[11px] text-sky-100 ring-1 ring-sky-400/40 animate-pulse-soft">
                Live
              </span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300">
              Search any city worldwide and see real-time conditions with a 5-day forecast.
            </p>
          </div>
          {weather?.location && (
            <div className="text-right text-xs md:text-sm text-slate-200">
              <p className="font-medium">
                {weather.location.name}
                {weather.location.country ? `, ${weather.location.country}` : ''}
              </p>
              <p className="text-slate-400">Local time auto-adjusted</p>
            </div>
          )}
        </div>
        <SearchBar onSearch={loadWeather} isLoading={isLoading} />
      </header>

      {error && (
        <StateMessage
          tone="error"
          title="Unable to load weather data"
          description={error}
        />
      )}

      {!error && !weather && !isLoading && (
        <StateMessage
          title="Search for a city to get started"
          description="Try typing the name of any city in the search box above."
        />
      )}

      {isLoading && (
        <div className="w-full flex flex-col gap-3">
          <div className="w-full h-32 rounded-3xl bg-slate-900/60 animate-pulse" />
          <div className="w-full h-32 rounded-3xl bg-slate-900/40 animate-pulse" />
        </div>
      )}

      {!isLoading && weather && (
        <>
          <CurrentWeatherCard weather={weather} />
          <ForecastGrid forecast={weather.forecast} />
        </>
      )}
    </LayoutShell>
  );
};

export default App;
