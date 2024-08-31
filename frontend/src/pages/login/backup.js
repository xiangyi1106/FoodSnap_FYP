// import "./style.css";
// import { Formik, Form } from "formik";
// import { Link } from "react-router-dom";
// import * as Yup from "yup";
// import LoginInput from "../../components/inputs/loginInput";
// import { useState } from "react";


// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBInput
// } from 'mdb-react-ui-kit';

// const loginInfos = {
//   email: "",
//   password: "",
// };

// export default function Login() {
//   const [login, setLogin] = useState(loginInfos);
//   const { email, password } = login;//It's equivalent to writing const email = login.email; const password = login.password;
//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLogin({ ...login, [name]: value });
//   };
//   const loginValidation = Yup.object({
//     email: Yup.string()
//       .required("Email address is required.")
//       .email("Must be a valid email.")
//       .max(100),
//     password: Yup.string().required("Password is required"),
//   });
//   return (
//     <MDBContainer className=" d-flex align-items-center justify-content-center">
//       <MDBCard style={{width: '90%'}}>
//         <MDBRow className='g-0' >

//           <MDBCol md='6'>
//             <MDBCardImage src='/images/4.png' alt="login form" className='rounded-start w-100 h-100 d-none d-md-block login-photo' />
//           </MDBCol>

//           <MDBCol md='6'>
//             <MDBCardBody className='p-5 d-flex flex-column align-items-center justify-content-center mx-auto w-100'>

//               <div className='d-flex flex-row mt-3'>
//                 <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
//                 <span className="h1 fw-bold mb-1">Logo</span>
//               </div>

//               <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

//               {/* <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
//                 <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/> */}

//               <Formik
//                 enableReinitialize
//                 initialValues={{
//                   email,
//                   password,
//                 }}
//                 validationSchema={loginValidation}
//               >
//                 {(formik) => (
//                   <Form>
//                     <LoginInput
//                       type="email"
//                       name="email"
//                       label="Email address"
//                       placeholder="Email address or phone number"
//                       onChange={handleLoginChange}
//                     />
//                     <LoginInput
//                       type="password"
//                       name="password"
//                       label="Password"
//                       placeholder="Password"
//                       onChange={handleLoginChange}
//                       bottom
//                     />
//                     <MDBBtn className="mb-4 px-5 w-100" color='info' size='lg'>Login</MDBBtn>
//                   </Form>
//                 )}
//               </Formik>

//               <Link to="/forgot" className="small mb-5 pb-lg-3"><a className="text-muted" href="#!">Forgot password?</a></Link>
//               <p className=''>Don't have an account? <a href="#!" className="link-info">Register here</a></p>

//             </MDBCardBody>
//           </MDBCol>

//         </MDBRow>
//       </MDBCard>

//     </MDBContainer>
//   );
// }
