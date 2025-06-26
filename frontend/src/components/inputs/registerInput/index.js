import React from "react";
import { useField, ErrorMessage } from "formik";
import { MDBInput } from "mdb-react-ui-kit";
import "./style.css"; 

export default function RegisterInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="input_wrap" style={{ width: "100%" }}>

      <MDBInput wrapperClass='mb-1 mx-5 w-100' id={`formControlLg${field.name}`} size="lg" labelClass='text-black'
        className={meta.touched && meta.error ? "input_error_border" : ""}
        label={label}
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <div className="input_error" style={{ transform: "translateY(2px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      )}
      {/* error_icon for above input */}
      {meta.touched && meta.error && (
        <i className="error_icon"></i>
      )}
    </div>
  );
}
