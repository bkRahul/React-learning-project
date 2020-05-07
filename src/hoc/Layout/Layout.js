import React, { Component } from "react";

import Aux from "../Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar close={this.sideDrawerHandler} token={this.props.idToken} />
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.sideDrawerHandler}
          token={this.props.idToken}
        />
        <div>Toolbar sidebar backdrop</div>
        <main className={classes.Layout}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken
  };
};

export default connect(mapStateToProps, null)(Layout);
