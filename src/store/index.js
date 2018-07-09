import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

let configureStore = preloadedState =>
  createStore (rootReducer, preloadedState, applyMiddleware (thunk));

if (process.env.NODE_ENV === 'development') {
  configureStore = preloadedState => {
    const store = createStore (
      rootReducer,
      preloadedState,
      compose (applyMiddleware (thunk, createLogger ()))
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
      module.hot.accept ('../reducers', () => {
        store.replaceReducer (rootReducer);
      });
    }

    console.log (store.getState ());

    return store;
  };
}

export default configureStore;
