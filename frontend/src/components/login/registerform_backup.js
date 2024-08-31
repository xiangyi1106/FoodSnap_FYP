// import { Form, Formik } from "formik";
// import { useState } from "react";
// import RegisterInput from "../inputs/registerInput";
// import WcIcon from '@mui/icons-material/Wc';
// import CakeIcon from '@mui/icons-material/Cake';
// import * as Yup from "yup";

// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBRow,
//   MDBCol,
// } from 'mdb-react-ui-kit';
// import DateOfBirthSelect from "./DateOfBirthSelect";
// import GenderRadioButton from "./GenderRadioButton";
// import BeatLoader from "react-spinners/BeatLoader";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";

// export default function RegisterForm({ setVisible }) {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userInfos = {
//     username: "",
//     full_name: "",
//     email: "",
//     password: "",
//     bYear: new Date().getFullYear(),
//     bMonth: new Date().getMonth() + 1,
//     bDay: new Date().getDate(),
//     gender: "",
//   };

//   const [user, setUser] = useState(userInfos);

//   //Extract elements from user
//   const {
//     username,
//     full_name,
//     email,
//     password,
//     bYear,
//     bMonth,
//     bDay,
//     gender
//   } = user;

//   const handleRegisterChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//     // console.log(user);
//   };
//   // console.log(user);

//   //Prepare the birthday day,month,year options for the select
//   const currentYear = new Date().getFullYear();

//   const years = Array.from(new Array(100), (val, index) => currentYear - index);
//   const months = Array.from(new Array(12), (val, index) => index + 1);

//   //This creates a Date object representing the last day of the previous month of the specified year and month. Setting the day to 0 effectively means the last day of the previous month.
//   const getDays = () => {
//     return new Date(bYear, bMonth, 0).getDate();
//   };

//   const days = Array.from(new Array(getDays()), (val, index) => index + 1);

//   const registerValidation = Yup.object({
//     username: Yup.string()
//       .required("What is your username?")
//       .min(6, "Username must be at least 6 characters.")
//       .max(30, "Username must be at most 30 characters.")
//       .test(
//         "starts-with-letter",
//         "The first character of the username must be an alphabetic character.",
//         (value) => /^[A-Za-z]/.test(value)
//       )
//       .matches(
//         /^[A-Za-z][A-Za-z0-9_]{5,29}$/,
//         "The username can only contain alphanumeric characters and underscores (_)."
//       ),
//     // .test({
//     //   name: 'checkUsernameAvailability',
//     //   exclusive: false,
//     //   test: async function (value) {
//     //     try {
//     //       const response = await fetch(`http://localhost:8000/check-username/${value}`);
//     //       const data = await response.json();

//     //       if (response.status === 200 && !data.success) {
//     //         // Username is available
//     //         return true;
//     //       } else {
//     //         // Error or username not available
//     //         console.log(data.message);
//     //         // this.createError({
//     //         //   message: data.message || 'Error checking username availability.',
//     //         //   path: 'username', // Fieldname
//     //         // })
//     //         message: data.message;
//     //         // console.log(data.message);

//     //         // throw new Yup.ValidationError(data.message || 'Error checking username availability.', value, 'username');
//     //           // Return false to indicate validation failure
//     //         return false;
//     //       }
//     //     } catch (error) {
//     //       console.error('Error checking username availability:', error);
//     //       throw new Yup.ValidationError('Error checking username availability.', value, 'username');
//     //     }
//     //   }
//     // }),
//     full_name: Yup.string()
//       .required("What is your name?")
//       .min(1, "Name must be at least 1 characters.")
//       .max(30, "Name must be at most 30 characters.")
//       .matches(/^[a-zA-Z\u4e00-\u9fff\\pL\\pM\\p{Nl}]{1,30}([_.'-]?[a-zA-Z0-9\u4e00-\u9fff])*$/, "Invalid characters in name."),
//     ///^[a-zA-Z\u4e00-\u9fff]{1,30}([_.-]?[a-zA-Z0-9\u4e00-\u9fff])*$/
//     // ^[\\pL\\pM\\p{Nl}]{1,50}(?: [\\pL\\pM\\p{Nl}]{1,50})*$
//     email: Yup.string()
//       .required("Email address is required.")
//       .email("Enter a valid email.")
//     ,
//     password: Yup.string()
//       .required("Password is required.")
//       .min(8, "Password must be at least 2 characters.")
//       .max(30, "Password must be at most 30 characters.")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
//         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
//       ),
//   });

