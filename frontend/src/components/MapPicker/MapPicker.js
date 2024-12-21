import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationPicker({ onLocationSelect, position }) {
    const [markerPosition, setMarkerPosition] = useState(position);

    useMapEvents({
        click(e) {
            const latlng = {
                lat: parseFloat(e.latlng.lat.toFixed(7)),
                lng: parseFloat(e.latlng.lng.toFixed(7)),
            };
            setMarkerPosition(latlng);
            onLocationSelect(latlng); // Pass the formatted position to the parent
        },
    });

    // Update marker position when position prop changes
    useEffect(() => {
        setMarkerPosition(position);
    }, [position]);

    return markerPosition ? <Marker position={markerPosition} /> : null;
}

function SetViewOnCenter({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

export default function MapPicker({
    center = [1.4927, 103.7414], // Johor Bahru coordinates
    zoom = 13,
    onLocationSelect,
}) {
    return (
        <div style={{ height: '100%' }}>
            <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <SetViewOnCenter center={center} />
                <LocationPicker position={center} onLocationSelect={onLocationSelect} />
            </MapContainer>
        </div>
    );
}
