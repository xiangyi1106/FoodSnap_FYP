import React from 'react'
import { Form, Formik } from "formik";
import { useState } from 'react';
import * as Yup from "yup";
import axios from "axios";
import LoginInput from "../../components/inputs/loginInput";
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import RegisterInput from '../../components/inputs/registerInput';
import ClipLoader from "react-spinners/ClipLoader";

const validateEmail = Yup.object({
    email: Yup.string()
        .required("Email address is required.")
        .email("Please enter a valid email.")
});

export default function SearchAccount({ error, setError, setLoading, loading, setUserInfos, setPage }) {
    const handleInputBlur = () => {
        if (error) {
            setError(""); // Reset the error state when the user starts typing
        }
    };
    // Define the handleKeyDown function
    const handleKeyDown = (e, formik) => {
        // if (e.key === 'Enter') {
        //     e.preventDefault(); // Prevent form submission via Enter key
        //     formik.submitForm(); // Call the submitForm method of the formik object
        // }
    };
    return (
        <div className="reset_form">
            <div className="reset_form_header">Find Your Account</div>
            <div className="reset_form_text">
                Please enter your email address to search for your
                account.
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    email: '',
                }}
                validationSchema={validateEmail}
                onSubmit={
                    // handleSearch();
                    async (values) => {
                        try {
                            setLoading(true);
                            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/findUser`, {
                                email: values.email,
                            });
                            setError("");
                            setUserInfos(data);
                            setPage(1);
                        } catch (error) {
                            setError(error.response.data.message);
                        } finally {
                            setLoading(false); // Set loading state to false after the operation completes
                        }
                    }}
            >
                {(formik) => (
                    <Form onKeyDown={(e) => handleKeyDown(e, formik)}>
                        <div className='reset_input'>
                            <RegisterInput
                                type="email"
                                name="email"
                                label="Email address"
                                autoFocus
                                onFocus={handleInputBlur}
                            />
                            {error && <div className="input_error">{error}</div>}
                            <div className='center' style={{ margin: "10px auto" }}>
                                <ClipLoader
                                    color="#30BFBF"
                                    loading={loading}
                                    size={40}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>

                        </div>


                        <div className="reset_form_btns">
                            <Link to="/login" >
                                <Button variant="contained" style={{ color: "var(--logo-color)", backgroundColor: "#fff" }} >
                                    Cancel
                                </Button>
                            </Link>

                            <Button variant="contained" type='submit' style={{ backgroundColor: "var(--logo-color)" }} >
                                Search
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
