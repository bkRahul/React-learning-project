import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop.js";
import Aux from "../../../hoc/Auxillary";
import classes from "./SideDrawer.module.css";

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
  return (
    <Aux>
      <Backdrop show={props.show} modalClosed={props.close}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.token} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
