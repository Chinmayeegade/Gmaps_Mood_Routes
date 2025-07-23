import { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import TravelModeSelector from './components/TravelModeSelector';
import MapView from './components/MapView';

function App() {
  const [mood, setMood] = useState("Calm");
  const [travelMode, setTravelMode] = useState("WALKING");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4 sm:p-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 drop-shadow-sm tracking-tight">
            Mood Route Navigation
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your mood and travel mode to discover a personalized journey that matches your vibe.
          </p>
        </section>

        {/* Mood + Travel Selectors */}
        <section className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <MoodSelector selectedMood={mood} onMoodChange={setMood} />
            <TravelModeSelector selectedMode={travelMode} onModeChange={setTravelMode} />
          </div>
        </section>

        {/* Map Display */}
        <section className="overflow-hidden border border-gray-300 rounded-3xl shadow-xl bg-white">
          <div className="h-[60vh] sm:h-[75vh]">
            <MapView selectedMood={mood} travelMode={travelMode} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
