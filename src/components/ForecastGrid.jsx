<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';

const ForecastGrid = ({ forecast }) => {
  if (!forecast || !forecast.hourly || forecast.hourly.length === 0) return null;

  // Get the next 12 hours of forecast
  const next12Hours = forecast.hourly.slice(0, 12);

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {next12Hours.map((hour, index) => {
            const time = new Date(hour.dt * 1000);
            const hourString = time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            
            return (
              <div key={index} className="flex flex-col items-center min-w-[70px] py-2">
                <div className="text-sm text-gray-600">
                  {index === 0 ? 'Now' : hourString}
                </div>
                <div className="my-2">
                  <img 
                    src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                    alt={hour.weather[0].description}
                    className="w-10 h-10"
                  />
                </div>
                <div className="font-medium">
                  {Math.round(hour.temp)}°
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(hour.pop * 100)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ForecastGrid.propTypes = {
  forecast: PropTypes.shape({
    hourly: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        temp: PropTypes.number.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          })
        ).isRequired,
        pop: PropTypes.number, // probability of precipitation
      })
    ),
  }),
};

export default ForecastGrid;
=======
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
>>>>>>> 924d53e04b3b4293443adedaf40983de8bf4ec1b
