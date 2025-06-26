import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput";
import { useState } from "react";
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
} from "mdb-react-ui-kit";

const loginInfos = {
  emailOrUsername: "",
  password: "",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginValidation = Yup.object({
    emailOrUsername: Yup.string().required(
      "Email address or username is required."
    ),
    password: Yup.string().required("Password is required."),
  });

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [emaiOrUsernameError, setEmaiOrUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <MDBContainer fluid className="login_page align-items-center">
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol col="12">
          <MDBCard
            className="bg-white text-black my-5 mx-auto opacity-98"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <svg width="0" height="0">
                <linearGradient
                  id="blue-gradient"
                  x1="100%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop stopColor="rgb(43, 192, 228)" offset="0%" />
                  <stop stopColor="rgb(234, 236, 198)" offset="100%" />
                </linearGradient>
              </svg>
              <h2 className="fw-bold mb-2 text-uppercase logo_color">Login</h2>
              <p className="text-black-50 mb-4 login_form_title">
                Please enter your email and password!
              </p>

              <Formik
                enableReinitialize
                initialValues={{
                  emailOrUsername: "",
                  password: "",
                }}
                validationSchema={loginValidation}
                onSubmit={async (values) => {
                  try {
                    setSubmitLoading(true);
                    const { data } = await axios.post(
                      "http://localhost:8000/login",
                      {
                        emailOrUsername: values.emailOrUsername,
                        password: values.password,
                      }
                    );

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
                        document.getElementById("emailOrUsernameInput").focus();
                        return;
                      } else if (error.response.data.errorName === "password") {
                        // Handle email related error
                        setPasswordError(error.response.data.message);
                        setEmaiOrUsernameError("");
                        document.getElementById("passwordInput").focus();
                        return;
                      }
                    } else {
                      setEmaiOrUsernameError("");
                      setPasswordError("");
                      setSubmitError(error.response.data.message);
                    }

                    setSubmitError(error.response.data.message);
                  }
                }}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      name="emailOrUsername"
                      label="Email or username"
                      id="emailOrUsernameInput"
                      type="text"
                    />
                    {/* Error message when email or username does not exist */}
                    {emaiOrUsernameError !== "" && (
                      <div className="input_error">{emaiOrUsernameError}</div>
                    )}

                    <div className="password_input">
                      <LoginInput
                        name="password"
                        label="Password"
                        id="passwordInput"
                        bottom
                        password
                      />
                    </div>
                    {/* Error message when password invalid */}
                    {passwordError !== "" && (
                      <div className="input_error">{passwordError}</div>
                    )}
                    <div className="button-container">
                      <MDBBtn
                        type="submit"
                        className="mb-4 px-5 w-100 login_button"
                        color="info"
                        size="lg"
                      >
                        Login
                      </MDBBtn>
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
              {submitError && (
                <div className="error_text mt-3 input_error">{submitError}</div>
              )}
              {submitSuccess && (
                <div className="mt-3 success_text">{submitSuccess}</div>
              )}

              <div>
                <p className="mb-0 mt-3">
                  Don't have an account?{" "}
                  <Link
                    className=" fw-bold link-info text_up_effect"
                    to={"/register"}
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
