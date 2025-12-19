const weatherThemes = {
  clear: {
    bgPrimary: '#FFD700', // Gold
    textPrimary: '#1a202c',
  },
  clouds: {
    bgPrimary: '#E2E8F0', // Light gray
    textPrimary: '#2D3748',
  },
  rain: {
    bgPrimary: '#3182CE', // Blue
    textPrimary: '#ffffff',
  },
  snow: {
    bgPrimary: '#EBF8FF', // Light blue
    textPrimary: '#2C5282',
  },
  thunderstorm: {
    bgPrimary: '#4A5568', // Dark gray
    textPrimary: '#E2E8F0',
  },
  drizzle: {
    bgPrimary: '#90CDF4', // Light blue
    textPrimary: '#2C5282',
  },
  mist: {
    bgPrimary: '#CBD5E0', // Gray
    textPrimary: '#2D3748',
  },
  default: {
    bgPrimary: '#f3f4f6', // Default light gray
    textPrimary: '#1f2937',
  },
};

export const getWeatherTheme = (weatherData) => {
  if (!weatherData || !weatherData.current) {
    return weatherThemes.default;
  }

  const condition = weatherData.current.weather[0].main.toLowerCase();
  
  // Check if the condition exists in our themes, otherwise use default
  return weatherThemes[condition] || weatherThemes.default;
};

export default getWeatherTheme;
