import axios from 'axios';
import toastr from 'toastr';
import { GET_SHIPPING_REGIONS, UPDATE_CUSTOMER_ADDRESS, PLACE_ORDER, GET_ORDER_DETAILS,
  CHARGE_SUCCESSFUL } from './types';

// const baseUrl = 'http://localhost:9000/api/v1';
const baseUrl = 'https://yabamarketbydanny.herokuapp.com/api/v1';

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
export const placeOrder = ({ cart_id, shipping_id, tax_id }) => dispatch => {
  axios.post(`${baseUrl}/orders`, { cart_id, shipping_id, tax_id })
  .then(({ data }) => {
    dispatch({
      type: PLACE_ORDER,
      payload: data.orderId
    })
    localStorage.setItem('orderId', data.orderId);
  }).catch(error => catchAllErrors(error));
}

export const chargeCard = (stripeToken, amount) => dispatch => {
  const currency = 'gbp';
  const user = localStorage.getItem('name') || '';
  const order_id = localStorage.getItem('orderId')
  const description= `Charge for ${user}`
  axios.post(`${baseUrl}/stripe/charge`, { stripeToken, amount, currency, description, order_id })
    .then((res) => {
      dispatch({
        type: CHARGE_SUCCESSFUL
      })
      emptyCart(localStorage.getItem('cartId'))
    })
    .catch(error => catchAllErrors(error));
}

export const getOrderDetail = (orderId) => dispatch => {
  axios.get(`${baseUrl}/orders/shortDetail/${orderId}`)
    .then(({ data }) => {
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: data
      })
    }).catch(error => catchAllErrors(error));
}

export const emptyCart = cart_id => {
  axios.delete(`${baseUrl}/shoppingcart/empty/${cart_id}`)
    .then(() => {
      console.log('Succesfully deleted');
      localStorage.removeItem('cartId');
      localStorage.removeItem('orderId');
    })
    .catch(error => catchAllErrors(error));
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
