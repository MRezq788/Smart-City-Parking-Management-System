import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Routing({ start, end }) {
  const map = useMap();

  useEffect(() => {
    if (!start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [start, end, map]);

  return null;
}

function ParkingMap({ parkingLots }) {
  const [selectedLot, setSelectedLot] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const handleLotSelect = (lot) => {
    setSelectedLot(lot);
  };

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div>
      <style>
        {`
          .get-directions-button {
            background-color: #007bff; /* Blue background */
            color: white; /* White text */
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
          }

          .get-directions-button:hover {
            background-color: #0056b3; /* Darker blue on hover */
          }
        `}
      </style>
      <MapContainer
        center={[28, 30]} // Centered on Egypt
        zoom={6} // Adjusted zoom level for better focus on Egypt
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {parkingLots.map((lot) => (
          <Marker
            key={lot.name}
            position={[lot.latitude, lot.longitude]}
            eventHandlers={{
              click: () => handleLotSelect(lot),
            }}
          >
            <Popup>
              <div>
                <h3>{lot.name}</h3>
                <p>Capacity: {lot.capacity}</p>
                <p>Price: ${lot.original_price}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && selectedLot && (
          <Routing start={userLocation} end={{ lat: selectedLot.latitude, lng: selectedLot.longitude }} />
        )}
      </MapContainer>
      {selectedLot && (
        <button className="get-directions-button" onClick={handleGetDirections}>
          Get Directions
        </button>
      )}
    </div>
  );
}

export default ParkingMap;