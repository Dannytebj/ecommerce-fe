import axios from 'axios';
import setAuthHeader from '../utils/setAuthHeader';
import {
  AUTH_FORM_INPUTS,
  SET_VALIDATION_ERRORS,
  RESET_AUTH_STORE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  AUTH_SUCCESS,
  LOADING,
  FINISH_LOADING
} from './types';
import toastr from 'toastr';

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

export const loading = () => dispatch => (
  dispatch({
    type: LOADING,
  })
)

export const finishLoading = (dispatch)  => (
  dispatch({
    type: FINISH_LOADING,
  })
)
export function signUp({ name, email, password }) {
  return dispatch => axios.post(`${baseUrl}/customers`, { name, email, password })
    .then(({ data }) => setUserData(data, dispatch))
    .catch((error) => displayError(error));
}
export function signIn({ email, password }) {
  return dispatch => axios.post(`${baseUrl}/customers/login`, { email, password })
    .then(({ data }) => setUserData(data, dispatch))
    .catch((error) => displayError(error));
}
export const getUser = () => dispatch => {
  loading(dispatch)
  axios.get(`${baseUrl}/customers`)
    .then(({ data }) => {
      finishLoading(dispatch);
      dispatch({
        type: AUTH_SUCCESS,
        payload: data
      })
    }
    ).catch((error) => 
    displayError(error));
}

export const setUserData = (data, dispatch) => {
    localStorage.setItem('jwtoken', data.accessToken);
    localStorage.setItem('name', data.customer.schema.name);
    setAuthHeader(data.accessToken);
    dispatch({
      type: AUTH_SUCCESS,
      payload: data.customer.schema
    });
  }

  export const displayError = ( error ) => {
    toastr.options.preventDuplicates = true;
    if (error.message === 'Network Error') {
      toastr.error('An error occurred with your network');
    } else {
      const errMsg = (error.response.data !== undefined) ? error.response.data.error.message : error.message
      toastr.error(errMsg);
    }
  }


