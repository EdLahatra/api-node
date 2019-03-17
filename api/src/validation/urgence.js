import isEmpty from './is-empty';

const Validator = require('validator');

const validateUrgenceInput = (data) => {
  const errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.description, { min: 2, max: 300 })) {
    errors.description = 'Post must be between 2 and 300 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateUrgenceInput;
