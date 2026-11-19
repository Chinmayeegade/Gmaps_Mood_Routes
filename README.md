# Gmaps Mood Routes: Frontend

The web client for **Gmaps Mood Routes**, an app that suggests routes based on
how you feel, such as calm, scenic, energetic, or quickest. It shows the routes
on an interactive Google Map.

## Features

- Pick a mood and get matching route suggestions (TODO: confirm moods)
- Origin and destination search with Google Places Autocomplete
- Route display on an interactive Google Map
- Responsive layout for desktop and mobile
- Connects to the backend API for mood-based route logic (TODO: confirm)

## Tech Stack

- [Framework: React / Vite / Angular / plain JS (TODO)]
- Google Maps JavaScript API
- Google Places API / Routes API (TODO: confirm)
- [Styling: CSS / Tailwind / Material UI (TODO)]

## Prerequisites

- Node.js 18+ and npm (or yarn)
- A Google Maps Platform API key with these APIs enabled:
  - Maps JavaScript API
  - Places API
  - Directions API or Routes API
- The backend server running locally or deployed (see the repo root)

## Getting Started

1. Clone the repository and go to the frontend folder:

   ```bash
   git clone https://github.com/Chinmayeegade/Gmaps_Mood_Routes.git
   cd Gmaps_Mood_Routes/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in `frontend/`:

   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   VITE_API_BASE_URL=http://localhost:5000
   ```
   (Variable names depend on your build tool: `REACT_APP_` for CRA, `VITE_` for Vite.)

4. Start the dev server:

   ```bash
   npm start
   ```
   Then open http://localhost:3000 (or the port shown in your terminal).

## Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm start`/`dev` | Run the app in development mode    |
| `npm run build`   | Create a production build          |
| `npm test`        | Run tests (if configured)          |

## Project Structure
