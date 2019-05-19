import toastr from 'toastr';
import axios from 'axios';
import {
   GET_DEPARTMENTS, GET_DEPT_CATEGORIES, GET_PRODUCTS, GET_PRODUCT_ATTRIBUTES,
  GET_SELECTED_PRODUCT, GET_CART_ID, SET_CART_ITEMS, UPDATE_CART_QUANTITY
} from './types';

const baseUrl = 'http://localhost:9000/api/v1';


export const getDepartments = () => dispatch => {
  axios.get(`${baseUrl}/departments`)
    .then(({ data }) =>
      dispatch({
        type: GET_DEPARTMENTS,
        payload: data
      })
    )
}

export const getCategoriesInDept = deptId => dispatch => {
  axios.get(`${baseUrl}/categories/inDepartment/${deptId}`)
    .then(({ data }) =>
      dispatch({
        type: GET_DEPT_CATEGORIES,
        payload: data
      })
    )
};

export const getProducts = offset => dispatch => {
  axios.get(`${baseUrl}/products?offset=${offset}`)
    .then(({ data }) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
    )
}

export const getProuctsByCategory = (categoryId, offset) => dispatch => {
  const offsett = offset || 0;
  axios.get(`${baseUrl}/products/inCategory/${categoryId}?offset=${offsett}`)
    .then(({ data }) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
    )
}

export const searchProducts = searchTerm => dispatch => {
  axios.get(`${baseUrl}/products/search/?query_string=${searchTerm}`)
    .then(({ data }) => dispatchGetProducts(dispatch, data))
}

export const getSingleProduct = productId => dispatch => {
  axios.get(`${baseUrl}/products/${productId}`)
    .then(({ data }) =>
      dispatch({
        type: GET_SELECTED_PRODUCT,
        payload: data
      })
    )
}

export const getProductAtributes = product_id => dispatch => {
  axios.get(`${baseUrl}/attributes/inProduct/${product_id}`)
    .then(({ data }) =>
      dispatch({
        type: GET_PRODUCT_ATTRIBUTES,
        payload: data
      })
    )
}

export const createNewCart = () => dispatch => (
  axios.get(`${baseUrl}/shoppingcart/generateUniqueId`)
);

export const addItemToCart = (cart_id, product_id, attributes) => dispatch => {
  axios.post(`${baseUrl}/shoppingcart/add`, { cart_id, product_id, attributes })
    .then(({ data }) => dispatchSetCartItems(dispatch, data))
}

export const updateCartItem = (item_id, quantity) => dispatch => {
  axios.put(`${baseUrl}/shoppingcart/update/${item_id}`, { quantity })
    .then(({ data }) => {
      dispatchSetCartItems(dispatch, data);
      // sendSuccessToast("update cart");
    })
}

export const updateCartQuantity = (quantity, itemId) => dispatch => (
  dispatch({
    type: UPDATE_CART_QUANTITY,
    payload: {
      quantity,
      itemId
    }
  })
)

export const getCartItems = cart_id => dispatch => (
  axios.get(`${baseUrl}/shoppingcart/${cart_id}`)
    .then(({ data }) => dispatchSetCartItems(dispatch, data ))
);

const dispatchGetProducts = (dispatch, products) => (
  dispatch({
    type: GET_PRODUCTS,
    payload: products
  })
);

const dispatchSetCartItems = (dispatch, items) => (
  dispatch({
    type: SET_CART_ITEMS,
    payload: items
  })
);

export const dispatchCartId = (cartId) => dispatch => (
  dispatch({
    type: GET_CART_ID,
    payload: cartId
  })
);

// const sendSuccessToast = action => toastr.success(`${action} was successful`);


