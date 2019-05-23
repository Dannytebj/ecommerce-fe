import {
  GET_SHIPPING_REGIONS,
  UPDATE_CUSTOMER_ADDRESS
} from '../actions/types';

const initialState = {
  shippingRegions: [],
  shippingAddress: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SHIPPING_REGIONS:
      return {
        ...state, shippingRegions: action.payload
      }
    case UPDATE_CUSTOMER_ADDRESS:
      return {
        ...state, shippingAddress: action.payload
      }
    default:
      return state;
  }
}