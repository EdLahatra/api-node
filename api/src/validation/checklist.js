import isEmpty from './is-empty';

const Validator = require('validator');

const validatePostInput = (data) => {
  const errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validatePostInput;
