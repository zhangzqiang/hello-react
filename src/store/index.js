import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

let configureStore = initialState =>
  createStore (rootReducer, initialState, applyMiddleware (thunkMiddleware));

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger ();
  //当使用异步加载的时候需要加入插件thunk,插件需要传入applyMiddleWare方法，
  //如果这个时候还加入了devtool插件，applyMiddleWare(thunk)必须要放在devtool()的前面，否则会报[Actions must be plain objects. Use custom middleware for async actions.]错误
  configureStore = initialState => {
    const store = createStore (
      rootReducer,
      initialState,
      compose (
        applyMiddleware (thunkMiddleware, loggerMiddleware),
        window.devToolsExtension ? window.devToolsExtension () : f => f
      )
    );

    // 在调试状态下，如果开启热更新，则需要对reducers进行强制处理
    if (module.hot) {
      module.hot.accept ('../reducers', () => {
        store.replaceReducer (rootReducer);
      });
    }

    return store;
  };
}

export default configureStore;
