const TravelModeSelector = ({ selectedMode, onModeChange }) => {
    return (
      <div className="flex items-center gap-4">
        <label className="text-gray-700 font-medium">Travel Mode:</label>
        <select
          value={selectedMode}
          onChange={(e) => onModeChange(e.target.value)}
          className="p-2 rounded border border-gray-300"
        >
          <option value="WALKING">Walking</option>
          <option value="DRIVING">Driving</option>
        </select>
      </div>
    );
  };
  
  export default TravelModeSelector;
  