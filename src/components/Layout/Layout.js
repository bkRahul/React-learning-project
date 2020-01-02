import React, { Component } from "react";

import Aux from "../../hoc/Auxillary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

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
        <Toolbar close={this.sideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.sideDrawerHandler}
        />
        <div>Toolbar sidebar backdrop</div>
        <main className={classes.Layout}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
