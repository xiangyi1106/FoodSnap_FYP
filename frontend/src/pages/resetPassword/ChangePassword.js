import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RegisterInput from "../../components/inputs/registerInput";
import * as Yup from "yup";
import axios from "axios";
import Button from '@mui/material/Button';

export default function ChangePassword({
    error,
    setLoading,
    userInfos,
    setError,
}) {
    const navigate = useNavigate();
    const validatePassword = Yup.object({
        password: Yup.string()
            .required("Password is required.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and at least 8 characters and at most 30 characters."
            ),

        conf_password: Yup.string()
            .required("Please confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords do not match. Please make sure your passwords match."),
    });
    return (

        <div className="reset_form" style={{ height: "310px" }}>
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">Pick a strong password</div>
            <Formik
                enableReinitialize
                initialValues={{
                    password: "",
                    conf_password: "",
                }}
                validationSchema={validatePassword}
                onSubmit={
                    // changePassword();
                    async (values) => {
                        try {
                            const { email } = userInfos;

                            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
                                email: email,
                                password: values.password,
                            });
                            setError("");
                            navigate("/");

                        } catch (error) {
                            setLoading(false);
                            setError(error.response.data.message);
                        }
                    }
                }
            >
                {(formik) => (
                    <Form>
                        <div className="reset_input">
                            <div className="reset_input_password">
                                <RegisterInput
                                    type="password"
                                    name="password"
                                    // onChange={(e) => setPassword(e.target.value)}
                                    label="New password"
                                    autoFocus
                                />
                            </div>
                            <div className="reset_input_password">
                                <RegisterInput
                                    type="password"
                                    name="conf_password"
                                    // onChange={(e) => setConf_password(e.target.value)}
                                    label="Confirm new password"
                                />
                            </div>
                            {error && <div className="input_error">{error}</div>}

                        </div>

                        <div className="reset_form_btns">
                            <Link to="/login" >
                                <Button variant="contained" style={{ color: "var(--logo-color)", backgroundColor: "#fff" }} >
                                    Cancel
                                </Button>
                            </Link>

                            <Button variant="contained" type='submit' style={{ backgroundColor: "var(--logo-color)" }} >
                                Continue
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
