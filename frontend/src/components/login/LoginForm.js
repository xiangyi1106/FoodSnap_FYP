import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput";
import { useState } from "react";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';


const loginInfos = {
    emailOrUsername: "",
    password: "",
};

export default function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [login, setLogin] = useState(loginInfos);
    // const { emailOrUsername, password } = login;//It's equivalent to writing const email = login.email; const password = login.password;
    //Get email and password from login

    // const [text, setText] = useState("");

    // const handleLoginChange = (e) => {
    //     const { name, value } = e.target;
    //     //setLogin({ ...login, [name]: value });
    //     setLogin((prevLogin) => ({
    //         ...prevLogin,
    //         [name]: value,
    //       }));
    // };

    // console.log(login);


    // const handleLoginChange = (e) => {
    //     const { name, value } = e.target;
    //     setLogin({ ...login, [name]: value });
    // };


    // const loginValidation = Yup.object({
    //     email: Yup.string()
    //         .required("Email address is required.")
    //         .email("Must be a valid email.")
    //         .max(100),
    //     password: Yup.string().required("Password is required."),
    // });

    const loginValidation = Yup.object({
        //When you define a validation rule for emailOrUsername, Yup expects that the form input field with the name attribute set to "emailOrUsername" will be validated according to this rule.
        emailOrUsername: Yup.string()
            .required("Email address or username is required."),
        // .test('emailOrUsername', 'Invalid email or username', function (value) {
        //     // Check if it's a valid email address
        //     if (/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/.test(value)) {
        //         return true; // Valid email
        //     }
        //     // Check if it's a valid username
        //     return /^[a-zA-Z]{6,30}([_.-]?[a-zA-Z0-9])*$/.test(value);
        // }),
        password: Yup.string().required("Password is required."),
    });

    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);


    // const [passwordType, setPasswordType] = useState("password");

    // const loginSubmit = async () => {
    //     try {
    //         setSubmitLoading(true);

    //         const { data } = await axios.post(
    //             `${process.env.REACT_APP_BACKEND_URL}/login`,
    //             {
    //                 emailOrUsername,
    //                 password,
    //             }
    //         );
    //         setSubmitError("");
    //         setSubmitSuccess(data.message);

    //         dispatch({ type: "LOGIN", payload: data });
    //         Cookies.set("user", JSON.stringify(data));
    //         navigate("/");//navigate to home page

    //     } catch (error) {
    //         setSubmitLoading(false);
    //         setSubmitSuccess("");
    //         setSubmitError(error.response.data.message);
    //     }
    // }

    const [emaiOrUsernameError, setEmaiOrUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return (
        <MDBContainer fluid className="login_page align-items-center" >
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol col='12' >
                    <MDBCard className='bg-white text-black my-5 mx-auto opacity-98' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <svg width="0" height="0">
                                <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                    <stop stopColor="rgb(43, 192, 228)" offset="0%" />
                                    <stop stopColor="rgb(234, 236, 198)" offset="100%" />
                                </linearGradient>
                            </svg>
                            {/* <h2 className="fw-bold mb-2 text-uppercase logo_color"><PhotoCameraIcon className="logo_img" style={{ fontSize: "larger", marginRight: "8px", fill: "url(#blue-gradient)" }} ></PhotoCameraIcon>Login</h2> */}
                            <h2 className="fw-bold mb-2 text-uppercase logo_color">Login</h2>
                            <p className="text-black-50 mb-4 login_form_title">Please enter your email and password!</p>

                            {/* <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Email address' id='formControlLg' type='email' size="lg" />
                            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Password' id='formControlLg' type='password' size="lg" /> */}

                            <Formik
                                enableReinitialize
                                initialValues={{
                                    emailOrUsername: '',
                                    password: '',
                                }}
                                validationSchema={loginValidation}
                                onSubmit={
                                    async (values) => {
                                        try {
                                            setSubmitLoading(true);
                                            const { data } = await axios.post("http://localhost:8000/login", {
                                                emailOrUsername: values.emailOrUsername,
                                                password: values.password,
                                            });
                                            // console.log(values);
                                            // console.log(data);

                                            dispatch({ type: "LOGIN", payload: data });
                                            Cookies.set("user", JSON.stringify(data));
                                            navigate("/");

                                            setEmaiOrUsernameError("");
                                            setPasswordError("");

                                        } catch (error) {
                                            setSubmitLoading(false);
                                            setSubmitSuccess("");
                                            // Check if the data contains a 'name' property indicating username or email
                                            if (error.response.data.hasOwnProperty("errorName")) {
                                                if (error.response.data.errorName === "emailOrUsername") {
                                                    // Handle username related error
                                                    setEmaiOrUsernameError(error.response.data.message);
                                                    setPasswordError("");
                                                    document.getElementById('emailOrUsernameInput').focus();
                                                    return;

                                                } else if (error.response.data.errorName === "password") {
                                                    // Handle email related error
                                                    setPasswordError(error.response.data.message);
                                                    setEmaiOrUsernameError("");
                                                    document.getElementById('passwordInput').focus();
                                                    return;
                                                }
                                            } else {
                                                setEmaiOrUsernameError("");
                                                setPasswordError("");
                                                setSubmitError(error.response.data.message);

                                            }

                                            setSubmitError(error.response.data.message);

                                        }
                                    }
                                }
                            >
                                {(formik) => (
                                    <Form>
                                        {/* <LoginInput
                                            type="email"
                                            name="email"
                                            label="Email address"
                                            // placeholder="Email address"
                                            onChange={handleLoginChange}
                                        /> */}
                                        <LoginInput
                                            // type="text"
                                            name="emailOrUsername"
                                            label="Email or username"
                                            id="emailOrUsernameInput"
                                            type="text"
                                        // value={text}
                                        // onChange={(e) => { setText(e.target.value); handleLoginChange(e) }}
                                        //  onChange={handleLoginChange}
                                        />
                                        {/* Error message when email or username does not exist */}
                                        {emaiOrUsernameError !== "" && <div className="input_error">{emaiOrUsernameError}</div>}

                                        <div className="password_input">
                                            <LoginInput
                                                // type={passwordType}
                                                // type="password"
                                                name="password"
                                                label="Password"
                                                id="passwordInput"
                                                // setPasswordEmpty={setPasswordEmpty}
                                                // passwordType={passwordType}
                                                // setPasswordType={setPasswordType}
                                                // placeholder="Password"
                                                // onChange={handleLoginChange}
                                                bottom
                                                password
                                            />

                                        </div>
                                        {/* Error message when password invalid */}
                                        {passwordError !== "" && <div className="input_error">{passwordError}</div>}
                                        <div className="button-container">
                                            <MDBBtn type="submit" className="mb-4 px-5 w-100 login_button" color='info' size='lg'>Login</MDBBtn>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                            {/* <Link to="/resetpassword" className="small pb-lg-2 text-black-50 underline">Forgot password?</Link> */}

                            {submitError && <div className="error_text">{submitError}</div>}

                            {/*Loading spinner  */}
                            <BeatLoader
                                color="#87e4d1"
                                loading={submitLoading}
                                size={12}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            {/* Register status - Error / Success */}
                            {submitError && <div className="error_text mt-3 input_error">{submitError}</div>}
                            {submitSuccess && <div className="mt-3 success_text">{submitSuccess}</div>}
                            {/* <div className='d-flex flex-row mt-3 mb-5'>
                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                                <MDBIcon fab icon='facebook-f' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                                <MDBIcon fab icon='twitter' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                                <MDBIcon fab icon='google' size="lg" />
                                </MDBBtn>
                            </div> */}

                            <div>
                                <p className="mb-0 mt-3">Don't have an account? <Link className=" fw-bold link-info text_up_effect" to={"/register"}>Sign Up</Link></p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
