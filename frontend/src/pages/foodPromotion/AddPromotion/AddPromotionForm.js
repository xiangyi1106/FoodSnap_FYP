import React, { useState, useRef, useCallback, useEffect } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import TextInput from "../../../components/inputs/TextInput";
import { MenuItem, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, CircularProgress, List, ListItem, ListItemText, ListItemIcon, Autocomplete, TextField } from "@mui/material";
import CIcon from '@coreui/icons-react';
import { cilX, cilLocationPin } from '@coreui/icons';
import debounce from 'lodash/debounce';
import axios from "axios";
import { uploadMedias } from "../../../functions/uploadMedia";
import dataURItoBlob from "../../../helpers/dataURItoBlob";
import { ToastContainer, toast } from 'react-toastify';
import { handleImage } from "../../../functions/handleImage";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export function AddPromotionForm({ user, setIsCreatePromotionVisible }) {
    const [showEndDate, setShowEndDate] = useState(false);
    const [locationText, setLocationText] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState('');
    const [foodVenue, setFoodVenue] = useState(''); // Optional food venue from DB
    const [address, setAddress] = useState([]);
    const today = new Date();
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const promotionFormSchema = Yup.object({
        promotionName: Yup.string()
            .min(1, "Promotion name must be at least 1 characters.")
            .max(100, "Promotion name must not exceed 100 characters.")
            .required("Promotion name is required"),
        date: Yup.date()
            .required("Promotion date is required")
            .test("is-future-date", "Promotion date cannot be in the past", function (value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set today's time to 00:00:00
                return value && new Date(value) >= today;
            }),
        time: Yup.string()
            .required("Promotion time is required")
            .matches(
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                "Invalid time format, please use HH:mm."
            )
            .test("is-future-time", "Promotion time cannot be in the past", function (value) {
                const { date } = this.parent; // Get the selected promotion date
                const selectedDate = new Date(date);
                const selectedTime = value.split(":");
                const selectedDateTime = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    selectedTime[0],
                    selectedTime[1]
                );
                return selectedDateTime >= new Date(); // Compare selected date & time to current date & time
            }),
        description: Yup.string()
            // .min(10, "Description must be at least 10 characters.")
            .max(500, "Description must not exceed 500 characters."),
        termsAndConditions: Yup.string()
            // .min(10, "Description must be at least 10 characters.")
            .max(500, "Term And Condition must not exceed 500 characters."),
        privacy: Yup.string().required("Privacy setting is required"),
    });

    const updatePicture = async (img) => {
        try {
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/promotion`;
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

    const formik = useFormik({
        initialValues: {
            promotionName: "",
            date: "",
            time: "",
            endDate: "",
            endTime: "",
            location: "",
            description: "",
            termsAndConditions: "",
            // organizer: "",
            promotionImage: null,
            // promotionType: "faceToFace",
            privacy: "public",
            // tags: "",
            // foodVenue: "",
        },
        validationSchema: promotionFormSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // If an promotion image is selected, upload it
                if (image) {
                    // Await the promise to resolve
                    const pic = await updatePicture(image);

                    if (pic && pic.length > 0 && pic[0].url) {
                        // Directly set the image URL in the values object
                        values.promotionImage = pic[0].url;
                    } else {
                        values.promotionImage = null;
                    }
                }

                // Now process the location: check if address is selected from suggestions
                if (!address || !address.latitude || !address.longitude) {
                    const manualAddress = locationText;
                    const addressText = {
                        fullAddress: manualAddress,
                    };

                    // Set the manually entered location data
                    const locationData = {
                        name: manualAddress,
                        address: addressText,
                        latitude: null, // No latitude available
                        longitude: null, // No longitude available
                    };

                    // formik.setFieldValue('location', locationData);
                    values.location = locationData;
                }

                // Finally, post the promotion data to the backend
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addPromotion`, values, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                //   // Handle success response
                console.log(response.data);
                toast.success("Promotion created successfully!");
                setIsCreatePromotionVisible(false);

                // Optionally reset the form after successful submission
                //   resetForm();
            } catch (error) {
                console.error("Error creating promotion:", error);
                toast.error("Failed to create promotion: " + (error.response?.data?.message || error.message));
            }
        },
    });

    const pictureInput = useRef(null);

    const handlePictureChange = (promotion, setFieldValue, type) => {
        const file = promotion.target.files[0];
        // if (file) {
        //     setFieldValue(type, URL.createObjectURL(file));
        // }
        if (file) {
            // setFieldValue(type, file);
            handleImage(file, setError, setImage); // Use the imported handleImage function
        }
    };

    const removePicture = (setFieldValue, type) => {
        setFieldValue(type, '');
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
        const query = e.target.value;
        setLocationText(query);
        debouncedSearch(query); // Call the memoized debounced search function
        console.log('Location search input:', query);
    };

    const handleItemClick = (index) => {
        const selectedItem = locationList[index]; // Access the selected item directly from the list
        // Set the location state with the full address details
        const selectedAddress = {
            place_id: selectedItem.place_id,
            name: selectedItem.display_name,
            address: selectedItem.address,
            // city: selectedItem.address.city || selectedItem.address.town || selectedItem.address.village || '',
            // postcode: selectedItem.address.postcode || '',
            latitude: selectedItem.lat,
            longitude: selectedItem.lon,
        };

        // Log the selected address to check city and postcode
        console.log('Selected Address:', selectedAddress);

        setAddress(selectedAddress); // Store the selected address in state
        formik.setFieldValue('location', selectedAddress); // Update formik value
        setLocationText(selectedItem.display_name); // Update input state with selected location
        setLocationList([]); // Clear location list after selection
    };

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="event_form_space_y_8">
                <div className="image_upload_section" style={{ width: "100%" }}>
                    <label
                        htmlFor="promotionImage"
                        style={{ fontWeight: "500", fontFamily: "Source Sans 3, sans-serif" }}
                    >
                        Upload Promotion Picture
                    </label>
                    <input
                        type="file"
                        id="promotionImage"
                        accept="image/*"
                        hidden
                        ref={pictureInput}
                        onChange={(e) => handlePictureChange(e, formik.setFieldValue, "promotionImage")}
                    />
                    <div className="image_preview_container">
                        <img
                            src={
                                image
                                    ? image
                                    : "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png"
                            }
                            alt="Cover"
                            className="cover_image"
                            onClick={() => {
                                pictureInput.current.click();
                            }}
                        />
                        {image && (
                            <button
                                onClick={() => removePicture(formik.setFieldValue, "promotionImage")}
                                className="small_white_circle"
                                style={{ zIndex: "99" }}
                            >
                                <CIcon icon={cilX} className="icon_size_22" />
                            </button>
                        )}
                    </div>
                </div>
                <TextInput
                    label="Promotion Name"
                    id="promotionName"
                    name="promotionName"
                    placeholder="Enter the promotion name"
                    formik={formik}
                    description="Provide the name of the promotion."
                />

                <TextInput
                    label="Date"
                    id="date"
                    name="date"
                    type="date"
                    formik={formik}
                    description="Select the date of the promotion."
                    minDate={today}
                />

                <TextInput
                    label="Time"
                    id="time"
                    name="time"
                    type="time"
                    formik={formik}
                    description="Select the time of the promotion."
                />
                <div>
                    <button
                        type="button"
                        onClick={() => setShowEndDate(!showEndDate)}
                        className="toggle_end_date_button"
                    >
                        {showEndDate ? "Remove End Date & Time" : "Add End Date & Time"}
                    </button>

                    {showEndDate && (
                        <>
                            <TextInput
                                label="End Date"
                                id="endDate"
                                name="endDate"
                                type="date"
                                formik={formik}
                                description="Select the end date of the promotion."
                            />

                            <TextInput
                                label="End Time"
                                id="endTime"
                                name="endTime"
                                type="time"
                                formik={formik}
                                description="Select the end time of the promotion."
                            />
                        </>
                    )}

                </div>
                <div className="profile_form_item">
                    <label className="profile_form_label">
                        Location
                    </label>
                    <input
                        className="profile_form_input"
                        name="location"
                        placeholder="Enter the location of the promotion"
                        value={locationText} // Use local state for the input value
                        onChange={handleLocationSearch} // Trigger location search
                    />
                    <p className="profile_form_description">{"Provide the location where the promotion will take place."}</p>
                </div>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {locationList.map((loc, index) => (
                            <ListItem
                                key={index}
                                button
                                // onClick={() => {
                                //     formik.setFieldValue('location', loc.display_name); // Update formik value
                                //     setLocationText(loc.display_name); // Update input state with selected location
                                //     setLocationList([]); // Clear location list after selection
                                // }}
                                onClick={() => handleItemClick(index)}
                            >
                                <ListItemIcon>
                                    <CIcon icon={cilLocationPin} className="icon_size_22" />
                                </ListItemIcon>
                                <ListItemText primary={loc.display_name} />
                            </ListItem>
                        ))}
                    </List>
                )}

                <TextInput
                    label="Description"
                    id="description"
                    name="description"
                    isTextarea
                    placeholder="Enter a brief description of the promotion"
                    formik={formik}
                    description="Provide details about the promotion."
                />
                <TextInput
                    label="Term and Condition"
                    id="termsAndConditions"
                    name="termsAndConditions"
                    isTextarea
                    placeholder="Enter terms and conditions of the promotion"
                    formik={formik}
                    description="Provide terms and conditions about the promotion."
                />

                <div>
                    <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                        <FormLabel component="legend" style={{ color: 'black', fontSize: '0.9rem', marginBottom: '0.5rem', }}>Privacy</FormLabel>
                        <RadioGroup
                            row
                            aria-label="privacy"
                            name="privacy"
                            value={formik.values.privacy}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel
                                value="public"
                                control={<Radio sx={{
                                    color: "#30BFBF",
                                    '&.Mui-checked': {
                                        color: "#30BFBF",
                                    }
                                }} />}
                                label="Public"
                            />
                            <FormControlLabel
                                value="followers"
                                control={<Radio sx={{
                                    color: "#30BFBF",
                                    '&.Mui-checked': {
                                        color: "#30BFBF",
                                    }
                                }} />}
                                label="Followers"
                            />
                            <FormControlLabel
                                value="private"
                                control={<Radio sx={{
                                    color: "#30BFBF",
                                    '&.Mui-checked': {
                                        color: "#30BFBF",
                                    }
                                }} />}
                                label="Private"
                            />
                        </RadioGroup>
                    </FormControl>
                    <p className="profile_form_description">Select the privacy of the promotion.</p>
                </div>

                {/* <TextInput
                    label="Organizer"
                    id="organizer"
                    name="organizer"
                    placeholder="Enter the organizer's name"
                    formik={formik}
                    description="Provide the name of the promotion organizer."
                /> */}

                {/* <TextInput
                    label="Tags"
                    id="tags"
                    name="tags"
                    placeholder="Enter promotion tags"
                    formik={formik}
                    description="Provide relevant tags for the promotion."
                /> */}

                {/* Food venue search and select dropdown */}
                {/* <div className="profile_form_item">
                    <label htmlFor="foodVenue" className="profile_form_label">Food Venue</label>
                    <Autocomplete
                        id="foodVenue"
                        options={foodVenues}
                        getOptionLabel={(option) => option.name} // Display venue name in the combobox
                        value={selectedVenue} // Controlled value
                        onChange={(promotion, newValue) => setSelectedVenue(newValue)} // Handle value change
                        inputValue={searchTerm} // Controlled input value (typed by user)
                        onInputChange={(promotion, newInputValue) => setSearchTerm(newInputValue)} // Handle input change for filtering
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Type to search for a venue" />
                        )}
                    />
                    <p className="profile_form_description">Select the food venue of the promotion if available.</p>
                </div> */}

                <button
                    type="submit"
                    className="event_form_button profile_form_button"
                >
                    Add Promotion
                </button>
            </form>
        </FormikProvider>
    );
}
