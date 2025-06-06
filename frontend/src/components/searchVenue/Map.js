import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet-control-geocoder';
import johorBahruAreasCoordinates from '../../data/johorBahruAreasCoordinates';
import StarRating from './StarRating';

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

export default function Map({ addresses, selected, foodVenues }) {
    const johorBahruCoordinates = [1.4927, 103.7414]; // Default to Johor Bahru
    const [position, setPosition] = useState(johorBahruCoordinates); // Default to Johor Bahru

    useEffect(() => {
        if (!selected && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition([latitude, longitude]);

                    try {
                        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reverse-geocode`, {
                            params: {
                                latitude: latitude,
                                longitude: longitude,
                            },
                        });
                        const city = response.data.address.city || response.data.address.town || response.data.address.village;
                        localStorage.setItem('currentLocation', city);
                        console.log(city);
                    } catch (error) {
                        console.error('Error reverse geocoding:', error);
                    }
                },
                (error) => {
                    console.error('Error using geolocation:', error);
                },
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
            );
        }
    }, []);

    // Update position if a different city is selected
    useEffect(() => {
        if (selected) {
            // Example: Set position to the coordinates of 'Central Johor Bahru'
            const currentCity = johorBahruAreasCoordinates.find(area => area.name === selected);
            if (currentCity) {
                setPosition([currentCity.lat, currentCity.lon]);
            }
        }
    }, [selected]);


    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/coordinates`, { addresses });
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        };

        if (addresses.length > 0) {
            fetchCoordinates();
        }
    }, [addresses]);

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && <ResetCenterView position={position} />}
            {foodVenues.length > 0 && foodVenues.map((location, index) => (
                location.latitude && location.longitude ? (
                    <Marker key={index} position={[location.latitude, location.longitude]} icon={customMarkerIcon}>
                        <Popup className="">
                            <h6>{location?.name}</h6>
                            <h6><StarRating rating={location?.rating} /></h6>
                            <p>{location?.priceRange}</p>
                            </Popup>
                    </Marker>
                ) : null
            ))}
        </MapContainer>
    );
}
