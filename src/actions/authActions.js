import axios from 'axios';
import setAuthHeader from '../utils/setAuthHeader';
import {
  AUTH_FORM_INPUTS,
  SET_VALIDATION_ERRORS,
  RESET_AUTH_STORE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  AUTH_SUCCESS
} from './types';

// const baseUrl = 'http://localhost:9000/api/v1';
const baseUrl = 'https://yabamarketbydanny.herokuapp.com/api/v1';

export const authFormInputs = ({ prop, value }) => ({
  type: AUTH_FORM_INPUTS,
  payload: { prop, value }
})

export const resetAuthStore = () => ({
  type: RESET_AUTH_STORE
})
export const setValidationError = (errors) => ({
  type: SET_VALIDATION_ERRORS,
  payload: errors
})

export const handleSignUpSuccess = (payload) => ({
  type: SIGN_UP_SUCCESS,
  payload
});
export const handleSignUpFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  payload: error
});


export function signUp(userData) {
  return dispatch => axios.post(`${baseUrl}/customers`, userData)
    .then(({ data }) => setUserData(data))
    .catch((error) => {
      dispatch(error);
    });
}
export function signIn({ email, password }) {
  return dispatch => axios.post(`${baseUrl}/customers/login`, { email, password })
}
export const getUser = () => dispatch => {
  axios.get(`${baseUrl}/customers`)
    .then(({ data }) => 
      dispatch({
        type: AUTH_SUCCESS,
        payload: data
      })
    )
}

export const setUserData = (data) => dispatch => {
    localStorage.setItem('jwtoken', data.accessToken);
    localStorage.setItem('name', data.customer.schema.name);
    setAuthHeader(data.accessToken);
    dispatch({
      type: AUTH_SUCCESS,
      payload: data.customer.schema
    });
  }


