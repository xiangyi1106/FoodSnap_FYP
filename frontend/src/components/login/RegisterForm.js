import { Form, Formik } from "formik";
import { useState, useRef } from "react";
import RegisterInput from "../inputs/registerInput";
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import * as Yup from "yup";
import { Link } from "react-router-dom";
import CIcon from '@coreui/icons-react';
// import * as icon from '@coreui/icons';
import { cilCheckCircle, cilXCircle, cilBirthdayCake } from '@coreui/icons';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderRadioButton from "./GenderRadioButton";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setVisible }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  // //Prepare the birthday day,month,year options for the select
  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  // const currentMonth = currentDate.getMonth() + 1;
  // const currentDay = currentDate.getDate(); // This will give you the current day of the month

  // const years = Array.from(new Array(100), (val, index) => currentYear - index);
  // const months = Array.from(new Array(12), (val, index) => index + 1);

  // const [selectDay, setSelectDay] = useState(currentDay);
  // const [selectMonth, setSelectMonth] = useState(currentMonth);
  // const [selectYear, setSelectYear] = useState(currentYear);


  // //This creates a Date object representing the last day of the previous month of the specified year and month. Setting the day to 0 effectively means the last day of the previous month.
  // const getDays = () => {
  //   return new Date(selectYear, selectMonth, 0).getDate();
  // };

  // const days = Array.from(new Array(getDays()), (val, index) => index + 1);

  // const [selectGender, setSelectGender] = useState("");

  const registerValidation = Yup.object({
    username: Yup.string()
      .required("What is your username?")
      .min(6, "Username must be at least 6 characters.")
      .max(30, "Username must be at most 30 characters.")
      .test(
        "starts-with-letter",
        "The first character of the username must be an alphabetic character.",
        (value) => /^[A-Za-z]/.test(value)
      )
      .matches(
        /^[A-Za-z][A-Za-z0-9_.-]{5,29}$/,
        // /^[a-zA-Z]{6,30}([_.-]?[a-zA-Z0-9])*$/,
        "Username can only contain alphanumeric characters and characters (_.-)."
      ),
    name: Yup.string()
      .required("What is your name?")
      .min(1, "Name must be at least 1 characters.")
      .max(30, "Name must be at most 30 characters."),
    // .matches(/^[a-zA-Z\u4e00-\u9fff\\pL\\pM\\p{Nl}]{1,30}([_.'-]?[a-zA-Z0-9\u4e00-\u9fff])*$/, "Invalid characters in name."),
    ///^[a-zA-Z\u4e00-\u9fff]{1,30}([_.-]?[a-zA-Z0-9\u4e00-\u9fff])*$/
    // ^[\\pL\\pM\\p{Nl}]{1,50}(?: [\\pL\\pM\\p{Nl}]{1,50})*$
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email.")
    ,
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and at least 8 characters and at most 30 characters."
      ),
  });

  // const [dateError, setDateError] = useState("");
  // const [genderError, setGenderError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [submitSuccessed, setSubmitSuccessed] = useState("");
  // const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [passwordValidated, setPasswordValidated] = useState({
    lower: false,
    upper: false,
    number: false,
    special: false,
    length: false
  });

  //Use to update the setFieldValue of password so that can use custom onChange while handle user input
  const formikRef = useRef(null);

  // Function to handle password input change
  const handlePasswordChange = (e) => {

    //Display user input in password field
    formikRef.current.setFieldValue("password", e.target.value);

    //Password validation Regex
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,30})');

    // Perform validations
    const isLowerValidated = lower.test(e.target.value);
    const isUpperValidated = upper.test(e.target.value);
    const isNumberValidated = number.test(e.target.value);
    const isSpecialValidated = special.test(e.target.value);
    const isLengthValidated = length.test(e.target.value);

    // Update validation state variables
    setPasswordValidated({
      lower: isLowerValidated,
      upper: isUpperValidated,
      number: isNumberValidated,
      special: isSpecialValidated,
      length: isLengthValidated
    });
  };

  return (
    <MDBContainer className="register_page">
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol col='12'>
          <MDBCard className='bg-white text-black my-5 mx-auto opacity-98' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase logo_color">Sign Up</h2>
              <p className="text-black-50 mb-4" style={{ textAlign: "center" }}>Join us to explore and exchange culinary delights from around the world.</p>
              <Formik
                enableReinitialize
                innerRef={formikRef}
                initialValues={{
                  username: '',
                  name: '',
                  email: '',
                  password: '',
                  // bYear: '',
                  // bMonth: '',
                  // bDay: '',
                  // gender: '',
                }}
                validationSchema={registerValidation}

                onSubmit={
                  async (values) => {
                    // // Perform validation checks for birthday and gender here
                    // let currentDate = new Date();
                    // let pickedDate = new Date(selectYear, selectMonth - 1, selectDay);
                    // let minimumAgeDate = new Date(1970 + 14, 0, 1);//The value 1970 is used because it is the starting point for the JavaScript Date object. In JavaScript, dates are represented as the number of milliseconds since January 1, 1970, 00:00:00 UTC (the "Unix epoch"). 

                    // //major social media platforms like Facebook also need to consider these factors when deciding on their registration policies for users under the age of 14. 
                    // //Facebook, like other platforms, is subject to various laws and regulations governing the collection of personal information from minors, such as COPPA in the United States and similar regulations in other jurisdictions.
                    // if (currentDate - pickedDate < minimumAgeDate) {
                    //   setDateError(
                    //     "You must be at least 14 years old to register."
                    //   );
                    //   setGenderError("");
                    //   return;
                    // } else {
                    //   setDateError("");
                    // }

                    // if (selectGender === "") {
                    //   setGenderError(
                    //     "Please choose a gender. You can change who can see this later."
                    //   );
                    //   return;
                    // } else {
                    //   setGenderError("");
                    // }

                    try {

                      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                        username: values.username,
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        // bYear: selectYear,
                        // bMonth: selectMonth,
                        // bDay: selectDay,
                        // gender: selectGender,
                      });
                      console.log(data);
                      setSubmitSuccessed(data.message);
                      setSubmitError("");
                      setEmailError("");
                      setUsernameError("");

                      //remove message from send data
                      const { message, ...rest } = data;

                      setTimeout(() => {
                        dispatch({ type: "LOGIN", payload: rest });
                        Cookies.set("user", JSON.stringify(rest));
                        navigate("/");//navigate to home page
                      }, 2000);

                    } catch (error) {
                      console.log(error);
                      setSubmitLoading(false);
                      setSubmitSuccessed("");

                      // Check if the data contains a 'errorName' property indicating username or email
                      if (error.response.data.hasOwnProperty("errorName")) {
                        if (error.response.data.errorName === "username") {
                          // Handle username related error
                          setUsernameError(error.response.data.message);
                          setEmailError("");
                          document.getElementById('usernameInput').focus();
                          return;
                        } else if (error.response.data.errorName === "email") {
                          // Handle email related error
                          setEmailError(error.response.data.message);
                          setUsernameError("");
                          document.getElementById('emailInput').focus();
                          return;
                        }
                      } else {
                        setUsernameError("");
                        setEmailError("");
                        setSubmitError(error.response.data.message);
                      }
                      setSubmitError(error.response.data.message);
                    }
                  }
                }
              >

                {({ values }) => (
                  <Form className="register_form" noValidate>
                    <div className="reg_line">
                      <RegisterInput
                        type="text"
                        label="Username"
                        name="username"
                        id="usernameInput"
                      />
                      {/* Error message when username exist */}
                      {usernameError !== "" && <div className="input_error">{usernameError}</div>}
                      <RegisterInput
                        type="text"
                        label="Name"
                        name="name"
                      />
                    </div>
                    <div className="reg_line">
                      <RegisterInput
                        type="email"
                        label="Email address"
                        name="email"
                        id="emailInput"
                      />
                      {/* Error message when email exist */}
                      {emailError !== "" && <div className="input_error">{emailError}</div>}
                    </div>
                    <div className="reg_line">
                      <div className="password_input">
                        <RegisterInput
                          // type={passwordType}
                          type="password"
                          name="password"
                          label="New password"
                          value={values.password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="password_tracker">
                        <div className="mb-1">The password should contain:</div>
                        <div className={`password_tracker_text ${passwordValidated.lower ? 'password_tracker_green' : 'password_tracker_red'}`}>
                          {passwordValidated.lower ? (
                            <span>
                              <CIcon icon={cilCheckCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          ) : (
                            <span>
                              <CIcon icon={cilXCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          )}At least one lowercase letter</div>
                        <div className={`password_tracker_text ${passwordValidated.upper ? 'password_tracker_green' : 'password_tracker_red'}`}>
                          {passwordValidated.upper ? (
                            <span>
                              <CIcon icon={cilCheckCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          ) : (
                            <span>
                              <CIcon icon={cilXCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          )}At least one uppercase letter</div>
                        <div className={`password_tracker_text ${passwordValidated.number ? 'password_tracker_green' : 'password_tracker_red'}`}>
                          {passwordValidated.number ? (
                            <span>
                              <CIcon icon={cilCheckCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          ) : (
                            <span>
                              <CIcon icon={cilXCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          )}<div>At least one number</div></div>
                        <div className={`password_tracker_text ${passwordValidated.special ? 'password_tracker_green' : 'password_tracker_red'}`}>
                          {passwordValidated.special ? (
                            <span>
                              <CIcon icon={cilCheckCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          ) : (
                            <span>
                              <CIcon icon={cilXCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </span>
                          )}At least one special character</div>
                        <div className={`password_tracker_text ${passwordValidated.length ? 'password_tracker_green' : 'password_tracker_red'}`}>
                          {passwordValidated.length ? (
                            <div>
                              <CIcon icon={cilCheckCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </div>
                          ) : (
                            <div>
                              <CIcon icon={cilXCircle} className="icon_size_18" style={{ marginRight: '8px' }} />
                            </div>
                          )}<div>Must be between 8 and 30 <span>characters long</span></div></div>
                      </div>
                    </div>

                    {/* <div className="reg_col">
                      <div className="reg_line_header">
                        Date of birth
                        <CakeIcon style={{ fontSize: "medium", position: "relative", bottom: "2px" }} />
                      </div>
                      <DateOfBirthSelect
                        selectDay={selectDay}
                        setSelectDay={setSelectDay}
                        selectYear={selectYear}
                        setSelectYear={setSelectYear}
                        selectMonth={selectMonth}
                        setSelectMonth={setSelectMonth}
                        days={days}
                        months={months}
                        years={years}
                        dateError={dateError}
                      />
                    </div>
                    <div className="reg_col">
                      <div className="reg_line_header">
                        Gender <WcIcon style={{ fontSize: "medium" }} />
                      </div>
                      <GenderRadioButton
                        setSelectGender={setSelectGender}
                      />
                      {genderError !== "" && <div className="input_error">{genderError}</div>}
                    </div> */}
                    <div className="reg_infos mb-4">
                      By clicking Sign Up, you agree to our{" "}
                      <span>Terms, Data Policy &nbsp;</span>
                      and <span>Cookie Policy.</span>
                    </div>

                    <MDBBtn className="px-5 w-100" color='info' size='lg' type="submit">Sign Up</MDBBtn>
                    <BeatLoader
                      color="#87e4d1"
                      loading={submitLoading}
                      size={12}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    {/* Register status - Error / Success */}
                    {submitError && <div className="error_text mt-3 input_error">{submitError}</div>}
                    {submitSuccessed && <div className="mt-3 success_text">{submitSuccessed}</div>}
                  </Form>
                )}
              </Formik>

              <div>
                <p className="mb-0 mt-4">Already have an account? <Link className=" fw-bold link-info text_up_effect" to={"/login"}>Sign In</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
