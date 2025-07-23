import React from 'react';

const moods = ['Calm','Hungry' ,'Lively', 'Romantic', 'Adventurous', 'Reflective'];

export default function MoodSelector({ onMoodChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 p-4">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onMoodChange(mood)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
