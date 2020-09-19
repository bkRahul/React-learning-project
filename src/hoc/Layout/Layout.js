import React, { useState } from 'react';

import Aux from '../Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

const Layout = props => {
  const [showSideDrawer, setSideDrawer] = useState(false);

  const sideDrawerHandler = () => {
    setSideDrawer(!showSideDrawer);
  };
  return (
    <Aux>
      <Toolbar close={sideDrawerHandler} token={props.idToken} />
      <SideDrawer
        show={showSideDrawer}
        close={sideDrawerHandler}
        token={props.idToken}
      />
      <div>Toolbar sidebar backdrop</div>
      <main className={classes.Layout}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken,
  };
};

export default connect(mapStateToProps, null)(Layout);
