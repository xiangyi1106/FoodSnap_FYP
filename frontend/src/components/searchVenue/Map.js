import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
import 'leaflet-control-geocoder';

// Fix for the default marker icon not displaying correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarkerIcon = new L.Icon({
    // iconUrl: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
    iconUrl: `${process.env.PUBLIC_URL}/marker/location.png`,
    // iconSize: [27, 42],
    iconSize: [32, 42],
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

export default function Map({ addresses }) {

    const [position, setPosition] = useState([51.505, -0.09]); // Initially null to check if position is loaded
    const [error, setError] = useState(null);

    const geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error('Error using geolocation:', error);
                },
                geolocationOptions
            );
        }
    }, []);

    // useEffect(() => {
    //     const fetchGeolocation = async () => {
    //         try {
    //             const apiKey = process.env.REACT_APP_IPGEOLOCATION_API;
    //             console.log(apiKey);
    //             const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
    //             const data = await response.json();
    //             setPosition([data.latitude, data.longitude]);
    //             console.log(data);
    //         } catch (error) {
    //             console.error('Error fetching geolocation:', error);
    //             setError(error);
    //         }
    //     };

    //     fetchGeolocation();
    // }, []);
    const [locations, setLocations] = useState([]);

    // useEffect(() => {
    //     const fetchCoordinates = async () => {
    //         const fetchedLocations = await Promise.all(
    //             addresses.map(async (address) => {
    //                 const response = await axios.get('https://nominatim.openstreetmap.org/search', {
    //                     params: {
    //                         q: address,
    //                         format: 'json',
    //                     },
    //                 });
    //                 console.log('Response for address:', address, response.data); // Log the response
    //                 const data = response.data;
    //                 if (data && data.length > 0) {
    //                     const { lat, lon } = data[0];
    //                     return { latitude: parseFloat(lat), longitude: parseFloat(lon), name: address };
    //                 } else {
    //                     console.warn(`No results found for address: ${address}`);
    //                     return null;
    //                 }
    //             })
    //         );
    //         setLocations(fetchedLocations.filter(location => location !== null));
    //     };

    //     fetchCoordinates();
    // }, [addresses]);
    // useEffect(() => {
    //     const geocoder = L.Control.Geocoder.nominatim();

    //     const fetchCoordinates = async () => {
    //         const fetchedLocations = await Promise.all(
    //             addresses.map(async (address) => {
    //                 return new Promise((resolve) => {
    //                     geocoder.geocode(address, (results) => {
    //                         if (results && results.length > 0) {
    //                             const { lat, lng } = results[0].center;
    //                             resolve({ latitude: lat, longitude: lng, name: address });
    //                         } else {
    //                             resolve(null);
    //                         }
    //                     });
    //                 });
    //             })
    //         );
    //         setLocations(fetchedLocations.filter(location => location !== null));
    //     };

    //     fetchCoordinates();
    // }, [addresses]);
    useEffect(() => {
        const fetchCoordinates = async () => {
            const fetchedLocations = await Promise.all(
                addresses.map(async (address) => {
                    let finalAddressUsed = address; // Start with the full address
                    let response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {
                            q: finalAddressUsed,
                            format: 'json',
                        },
                    });
    
                    let data = response.data;
    
                    // Step 2: If no results, remove house number and search again
                    if (data.length === 0) {
                        finalAddressUsed = address.replace(/^\d+,\s*/, ''); // Remove leading house number and comma
                        response = await axios.get('https://nominatim.openstreetmap.org/search', {
                            params: {
                                q: finalAddressUsed,
                                format: 'json',
                            },
                        });
                        data = response.data;
                    }
    
                    // Step 3: If still no results, simplify further (e.g., remove street name)
                    if (data.length === 0) {
                        finalAddressUsed = address.split(",").slice(1).join(","); // Remove first segment (e.g., street name)
                        response = await axios.get('https://nominatim.openstreetmap.org/search', {
                            params: {
                                q: finalAddressUsed,
                                format: 'json',
                            },
                        });
                        data = response.data;
                    }
    
                    // Step 4: If data is found, return the coordinates, else log a warning
                    if (data && data.length > 0) {
                        console.log(`Final address used for geocoding: ${finalAddressUsed}`);
                        const { lat, lon } = data[0];
                        return { latitude: parseFloat(lat), longitude: parseFloat(lon), name: finalAddressUsed };
                    } else {
                        console.warn(`No results found for address: ${address}`);
                        return null;
                    }
                })
            );
            setLocations(fetchedLocations.filter(location => location !== null));
        };
    
        fetchCoordinates();
    }, [addresses]);
    
    

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && <ResetCenterView position={position} />}
            {/* <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            {locations.map((location, index) => (
                <Marker key={index} position={[location.latitude, location.longitude]} icon={customMarkerIcon}>
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}


