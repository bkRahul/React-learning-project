import React from "react";

import classes from "./Order.module.css";

const Order = props => {
  //console.log(props.ingredients);
  const ingredients = [];
  for (const ingredientName in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingredientName)) {
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      });
    }
  }

  //console.log(ingredients);

  const ingredientOutput = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ingredient.name} : {ingredient.amount}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD: {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
