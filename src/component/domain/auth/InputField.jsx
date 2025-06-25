import React from "react";
import "./InputField.css";

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <>
      <div className="inputTitle">{label}</div>
      <div className="inputWrap">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  );
};

export default InputField;
