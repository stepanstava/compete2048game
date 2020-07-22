import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware  } from "redux";
import thunk from 'redux-thunk';

import reducers from "./reducers";

import App from './components';


const store = createStore(reducers, applyMiddleware(thunk));

// window.requestAnimationFrame(function () {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
// })

