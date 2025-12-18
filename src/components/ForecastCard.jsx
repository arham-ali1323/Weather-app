import React from 'react';
import WeatherIcon from './WeatherIcon';

const formatDate = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const ForecastCard = ({ day }) => {
  const condition = day.weather?.[0];

  return (
    <article className="flex flex-col items-center justify-between rounded-2xl bg-slate-900/60 px-4 py-4 ring-1 ring-white/5 shadow-soft-xl backdrop-blur-md animate-fade-in">
      <p className="text-xs text-slate-300 mb-1">{formatDate(day.date)}</p>
      <WeatherIcon icon={condition?.icon} alt={condition?.description} size={48} />
      <p className="mt-2 text-sm font-semibold">
        {Math.round(day.main?.temp ?? 0)}°C
      </p>
      <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">
        {condition?.main}
      </p>
    </article>
  );
};

export default ForecastCard;
