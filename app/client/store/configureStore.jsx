'use strict';

import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './../reducers/rootReducer';

export default function configureStore(preloadedState) {
    const logger = createLogger();

    const store = createStore(
        rootReducer(),
        preloadedState,
        applyMiddleware(logger,)
    );

    return store;
}
