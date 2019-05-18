import {
   NEW_POST, GET_DEPARTMENTS, GET_DEPT_CATEGORIES, GET_PRODUCTS, GET_PRODUCT_ATTRIBUTES,
   GET_SELECTED_PRODUCT
  } from './types';
import { bindActionCreators } from '../../../../../Library/Caches/typescript/3.4.3/node_modules/redux';

const baseUrl='http://localhost:9000/api/v1';


export const getDepartments = () => dispatch => {
  fetch(`${baseUrl}/departments`)
    .then(res => res.json())
    .then(departments =>
      dispatch({
        type: GET_DEPARTMENTS,
        payload: departments
      })
    )
}

export const getCategoriesInDept = deptId => dispatch => {
  fetch(`${baseUrl}/categories/inDepartment/${deptId}`)
    .then(res => res.json())
    .then(categories =>
      dispatch({
        type: GET_DEPT_CATEGORIES,
        payload: categories
      })
    )
};

export const getProducts = offset => dispatch => {
  fetch(`${baseUrl}/products?offset=${offset}`)
    .then(res => res.json())
    .then(products => 
      dispatch({
        type: GET_PRODUCTS,
        payload: products
      })
    )
}

export const getProuctsByCategory = (categoryId, offset) => dispatch => {
  fetch(`${baseUrl}/products/inCategory/${categoryId}?offset=${offset}`)
    .then(res => res.json())
    .then(products => 
      dispatch({
        type: GET_PRODUCTS,
        payload: products
      })
    )
}

export const searchProducts = searchTerm => dispatch => {
  fetch(`${baseUrl}/products/search/?query_string=${searchTerm}`)
    .then(res => res.json())
    .then(products => dispatchGetProducts(dispatch, products))
}

export const getSingleProduct = productId => dispatch => {
  fetch(`${baseUrl}/products/${productId}`)
    .then(res => res.json())
    .then(product => 
      dispatch({
        type: GET_SELECTED_PRODUCT,
        payload: product
      })
    )
}

export const getProductAtributes = product_id => dispatch => {
  fetch(`${baseUrl}/attributes/inProduct/${product_id}`)
    .then(res => res.json())
    .then(attributes => 
      dispatch({
        type: GET_PRODUCT_ATTRIBUTES,
        payload: attributes
      })
    )
}

export const createPosts = (postData) => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(res => res.json())
  .then(post =>
    dispatch({
      type: NEW_POST,
      payload: post
    })
  )
  
}
const dispatchGetProducts = (dispatch, products) => (
  dispatch({
    type: GET_PRODUCTS,
    payload: products
  })
)
// export const dispatchSelectedProduct= product => dispatch => (
//   dispatch({
//     type: SELECTED_PRODUCT,
//     payload: product
//   })
// )

// const dispatchGetSingleProduct = ()
