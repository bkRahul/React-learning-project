import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import styles from "./NavigationItems.module.css";

const NavigationItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/">HOME</NavigationItem>
      <NavigationItem link="/orders">My Orders</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
