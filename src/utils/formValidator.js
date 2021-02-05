const validationRules = {
  isNotEmpty: () => {
    return {
      validator: (field) => field.length > 0,
      message: 'Please fill in the required field.',
    };
  },
  hasMinLength: (minLength) => {
    return {
      validator: (field) => field.length > minLength,
      message: `Field need to contain more than ${minLength} symbols`,
    };
  },
};

const schema = {
  username: [
    () => validationRules.hasMinLength(2),
    () => validationRules.isNotEmpty(),
  ],
  password: [
    () => validationRules.hasMinLength(2),
    () => validationRules.isNotEmpty(),
  ],
};

export const validateForm = (formData) => {

  const errors = {}

  Object.keys(formData).map((field) => {
    return schema[field].map((rule) => {
      const {validator, message} = rule();
      if (!validator(formData[field])) {
        errors[field] = message
      }
    })
  })

  return errors

}
