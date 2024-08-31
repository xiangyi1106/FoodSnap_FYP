import React, { useRef } from 'react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import restaurantTypes from '../../data/restaurantType';
import johorBahruAreas from '../../data/johorBahruAreas';
import placeOtherInformation from '../../data/placeOtherInformation';
import TextInput from '../../components/inputs/TextInput';
import ColorToggleButton from '../../components/PlaceProfile/ToggleButton';
import OpeningHours from '../../components/PlaceProfile/OpeningHours';

const validationSchema = Yup.object({
    restaurantName: Yup.string().required('Restaurant Name is required'),
    address: Yup.string().required('Address is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    phone: Yup.string().required('Phone is required'),
    website: Yup.string().url('Invalid URL format'),
    description: Yup.string(),
    serviceCharge: Yup.number().min(0).max(100, 'Service charge must be between 0 and 100'),
    sstCharge: Yup.number().min(0).max(100, 'SST charge must be between 0 and 100'),
});

export default function EditFoodVenueForm({ setVisible }) {
    const pictureInput = useRef(null);
    const coverInput = useRef(null);

    const handlePictureChange = (event, setFieldValue, type) => {
        const file = event.target.files[0];
        if (file) {
            setFieldValue(type, URL.createObjectURL(file));
        }
    };

    const removePicture = (setFieldValue, type) => {
        setFieldValue(type, null);
    };

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option,
    });

    return (
        <Formik
            initialValues={{
                restaurantName: '',
                address: '',
                postalCode: '',
                city: '',
                state: 'Johor',
                phone: '',
                website: '',
                description: '',
                otherInfo: placeOtherInformation.reduce((acc, info) => ({ ...acc, [info]: 'noInfo' }), {}),
                serviceCharge: 0,
                sstCharge: 0,
                profilePicture: null,
                coverPicture: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                setVisible(false);
            }}
        >
            {(formik) => (
                <Form className="blur place_detail_information" style={{ backgroundColor: "gray" }}>
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
                                            <label htmlFor="profilePicture" style={{ fontWeight: '500', fontFamily: "Source Sans 3, sans-serif" }}>Upload Profile Picture</label>
                                            <input
                                                type="file"
                                                id="profilePicture"
                                                accept="image/*"
                                                hidden
                                                ref={pictureInput}
                                                onChange={(e) => handlePictureChange(e, formik.setFieldValue, 'profilePicture')}
                                            />
                                            <div className="image_preview_container">
                                                <img src={formik.values.profilePicture ? formik.values.profilePicture : 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'} alt="Profile" className="profile_image" onClick={() => { pictureInput.current.click(); }} />
                                                {formik.values.profilePicture && <button onClick={() => removePicture(formik.setFieldValue, 'profilePicture')} className="small_white_circle"><CIcon icon={cilX} className="icon_size_22" /></button>}
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
                                                onChange={(e) => handlePictureChange(e, formik.setFieldValue, 'coverPicture')}
                                            />
                                            <div className="image_preview_container">
                                                <img src={formik.values.coverPicture ? formik.values.coverPicture : 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'} alt="Cover" className="cover_image" onClick={() => { coverInput.current.click(); }} />
                                                {formik.values.coverPicture && <button onClick={() => removePicture(formik.setFieldValue, 'coverPicture')} className="small_white_circle" style={{ zIndex: '99' }}><CIcon icon={cilX} className="icon_size_22" /></button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="edit_place_info_basic">
                                    <TextInput label="Restaurant Name" name="restaurantName" value={formik.values.restaurantName}  />
                                    <TextInput label="Address" name="address" value={formik.values.address}  />
                                    <TextInput label="Postal Code" name="postalCode" value={formik.values.postalCode}  style={{ width: '35%' }} />
                                    <TextInput label="Phone" name="phone" value={formik.values.phone}  style={{ width: '35%' }} />
                                    <TextInput label="Website" name="website" value={formik.values.website}  />
                                    <TextInput label="Description" name="description" value={formik.values.description}  multiline rows={4} />

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
                                                value={formik.values.city}
                                                onChange={(e, value) => formik.setFieldValue("city", value)}
                                                name="city"
                                                className='full_width'
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </div>
                                    </div>

                                    <TextInput label="State" name="state" value={formik.values.state} readOnly />

                                    <div className="edit_place_info_basic_row">
                                        <div className="edit_place_info_basic_label">
                                            Opening Hours
                                        </div>
                                        <OpeningHours />
                                    </div>

                                    <div className="edit_place_info_basic_row">
                                        <div className="edit_place_info_basic_label">
                                            Dish / Restaurant Type
                                        </div>
                                        <div style={{ width: '70%' }}>
                                            <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={restaurantTypes}
                                                getOptionLabel={(option) => option}
                                                filterOptions={filterOptions}
                                                onChange={(e, value) => formik.setFieldValue("restaurantType", value)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="edit_place_info_basic">
                                    {placeOtherInformation.map((info, index) => (
                                        <div className="edit_place_info_basic_row" key={index}>
                                            <div className="edit_place_info_basic_label">
                                                {info}
                                            </div>
                                            <div className="toggle_button_container">
                                                <ColorToggleButton
                                                    selectedValue={formik.values.otherInfo[info]}
                                                    onChange={(e, newValue) => formik.setFieldValue(`otherInfo.${info}`, newValue)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="edit_place_info_basic">
                                    <TextInput label="Service Charge (%)" name="serviceCharge" value={formik.values.serviceCharge}  />
                                    <TextInput label="SST (%)" name="sstCharge" value={formik.values.sstCharge}  />
                                </div>
                            </div>

                            <div className="edit_place_action_button">
                                <button className="btn cancel_button hover_style_2" type="button" onClick={() => { setVisible(false); }}>
                                    <CIcon icon={cilArrowLeft} className="icon_size_22" />
                                    Cancel
                                </button>
                                <button className="btn submit_button hover_style_2" type="submit">
                                    <CIcon icon={cilCheckAlt} className="icon_size_22" />
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
