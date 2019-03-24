import isEmpty from './is-empty';

const Validator = require('validator');

const validatePostInput = (data) => {
  const errors = {};

  data.intitule = !isEmpty(data.intitule) ? data.intitule : '';

  if (!Validator.isLength(data.intitule, { min: 4, max: 300 })) {
    errors.intitule = 'Post must be between 4 and 300 characters';
  }

  if (Validator.isEmpty(data.intitule)) {
    errors.intitule = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validatePostInput;
