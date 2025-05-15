import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
  maxHeight: '600px',
  maxWidth: '100%',
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

// Optional test location (Bangalore)
const testLocation = {
  lat: 12.9352,
  lng: 77.6146,
};

const Maps = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // Step 1: Get user's current location
  useEffect(() => {
    console.log("Attempting to fetch user location...");

    if (!navigator.geolocation) {
      console.log("Geolocation not supported.");
      setError('Geolocation not supported');
      setUserLocation(defaultCenter);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location fetched:", latitude, longitude);
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.log("Error fetching location:", err.message);
        setError('Unable to retrieve your location. Using test location.');
        setUserLocation(testLocation);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  // Step 2: Fetch both hospitals and pharmacies
  useEffect(() => {
    if (!userLocation || !window.google?.maps?.places) return;

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    const fetchPlaces = (type) => {
      return new Promise((resolve) => {
        const request = {
          location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
          radius: 5000,
          type,
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const mappedResults = results.map((place) => ({
              id: place.place_id,
              name: place.name,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              address: place.vicinity || place.formatted_address || 'Address not available',
              specialization: place.types ? place.types.join(', ') : 'Not specified',
              phone: '',
              type, // either 'hospital' or 'pharmacy'
            }));
            resolve(mappedResults);
          } else {
            resolve([]);
          }
        });
      });
    };

    Promise.all([fetchPlaces('hospital'), fetchPlaces('pharmacy')])
      .then(([hospitals, pharmacies]) => {
        setPlaces([...hospitals, ...pharmacies]);
      })
      .catch((err) => {
        console.error('Error fetching places:', err);
        setError('Could not fetch nearby hospitals and pharmacies.');
        setPlaces([]);
      });
  }, [userLocation]);

  // Step 3: Get place details
  const fetchPlaceDetails = (placeId, callback) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
      {
        placeId,
        fields: ['name', 'formatted_phone_number', 'formatted_address', 'types', 'opening_hours', 'website'],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          callback(place);
        } else {
          callback(null);
        }
      }
    );
  };

  const handleMarkerClick = (place) => {
    fetchPlaceDetails(place.id, (details) => {
      const detailedPlace = {
        ...place,
        phone: details?.formatted_phone_number || '',
        address: details?.formatted_address || place.address,
        website: details?.website || '',
      };
      setSelectedPlace(detailedPlace);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center text-indigo-700">Nearby Hospitals & Pharmacies</h1>
      {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
      <div className="w-full shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || defaultCenter}
            zoom={14}
            onLoad={(map) => {
              mapRef.current = map;
              console.log("Map loaded at:", userLocation || defaultCenter);
            }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {/* User Location Marker */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                title="Your Location"
              />
            )}

            {/* Hospital & Pharmacy Markers */}
            {places.map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.latitude, lng: place.longitude }}
                onClick={() => handleMarkerClick(place)}
                title={place.name}
                icon={{
                  url:
                    place.type === 'hospital'
                      ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                      : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            {/* InfoWindow */}
            {selectedPlace && (
              <InfoWindow
                position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div className="max-w-xs text-sm">
                  <h2 className="text-lg font-bold text-indigo-800">{selectedPlace.name}</h2>
                  <p><strong>Type:</strong> {selectedPlace.type.charAt(0).toUpperCase() + selectedPlace.type.slice(1)}</p>
                  <p><strong>Specialization:</strong> {selectedPlace.specialization}</p>
                  <p><strong>Address:</strong> {selectedPlace.address}</p>
                  {selectedPlace.phone && <p><strong>Phone:</strong> {selectedPlace.phone}</p>}
                  {selectedPlace.website && (
                    <p><strong>Website:</strong> <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{selectedPlace.website}</a></p>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <p className="mt-4 text-l text-gray-500 text-center">
        Note: Red markers indicate hospitals, green markers indicate pharmacies.
      </p>
    </div>
  );
};

export default Maps;