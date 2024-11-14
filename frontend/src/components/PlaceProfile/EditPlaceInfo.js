import React, { useCallback, useEffect, useRef, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';
import './EditPlaceInfo.css';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import restaurantTypes from '../../data/restaurantType';
import johorBahruAreas from '../../data/johorBahruAreas';
import OpeningHours from './OpeningHours';
import placeOtherInformation from '../../data/placeOtherInformation';
import ColorToggleButton from './ToggleButton';
import { foodVenueTypes } from '../../data/foodVenueTypes';
import { getFoodVenueDetails } from '../../functions/foodVenue';
import { toast } from 'react-toastify';
import OtherInfoToggleButtons from './OtherInfoToggleButtons ';

export default function EditPlaceInfo({ setVisible, id, user }) {

    const [formData, setFormData] = useState({
        restaurantName: '',
        category: { type: 'Restaurant' },
        address: '',
        // postalCode: '',
        // city: '',
        // state: 'Johor',
        latitude: '',
        longitude: '',
        phone: '',
        openingHours: {},
        priceRange: '',
        website: '',
        description: '',
        serviceCharge: 0,
        sstCharge: 0,
        profilePicture: null,
        coverPicture: null,
        type: [],
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
    });

    useEffect(() => {
        const fetchFoodVenue = async () => {
            try {
                const response = await getFoodVenueDetails(id, user.token);

                setFormData({
                    restaurantName: response.name || '',
                    address: response.address || '',
                    // postalCode: response.postalCode || '',
                    // city: response.city || '',
                    // state: response.state || 'Johor',
                    phone: response.phone || '',
                    website: response.website || '',
                    description: response.description || '',
                    otherInfo: response.otherinfo[0],
                    serviceCharge: response.serviceCharge || 0,
                    sstCharge: response.sstCharge || 0,
                    profilePicture: response.picture || null,
                    coverPicture: response.cover || null,
                    priceRange: response.priceRange || '',
                    openingHours: response.openingHours || {}
                });

                console.log(response);
                console.log(response.openingHours);
            } catch (error) {
                toast.error("Error fetching food venue, please try again: " + error.message);
            }
        };

        fetchFoodVenue();
    }, [id, user.token]);


    const [errors, setErrors] = useState({});
    const pictureInput = useRef(null);
    const coverInput = useRef(null);

    //Handle input change for formdata
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
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

    const handlePictureChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                [type]: URL.createObjectURL(file)
            }));
        }
    };

    const removePicture = (type) => {
        setFormData(prevState => ({
            ...prevState,
            [type]: null
        }));
    };

    // Update formData when selection changes
    const handleDishTypeChange = (event, newValue) => {
        setFormData((prevData) => ({
            ...prevData,
            type: newValue, // Update with selected values
        }));
    };

    const handleCategoryChange = (event, newValue) => {
        setFormData((prevData) => ({
            ...prevData,
            category: newValue, // Update with selected values
        }));
    };


    // const handleCityChange = (event, newValue) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         city: newValue || "", // Update city value from Autocomplete
    //     }));
    // };


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


    const validateForm = () => {
        const errors = {};
        if (!formData.restaurantName) errors.restaurantName = "Restaurant Name is required.";
        if (!formData.address) errors.address = "Address is required.";
        if (!formData.postalCode || !validatePostalCode(formData.postalCode)) errors.postalCode = "Invalid Postal Code. It should be exactly 5 digits.";
        if (!formData.phone || !validatePhoneNumber(formData.phone)) errors.phone = "Invalid Phone Number. It should be 7 or 8 digits, or 011 followed by 8 digits.";
        if (!formData.latitude || !validateLatitude(formData.latitude)) errors.latitude = "Invalid Latitude. It must be between -90 and 90.";
        if (!formData.longitude || !validateLongitude(formData.longitude)) errors.longitude = "Invalid Longitude. It must be between -180 and 180.";
        if (isNaN(formData.serviceCharge) || formData.serviceCharge < 0 || formData.serviceCharge > 100) errors.serviceCharge = "Service Charge must be between 0 and 100.";
        if (isNaN(formData.sstCharge) || formData.sstCharge < 0 || formData.sstCharge > 100) errors.sstCharge = "SST Charge must be between 0 and 100.";

        return errors;
    };

    const handleSave = () => {

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        console.log(formData);
        // setVisible(false);
    }

    return (
        <div className="blur place_detail_information" style={{ backgroundColor: "gray" }}>
            <div className="container_wrapper" style={{ backgroundColor: "#fff" }}>
                <div className="profile">
                    <div className="close_button hover_style_2">
                        <CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false); }} />
                    </div>
                    <div className="edit_place_info">
                        <div className='edit_title'><span className='page_title logo_color_text'>Update Restaurant Information</span></div>
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
                                        <img src={formData.profilePicture ? formData.profilePicture : `${process.env.PUBLIC_URL}/images/generative-image.png`} alt="Profile" className="profile_image" onClick={() => { pictureInput.current.click(); }} />
                                        {formData.profilePicture && <button onClick={() => removePicture('profilePicture')} className="small_white_circle"><CIcon icon={cilX} className="icon_size_22" /></button>}
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
                                        <img src={formData.coverPicture ? formData.coverPicture : `${process.env.PUBLIC_URL}/images/generative-image.png`} style={{ objectFit: formData.coverPicture ? 'cover' : 'contain' }} alt="Cover" className="cover_image" onClick={() => { coverInput.current.click(); }} />
                                        {formData.coverPicture && <button onClick={() => removePicture('coverPicture')} className="small_white_circle" style={{ zIndex: '99' }}><CIcon icon={cilX} className="icon_size_22" /></button>}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="edit_place_info_basic">
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Restaurant Name
                                </div>
                                <div className="edit_place_info_basic_col full_width">
                                    <input
                                        className="edit_place_info_basic_input"
                                        name="restaurantName"
                                        value={formData.restaurantName}
                                        onChange={handleChange}
                                        // style={{width: '300px'}}
                                        required
                                    />
                                    {errors.restaurantName && <span className="error_message">{errors.restaurantName}</span>}
                                </div>
                            </div>

                            {/* <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Category
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }} className='edit_city'>
                                    <Autocomplete
                                        id="filter-demo"
                                        options={foodVenueTypes}
                                        getOptionLabel={(option) => option.type}
                                        filterOptions={filterOptions}
                                        sx={{ width: 340 }}
                                        // sx={{ width: '100%' }}
                                        value={formData.category}
                                        onChange={handleCategoryChange}
                                        name="category"
                                        className='full_width'
                                        renderInput={(params) => <TextField {...params} />}
                                        required
                                    />
                                </div>
                            </div> */}

                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Address
                                </div>
                                <div className="edit_place_info_basic_col full_width">
                                    <input
                                        className="edit_place_info_basic_input"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        // style={{width: '600px'}}
                                        required
                                    />
                                    {errors.address && <span className="error_message">{errors.address}</span>}

                                </div>
                            </div>
                            {/* <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    City
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }} className='edit_city'>
                                    <Autocomplete
                                        id="filter-demo"
                                        options={johorBahruAreas}
                                        getOptionLabel={(option) => option}
                                        filterOptions={filterOptions}
                                        sx={{ width: 340 }}
                                        value={formData.city}
                                        onChange={handleCityChange}
                                        name="city"
                                        className='full_width'
                                        renderInput={(params) => <TextField {...params} />}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Postal Code
                                </div>
                                <div className="edit_place_info_basic_col full_width" style={{ width: '35%' }}>

                                    <input
                                        className="edit_place_info_basic_input"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder='Eg: 81300'
                                        // style={{ width: '35%' }}
                                        required
                                    />
                                    {errors.postalCode && <span className="error_message">{errors.postalCode}</span>}

                                </div>
                            </div> */}
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Latitude
                                </div>
                                <div className="edit_place_info_basic_col full_width" style={{ width: '35%' }}>
                                    <input
                                        className="edit_place_info_basic_input "
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleChange}
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
                                        value={formData.longitude}
                                        onChange={handleChange}
                                    // style={{ width: '35%' }}
                                    />
                                    {errors.longitude && <span className="error_message">{errors.longitude}</span>}
                                    <p style={{ color: 'gray', fontSize: '0.85rem' }}>Provide latitude and longitude to perform a better accuracy on the map.</p>
                                </div>
                            </div>
                            {/* <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    State
                                </div>
                                <input
                                    className="edit_place_info_basic_input "
                                    name="state"
                                    value="Johor"
                                    readOnly
                                    onChange={handleChange}
                                    style={{ width: '35%' }}
                                />
                            </div> */}
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
                                    />
                                </div>
                            </div>
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Price Range
                                </div>
                                <div className="edit_place_info_basic_col full_width" style={{ width: '35%' }}>
                                    <input
                                        className="edit_place_info_basic_input "
                                        name="latitude"
                                        value={formData.priceRange}
                                        onChange={handleChange}
                                    />
                                    {errors.priceRange && <span className="error_message">{errors.priceRange}</span>}
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
                            {/* <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Dish / Restaurant Type
                                </div>
                                <div style={{ width: '70%' }}>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={restaurantTypes}
                                        getOptionLabel={(option) => option}
                                        onChange={handleDishTypeChange} // Handle change
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                            />
                                        )}
                                    />
                                </div>
                            </div> */}
                        </div>
                        <div className="edit_place_info_basic">
                            {/* {placeOtherInformation.map((info, index) => (
                                <div className="edit_place_info_basic_row" key={index}>
                                    <div className="edit_place_info_basic_label">
                                        {info}
                                    </div>
                                    <div className='' style={{ width: '70%' }}>
                                        <ColorToggleButton value={formData.otherinfo[info]}
                                            onChange={handleOtherInfoToggle(info)} />
                                    </div>
                                </div>
                            ))} */}
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
