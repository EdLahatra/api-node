const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVaccinInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 2, max: 300 })) {
    errors.name = 'Post must be between 2 and 300 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
