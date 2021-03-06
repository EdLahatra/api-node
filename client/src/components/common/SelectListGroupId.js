import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, onChange, options, placeholder }) => {
  const selectOptions = options.map(option => (
    <option key={option._id} value={option._id}>
      {option.name}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option key={'option.label'} value={''}>
          {placeholder}
        </option>
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  // error: PropTypes.string,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
