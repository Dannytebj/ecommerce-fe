import toastr from 'toastr';
import axios from 'axios';
import {
   GET_DEPARTMENTS, GET_DEPT_CATEGORIES, GET_PRODUCTS, GET_PRODUCT_ATTRIBUTES,
  GET_SELECTED_PRODUCT, GET_CART_ID, SET_CART_ITEMS, UPDATE_CART_QUANTITY,GET_TOTAL_COST
} from './types';

const baseUrl = 'http://localhost:9000/api/v1';


export const getDepartments = () => dispatch => {
  axios.get(`${baseUrl}/departments`)
    .then(({ data }) =>
      dispatch({
        type: GET_DEPARTMENTS,
        payload: data
      })
    ).catch(error => catchAllErrors(error))
}

export const getCategoriesInDept = deptId => dispatch => {
  axios.get(`${baseUrl}/categories/inDepartment/${deptId}`)
    .then(({ data }) =>
      dispatch({
        type: GET_DEPT_CATEGORIES,
        payload: data
      })
    )
    .catch(error => catchAllErrors(error))
};

export const getProducts = offset => dispatch => {
  axios.get(`${baseUrl}/products?offset=${offset}`)
    .then(({ data }) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
    )
    .catch(error => catchAllErrors(error))
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
    .catch(error => catchAllErrors(error))
}

export const searchProducts = searchTerm => dispatch => {
  axios.get(`${baseUrl}/products/search/?query_string=${searchTerm}`)
    .then(({ data }) => dispatchGetProducts(dispatch, data))
    .catch(error => catchAllErrors(error))
}

export const getSingleProduct = productId => dispatch => {
  axios.get(`${baseUrl}/products/${productId}`)
    .then(({ data }) =>
      dispatch({
        type: GET_SELECTED_PRODUCT,
        payload: data
      })
    ).catch(error => catchAllErrors(error))
}

export const getProductAtributes = product_id => dispatch => {
  axios.get(`${baseUrl}/attributes/inProduct/${product_id}`)
    .then(({ data }) =>
      dispatch({
        type: GET_PRODUCT_ATTRIBUTES,
        payload: data
      })
    ).catch(error => catchAllErrors(error))
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
    })
    .catch(error => catchAllErrors(error))
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
    .catch(error => catchAllErrors(error))
);

export const getTotalCost = cart_id => dispatch => {
  axios.get(`${baseUrl}/shoppingcart/totalAmount/${cart_id}`)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: GET_TOTAL_COST,
        payload: data.total_amount
      })
    }).catch(error => catchAllErrors(error));
}

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
const catchAllErrors = (error) => {
  toastr.error(error);
}

// const sendSuccessToast = action => toastr.success(`${action} was successful`);


