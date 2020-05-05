import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/index"

class LogOut extends Component {
    componentDidMount() {
        this.props.onLogout();
    }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {dispatch(authActions.authLogout())}
    }
}

export default connect(null, mapDispatchToProps)(LogOut);
