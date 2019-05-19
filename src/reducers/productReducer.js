import {
  GET_DEPARTMENTS,
  GET_DEPT_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCT_ATTRIBUTES,
  GET_SELECTED_PRODUCT,
  GET_CART_ID,
  SET_CART_ITEMS,
  UPDATE_CART_QUANTITY
} from '../actions/types';

const initialState = {
  cartId: '',
  cartItems: [],
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
    case GET_CART_ID:
      return {
        ...state, cartId: action.payload
      }
    case SET_CART_ITEMS:
      return {
        ...state, cartItems: action.payload
      }
    // case UPDATE_CART_QUANTITY:
    //   const updatedItem = state.cartItems.find(item => item.item_id === action.payload.itemId)
    default:
      return state;
  }
}