import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({
  onChange, currentValue, label, isPassword, className, error
}) =>
  (
    <div className="row">
      <label className="label-text">{label}</label>
      <input
        className={className}
        type={isPassword ? 'password' : 'text'}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        value={currentValue}
      />
      {error && <small className="text-muted">{error}</small>}
    </div>
  );


TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string
};

export default TextBox;