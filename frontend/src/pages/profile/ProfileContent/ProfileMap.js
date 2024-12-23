import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';

// Fix for the default marker icon not displaying correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarkerIcon = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/marker/location.png`,
    iconSize: [32, 42],
    iconAnchor: [13, 42],
});

function ResetCenterView({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), { animate: true });
        }
    }, [map, position]);

    return null;
}

export default function ProfileMap({ foodVenues = [] }) {
    const johorBahruCoordinates = [1.4927, 103.7414]; // Default to Johor Bahru
    const [position, setPosition] = useState(johorBahruCoordinates); // Default to Johor Bahru

    useEffect(() => {
        if (foodVenues && foodVenues.length > 0) {
            const firstValidVenue = foodVenues.find(venue => venue.latitude && venue.longitude);
            if (firstValidVenue) {
                setPosition([firstValidVenue.latitude, firstValidVenue.longitude]);
            }
        } else {
            // If no food venues, show the default location
            setPosition(johorBahruCoordinates);
        }
    }, [foodVenues]);

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && <ResetCenterView position={position} />}
            
            {/* Only render markers if foodVenues has valid latitude and longitude */}
            {foodVenues.length > 0 && foodVenues.map((location, index) => (
                location.latitude && location.longitude ? (
                    <Marker key={index} position={[location.latitude, location.longitude]} icon={customMarkerIcon}>
                        <Popup>
                            <h6>{location?.name}</h6>
                            <p>{location?.address || 'No description available.'}</p>
                        </Popup>
                    </Marker>
                ) : null
            ))}
        </MapContainer>
    );
}
