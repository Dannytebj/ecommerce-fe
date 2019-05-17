import {
   NEW_POST, GET_DEPARTMENTS, GET_DEPT_CATEGORIES, GET_PRODUCTS, GET_PRODUCTS_IN_CATEGORY 
  } from './types';

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
  fetch(`${baseUrl}/products/inCategory/${categoryId}offset=${offset}`)
    .then(res => res.json())
    .then(products => 
      dispatch({
        type: GET_PRODUCTS,
        payload: products
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
