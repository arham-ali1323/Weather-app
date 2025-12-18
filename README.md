# Weather App (React + Tailwind CSS)

A modern, fully responsive weather dashboard built with **React**, **Vite**, and **Tailwind CSS**, powered by the **OpenWeather API**.

Features:

- **City search** with instant loading state
- **Current conditions**: temperature, feels-like, humidity, wind speed, conditions, sunrise & sunset
- **5-day forecast** using OpenWeather 3-hour interval data
- **Dynamic backgrounds** for clear, cloudy, rainy, stormy, snowy, misty, and night modes
- **Weather icons** (OpenWeather icon set)
- **Loading skeletons** and friendly **error handling**
- Smooth **animations** and a clean, mobile-first layout

---

## 1. Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- An **OpenWeather API key** (free tier is enough):
  - Sign up at https://home.openweathermap.org/users/sign_up
  - Create an API key and note it down

### Install dependencies

```bash
cd React_Projects/weather-app
npm install
```

This will install React, Vite, Tailwind CSS, and related tooling.

---

## 2. Configure Environment Variables

1. In the project root, copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and set your key:

   ```bash
   VITE_OPENWEATHER_API_KEY=your_real_key_here
   ```

The app reads this with `import.meta.env.VITE_OPENWEATHER_API_KEY`.

> **Important:** Do not commit `.env` to version control.

---

## 3. Run the App Locally

Start the Vite dev server:

```bash
npm run dev
```

Then open the printed URL (typically `http://localhost:5173/`).

On first load, the app shows weather for **Karachi**. Use the search bar to look up any other city.

---

## 4. Project Structure

```text
weather-app/
  index.html
  package.json
  postcss.config.cjs
  tailwind.config.cjs
  vite.config.mts
  .env.example
  src/
    main.jsx
    index.css
    App.jsx
    components/
      LayoutShell.jsx
      SearchBar.jsx
      CurrentWeatherCard.jsx
      ForecastCard.jsx
      ForecastGrid.jsx
      WeatherIcon.jsx
      StateMessage.jsx
    services/
      weatherApi.js
    utils/
      getWeatherTheme.js
```

- **`components/`**: Reusable UI blocks (search, cards, layout, messages)
- **`services/weatherApi.js`**: All OpenWeather HTTP calls + basic data shaping
- **`utils/getWeatherTheme.js`**: Maps weather conditions to background/visual theme

---

## 5. Implementation Notes

- **OpenWeather endpoints**:
  - Current weather: `https://api.openweathermap.org/data/2.5/weather`
  - 5-day forecast: `https://api.openweathermap.org/data/2.5/forecast`
- Units are **metric** (°C, km/h).
- Forecast data is aggregated by date to produce one card per day.
- Backgrounds use Tailwind custom gradients defined in `tailwind.config.cjs`.

---

## 6. Production Build

To create an optimized production build:

```bash
npm run build
npm run preview
```

`npm run preview` serves the built app locally so you can verify it before deploying.

You can deploy the `dist/` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

---

## 7. Troubleshooting

- **Blank data / API errors**:
  - Check that `.env` exists and `VITE_OPENWEATHER_API_KEY` is correct.
  - Restart the dev server after changing environment variables.
- **Editor shows `Unknown at rule @tailwind` or `@apply` warnings**:
  - These come from generic CSS linters that are not Tailwind-aware.
  - They do **not** affect the running app.
- **Type errors for `vite` or `@vitejs/plugin-react`**:
  - Ensure `npm install` completed successfully. The packages are listed in `devDependencies`.

This project is ready to be extended with routing, theming controls, or additional weather details if you need them.
