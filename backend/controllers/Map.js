const axios = require('axios');
// Fetch coordinates for a list of addresses
exports.getCoordinates = async (req, res) => {
    const { addresses } = req.body; // Get the addresses from the request body
    try {
        const fetchedLocations = await Promise.all(
            addresses.map(async (address) => {
                let finalAddressUsed = address;
                try {
                    // First attempt: use the original address
                    let response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {
                            q: finalAddressUsed,
                            format: 'json',
                        },
                    });

                    let data = response.data;

                    // If no results, try cleaning up the address by removing the number at the start
                    if (data.length === 0) {
                        finalAddressUsed = address.replace(/^\d+,\s*/, '');
                        response = await axios.get('https://nominatim.openstreetmap.org/search', {
                            params: {
                                q: finalAddressUsed,
                                format: 'json',
                            },
                        });
                        data = response.data;
                    }

                    // If still no results, try removing the first part of the address (split by comma)
                    if (data.length === 0) {
                        finalAddressUsed = address.split(",").slice(1).join(",");
                        response = await axios.get('https://nominatim.openstreetmap.org/search', {
                            params: {
                                q: finalAddressUsed,
                                format: 'json',
                            },
                        });
                        data = response.data;
                    }

                    // If we get a result, return the coordinates
                    if (data.length > 0) {
                        const { lat, lon } = data[0];
                        return { latitude: parseFloat(lat), longitude: parseFloat(lon), name: finalAddressUsed };
                    }

                    // Log only once if no results after all attempts
                    console.warn(`No results found for address: ${address}`);
                    return null;
                } catch (error) {
                    // console.error('Error fetching coordinates for address:', error);
                    return null;
                }
            })
        );

        // Send back only the valid locations
        res.json(fetchedLocations.filter(location => location !== null));
    } catch (error) {
        // console.error('Error fetching coordinates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to handle reverse geocoding
exports.getLocation = async (req, res) => {
    const { latitude, longitude } = req.query; // Receive latitude and longitude from frontend

    try {
        // Make a request to Nominatim API
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
            },
        });

        // Forward the result back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};