//   const [dateError, setDateError] = useState("");
//   const [genderError, setGenderError] = useState("");
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState("");
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const registerSubmit = async () => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/register`,
//         {
//           username,
//           full_name,
//           email,
//           password,
//           bYear,
//           bMonth,
//           bDay,
//           gender
//         }
//       );
//       setSubmitError("");
//       setSubmitSuccess(data.message);

//       //remove message from send data
//       const [message, ...rest] = data;

//       setTimeout(() => {
//         dispatch({ type: "LOGIN", payload: rest });
//         Cookie.set("user", JSON.stringify(rest));
//         navigate("/");//navigate to home page
//       }, 2000);

//     } catch (error) {
//       setSubmitLoading(false);
//       setSubmitSuccess("");
//       setSubmitError(error.response.data.message);
//     }
//   }
//   return (
//     <div className="blur">
//       <MDBContainer className="register_wrapper">
//         <div className="register">
//           {/* <div className="register"> */}
//             <MDBRow className='d-flex justify-content-center align-items-center'>
//               <MDBCol col='12' className="register_col">
//                 <MDBCard className='bg-white text-black my-5 mx-auto opacity-98' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
//                   <i className="exit_icon" onClick={() => setVisible(false)}></i>
//                   <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto'>

//                     <h2 className="fw-bold mb-2 text-uppercase logo_color">Sign Up</h2>
//                     <p className="text-black-50 mb-4" style={{ textAlign: "center" }}>Join us to explore and exchange culinary delights from around the world.</p>

//                     <Formik enableReinitialize
//                       initialValues={{
//                         username,
//                         full_name,
//                         email,
//                         password,
//                         bYear,
//                         bMonth,
//                         bDay,
//                         gender
//                       }}
//                       validationSchema={registerValidation}
//                       onSubmit={() => {
//                         let currentDate = new Date();
//                         let pickedDate = new Date(bYear, bMonth - 1, bDay);
//                         let minimumAgeDate = new Date(1970 + 14, 0, 1);//The value 1970 is used because it is the starting point for the JavaScript Date object. In JavaScript, dates are represented as the number of milliseconds since January 1, 1970, 00:00:00 UTC (the "Unix epoch"). 
//                         // pickedDate > currentDate ? setDateError("Please select a valid date of birth. It cannot be a future date.") : setDateError("");
//                         currentDate - pickedDate < minimumAgeDate ? setDateError("You must be at least 14 years old to register.") : setDateError("");
//                         gender === '' ? setGenderError("Please select a gender") : setGenderError("");
//                         // if(currentDate-pickedDate < minimumAgeDate){
//                         //   setDateError("You must be at least 14 years old to register.");
//                         // }else if(gender === ''){
//                         //   setGenderError("Please select a gender");
//                         // }

//                       }}
//                     >

//                       {(formik) => (
//                         <Form className="register_form">
//                           <div className="reg_line">
//                             <RegisterInput
//                               type="text"
//                               label="Username"
//                               name="username"
//                               onChange={handleRegisterChange}
//                             />
//                             <RegisterInput
//                               type="text"
//                               label="Full name"
//                               name="full_name"
//                               onChange={handleRegisterChange}
//                             />
//                           </div>
//                           <div className="reg_line">
//                             <RegisterInput
//                               type="email"
//                               label="Email address"
//                               name="email"
//                               onChange={handleRegisterChange}
//                             />
//                           </div>
//                           <div className="reg_line">
//                             <RegisterInput
//                               type="password"
//                               label="New password"
//                               name="password"
//                               onChange={handleRegisterChange}
//                             />
//                           </div>
//                           <div className="reg_col">
//                             <div className="reg_line_header">
//                               Date of birth <CakeIcon style={{ fontSize: "medium", position: "relative", bottom: "2px" }} />
//                             </div>

//                             <DateOfBirthSelect
//                               bDay={bDay}
//                               bMonth={bMonth}
//                               bYear={bYear}
//                               days={days}
//                               months={months}
//                               years={years}
//                               handleRegisterChange={handleRegisterChange}
//                               dateError={dateError}
//                             />
//                           </div>

//                           <div className="reg_col">
//                             <div className="reg_line_header">
//                               Gender <WcIcon style={{ fontSize: "medium" }} />
//                             </div>
//                             <GenderRadioButton
//                               handleRegisterChange={handleRegisterChange}
//                             />

//                             {/* Error message when radio button is unselected */}
//                             {genderError != "" && <div className="input_error">{genderError}</div>}

//                           </div>
//                           <div className="reg_infos mb-4">
//                             By clicking Sign Up, you agree to our{" "}
//                             <span>Terms, Data Policy &nbsp;</span>
//                             and <span>Cookie Policy.</span>
//                           </div>
//                           <MDBBtn className="px-5 w-100" color='info' size='lg' type="submit">Login</MDBBtn>

//                           {/* Register status - Error / Success */}
//                           {submitError && <div className="error_text">{submitError}</div>}
//                           {submitSuccess && <div className="success_text">{submitSuccess}</div>}

//                           {/*Loading spinner  */}
//                           <BeatLoader
//                             color="#87e4d1"
//                             loading={submitLoading}
//                             size={12}
//                             aria-label="Loading Spinner"
//                             data-testid="loader"
//                           />
//                         </Form>
//                       )}
//                     </Formik>

//                   </MDBCardBody>
//                 </MDBCard>

//               </MDBCol>
//             </MDBRow>
//           {/* </div> */}
//         </div>
//       </MDBContainer>
//     </div>
//   );
// }
