import axios from 'axios';
import toastr from 'toastr';
// import setAuthHeader from '../utils/setAuthHeader';
import { GET_SHIPPING_REGIONS, UPDATE_CUSTOMER_ADDRESS } from './types';

const baseUrl = 'http://localhost:9000/api/v1';
// const baseUrl = 'https://yabamarketbydanny.herokuapp.com/api/v1';

export const getShippingRegion = () => dispatch => {
  axios.get(`${baseUrl}/shipping/regions`)
    .then(({ data }) => {
      dispatch({
        type: GET_SHIPPING_REGIONS,
        payload: data
      })
    }).catch(error => catchAllErrors(error));
}

export const updateCustomerAddress = (payload) => dispatch => {
  axios.put(`${baseUrl}/customers/address`, payload)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_CUSTOMER_ADDRESS,
        payload: data
      })
      toastr.success("Address updated successfully")
    }).catch(error => catchAllErrors(error))
}

const catchAllErrors = (error) => {
  toastr.options.preventDuplicates = true;
  if (error.message === 'Network Error') {
    toastr.error('An error occurred with your network');
  } else {
    const errMsg = (error.response !== undefined) ? error.response.data.error.message : error;
    toastr.error(errMsg);
  }
}
