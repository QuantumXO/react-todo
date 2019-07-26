'use strict';

import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';

import defaultReducer from './defaultReducer';
import toDoReducer from './toDoReducer';

export default (history) => combineReducers({
    defaultReducer,
    toDoReducer,
    router: connectRouter(history),
});
