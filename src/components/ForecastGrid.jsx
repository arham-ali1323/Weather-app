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
