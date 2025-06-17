import React from "react"
import { useFormik, FieldArray, FormikProvider } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import TextInput from "../../components/inputs/TextInput"
import { toast } from "react-toastify"
import axios from "axios"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie";

export function SettingsForm({ user }) {

  const profileFormSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    name: Yup.string()
      .min(1, "Name must be at least 1 characters.")
      .max(50, "Name must not be longer than 50 characters.")
      .required("Name is required"),
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is required"),
  })
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: user.username || "", 
      name: user.name || "",
      // email: "",
    },
    validationSchema: profileFormSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${user.id}/update-name`,
          {
            name: values.name,  // Send only the updated name to the backend
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,  // Include the Authorization header with Bearer token
            },
          }
        )

        if (response.status === 200) {
          toast.success("Name updated successfully!");
          const updatedUser = {
            ...user,
            name: response.data.name,
          };
          Cookies.set("user", JSON.stringify(updatedUser));

          dispatch({
            type: "UPDATENAME",
            name: response.data.name,
          });
        } else {
          toast.error(response.data.message || "An error occurred while updating the name.")
        }
      } catch (error) {
        toast.error("An error occurred while updating the name.")
      }
    },
  })

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="profile_form_space_y_8"
      >
        <TextInput
          label="Username"
          id="username"
          name="username"
          formik={formik}
          disabled
          description="This is your unique username that identifies you across the platform. It cannot be changed."
        />

        <TextInput
          label="Name"
          id="name"
          name="name"
          placeholder="Enter your name"
          formik={formik}
          description="This is your public display name. It can be your real name or a pseudonym."
        />

        {/* <TextInput
          label="Email"
          id="email"
          name="email"
          type="email"
          // placeholder="Enter your email"
          formik={formik}
          disabled
          description="This is the email address associated with your account."
        /> */}
        <button type="submit" className="profile_form_button">
          Update profile
        </button>
      </form>
    </FormikProvider>
  )
}
