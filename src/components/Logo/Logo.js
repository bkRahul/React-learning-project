import React from "react";

import styles from "./Logo.module.css";
import logo from "../../assets/images/burger-logo.png";

export const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img src={logo} alt="My Burger" />
    </div>
  );
};

export default Logo