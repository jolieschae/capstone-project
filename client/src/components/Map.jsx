import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { MyContext } from './MyProvider';

function Map() {
  const { eventsData } = useContext(MyContext);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const markerPromises = eventsData.map(async (event) => {
        const { address } = event;

        if (address && address.street && address.city) {
          const { street, city, state, zip } = address;
          const fullAddress = `${street}, ${city}, ${state}, ${zip}`;
          const coordinates = await geocodeAddress(fullAddress);

          if (coordinates) {
            return {
              id: event.id,
              position: [coordinates.latitude, coordinates.longitude],
              title: event.title,
              description: event.description,
            };
          }
        }

        return null;
      });

      const resolvedMarkers = await Promise.all(markerPromises);
      setMarkers(resolvedMarkers.filter((marker) => marker !== null));
    };

    fetchMarkers();
  }, [eventsData]);

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      console.log('Response:', response.data);
      const { lat, lon } = response.data[0];
      console.log('Latitude:', lat); 
      console.log('Longitude:', lon); 
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
  };

  const customMarkerIcon = L.icon({
    iconUrl: 'https://i.imgur.com/c5Zg2wh.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    tooltipAnchor: [15, -15],
    shadowSize: [41, 41],
  });

  return (
    <div className="mapContainer">
      <div className="leaflet-container">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={12}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position} icon={customMarkerIcon}>
              <Popup>
                <div>
                  <h3>{marker.title}</h3>
                  <p>{marker.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
