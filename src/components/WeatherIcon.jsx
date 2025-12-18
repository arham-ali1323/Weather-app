import React from 'react';

const mapIcon = (code) => {
  if (!code) return '01d';
  return code;
};

const WeatherIcon = ({ icon, alt, size = 56 }) => {
  const iconCode = mapIcon(icon);
  const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <img
      src={url}
      alt={alt || 'Weather icon'}
      width={size}
      height={size}
      className="drop-shadow-md"
      loading="lazy"
    />
  );
};

export default WeatherIcon;
