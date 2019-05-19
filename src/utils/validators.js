
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

// const Promise= require('bluebird');

export function signUpValidator(data) {
  let errors = {};
  console.log(data)
  if (!validator.isEmail(data.email)){
    errors.email = 'Please provide a valid email';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }
  if (validator.isEmpty(data.name)) {
    errors.name = 'Fullname field is required';
  }
  if (!validator.isAlpha(data.name)) {
    errors.name = 'Fullname field can only be alphabets';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'confirmPassword field is required';
  }
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export function signInValidator(data) {
  let errors = {};
  if (validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Please provide a valid email';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}