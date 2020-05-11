export const updateObject = (state, updatedValue) => {
    return {
        ...state,
        ...updatedValue
      };
}

export const checkValidity = (value, rules) => {
  //console.log(value, rules);
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.isEmail) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};