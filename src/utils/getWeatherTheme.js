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
