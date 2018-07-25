import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import App from './containers';
import locales from './utils/locales';
import storage from './utils/storage';

const getCurrentAppLocale = () => {
  const language = storage.get ('language_key');
  switch (language) {
    case 'zh_CN':
      return locales.zhCN;
    default:
      return locales.enUS;
  }
};

window.appLocale = getCurrentAppLocale ();

const store = configureStore ();

// 根节点，将组件渲染到root下
// Provider功能主要为以下两点：
// 1. 在原应用组件上包裹一层，使原来整个应用成为Provider的子组件，让组件拿到state
// 2. 接收Redux的store作为props，通过context对象传递给子孙组件上的connect
ReactDOM.render (
  <Provider store={store}>
    <IntlProvider
      locale={window.appLocale.locale}
      messages={window.appLocale.messages}
      formats={window.appLocale.formats}
    >
      <App />
    </IntlProvider>,
  </Provider>,
  document.getElementById ('root')
);

//在开发环境下，注册devServer服务
if (process.env.NODE_ENV === 'development') {
  registerServiceWorker ();
}
