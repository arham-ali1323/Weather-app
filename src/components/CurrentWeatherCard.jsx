import React from 'react';
import PropTypes from 'prop-types';

const CurrentWeatherCard = ({ weather, city }) => {
  if (!weather) return null;

  const { temp, description, icon, feels_like, humidity, wind_speed, pressure } = weather.current;
  const { daily } = weather;

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{city}</h1>
        <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="text-6xl font-bold text-gray-800">{Math.round(temp)}°C</div>
          <div className="ml-4">
            <div className="text-xl font-semibold text-gray-800 capitalize">{description}</div>
            <div className="text-gray-600">Feels like: {Math.round(feels_like)}°C</div>
          </div>
        </div>
        
        <div className="flex items-center">
          {icon && (
            <img 
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
              alt={description} 
              className="w-24 h-24"
            />
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-gray-600">Humidity</div>
          <div className="text-xl font-semibold">{humidity}%</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600">Wind</div>
          <div className="text-xl font-semibold">{wind_speed} m/s</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600">Pressure</div>
          <div className="text-xl font-semibold">{pressure} hPa</div>
        </div>
      </div>
      
      {daily && daily.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Daily Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {daily.slice(0, 4).map((day, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="font-medium">
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="my-2">
                  <img 
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                    alt={day.weather[0].description}
                    className="mx-auto w-12 h-12"
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  <span className="font-semibold">{Math.round(day.temp.max)}°</span>
                  <span className="text-gray-500">{Math.round(day.temp.min)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

CurrentWeatherCard.propTypes = {
  weather: PropTypes.shape({
    current: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      wind_speed: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }),
    daily: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        temp: PropTypes.shape({
          max: PropTypes.number.isRequired,
          min: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ),
  }),
  city: PropTypes.string.isRequired,
};

export default CurrentWeatherCard;
