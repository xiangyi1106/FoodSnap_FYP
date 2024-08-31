import React from "react"
import { useFormik, FieldArray, FormikProvider } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import TextInput from "../../components/inputs/TextInput"

export function PasswordForm() {
  // const [initialValues, setInitialValues] = useState(null)

  // useEffect(() => {
  //     // Fetch the initial values from the database
  //     fetchInitialValues().then((data) => {
  //         setInitialValues(data)
  //     })
  // }, [fetchInitialValues])

  const profileFormSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    name: Yup.string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must not be longer than 50 characters.")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  })

  const formik = useFormik({
    initialValues: {
      username: "user123", // Example: assuming username is pre-filled and cannot be edited
      name: "",
      email: "",
    },
    validationSchema: profileFormSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
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

        <TextInput
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          formik={formik}
          description="This is the email address associated with your account."
        />
        <button type="submit" className="profile_form_button">
          Update profile
        </button>
      </form>
    </FormikProvider>
  )
}
