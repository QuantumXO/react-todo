'use strict';

import { combineReducers } from "redux";

import defaultReducer from './defaultReducer';
import toDoReducer from './toDoReducer';

export default () => combineReducers({
    defaultReducer,
    toDoReducer,
});
