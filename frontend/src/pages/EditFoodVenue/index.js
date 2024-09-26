import React, { useCallback, useRef, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';
import './EditPlaceInfo.css';
import TextInput from './TextInput';  // Import the TextInput component
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import restaurantTypes from '../../data/restaurantType';
import johorBahruAreas from '../../data/johorBahruAreas';
import OpeningHours from './OpeningHours';
import placeOtherInformation from '../../data/placeOtherInformation';
import ColorToggleButton from './ToggleButton';

export default function EditPlace({ setVisible }) {
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
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
    });
    const pictureInput = useRef(null);
    const coverInput = useRef(null);

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

    const handleChargeChange = (event) => {
        const { name, value } = event.target;
        if (value === '') {
            setFormData(prevState => ({
                ...prevState,
                [name]: ''
            }));
            return;
        }
        const validNumber = /^-?\d*\.?\d*$/.test(value);
        if (!validNumber) return;
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
                        <div className='edit_title'>
                            <span className='page_title logo_color_text'>Update Restaurant Information</span>
                        </div>
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
                                        <img src={ formData.profilePicture ? formData.profilePicture : 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'} alt="Profile" className="profile_image" onClick={() => { pictureInput.current.click();}} />
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
                                        <img src={ formData.coverPicture ? formData.coverPicture : 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'} alt="Cover" className="cover_image"  onClick={() => { coverInput.current.click();}} />
                                        {formData.coverPicture && <button onClick={() => removePicture('coverPicture')} className="small_white_circle" style={{zIndex: '99'}}><CIcon icon={cilX} className="icon_size_22" /></button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="edit_place_info_basic">
                            <TextInput
                                label="Restaurant Name"
                                id="restaurantName"
                                name="restaurantName"
                                value={formData.restaurantName}
                                onChange={handleChange}
                                description="Enter the name of the restaurant."
                            />

                            <TextInput
                                label="Address"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                description="Enter the address of the restaurant."
                            />

                            <TextInput
                                label="Postal Code"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                description="Enter the postal code."
                                style={{ width: '35%' }}
                            />

                            <TextInput
                                label="City"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                description="Select the city from the list."
                                component={
                                    <Autocomplete
                                        id="filter-demo"
                                        options={johorBahruAreas}
                                        getOptionLabel={(option) => option}
                                        filterOptions={filterOptions}
                                        sx={{ width: 340 }}
                                        value={formData.area}
                                        onChange={handleChange}
                                        name="area"
                                        className='full_width'
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                }
                            />

                            <TextInput
                                label="State"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                description="State is Johor and is read-only."
                                style={{ width: '35%' }}
                                readOnly
                            />

                            <TextInput
                                label="Phone"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                description="Enter the phone number of the restaurant."
                                style={{ width: '35%' }}
                            />

                            <TextInput
                                label="Website"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                description="Enter the restaurant's website URL."
                            />

                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">Opening Hours</div>
                                <OpeningHours />
                            </div>

                            <TextInput
                                label="Description"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                isTextarea
                                description="Enter a description of the restaurant."
                                style={{ height: '120px' }}
                            />

                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">
                                    Dish / Drink / Service Charges (%) 
                                    <span style={{fontWeight: '400', fontFamily: "Source Sans 3, sans-serif", color: "#6c757d"}}> (0 to 100)</span>
                                </div>
                                <div className="edit_place_info_basic_row" style={{ width: '100%' }}>
                                    <TextInput
                                        label="Service Charge"
                                        id="serviceCharge"
                                        name="serviceCharge"
                                        value={formData.serviceCharge}
                                        onChange={handleChargeChange}
                                        style={{ width: '45%' }}
                                    />
                                    <TextInput
                                        label="SST Charge"
                                        id="sstCharge"
                                        name="sstCharge"
                                        value={formData.sstCharge}
                                        onChange={handleChargeChange}
                                        style={{ width: '45%' }}
                                    />
                                </div>
                            </div>

                            <div className="edit_place_info_basic_row">
                                <div className="edit_place_info_basic_label">Other Information</div>
                                <div className="edit_place_info_basic_row">
                                    {placeOtherInformation.map((info) => (
                                        <div key={info} style={{ width: '33%' }}>
                                            <ColorToggleButton
                                                label={info}
                                                checked={formData.otherInfo[info] === 'yesInfo'}
                                                onChange={handleOtherInfoToggle(info)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="edit_place_info_button">
                            <button className="btn btn-secondary" onClick={() => { setVisible(false); }}>
                                <CIcon icon={cilArrowLeft} className="icon_size_22" />
                                Back
                            </button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                <CIcon icon={cilCheckAlt} className="icon_size_22" />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
