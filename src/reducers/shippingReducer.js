import {
  GET_SHIPPING_REGIONS,
  UPDATE_CUSTOMER_ADDRESS,
  CHARGE_SUCCESSFUL
} from '../actions/types';

const initialState = {
  shippingRegions: [],
  shippingAddress: {},
  chargeSuccess: false
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
    case CHARGE_SUCCESSFUL:
      return {
        ...state, chargeSuccess: true
      }
    default:
      return state;
  }
}