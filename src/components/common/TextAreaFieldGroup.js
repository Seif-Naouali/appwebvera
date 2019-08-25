import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  onChange
}) => {
  return (
    <div
      className={classnames("form-group label-floating is-empty", {
        "has-error": error,
        "is-focused": value
      })}
    >
      <label className="control-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className={classnames("form-control", {
          "is-invalid": error
        })}
        style={{ height: 240 }}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
