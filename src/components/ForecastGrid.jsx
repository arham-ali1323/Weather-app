import React from 'react';
import ForecastCard from './ForecastCard';

const ForecastGrid = ({ forecast }) => {
  const days = forecast?.days || [];
  if (!days.length) return null;

  return (
    <section className="w-full rounded-3xl bg-slate-900/60 shadow-soft-xl ring-1 ring-white/10 px-5 py-5 md:px-6 md:py-6 backdrop-blur-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm md:text-base font-semibold text-slate-100">
          5-Day Forecast
        </h2>
        <p className="text-[11px] md:text-xs text-slate-400">
          Daily highlights based on OpenWeather 3-hour intervals
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {days.map((day) => (
          <ForecastCard key={day.date} day={day} />
        ))}
      </div>
    </section>
  );
};

export default ForecastGrid;
