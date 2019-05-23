/* eslint-disable no-unused-vars */

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './styles/main.scss';
import './index.css';
import setAuthHeader from './utils/setAuthHeader';

if (localStorage.jwtoken) {
  setAuthHeader(localStorage.jwtoken);
}
$(function () {
  $('[data-toggle="popover"]').popover()
})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

