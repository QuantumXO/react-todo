'use strict';

import './_header.sass';

import React, {Component} from 'react';

import { connect } from 'react-redux';

class Header extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <header className="header">
                <div className="row">
                    <span className="header__author">@{this.props.basicProps.author}</span>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    basicProps: state.defaultReducer,
});

export default connect(mapStateToProps, null)(Header)
