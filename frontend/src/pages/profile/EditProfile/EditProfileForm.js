import React, { useEffect, useState } from "react"
import { useFormik, FormikProvider } from "formik"
import * as Yup from "yup"
import TextInput from "../../../components/inputs/TextInput"
import { MenuItem } from "@mui/material"
import axios from "axios"
import { toast } from "react-toastify"
import { updateProfile } from "../../../functions/user"
import { useDispatch } from "react-redux"

export function EditProfileForm({ user, profile, dispatch }) {
    const profileFormSchema = Yup.object({
        // birthday: Yup.date(),
        about: Yup.string()
            .min(1, "About section must be at least 1 characters.")
            .max(500, "About section must not exceed 500 characters."),
        currentCity: Yup.string()
            .min(1, "City name must be at least 1 characters.")
            .max(100, "City name must not be longer than 100 characters."),
        favouriteFood: Yup.string()
            .min(1, "Food name must be at least 1 characters.")
            .max(200, "Food name must not be longer than 200 characters."),
        facebook: Yup.string(),
        instagram: Yup.string(),
        youtube: Yup.string(),
    })

    const [initialValues, setInitialValues] = useState({
        birthday: "",
        about: "",
        currentCity: "",
        favouriteFood: "",
        facebook: "",
        instagram: "",
        youtube: "",
        gender: "",
    });

    useEffect(() => {
        console.log(profile);
        const fetchProfileData = async () => {
            try {
                // // Check if bYear, bMonth, and bDay are not empty
                // let birthday = "";
                // if (profile.bYear && profile.bMonth && profile.bDay) {
                //     // If all values are present, combine them into a valid date
                //     birthday = new Date(profile.bYear, profile.bMonth - 1, profile.bDay).toISOString().split('T')[0];
                // }
                const formatBirthday = (birthday) => {
                    if (birthday) {
                        // Ensure the date is in yyyy-MM-dd format
                        return new Date(birthday).toISOString().split('T')[0];
                    }
                    return "";
                };

                setInitialValues({
                    birthday: formatBirthday(profile.birthday) || '',
                    about: profile.details.about,
                    currentCity: profile.details.currentCity,
                    favouriteFood: profile.details.favouriteFood,
                    facebook: profile.details.facebook,
                    instagram: profile.details.instagram,
                    youtube: profile.details.youtube,
                    gender: profile.gender
                });

            } catch (error) {
                console.error("Failed to fetch profile", error);
                toast.error("Failed to fetch profile, please try again.");
            }
        };

        fetchProfileData();
    }, [user._id, user.token]);


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: profileFormSchema,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            try {
                const response = await updateProfile(values, user);
                console.log(response);

                if (response.success) {
                    toast.success("Profile updated successfully");
                    dispatch({
                        type: "PROFILE_UPDATE_SUCCESS",
                        payload: response.updatedFields, // Assuming `response.profile` contains the updated profile data
                    });

                } else {
                    toast.error(response.message || "Failed to update profile");
                }

            } catch (error) {
                console.error("Error updating profile:", error);
                toast.error("An error occurred while updating your profile. Please try again.");
            }
        },
    })

    const genders = [
        {
            value: 'male',
            label: 'male',
        },
        {
            value: 'female',
            label: 'female',
        },
        {
            value: 'secret',
            label: 'secret',
        },
    ];

    return (
        <FormikProvider value={formik}>
            <form
                onSubmit={formik.handleSubmit}
                className="profile_form_space_y_8"
            >
                <TextInput
                    label="About"
                    id="about"
                    name="about"
                    isTextarea
                    placeholder="Tell us a little bit about yourself"
                    formik={formik}
                    description="Tell others a little bit about yourself. This will be visible on your profile page."
                />

                <div className="profile_form_item">
                    <label className="profile_form_label" htmlFor="gender">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        className="profile_form_input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                    >              
                        {genders.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                        <div className="profile_form_message">{formik.errors.gender}</div>
                    ) : null}
                    <p className="profile_form_description">
                        Tell others about your gender.
                    </p>
                </div>
                <TextInput
                    label="Birthday"
                    id="birthday"
                    name="birthday"
                    formik={formik}
                    type="date"
                    description="Tell others about your birthday."
                />


                <TextInput
                    label="Current City"
                    id="currentCity"
                    name="currentCity"
                    placeholder="Enter your current city"
                    formik={formik}
                    description="Let others know where you're currently located."
                />
                <TextInput
                    label="Favourite Food"
                    id="favouriteFood"
                    name="favouriteFood"
                    placeholder="Enter your favourite food"
                    formik={formik}
                    description="Share your favorite food with others. This will be visible on your profile and can help connect you with other food enthusiasts."
                />
                <TextInput
                    label="Facebook"
                    id="facebook"
                    name="facebook"
                    placeholder="Enter your Facebook name"
                    formik={formik}
                    description=" You can put your Facebook profile name here if you'd like to share your social media presence with others. This is optional."
                />
                <TextInput
                    label="Instagram"
                    id="instagram"
                    name="instagram"
                    placeholder="Enter your Instagram name"
                    formik={formik}
                    description=" You can put your Instagram profile name here if you'd like to share your social media presence with others. This is optional."
                />
                <TextInput
                    label="Youtube"
                    id="youtube"
                    name="youtube"
                    placeholder="Enter your Youtube channel name"
                    formik={formik}
                    description=" You can put your Youtube channel name here if you'd like to share your social media presence with others. This is optional."
                />
                <button type="submit" className="profile_form_button">
                    Update Profile
                </button>
            </form>
        </FormikProvider>
    )
}
