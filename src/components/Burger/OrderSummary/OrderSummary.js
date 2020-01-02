import React, {useEffect} from "react";

import Aux from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {

    useEffect(() => {
    //console.log("[OrderSummary.js] is updated");
  });

  const classes = {
    textTransform: "uppercase"
  };
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <b style={classes}>{igKey}</b>: {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delicious Burger with following Ingredients</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to checkout ?</p>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        CANCEL
      </Button>
    </Aux>
  );
};

export default OrderSummary;
