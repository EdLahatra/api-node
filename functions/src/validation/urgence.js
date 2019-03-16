const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUrgenceInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.description, { min: 2, max: 300 })) {
    errors.description = 'Post must be between 2 and 300 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
