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
import { toast } from 'react-toastify';
import { handleImage } from "../../../functions/handleImage";
import { useNavigate } from "react-router-dom";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export function EditEventForm({ user, eventId, setVisible }) {
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

    const [initialValues, setInitialValues] = useState({
        eventName: "",
        date: "",
        time: "",
        endDate: "",
        endTime: "",
        location: "",
        description: "",
        eventImage: "",
        privacy: "public",
    });

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/event/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const event = response.data;
                // Format the date to 'yyyy-MM-dd'
                const formattedDate = new Date(event.date).toISOString().slice(0, 10);
                const formattedEndDate = response.data.endDate ? new Date(event.endDate).toISOString().slice(0, 10) : '';
                // Set initial values from the response
                setInitialValues({
                    eventName: event.name,
                    date: formattedDate,
                    time: event.time,
                    endDate: formattedEndDate,
                    endTime: event.endTime,
                    location: event.location.name,
                    description: event.description,
                    eventImage: event.image,
                    privacy: event.privacy,
                });
                setLocationText(event.location.name);
                setAddress(event.location); // Set the location in state
                setImage(event.image); // Set the image in state
            } catch (error) {
                console.error("Failed to fetch event data", error);
                toast.error("Failed to load event data.");
            }
        };

        fetchEventData();
    }, [eventId, user.token]);

    const eventFormSchema = Yup.object({
        eventName: Yup.string()
            .min(1, "Event name must be at least 1 characters.")
            .max(100, "Event name must not exceed 100 characters.")
            .required("Event name is required"),
        date: Yup.date()
            .required("Event date is required")
            .test("is-future-date", "Event date cannot be in the past", function (value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set today's time to 00:00:00
                return value && new Date(value) >= today;
            }),
        time: Yup.string()
            .required("Event time is required")
            .matches(
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                "Invalid time format, please use HH:mm."
            )
            .test("is-future-time", "Event time cannot be in the past", function (value) {
                const { date } = this.parent; // Get the selected event date
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
            .max(500, "Description must not exceed 500 characters."),
        privacy: Yup.string().required("Privacy setting is required"),
    });

    const updatePicture = async (img) => {
        try {
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/event`;
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

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Ensures formik updates when initialValues change
        validationSchema: eventFormSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                // If an event image is selected, upload it
                if (image) {
                    // Await the promise to resolve
                    const pic = await updatePicture(image);

                    if (pic && pic.length > 0 && pic[0].url) {
                        // Directly set the image URL in the values object
                        values.eventImage = pic[0].url;
                    } else {
                        values.eventImage = '';
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

                // Finally, post the event data to the backend
                const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/event/update/${eventId}`, values, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                // Ensure the event was successfully updated
                if (response.status === 200) {
                    console.log(response.data);

                    toast.success("Event updated successfully!");
                    // Navigate to the event details page after confirming the update is successful
                    setVisible(false);

                    navigate(`/foodEvent/${eventId}`, { replace: true });
                }
            } catch (error) {
                toast.error("Failed to create event: " + (error.response?.data?.message || error.message));
            }
            setLoading(false);

        },
    });

    const pictureInput = useRef(null);

    const handlePictureChange = (event, setFieldValue, type) => {
        const file = event.target.files[0];
        if (file) {
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
    };

    const handleItemClick = (index) => {
        const selectedItem = locationList[index]; // Access the selected item directly from the list
        // Set the location state with the full address details
        const selectedAddress = {
            place_id: selectedItem.place_id,
            name: selectedItem.display_name,
            address: selectedItem.address,
            latitude: selectedItem.lat,
            longitude: selectedItem.lon,
        };

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
                        htmlFor="eventImage"
                        style={{ fontWeight: "500", fontFamily: "Source Sans 3, sans-serif" }}
                    >
                        Upload Event Picture
                    </label>
                    <input
                        type="file"
                        id="eventImage"
                        accept="image/*"
                        hidden
                        ref={pictureInput}
                        onChange={(e) => handlePictureChange(e, formik.setFieldValue, "eventImage")}
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
                                onClick={() => removePicture(formik.setFieldValue, "eventImage")}
                                className="small_white_circle"
                                style={{ zIndex: "99" }}
                            >
                                <CIcon icon={cilX} className="icon_size_22" />
                            </button>
                        )}
                    </div>
                </div>
                <TextInput
                    label="Event Name"
                    id="eventName"
                    name="eventName"
                    placeholder="Enter the event name"
                    formik={formik}
                    description="Provide the name of the event."
                    value={formik.values.eventName || ''}
                />

                <TextInput
                    label="Date"
                    id="date"
                    name="date"
                    type="date"
                    formik={formik}
                    description="Select the date of the event."
                    minDate={today}
                    value={formik.values.date || ''}
                />

                <TextInput
                    label="Time"
                    id="time"
                    name="time"
                    type="time"
                    formik={formik}
                    description="Select the time of the event."
                    value={formik.values.time || ''}

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
                                description="Select the end date of the event."
                                value={formik.values.endDate || ''}

                            />

                            <TextInput
                                label="End Time"
                                id="endTime"
                                name="endTime"
                                type="time"
                                formik={formik}
                                description="Select the end time of the event."
                                value={formik.values.endTime || ''}

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
                        placeholder="Enter the location of the event"
                        value={locationText} // Use local state for the input value
                        onChange={handleLocationSearch} // Trigger location search
                    />
                    <p className="profile_form_description">{"Provide the location where the event will take place."}</p>
                </div>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {locationList.map((loc, index) => (
                            <ListItem
                                key={index}
                                button
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
                    placeholder="Enter a brief description of the event"
                    formik={formik}
                    description="Provide details about the event."
                    value={formik.values.description || ''}

                />
                <button
                    type="submit"
                    className="event_form_button profile_form_button"
                >
                    {/* Update Event */}
                  {loading ? <CircularProgress size={30} sx={{ color: 'white' }} /> :  "Update Event" }
                </button>
            </form>
        </FormikProvider>
    );
}
