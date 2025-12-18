/**** Tailwind CSS configuration for Weather App ****/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-xl': '0 24px 60px rgba(15, 23, 42, 0.6)',
      },
      backgroundImage: {
        'gradient-clear-day': 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 40%, #e0f2fe 100%)',
        'gradient-clear-night': 'radial-gradient(circle at top, #38bdf8 0%, #020617 55%, #020617 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #64748b 0%, #0f172a 60%, #020617 100%)',
        'gradient-rain': 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0369a1 100%)',
        'gradient-storm': 'linear-gradient(135deg, #020617 0%, #1e293b 40%, #334155 100%)',
        'gradient-snow': 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 40%, #0f172a 100%)',
        'gradient-mist': 'linear-gradient(135deg, #cbd5f5 0%, #94a3b8 40%, #020617 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out both',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
