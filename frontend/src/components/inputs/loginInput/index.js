// LoginInput.js
import React from "react";
import { useField, ErrorMessage } from "formik";
import { MDBInput } from "mdb-react-ui-kit";
import "./style.css"; // Import your custom styles
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";

export default function LoginInput({ label, bottom, password, ...props }) {
  const [field, meta] = useField(props);
  const [passwordType, setPasswordType] = useState("password");

  return (
    <div className="input_wrap">
      {/* Error message for top position */}
      {meta.touched && meta.error && !bottom && (
        <div className="input_error" style={{ transform: "translateY(3px)" }}>
          <ErrorMessage name={field.name} />
          {/* <div className="error_arrow_top"></div> */}
        </div>
      )}
      {/* MDBInput component */}
      <MDBInput wrapperClass='mx-5 w-100 mb-4 form_input' id={`formControlLgLogin${field.name}`} size="lg" labelClass='text-black'
        className={meta.touched && meta.error ? "input_error_border" : ""}
        label={label}
        // type={bottom ? passwordType : 'text'}
        type={password ? passwordType : field.type}
        name={field.name}
        {...field}
        {...props}
      />
      {/* Error message for bottom position */}
      {meta.touched && meta.error && bottom && (
        <div className="input_error" style={{ transform: "translateY(2px)", top: '-14px' }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {/* {meta.touched && meta.error && (
            <div className="error_arrow_bottom"></div>
          )} */}
        </div>
      )}
      {/* Error icon */}
      {meta.touched && meta.error && !bottom && (
        <i className="error_icon" style={{ top: `${!bottom && "59%"}` }}></i>
      )}

      {/* Password visibility icon */}
      {field.name === "password" && (
        (passwordType === "text" ? (
          <span className="icon_span" style={{top: meta.touched && meta.error && "17%"}}  onClick={(e) => { setPasswordType("password"); }}>
            <VisibilityOutlinedIcon />
          </span>
        ) : (
          <span className="icon_span" style={{top: meta.touched && meta.error && "17%"}} onClick={(e) => { setPasswordType("text"); }}>
            <VisibilityOffOutlinedIcon />
          </span>
        ))
      )}
    </div>
  );
}
