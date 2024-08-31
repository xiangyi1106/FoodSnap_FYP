import React from "react"
import { useFormik, FormikProvider } from "formik"
import * as Yup from "yup"
import TextInput from "../../../components/inputs/TextInput"
import { MenuItem } from "@mui/material"

export function EditProfileForm() {
    const profileFormSchema = Yup.object({
        birthday: Yup.date().required("Birthday is required"),
        about: Yup.string()
            .min(10, "About section must be at least 10 characters.")
            .max(300, "About section must not exceed 300 characters."),
        currentCity: Yup.string()
            .min(2, "City name must be at least 2 characters.")
            .max(50, "City name must not be longer than 50 characters."),
        favouriteFood: Yup.string()
            .min(2, "Food name must be at least 2 characters.")
            .max(50, "Food name must not be longer than 50 characters."),
        facebook: Yup.string(),
        instagram: Yup.string(),
        youtube: Yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            username: "user123", // Example: assuming username is pre-filled and cannot be edited
            name: "",
            email: "",
            birthday: "",
            about: "",
            currentCity: "",
            favouriteFood: "",
            facebook: "",
            instagram: "",
        },
        validationSchema: profileFormSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    const genders = [
        {
            value: 'male',
            label: 'Male',
        },
        {
            value: 'female',
            label: 'Female',
        },
        {
            value: 'secret',
            label: 'Secret',
        },
    ];

    return (
        <FormikProvider value={formik}>
            <form
                onSubmit={formik.handleSubmit}
                className="profile_form_space_y_8"
            >

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
                    >              <select
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
                    label="About"
                    id="about"
                    name="about"
                    isTextarea
                    placeholder="Tell us a little bit about yourself"
                    formik={formik}
                    description="Tell others a little bit about yourself. This will be visible on your profile page."
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
                    placeholder="Enter your Youtube Channel name"
                    formik={formik}
                    description=" You can put your Youtube Channel name here if you'd like to share your social media presence with others. This is optional."
                />
                <button type="submit" className="profile_form_button">
                    Update Profile
                </button>
            </form>
        </FormikProvider>
    )
}
