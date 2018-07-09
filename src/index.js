import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import App from './containers';

const store = configureStore ();

//根节点
ReactDOM.render (
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById ('root')
);

//devServer注册服务
if (process.env.NODE_ENV === 'development') {
  registerServiceWorker();
}
