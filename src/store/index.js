import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

let configureStore = initialState =>
  createStore (rootReducer, initialState, applyMiddleware (thunkMiddleware));

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger ();
  //当使用异步加载的时候需要加入插件thunk,插件需要传入applyMiddleWare方法，
  //如果这个时候还加入了devtool插件，applyMiddleWare(thunk)必须要放在devtool()的前面，否则会报错。
  //Actions must be plain objects. Use custom middleware for async actions.
  configureStore = initialState => {
    const store = createStore (
      rootReducer,
      initialState,
      compose (
        applyMiddleware (thunkMiddleware, loggerMiddleware),
        window.devToolsExtension ? window.devToolsExtension () : f => f
      )
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
      module.hot.accept ('../reducers', () => {
        store.replaceReducer (rootReducer);
      });
    }

    return store;
  };
}

export default configureStore;
