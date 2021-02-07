const validationRules = {
  isNotEmpty: () => {
    return {
      validator: (field) => field.length > 0,
      message: 'Please fill in the required field.',
    }
  },
  hasMinLength: (minLength) => {
    return {
      validator: (field) => field.length > minLength,
      message: `Field need to contain more than ${minLength} symbols`,
    }
  },
}

const schema = {
  username: [
    () => validationRules.hasMinLength(2),
    () => validationRules.isNotEmpty(),
  ],
  password: [
    () => validationRules.hasMinLength(2),
    () => validationRules.isNotEmpty(),
  ],
}

export const validateField = (field) => {

  const errors = []

  schema[field.name].map((rule) => {
    const { validator, message } = rule()
    if (!validator(field.value)) {
      errors[field.name] = message
    }
  })
  return errors
}

export const validateForm = (formData) => {

  const formFields = []
  const errors = {}

  Object.keys(formData).map((fieldName) => {
    formFields.push({
      name: fieldName,
      value: formData[fieldName]
    })
  })

  formFields.map((field) => {
    const fieldError = validateField(field)
    Object.assign(errors, fieldError)
  })

  return errors
}
