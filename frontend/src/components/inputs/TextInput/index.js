import React from "react";

const TextInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  formik,
  isTextarea = false,
  rows = 4,
  disabled = false,
  description,
}) => {
  const inputProps = {
    id,
    name,
    type,
    placeholder,
    disabled,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[name],
    className: isTextarea
      ? "profile_form_textarea"
      : "profile_form_input",
  };

  return (
    <div className="profile_form_item">
      <label className="profile_form_label" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea {...inputProps} rows={rows} />
      ) : (
        <input {...inputProps} />
      )}
      {formik.touched[name] && formik.errors[name] ? (
        <div className="profile_form_message">{formik.errors[name]}</div>
      ) : null}
      {description && (
        <p className="profile_form_description">{description}</p>
      )}
    </div>
  );
};

export default TextInput;
