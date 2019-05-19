import { combineReducers } from 'redux';
import productsReducer from './productReducer';
import authReducer from './authReducer';

export default combineReducers({
  products: productsReducer,
  auth: authReducer
});
