'use strict';

import './_header.sass';

import React, {Component} from 'react';

// Redux
import { bindActionCreators } from 'redux';

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

const mapDispatchToProps = (dispatch) => ({

    //basicAction: bindActionCreators(basicAction, dispatch),

});

export default connect(mapStateToProps, null)(Header)
