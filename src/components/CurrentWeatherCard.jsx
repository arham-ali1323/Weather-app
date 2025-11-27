import React from 'react';
import WeatherIcon from './WeatherIcon';

const formatTime = (unix, timezoneOffset) => {
  if (!unix) return '--:--';
  const date = new Date((unix + timezoneOffset) * 1000);
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CurrentWeatherCard = ({ weather }) => {
  if (!weather?.current) return null;

  const { current } = weather;
  const condition = current.weather?.[0];

  return (
    <section className="w-full rounded-3xl bg-slate-900/70 shadow-soft-xl ring-1 ring-white/10 px-6 py-5 md:px-8 md:py-6 backdrop-blur-xl animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4 md:gap-6">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {Math.round(current.main?.temp ?? 0)}
              <span className="align-top text-lg md:text-xl text-slate-300 ml-1">°C</span>
            </h1>
            <p className="text-base md:text-lg font-medium text-slate-200">
              {condition?.main || 'Unknown'}
            </p>
            <p className="text-xs md:text-sm text-slate-400">
              Feels like {Math.round(current.main?.feels_like ?? 0)}°C. {condition?.description}
            </p>
          </div>
          <div className="ml-auto md:ml-0 flex flex-col items-center justify-center">
            <WeatherIcon icon={condition?.icon} alt={condition?.description} size={80} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm text-slate-200">
          <div className="space-y-1">
            <p className="text-slate-400">Humidity</p>
            <p className="font-medium">{Math.round(current.main?.humidity ?? 0)}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400">Wind</p>
            <p className="font-medium">{Math.round(current.wind?.speed ?? 0)} km/h</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400">Sunrise</p>
            <p className="font-medium">
              {formatTime(current.sys?.sunrise, current.timezone ?? 0)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400">Sunset</p>
            <p className="font-medium">
              {formatTime(current.sys?.sunset, current.timezone ?? 0)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeatherCard;
