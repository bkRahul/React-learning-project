import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  //console.log(props)
  return (
    <div className={classes.CheckoutSummary}>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.onCheckoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.onCheckoutSuccess}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
