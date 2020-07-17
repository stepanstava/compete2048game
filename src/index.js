import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// import store from './store'

import { createStore } from "redux";
import rootReducer from "./reducers";

import App from './components';

//! change to const ?
let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


