'use strict';

import './../styles/_basic.sass';

import React from 'react';
import {Helmet} from "react-helmet";

import Header from './header/headerContainer'
import Main from './main/mainContainer'
import Footer from './footer/footerContainer'

function App() {
    return (
        <React.Fragment>
            <Helmet>
                <title>#To do</title>
            </Helmet>
            <Header />
            <Main />
            <Footer />
        </React.Fragment>
    )
}

export default App;

