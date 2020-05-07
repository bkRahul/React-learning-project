import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import styles from "./NavigationItems.module.css";

const NavigationItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/">HOME</NavigationItem>
      {props.isAuth ? (
      <NavigationItem link="/orders">My Orders</NavigationItem>
      ) : ""}
      {props.isAuth ? (
        <NavigationItem link="/logout">Log Out</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Login / Sign Up</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
