import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import modules from './modules';
import rootSaga from './sagas';

const isDev = process.env.NODE_ENV === 'development';
const devTools = isDev && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [loggerMiddleware, sagaMiddleware];

const configure = (preloadedState?: any) => {
  const store = createStore(
    modules,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configure;
