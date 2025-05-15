import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh', // 80% of viewport height
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // New York City fallback
const testLocation = { lat: 40.7128, lng: -74.0060 };

const Maps = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // Get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setUserLocation(defaultCenter);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to retrieve your location. Using default location.');
        setUserLocation(testLocation);
      }
    );
  }, []);

  // Fetch nearby hospitals and pharmacies when userLocation and map are ready
  useEffect(() => {
    if (!userLocation || !isMapLoaded || !window.google?.maps?.places) return;

    const fetchPlaces = (type) => {
      return new Promise((resolve, reject) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch(
          {
            location: userLocation,
            radius: 5000,
            type: type,
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              const formattedResults = results.map(place => ({
                id: place.place_id,
                name: place.name,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
                address: place.vicinity,
                type: type,
                specialization: place.types.join(', '),
              }));
              resolve(formattedResults);
            } else {
              reject(new Error(`Failed to fetch ${type}s: ${status}`));
            }
          }
        );
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
  }, [userLocation, isMapLoaded]);

  // Fetch detailed info of place and calculate directions
  const fetchPlaceDetails = (placeId, callback) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
      {
        placeId,
        fields: [
          'name',
          'formatted_phone_number',
          'formatted_address',
          'types',
          'opening_hours',
          'website',
        ],
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

      if (userLocation && isMapLoaded) {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: userLocation,
            destination: { lat: detailedPlace.latitude, lng: detailedPlace.longitude },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK') {
              setDirections(result);
            } else {
              console.error('Directions request failed due to ' + status);
              setDirections(null);
            }
          }
        );
      }
    });
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setIsMapLoaded(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-semibold p-4 text-center text-indigo-700">
        Nearby Hospitals & Pharmacies
      </h1>

      {error && <p className="text-red-600 px-4 text-center">{error}</p>}

      <div className="flex-grow w-full shadow-lg overflow-hidden border border-gray-300">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || defaultCenter}
            zoom={14}
            onLoad={handleMapLoad}
            options={{
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
            }}
          >
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

            {places.map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.latitude, lng: place.longitude }}
                onClick={() => handleMarkerClick(place)}
                icon={{
                  url:
                    place.type === 'hospital'
                      ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                      : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                title={place.name}
              />
            ))}

            {selectedPlace && (
              <InfoWindow
                position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                onCloseClick={() => {
                  setSelectedPlace(null);
                  setDirections(null);
                }}
              >
                <div className="max-w-xs text-sm">
                  <h2 className="text-lg font-bold text-indigo-800">{selectedPlace.name}</h2>
                  <p>
                    <strong>Type:</strong>{' '}
                    {selectedPlace.type.charAt(0).toUpperCase() + selectedPlace.type.slice(1)}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {selectedPlace.specialization}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedPlace.address}
                  </p>
                  {selectedPlace.phone && (
                    <p>
                      <strong>Phone:</strong> {selectedPlace.phone}
                    </p>
                  )}
                  {selectedPlace.website && (
                    <p>
                      <strong>Website:</strong>{' '}
                      <a
                        href={selectedPlace.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {selectedPlace.website}
                      </a>
                    </p>
                  )}

                  {userLocation && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedPlace.latitude},${selectedPlace.longitude}&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block w-full bg-indigo-600 text-white py-3 px-4 rounded text-center hover:bg-indigo-700 transition-colors font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Opening directions in Google Maps');
                      }}
                    >
                      📍 Get Directions in Google Maps
                    </a>
                  )}
                </div>
              </InfoWindow>
            )}

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: '#4F46E5',
                    strokeWeight: 5,
                  },
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="p-2 text-center text-sm text-gray-600 bg-gray-100">
        <p>🔴 Hospital | 🟢 Pharmacy | 🔵 Your Location</p>
      </div>
    </div>
  );
};

export default Maps;
