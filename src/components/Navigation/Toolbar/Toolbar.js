import React from "react";

import styles from "./Toolbar.module.css";
import { Logo } from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import DrawerToggle from "../../UI/DrawerToggle/DrawerToggle";

const Toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle modalClosed={props.close} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
      <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
