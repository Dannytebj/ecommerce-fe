import { combineReducers } from 'redux';
import productsReducer from './productReducer';
import authReducer from './authReducer';
import shippingReducer from './shippingReducer';

export default combineReducers({
  products: productsReducer,
  auth: authReducer,
  shipping: shippingReducer
});
