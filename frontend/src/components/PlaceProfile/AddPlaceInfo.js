import React, { useCallback, useRef, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import './EditPlaceInfo.css';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import johorBahruAreas from '../../data/johorBahruAreas';
import OpeningHours from './OpeningHours';
import OtherInfoToggleButtons from './OtherInfoToggleButtons ';
import { uploadMedias } from '../../functions/uploadMedia';
import { toast } from 'react-toastify';
import { createFoodVenue, updateFoodVenue } from '../../functions/foodVenue';
import axios from 'axios';
import MapPicker from '../MapPicker/MapPicker';
import { validateFileType, validateImageType } from '../../functions/fileUtils';

export default function AddPlaceInfo({ setVisible, user }) {
    const [formData, setFormData] = useState({
        restaurantName: '',
        category: [],
        address: '',
        // postalCode: '',
        // city: '',
        // state: 'Johor',
        latitude: null,
        longitude: null,
        phone: '',
        // openingHours: {},
        openingHours: {
            "mon": [
                {
                    "open": "8:00am",
                    "close": "5:00pm"
                }
            ],
            "tue": [
                {
                    "open": "8:00am",
                    "close": "5:00pm"
                }
            ],
            "wed": [
                {
                    "open": "8:00am",
                    "close": "5:00pm"
                }
            ],
            "thu": [
                {
                    "open": "8:00am",
                    "close": "5:00pm"
                }
            ],
            "fri": [
                {
                    "open": "8:00am",
                    "close": "5:00pm"
                }
            ],
            "sat": [
                {
                    "open": "8:00am",
                    "close": "5:00pm"
                }
            ],
            "sun": [
                {
                    "open": "8:00am",
                    "close": "5:00pm"
                }
            ],
        },
        website: '',
        description: '',
        // otherInfo: placeOtherInformation.reduce((acc, info) => ({ ...acc, [info]: 'noInfo' }), {}),
        serviceCharge: 0,
        sstCharge: 0,
        profilePicture: null,
        coverPicture: null,
        otherInfo: [{ // Initialize otherInfo as an array with an object
            acceptsCreditCards: "No", // Default value
            acceptsDebitCards: "No", // Default value
            acceptsTNGBoostQRPayment: "No", // Default value
            airConditioning: "No", // Default value
            alcoholicDrinks: "No", // Default value
            dogsAllowed: "No", // Default value
            halalOptions: "No", // Default value
            needsReservations: "No", // Default value
            offersTakeout: "No", // Default value
            vegetarianOptions: "No", // Default value
            wheelchairAccessible: "No", // Default value
            wifi: "No" // Default value
        }],
        // type: [],
    });
    const [errors, setErrors] = useState({});
    const pictureInput = useRef(null);
    const coverInput = useRef(null);
    const [picture, setPicture] = useState('');
    const [cover, setCover] = useState('');

    //Handle input change for formdata
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : prevErrors[name] // Clear error if input is filled
        }));
    };


    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option,
    });

    //Handle Input Change for serviceCharge and SST 
    const handleChargeChange = (event) => {
        const { name, value } = event.target;

        // Allow empty value for clearing the input
        if (value === '') {
            setFormData(prevState => ({
                ...prevState,
                [name]: ''
            }));
            return;
        }

        // Check if the value is a valid number
        const validNumber = /^-?\d*\.?\d*$/.test(value);
        if (!validNumber) return;

        // Ensure the value is between 0 and 100
        const numericValue = parseFloat(value);
        if (numericValue >= 0 && numericValue <= 100) {
            setFormData(prevState => ({
                ...prevState,
                [name]: numericValue
            }));
        }
    };

    const updatePicture = async (img, fileLocation, venueId) => {
        try {
            let blob = await fetch(img).then((b) => b.blob());
            const path = `foodVenue/${venueId}/${fileLocation}`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);

            const res = await uploadMedias(formData, path, user.token);
            console.log(res);
            return res;

        } catch (error) {
            toast.error("Failed to uploads picture: " + error.message);
        }
    };

    const handlePictureChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            // Use the validateFileType function to check if the file is valid
            if (!validateImageType(file)) {
                // Show error with toast
                toast.error(`Unsupported file type. Only Jpeg, Png are allowed.`);
                return; // Don't proceed further if the file type is invalid
            }
            // setFormData(prevState => ({
            //     ...prevState,
            //     [type]: URL.createObjectURL(file)
            // }));
            type === 'profilePicture' ? setPicture(URL.createObjectURL(file)) : setCover(URL.createObjectURL(file));
        }
    };

    const removePicture = (type) => {
        // setFormData(prevState => ({
        //     ...prevState,
        //     [type]: null
        // }));
        type === 'profilePicture' ? setPicture(null) : setCover(null);

    };

    const validatePhoneNumber = (phone) => {
        const cleanedPhone = phone.replace(/-/g, ''); // Remove hyphens for validation
        if (cleanedPhone.startsWith('011')) {
            return /^[0-9]{11}$/.test(cleanedPhone); // 011 + 8 digits
        } else if (cleanedPhone.startsWith('01')) {
            return /^[0-9]{10}$/.test(cleanedPhone); // 7 or 8 digits for other prefixes
        } else {
            return false;
        }

    };

    const validatePostalCode = (postalCode) => /^[0-9]{5}$/.test(postalCode);

    const validateLatitude = (latitude) => {
        const lat = parseFloat(latitude);
        return !isNaN(lat) && lat >= -90 && lat <= 90;
    };

    const validateLongitude = (longitude) => {
        const lon = parseFloat(longitude);
        return !isNaN(lon) && lon >= -180 && lon <= 180;
    };

    const validateWebsite = (url) => {
        try {
            // const parsedUrl = new URL(url);  // Try to parse the URL
            // return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";  // Ensure it's HTTP or HTTPS
            const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;
            return urlPattern.test(url);
        } catch (e) {
            return false;  // If invalid URL, it'll throw an error
        }
    };

    const validatePriceRange = (priceRange) => {
        // Regex to match the pattern RM<number>-<number> and capture both the minimum and maximum prices
        const priceRangeRegex = /^RM(\d+)-(\d+)$/;

        const match = priceRange.match(priceRangeRegex);

        if (match) {
            // Extract the minimum and maximum prices
            const minPrice = parseInt(match[1], 10); // First capture group (minimum price)
            const maxPrice = parseInt(match[2], 10); // Second capture group (maximum price)

            // Ensure the maximum price is greater than the minimum price
            if (maxPrice > minPrice) {
                return true;  // Valid price range
            } else {
                return false;  // Maximum price should be greater than minimum price
            }
        } else {
            return false;  // Invalid format
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.restaurantName) errors.restaurantName = "Restaurant Name is required.";
        if (!formData.category || formData.category === "" || formData.category === null) {
            errors.category = 'Category is required.';
        }

        if (!formData.address) errors.address = "Address is required.";
        if (formData.priceRange && !validatePriceRange(formData.priceRange)) errors.priceRange = "Invalid Price Range. It should be in this format: RM10-20";
        if (formData.phone && !validatePhoneNumber(formData.phone)) errors.phone = "Invalid Phone Number. It should be 7 or 8 digits, or 011 followed by 8 digits.";
        if (isNaN(formData.latitude) || !formData.latitude || !validateLatitude(formData.latitude)) errors.latitude = "Invalid Latitude. It must be between -90 and 90.";
        if (isNaN(formData.longitude) || !formData.longitude || !validateLongitude(formData.longitude)) errors.longitude = "Invalid Longitude. It must be between -180 and 180.";
        if (formData.website && !validateWebsite(formData.website)) errors.website = "Invalid URL. Please try again."
        if (isNaN(formData.serviceCharge) || formData.serviceCharge < 0 || formData.serviceCharge > 100) errors.serviceCharge = "Service Charge must be between 0 and 100.";
        if (isNaN(formData.sstCharge) || formData.sstCharge < 0 || formData.sstCharge > 100) errors.sstCharge = "SST Charge must be between 0 and 100.";


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
            restaurantName: "",
            address: "",
            phone: "",
            latitude: "",
            longitude: "",
            serviceCharge: "",
            sstCharge: "",
            category: "",
            website: "",
            priceRange: "",
        });
    };

    const handleSave = async () => {

        clearError();
        formData.address = "";
        formData.latitude = null;
        formData.longitude = null;

        // Handle specific fields for additional validation or default values
        formData.address = address.trim() || "";
        formData.latitude = latitude || null;
        formData.longitude = longitude || null;

        if (formData.serviceCharge === "") {
            formData.serviceCharge = 0;
        }

        if (formData.sstCharge === "") {
            formData.sstCharge = 0;
        }

        // Trim all string fields in formData
        for (const key in formData) {
            if (typeof formData[key] === 'string') {
                formData[key] = formData[key].trim();
            }
        }

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Send the updated form data to the backend (PUT or PATCH request)
        try {
            const createResponse = await createFoodVenue(formData, user);
            console.log(createResponse);
            if (!createResponse || !createResponse.foodVenue._id) {
                if (createResponse) {
                    toast.error(createResponse);  // Display the error message returned from backend
                } else {
                    toast.error("Failed to create food venue.");  // Fallback error message
                }
                return; // Exit if creation failed
            }


            const venueId = createResponse.foodVenue._id; // Get the newly created venue ID
            console.log(venueId);

            if (venueId) {
                if (picture) {
                    // Await the promise to resolve
                    const pic = await updatePicture(picture, 'profilePicture', venueId);

                    if (pic && pic.length > 0 && pic[0].url) {
                        // Directly set the image URL in the values object
                        formData.profilePicture = pic[0].url;
                    }
                    console.log(pic);
                }

                if (cover) {
                    // Await the promise to resolve
                    const pic = await updatePicture(cover, "coverPicture", venueId);

                    if (pic && pic.length > 0 && pic[0].url) {
                        // Directly set the image URL in the values object
                        formData.coverPicture = pic[0].url;
                    }
                }

                // Only proceed with updating the food venue if any of the pictures were uploaded or other formData is changed
                if (picture || cover) {
                    const updateResponse = await updateFoodVenue(venueId, formData, user);
                    console.log(updateResponse);
                    if (updateResponse && updateResponse.success) {
                        toast.success("Food venue photo updated successfully!");
                        // Optionally, redirect or update state here
                    } else {
                        toast.error("Error updating food venue's photo, please try again.");
                    }
                    return;
                }

            }

            // Show a single success message after all operations are complete
            toast.success("Food venue created successfully!");

        } catch (error) {
            toast.error("Error saving data: " + error);
        }

        console.log(formData);

        setVisible(false);
    }

    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(); // Default Johor Bahru
    const [longitude, setLongitude] = useState(); // Default Johor Bahru
    const [error, setError] = useState('');
    const [manualSelection, setManualSelection] = useState(false);

    const handleGeocode = async () => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: address,
                    format: 'json',
                },
                timeout: 5000, // Set timeout to 5 seconds
            });

            console.log(response.data);

            if (response.data.length > 0) {
                const result = response.data[0];
                setLatitude(parseFloat(result.lat).toFixed(7));
                setLongitude(parseFloat(result.lon).toFixed(7));
                setError('');
                setManualSelection(false); // Use geocoded result
            } else {
                setError('No results found. Please adjust the location manually on the map.');
                setManualSelection(true); // Allow manual selection
            }
        } catch (err) {
            setError('Error fetching location data. Try again later.');
            setManualSelection(true);
        }
    };

    const handleManualLocation = (latlng) => {
        setLatitude(latlng.lat.toFixed(7));
        setLongitude(latlng.lng.toFixed(7));
        setManualSelection(false);
        setError('');
    };

    return (
        <div className="blur place_detail_information" style={{ backgroundColor: "gray" }}>
            <div className="container_wrapper" style={{ backgroundColor: "#fff" }}>
                <div className="profile">
                    <div className="close_button hover_style_2">
                        <CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false); }} />
                    </div>
                    <div className="edit_place_info">
                        <div className='edit_title'><span className='page_title logo_color_text'>Add Food Venue Information</span></div>
                        <div className="edit_place_info_basic">
                            <div className="edit_place_info_picture_row">
                                <div className="image_upload_section">
                                    <label htmlFor="profilePicture" style={{ fontWeight: '500', fontFamily: "Source Sans 3, sans-serif" }}>Upload Profile Picture</label>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        accept="image/*"
                                        hidden
                                        ref={pictureInput}
                                        onChange={(e) => handlePictureChange(e, 'profilePicture')}
                                    />
                                    <div className="image_preview_container">
                                        {/* <img src={formData.profilePicture ? formData.profilePicture : `${process.env.PUBLIC_URL}/images/generative-image.png`} alt="Profile" className="profile_image" onClick={() => { pictureInput.current.click(); }} /> */}
                                        <img src={picture ? picture : `${process.env.PUBLIC_URL}/images/generative-image.png`} alt="Profile" className="profile_image" onClick={() => { pictureInput.current.click(); }} />
                                        {picture && <button onClick={() => removePicture('profilePicture')} className="small_white_circle"><CIcon icon={cilX} className="icon_size_22" /></button>}
                                        {/* {formData.profilePicture && <button onClick={() => removePicture('profilePicture')} className="small_white_circle"><CIcon icon={cilX} className="icon_size_22" /></button>} */}
                                    </div>
                                </div>

                                <div className="image_upload_section">
                                    <label htmlFor="coverPicture" style={{ fontWeight: '500', fontFamily: "Source Sans 3, sans-serif" }}>Upload Cover Picture</label>
                                    <input
                                        type="file"
                                        id="coverPicture"
                                        accept="image/*"
                                        hidden
                                        ref={coverInput}
                                        onChange={(e) => handlePictureChange(e, 'coverPicture')}
                                    />
                                    <div className="image_preview_container">
                                        {/* <img src={formData.coverPicture ? formData.coverPicture : `${process.env.PUBLIC_URL}/images/generative-image.png`} style={{ objectFit: formData.coverPicture ? 'cover' : 'contain' }} alt="Cover" className="cover_image" onClick={() => { coverInput.current.click(); }} />
                                        {formData.coverPicture && <button onClick={() => removePicture('coverPicture')} className="small_white_circle" style={{ zIndex: '99' }}><CIcon icon={cilX} className="icon_size_22" /></button>}
                                         */}
                                        <img src={cover ? cover : `${process.env.PUBLIC_URL}/images/generative-image.png`} alt="Cover" className="cover_image" onClick={() => { coverInput.current.click(); }} />
                                        {cover && <button onClick={() => removePicture('coverPicture')} className="small_white_circle"><CIcon icon={cilX} className="icon_size_22" /></button>}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="edit_place_info_basic">
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Food Venue Name
                                </div>
                                <div className="edit_place_info_basic_col full_width">
                                    <input
                                        className="edit_place_info_basic_input"
                                        name="restaurantName"
                                        value={formData.restaurantName}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.restaurantName && <span className="error_message">{errors.restaurantName}</span>}
                                </div>
                            </div>

                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Price Range
                                </div>
                                <div className="edit_place_info_basic_col full_width">
                                    <input
                                        className="edit_place_info_basic_input"
                                        name="priceRange"
                                        value={formData.priceRange}
                                        onChange={handleChange}
                                        placeholder='RM20-40'
                                    // style={{width: '300px'}}
                                    />
                                    {errors.priceRange && <span className="error_message">{errors.priceRange}</span>}
                                </div>
                            </div>

                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Category
                                </div>
                                <div className="edit_place_info_basic_col full_width">
                                    <input
                                        className="edit_place_info_basic_input"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p style={{ color: 'gray', fontSize: '0.85rem' }}>Seperate category with commas(,)</p>
                                    {errors.category && <span className="error_message">{errors.category}</span>}
                                </div>
                            </div>
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label" style={{ alignSelf: 'flex-start' }}>
                                    Address
                                </div>
                                <div className="edit_place_info_basic_col full_width">
                                    <input
                                        className="edit_place_info_basic_input"
                                        name="address"
                                        value={address}
                                        // onChange={(e) => setAddress(e.target.value)}
                                        onChange={(e) => {
                                            setAddress(e.target.value); setErrors((prevErrors) => ({
                                                ...prevErrors,
                                                address: ''
                                            }))
                                        }}
                                        required
                                    />
                                    {errors.address && <span className="error_message">{errors.address}</span>}
                                    {error && <span className="error_message">{error}</span>}
                                    <button onClick={handleGeocode} className='green_btn' style={{ margin: '10px 0', padding: '10px', cursor: 'pointer' }}>
                                        Geocode Address
                                    </button>
                                    <p style={{ color: 'gray', fontSize: '0.85rem' }}>Geocode address to get the accurate latitude and longitude. If fail to get the latitude and longitude, please adjust the location manually on the map. </p>
                                    {/* Map Picker */}
                                    <div style={{ height: '300px', marginBottom: '10px' }}>
                                        <MapPicker
                                            center={[latitude || '1.4927', longitude || "103.7414"]}
                                            zoom={13}
                                            onLocationSelect={handleManualLocation}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Latitude
                                </div>
                                <div className="edit_place_info_basic_col full_width" style={{ width: '35%' }}>
                                    <input
                                        className="edit_place_info_basic_input "
                                        name="latitude"
                                        // value={formData.latitude}
                                        value={latitude || ''}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                            setLatitude(e.target.value); setErrors((prevErrors) => ({
                                                ...prevErrors,
                                                latitude: ''
                                            }))
                                        }}
                                    // style={{ width: '35%' }}
                                    />
                                    {errors.latitude && <span className="error_message">{errors.latitude}</span>}
                                </div>
                            </div>

                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Longitude
                                </div>
                                <div className="edit_place_info_basic_col full_width" style={{ width: '35%' }}>
                                    <input
                                        className="edit_place_info_basic_input "
                                        name="longitude"
                                        // value={formData.longitude}
                                        value={longitude || ''}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                            setLongitude(e.target.value); setErrors((prevErrors) => ({
                                                ...prevErrors,
                                                longitude: ''
                                            }))
                                        }}
                                    // style={{ width: '35%' }}
                                    />
                                    {errors.longitude && <span className="error_message">{errors.longitude}</span>}
                                    <p style={{ color: 'gray', fontSize: '0.85rem' }}>Provide latitude and longitude to perform a better accuracy on the map.</p>
                                </div>
                            </div>

                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label" >
                                    Phone
                                </div>
                                <div className="edit_place_info_basic_col full_width" style={{ width: '35%' }}>
                                    <input
                                        className="edit_place_info_basic_input "
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder='Eg: 012345678'
                                    // style={{ width: '35%' }}
                                    />
                                    {errors.phone && <span className="error_message">{errors.phone}</span>}
                                </div>
                            </div>
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Website
                                </div>
                                {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '35%' }}></div> */}
                                <div className="edit_place_info_basic_col full_width">
                                    <input
                                        className="edit_place_info_basic_input "
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder='https://www.abc.com'
                                    />
                                    {errors.website && <span className="error_message">{errors.website}</span>}
                                </div>
                            </div>
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Opening Hours
                                </div>
                                <OpeningHours openingHours={formData.openingHours} setFormData={setFormData} />
                            </div>
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Description
                                </div>
                                <textarea
                                    className="edit_place_info_basic_input"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    style={{ resize: 'none', height: '120px' }}
                                />
                            </div>

                        </div>
                        <div className="edit_place_info_basic">
                            <OtherInfoToggleButtons formData={formData} setFormData={setFormData} />

                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Service Charge
                                </div>
                                <div className="edit_place_info_basic_col full_width">

                                    <input
                                        className="edit_place_info_basic_input "
                                        name="serviceCharge"
                                        value={formData.serviceCharge}
                                        onChange={handleChargeChange}
                                        style={{ width: '35%' }}
                                        type='text'
                                    />
                                    {errors.serviceCharge && <span className="error_message">{errors.serviceCharge}</span>}
                                </div>

                            </div>
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    SST Charge
                                </div>
                                <div className="edit_place_info_basic_col full_width">

                                    <input
                                        className="edit_place_info_basic_input "
                                        name="sstCharge"
                                        value={formData.sstCharge}
                                        onChange={handleChargeChange}
                                        style={{ width: '35%' }}
                                        type='text'
                                    />
                                    {errors.sstCharge && <span className="error_message">{errors.sstCharge}</span>}
                                </div>

                            </div>

                        </div>
                        <div className="edit_place_info_actions">
                            <button className="green_btn save_button" onClick={handleSave}>
                                Save
                            </button>
                            <button className="white_btn cancel_button" onClick={() => setVisible(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
