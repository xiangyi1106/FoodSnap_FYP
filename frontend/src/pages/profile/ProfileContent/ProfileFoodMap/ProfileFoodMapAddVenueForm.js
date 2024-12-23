import React, { useState, useRef, useCallback } from "react";
import * as Yup from "yup";
import TextInput from "../../../../components/inputs/TextInput";
import { MenuItem, CircularProgress, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import CIcon from '@coreui/icons-react';
import { cilX, cilLocationPin } from '@coreui/icons';
import debounce from 'lodash/debounce';
import axios from "axios";
import { uploadMedias } from "../../../../functions/uploadMedia";
import { ToastContainer, toast } from 'react-toastify';
import { handleImage } from "../../../../functions/handleImage";
import { getAllFoodVenues } from "../../../../functions/foodVenue";
import MapPicker from "../../../../components/MapPicker/MapPicker";
import { validateLatitude, validateLongitude } from "../../../../functions/fileUtils";
import { addFoodVenueToProfileMap } from "../../../../functions/foodVenueMap";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export function ProfileFoodMapAddVenueForm({ setVisible, user, setFoodVenuesMap }) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        description: "",
        venueImage: null
    });
    const [locationText, setLocationText] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [locationError, setLocationError] = useState(false);
    const [latitude, setLatitude] = useState(); // Default Johor Bahru
    const [longitude, setLongitude] = useState(); // Default Johor Bahru
    const [manualSelection, setManualSelection] = useState(false);
    const [name, setName] = useState("");
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const updatePicture = async (img) => {
        try {
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/myFoodMap`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);

            const res = await uploadMedias(formData, path, user.token);
            return res;
        } catch (error) {
            toast.error("Failed to uploads picture: " + error.message);
        }
    };

    const pictureInput = useRef(null);

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImage(file, setError, setImage); // Use the imported handleImage function
        }
    };

    const removePicture = () => {
        setFormData({ ...formData, venueImage: null });
        setImage('');
    };

    // Use useCallback to memoize the debounced function so it doesn't get recreated on every render
    const debouncedSearch = useCallback(
        debounce((query) => {
            setIsLoading(true);
            const params = { q: query, format: "json", addressdetails: 1 };
            const queryString = new URLSearchParams(params).toString();
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLocationList(result);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching data: ", err);
                    setIsLoading(false);
                });
        }, 500),
        [] // Empty dependency array ensures debounce is created only once
    );

    const handleLocationSearch = (e) => {
        errors.address && setErrors((prevErrors) => ({
            ...prevErrors,
            address: ''
        }))
        const query = e.target.value;
        setLocationText(query);
        debouncedSearch(query); // Call the memoized debounced search function
    };

    const handleItemClick = (index) => {
        const selectedItem = locationList[index]; // Access the selected item directly from the list
        // Parse lat and lon to floats before applying .toFixed
        const latitude = parseFloat(selectedItem.lat);
        const longitude = parseFloat(selectedItem.lon);

        // Check if latitude and longitude are valid numbers
        if (!isNaN(latitude) && !isNaN(longitude)) {
            setLatitude(latitude.toFixed(7));  // Fix to 7 decimal places
            setLongitude(longitude.toFixed(7));  // Fix to 7 decimal places
            setLocationText(selectedItem.display_name);
            setName(selectedItem.name);
        } else {
            console.error("Invalid latitude or longitude");
        }
        setLocationList([]);
    };

    const handleManualLocation = (latlng) => {
        setLatitude(latlng.lat.toFixed(7));
        setLongitude(latlng.lng.toFixed(7));
        setManualSelection(false);
        setError('');
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.address) errors.address = "Address is required.";
        if (isNaN(formData.latitude) || !formData.latitude || !validateLatitude(formData.latitude)) errors.latitude = "Invalid Latitude. It must be between -90 and 90.";
        if (isNaN(formData.longitude) || !formData.longitude || !validateLongitude(formData.longitude)) errors.longitude = "Invalid Longitude. It must be between -180 and 180.";
        if (!formData.name) errors.name = "Food venue name is required.";
        if (formData.description.length > 500) errors.description = "Description cannot longer than 500 characters."

        // Focus on the first error input
        if (Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0];
            const firstErrorElement = document.querySelector(`[name="${firstErrorKey}"]`);
            if (firstErrorElement) {
                firstErrorElement.focus();  // Set focus on the first error element
            }
        }

        return errors;
    };

    const clearError = () => {
        setErrors({
            name: "",
            address: "",
            latitude: "",
            longitude: "",
            description: '',
        });
    };

    const handleSubmit = async (e) => {
        setIsSubmitLoading(true);
        e.preventDefault();
        clearError();

        formData.address = locationText.trim() || "";
        formData.latitude = latitude || null;
        formData.longitude = longitude || null;
        formData.name = name.trim() || "";

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            // const values = { ...formData, latitude, longitude, name, address: locationText.trim() || "" };
            // Handle image upload
            if (image) {
                const pic = await updatePicture(image);
                if (pic && pic.length > 0 && pic[0].url) {
                    formData.venueImage = pic[0].url;
                }
            }
            const response = await addFoodVenueToProfileMap(formData, user);
            if (response.success) {
                toast.success("Food Venue added to the map successfully!");
                setFoodVenuesMap((prevVenues) => [
                    response.foodVenue,         // Add the new data
                    ...prevVenues,  // Spread the previous promotions
                ]);
                setVisible(false); // Close the form
            } else {
                // If the response is not successful (like a 400 error), show the error message
                toast.error(response || "An error occurred while adding the food venue.");
            }

            console.log(response);
            setIsSubmitLoading(false);
        } catch (error) {
            setIsSubmitLoading(false);
            console.error("Error adding food venue:", error);
            toast.error("Failed adding food venue: " + (Error));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="event_form_space_y_8">
            <div className="image_upload_section" style={{ width: "100%" }}>
                <label htmlFor="venueImage" style={{ fontWeight: "500", fontFamily: "Source Sans 3, sans-serif" }}>
                    Upload Food Venue Picture
                </label>
                <input
                    type="file"
                    id="venueImage"
                    accept="image/*"
                    hidden
                    ref={pictureInput}
                    onChange={handlePictureChange}
                />
                <div className="image_preview_container">
                    <img
                        src={image ? image : "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png"}
                        alt="Cover"
                        className="cover_image"
                        onClick={() => pictureInput.current.click()}
                    />
                    {image && (
                        <button
                            onClick={removePicture}
                            className="small_white_circle"
                            style={{ zIndex: "99" }}
                        >
                            <CIcon icon={cilX} className="icon_size_22" />
                        </button>
                    )}
                </div>
            </div>

            <div className="profile_form_item">
                <label className="profile_form_label">Address</label>
                <input
                    className="profile_form_input"
                    name="location"
                    placeholder="Enter the address of the food venue"
                    value={locationText} // Use local state for the input value
                    onChange={handleLocationSearch}
                />
                {errors.address && <div className="profile_form_message">{errors.address}</div>}
            </div>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <List>
                    {locationList.length > 0 && locationList.map((loc, index) => (
                        <ListItem key={index} button onClick={() => handleItemClick(index)}>
                            <ListItemIcon>
                                <CIcon icon={cilLocationPin} className="icon_size_22" />
                            </ListItemIcon>
                            <ListItemText primary={loc.display_name} />
                        </ListItem>
                    ))}
                </List>
            )}

            <div style={{ height: '300px', marginBottom: '10px' }}>
                <MapPicker
                    center={[latitude || '1.4927', longitude || "103.7414"]}
                    zoom={13}
                    onLocationSelect={handleManualLocation}
                />
            </div>

            <div className="profile_form_item">
                <label className="profile_form_label">Latitude</label>
                <input
                    className="profile_form_input"
                    name="latitude"
                    placeholder="Enter the latitude of the venue"
                    value={latitude || ""}
                    onChange={(e) => {
                        setLatitude(e.target.value); setErrors((prevErrors) => ({
                            ...prevErrors,
                            latitude: ''
                        }))
                    }}
                />
                {errors.latitude && <div className="profile_form_message">{errors.latitude}</div>}
            </div>

            <div className="profile_form_item">
                <label className="profile_form_label">Longitude</label>
                <input
                    className="profile_form_input"
                    name="longitude"
                    placeholder="Enter the longitude of the venue"
                    value={longitude || ""}
                    onChange={(e) => {
                        setLongitude(e.target.value); setErrors((prevErrors) => ({
                            ...prevErrors,
                            longitude: ''
                        }))
                    }}
                />
                {errors.longitude && <div className="profile_form_message">{errors.longitude}</div>}
            </div>

            <div className="profile_form_item">
                <label className="profile_form_label">Food Venue Name</label>
                <input
                    className="profile_form_input"
                    name="name"
                    placeholder="Enter the name of the venue"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value); setErrors((prevErrors) => ({
                            ...prevErrors,
                            name: ''
                        }))
                    }}
                />
                {errors.name && <div className="profile_form_message">{errors.name}</div>}
            </div>

            <div className="profile_form_item">
                <label className="profile_form_label">Description</label>
                <textarea
                    className="profile_form_input"
                    name="description"
                    rows="4"
                    placeholder="Write something about the food venue."
                    value={formData.description}
                    onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value }); setErrors((prevErrors) => ({
                            ...prevErrors,
                            description: ''
                        }))
                    }}
                />
                {errors.description && <div className="profile_form_message">{errors.description}</div>}
            </div>

            {/* <TextInput
                label="Description"
                id="description"
                name="description"
                isTextarea
                placeholder="Enter a brief description of the event"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                description="Provide details about the event."
            /> */}

            <button type="submit" className="event_form_button profile_form_button">
                {isSubmitLoading ? <CircularProgress size={24} /> : "Add Food Venue"}
            </button>
        </form>
    );
}
