import isEmpty from './is-empty';

const Validator = require('validator');

const validateAllergieInput = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 10, max: 300 })) {
    errors.name = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAllergieInput;
