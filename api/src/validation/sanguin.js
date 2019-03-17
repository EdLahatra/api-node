import isEmpty from './is-empty';

const Validator = require('validator');

const validateSanguinInput = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 1, max: 300 })) {
    errors.name = 'Post must be between 1 and 300 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSanguinInput;
