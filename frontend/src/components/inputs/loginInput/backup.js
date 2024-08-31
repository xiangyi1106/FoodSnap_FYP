// // LoginInput.js
// import React from "react";
// import { useField, ErrorMessage } from "formik";
// import { MDBInput } from "mdb-react-ui-kit";
// import "./style.css"; // Import your custom styles

// export default function LoginInput({ label, bottom, ...props }) {
//   const [field, meta] = useField(props);

//   return (
//     <div className="input_wrap">
//       {/* Error message for top position */}
//       {meta.touched && meta.error && !bottom && (
//         <div className="input_error" style={{ transform: "translateY(3px)" }}>
//           <ErrorMessage name={field.name} />
//           {/* <div className="error_arrow_top"></div> */}
//         </div>
//       )}
//       {/* MDBInput component */}
//       {/* {`mx-5 w-100${!bottom ? ' mb-4' : ''}`} */}
//       <MDBInput wrapperClass='mx-5 w-100 mb-4' id={`formControlLgLogin${field.name}`} size="lg" labelClass='text-black'
//         className={meta.touched && meta.error ? "input_error_border" : ""}
//         label={label}
//         type={field.type}
//         name={field.name}
//         {...field}
//         {...props}
//       />
//       {/* Error message for bottom position */}
//       {meta.touched && meta.error && bottom && (
//         <div className="input_error" style={{ transform: "translateY(2px)", top: '-14px' }}>
//           {meta.touched && meta.error && <ErrorMessage name={field.name} />}
//           {/* {meta.touched && meta.error && (
//             <div className="error_arrow_bottom"></div>
//           )} */}
//         </div>
//       )}
//         {/* Error icon */}
//       {meta.touched && meta.error && (
//         <i className="error_icon" style={{ top: `${!bottom && "59%"}` }}></i>
//       )}
//     </div>
//   );
// }
