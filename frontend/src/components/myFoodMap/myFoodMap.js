import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the default marker icon not displaying correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
    iconSize: [27, 42],
    iconAnchor: [13, 42],
});

function ResetCenterView({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), {
                animate: true
            });
        }
    }, [map, position]);

    return null;
}

export default function MyMap({ locations }) {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position
    const [error, setError] = useState(null);

    const geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
    };

    // Function to update the map center based on a specific location
    const handleLocationClick = (location) => {
        setPosition(location);
    };

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && <ResetCenterView position={position} />}
            {locations.map((location, index) => (
                <Marker
                    key={index}
                    position={location}
                    icon={customMarkerIcon}
                    eventHandlers={{
                        click: () => {
                            handleLocationClick(location);
                        }
                    }}
                >
                    <Popup>
                        Location #{index + 1} <br /> Latitude: {location[0]}, Longitude: {location[1]}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
