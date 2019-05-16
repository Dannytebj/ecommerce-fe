import {  GET_DEPARTMENTS, GET_DEPT_CATEGORIES, GET_PRODUCTS } from '../actions/types';

const initialState = {
  departments: [],
  deptCategories: [],
  fetchedProducts: []
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
    default:
      return state;
  }
}