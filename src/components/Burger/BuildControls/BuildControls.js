import React from "react";

import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = props => {
  const controls = [
    { label: "Lettuce", type: "lettuce" },
    { label: "Bacon", type: "bacon" },
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
  ];
  return (
    <div className={styles.BuildControls}>
      <p>
        Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            //disable button for particular ingredient
            disable={props.disabledBtn[ctrl.type]}
          />
        );
      })}
      <button className={styles.OrderButton} disabled={!props.purchasable} onClick={props.purchasing} >
    {props.isAuth ? "ORDER NOW" : "Sign In To Order Now"}
      </button>
    </div>
  );
};

export default BuildControls;
