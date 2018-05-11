import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import Config from './config';

export default (rootReducer, rootSaga) => {
  const middlewares = [];

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  if (Config.reduxLoggerEnabled) {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
  }

  const persistedReducers = updateReducers(rootReducer);

  const store = createStore(persistedReducers, {}, applyMiddleware(...middlewares));

  persistStore(store);
  sagaMiddleware.run(rootSaga);

  return store;
};

const updateReducers = (rootReducer) => {
  const config = {
    key: 'root',
    storage,
    whitelist: ['home', 'requests'],
  };

  return persistReducer(config, rootReducer);
};
