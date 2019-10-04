'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// React router
import { HashRouter, BrowserRouter } from 'react-router-dom';

const rootEl = document.querySelector('#root');

import configureStore, { history } from './store/configureStore';

const store = configureStore();

import App from './containers/appContainer';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>,
        rootEl
    )
};

render();

if (module.hot) {
    module.hot.accept();
}
