import React, { useCallback, useRef, useState } from 'react';
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

export default function EditPlaceInfo({ setVisible }) {
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
        // area: '',
        postalCode: '',
        city: '',
        state: '',
        phone: '',
        website: '',
        description: '',
        otherInfo: placeOtherInformation.reduce((acc, info) => ({ ...acc, [info]: 'noInfo' }), {}),
        serviceCharge: 0,
        sstCharge: 0,
        profilePicture: null,
        coverPicture: null,
        // otherInfo: {
        //     halalOptions: 'noInfo',
        //     vegetarianOptions: 'noInfo',
        //     airConditioning: 'noInfo',
        //     freeWiFi: 'noInfo',
        //     offersTakeout: 'noInfo',
        //     needsReservations: 'noInfo',
        //     alcoholicDrinks: 'noInfo',
        //     wheelchairAccessible: 'noInfo',
        //     dogsAllowed: 'noInfo',
        //     acceptsDebitCards: 'noInfo',
        //     acceptsCreditCards: 'noInfo',
        //     acceptsTngBoostQrPayment: 'noInfo',
        // }
    });
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

    //Handle input change for otherInfo
    const handleOtherInfoToggle = useCallback((info) => (event, newValue) => {
        if (newValue !== null) {
            setFormData(prevFormData => ({
                ...prevFormData,
                otherInfo: {
                    ...prevFormData.otherInfo,
                    [info]: newValue,
                },
            }));
        }
    }, [setFormData]);

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


    const handleSave = () => {
        // Handle save logic here
        console.log(formData);
        setVisible(false);
    };

    return (
        <div className="blur place_detail_information" style={{backgroundColor: "gray"}}>
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
                                    <label htmlFor="profilePicture" style={{fontWeight: '500', fontFamily: "Source Sans 3, sans-serif"}}>Upload Profile Picture</label>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        accept="image/*"
                                        hidden
                                        ref={pictureInput}
                                        onChange={(e) => handlePictureChange(e, 'profilePicture')}
                                    />
                                    <div className="image_preview_container">
                                        <img src={ formData.profilePicture? formData.profilePicture: 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'} alt="Profile" className="profile_image" onClick={() => { pictureInput.current.click();}}/>
                                        {formData.profilePicture && <button onClick={() => removePicture('profilePicture')} className="small_white_circle"><CIcon icon={cilX} className="icon_size_22" /></button>}
                                    </div>
                                </div>

                                <div className="image_upload_section">
                                    <label htmlFor="coverPicture" style={{fontWeight: '500', fontFamily: "Source Sans 3, sans-serif"}}>Upload Cover Picture</label>
                                    <input
                                        type="file"
                                        id="coverPicture"
                                        accept="image/*"
                                        hidden
                                        ref={coverInput}
                                        onChange={(e) => handlePictureChange(e, 'coverPicture')}
                                    />
                                    <div className="image_preview_container">
                                        <img src={ formData.coverPicture? formData.coverPicture: 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'} alt="Cover" className="cover_image"  onClick={() => { coverInput.current.click();}}/>
                                        {formData.coverPicture && <button onClick={() => removePicture('coverPicture')} className="small_white_circle" style={{zIndex: '99'}}><CIcon icon={cilX} className="icon_size_22" /></button>}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="edit_place_info_basic">
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Restaurant Name
                                </div>
                                <input
                                    className="edit_place_info_basic_input"
                                    name="restaurantName"
                                    value={formData.restaurantName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Address
                                </div>
                                <input
                                    className="edit_place_info_basic_input"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit_place_info_basic_row">
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
                                        // sx={{ width: '100%' }}
                                        value={formData.area}
                                        onChange={handleChange}
                                        name="area"
                                        className='full_width'
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                            </div>
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Postal Code
                                </div>
                                <input
                                    className="edit_place_info_basic_input full_width"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    style={{ width: '35%' }}
                                />
                            </div>
                            {/* <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    City
                                </div>
                                <input
                                    className="edit_place_info_basic_input"
                                    name="city"
                                    value="Johor Bahru"
                                    style={{ width: '35%' }}
                                    readOnly
                                />
                            </div> */}
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    State
                                </div>
                                <input
                                    className="edit_place_info_basic_input full_width"
                                    name="state"
                                    value="Johor"
                                    readOnly
                                    onChange={handleChange}
                                    style={{ width: '35%' }}
                                />
                            </div>
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Phone
                                </div>
                                <input
                                    className="edit_place_info_basic_input full_width"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={{ width: '35%' }}
                                />
                            </div>
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Website
                                </div>
                                <input
                                    className="edit_place_info_basic_input"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Opening Hours
                                </div>
                                <OpeningHours />
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
                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Dish / Restaurant Type
                                </div>
                                <div style={{ width: '70%' }}>
                                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={restaurantTypes}
                                        getOptionLabel={(option) => option}
                                        filterOptions={filterOptions}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                            />
                                        )}
                                    />
                                    {/* </div> */}
                                </div>

                            </div>
                        </div>
                        <div className="edit_place_info_basic">
                            {placeOtherInformation.map((info, index) => (
                                <div className="edit_place_info_basic_row" key={index}>
                                    <div className="edit_place_info_basic_label">
                                        {info}
                                    </div>
                                    <div className='' style={{ width: '70%' }}>
                                        <ColorToggleButton value={formData.otherInfo[info]}
                                            onChange={handleOtherInfoToggle(info)} />
                                        {/* {formData.hasServiceCharge && (
                                            <input
                                                type="number"
                                                placeholder="Percentage"
                                                value={info.serviceCharge.percentage}
                                                // onChange={(e) => handlePercentageChange(index, e.target.value)}
                                                min="0"
                                                max="100"
                                            />
                                        )} */}
                                    </div>
                                </div>
                            ))}
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    Service Charge
                                </div>
                                <input
                                    className="edit_place_info_basic_input full_width"
                                    name="serviceCharge"
                                    value={formData.serviceCharge}
                                    onChange={handleChargeChange}
                                    style={{ width: '35%' }}
                                    type='text'
                                />
                            </div>
                            <div className="edit_place_info_basic_row" >
                                <div className="edit_place_info_basic_label">
                                    SST Charge
                                </div>
                                <input
                                    className="edit_place_info_basic_input full_width"
                                    name="SSTCharge"
                                    value={formData.SSTCharge}
                                    onChange={handleChargeChange}
                                    style={{ width: '35%' }}
                                    type='text'
                                />
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
