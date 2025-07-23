import {
    GoogleMap,
    LoadScript,
    Marker,
    DirectionsRenderer,
  } from '@react-google-maps/api';
  import { useEffect, useRef, useState } from 'react';
  
  const containerStyle = {
    width: '100%',
    height: '400px',
  };
  
  const defaultCenter = { lat: 19.0760, lng: 72.8777 };
  const googleLibraries = ['places'];
  
  const moodPlaces = {
    Calm: ['botanical garden', 'nature trail', 'quiet park', 'lakefront', 'zen garden'],
  Hungry: ['cafe', 'restaurant', 'street food', 'bistro', 'food court'],
  Lively: ['arcade', 'music venue', 'theme park', 'sports', 'exhibition'],
  Romantic: ['scenic overlook', 'sunset', 'cozy cafe', 'lake', 'rose garden'],
  Adventurous: ['hiking trail', 'rock climbing', 'zipline park', 'trekking zone', 'cave tours'],
  Reflective: ['spa', 'library', 'museum', 'art', 'solon'],
  };
  
  const MapView = ({ selectedMood, travelMode }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
    const [userLocation, setUserLocation] = useState(null);
    const [directionsList, setDirectionsList] = useState([]);
    const [placeOptions, setPlaceOptions] = useState([]);
    const [durations, setDurations] = useState([]);
    const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(0);
  
    const mapRef = useRef(null);
    const placesRef = useRef(null);
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setUserLocation(defaultCenter)
      );
    }, []);
  
    useEffect(() => {
      if (!userLocation || !selectedMood || !placesRef.current) return;
  
      const service = new window.google.maps.places.PlacesService(placesRef.current);
      const keywords = moodPlaces[selectedMood];
      const allResults = [];
      let completed = 0;
  
      keywords.forEach((keyword) => {
        service.nearbySearch(
          {
            location: userLocation,
            radius: travelMode === 'WALKING' ? 750 : 6000,
            keyword,
          },
          (results, status) => {
            completed++;
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              allResults.push(...results);
            }
            if (completed === keywords.length) {
              const unique = Array.from(
                new Map(allResults.map((p) => [p.place_id, p])).values()
              );
              setPlaceOptions(unique);
            }
          }
        );
      });
    }, [userLocation, selectedMood, travelMode]);
  
    useEffect(() => {
      if (!userLocation || placeOptions.length === 0) return;
  
      const directionsService = new window.google.maps.DirectionsService();
  
      const fetchRoutes = async () => {
        const promises = placeOptions.map((place) => {
          return new Promise((resolve) => {
            directionsService.route(
              {
                origin: userLocation,
                destination: place.geometry.location,
                travelMode: window.google.maps.TravelMode[travelMode],
                drivingOptions:
                  travelMode === 'DRIVING'
                    ? {
                        departureTime: new Date(),
                        trafficModel: 'bestguess',
                      }
                    : undefined,
              },
              (result, status) => {
                if (status === 'OK') {
                  const duration =
                    result.routes[0]?.legs[0]?.duration_in_traffic?.text ||
                    result.routes[0]?.legs[0]?.duration?.text ||
                    '';
                  resolve({ directions: result, duration });
                } else {
                  resolve({ directions: null, duration: '' });
                }
              }
            );
          });
        });
  
        const results = await Promise.all(promises);
        const validDirections = results.map((res) => res.directions);
        const durationList = results.map((res) => res.duration);
        setDirectionsList(validDirections);
        setDurations(durationList);
      };
  
      fetchRoutes();
    }, [userLocation, placeOptions, travelMode]);
  
    return (
      <LoadScript googleMapsApiKey={apiKey} libraries={googleLibraries}>
        <div ref={placesRef} style={{ display: 'none' }} />
  
        <div className="w-full mb-4">
          {placeOptions.length > 1 && (
            <div className="mb-2">
              <label>Select destination:</label>
              <select
                value={selectedPlaceIndex}
                onChange={(e) => setSelectedPlaceIndex(Number(e.target.value))}
                className="p-2 border rounded"
              >
                {placeOptions.map((place, i) => (
                  <option key={place.place_id} value={i}>
                    {place.name} — {durations[i] || 'Loading...'}
                  </option>
                ))}
              </select>
            </div>
          )}
  
          {durations[selectedPlaceIndex] && (
            <div className="mt-2 flex items-center gap-2 text-md text-green-700 font-semibold">
              ⏱ Estimated Time: <span>{durations[selectedPlaceIndex]}</span>
            </div>
          )}
        </div>
  
        {userLocation && placeOptions[selectedPlaceIndex] && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${placeOptions[selectedPlaceIndex].geometry.location.lat()},${placeOptions[selectedPlaceIndex].geometry.location.lng()}&travelmode=${travelMode.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            📍 Navigate in Google Maps
          </a>
        )}
  
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || defaultCenter}
          zoom={14}
          onLoad={(map) => (mapRef.current = map)}
        >
          {userLocation && <Marker position={userLocation} />}
          {directionsList.map((dir, index) => (
            dir && (
              <DirectionsRenderer
                key={index}
                directions={dir}
                options={{
                  suppressMarkers: index !== selectedPlaceIndex,
                  polylineOptions: {
                    strokeColor:
                      index === selectedPlaceIndex ? '#1e90ff' : '#aaa',
                    strokeOpacity: 0.7,
                    strokeWeight: index === selectedPlaceIndex ? 6 : 3,
                  },
                }}
              />
            )
          ))}
        </GoogleMap>
      </LoadScript>
    );
  };
  
  export default MapView;
  