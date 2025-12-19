<<<<<<< HEAD
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
=======
const getIsNight = (weather) => {
  if (!weather) return false;
  const { current } = weather;
  if (!current?.sys?.sunrise || !current?.sys?.sunset || !current?.dt) return false;

  const { sunrise, sunset } = current.sys;
  const now = current.dt;
  return now < sunrise || now > sunset;
};

const getMainCondition = (weather) => {
  const condition = weather?.current?.weather?.[0]?.main || '';
  return condition.toLowerCase();
};

export const getWeatherTheme = (weather) => {
  const isNight = getIsNight(weather);
  const main = getMainCondition(weather);

  if (isNight) {
    return {
      id: 'night',
      bgClass: 'bg-gradient-clear-night',
      accentRing: 'ring-sky-400/40',
      cardBg: 'bg-slate-900/70',
      textSoft: 'text-slate-300',
    };
  }

  if (main.includes('thunderstorm')) {
    return {
      id: 'storm',
      bgClass: 'bg-gradient-storm',
      accentRing: 'ring-indigo-400/40',
      cardBg: 'bg-slate-900/70',
      textSoft: 'text-slate-200',
    };
  }

  if (main.includes('drizzle') || main.includes('rain')) {
    return {
      id: 'rain',
      bgClass: 'bg-gradient-rain',
      accentRing: 'ring-sky-400/50',
      cardBg: 'bg-slate-900/70',
      textSoft: 'text-slate-200',
    };
  }

  if (main.includes('snow')) {
    return {
      id: 'snow',
      bgClass: 'bg-gradient-snow',
      accentRing: 'ring-sky-300/60',
      cardBg: 'bg-slate-900/60',
      textSoft: 'text-slate-900',
    };
  }

  if (main.includes('cloud')) {
    return {
      id: 'cloudy',
      bgClass: 'bg-gradient-cloudy',
      accentRing: 'ring-slate-400/50',
      cardBg: 'bg-slate-900/70',
      textSoft: 'text-slate-200',
    };
  }

  if (main.includes('mist') || main.includes('fog') || main.includes('haze')) {
    return {
      id: 'mist',
      bgClass: 'bg-gradient-mist',
      accentRing: 'ring-slate-300/60',
      cardBg: 'bg-slate-900/70',
      textSoft: 'text-slate-200',
    };
  }

  return {
    id: 'clear',
    bgClass: 'bg-gradient-clear-day',
    accentRing: 'ring-sky-400/50',
    cardBg: 'bg-sky-900/40',
    textSoft: 'text-sky-50',
  };
};
>>>>>>> 924d53e04b3b4293443adedaf40983de8bf4ec1b
