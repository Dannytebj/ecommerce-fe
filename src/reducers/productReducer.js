import {
  GET_DEPARTMENTS,
  GET_DEPT_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCT_ATTRIBUTES,
  GET_SELECTED_PRODUCT
} from '../actions/types';

const initialState = {
  departments: [],
  deptCategories: [],
  fetchedProducts: {},
  selectedProduct: {},
  productAttributes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state, departments: action.payload
      }
    case GET_DEPT_CATEGORIES:
      return {
        ...state, deptCategories: action.payload
      }
    case GET_PRODUCTS:
      return {
        ...state, fetchedProducts: action.payload
      }
    case GET_PRODUCT_ATTRIBUTES:
      return {
        ...state, productAttributes: action.payload
      }
    case GET_SELECTED_PRODUCT:
      return {
        ...state, selectedProduct: action.payload
      }
    default:
      return state;
  }
}