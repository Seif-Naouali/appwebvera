const Validator = require("validator");
const isEmpty = require("is-empty");
const moment = require('moment');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.poids = !isEmpty(data.poids) ? data.poids : "";
  data.birthday = !isEmpty(data.birthday) ? data.birthday : "";

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required register";
  }

// test about date
  console.log("date saisie",data.birthday);
   var actualDate = moment();
   console.log("date actuelle",actualDate);
  if(data.birthday >= actualDate ){
    errors.birthday = "Datebirth should be correct";
  }

  // Poids checks
  if (Validator.isEmpty(data.poids)) {
    errors.poids = "weight field is required";
  }else if(Math.sign(data.poids)== -1){
    errors.poids = "weight should be positive";
  }

  // gender checks
  if (Validator.isEmpty(data.gender)) {
      errors.gender = "Gender field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};