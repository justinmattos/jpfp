import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './store';

const main = document.querySelector('#main');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  main
);
