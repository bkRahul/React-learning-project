import React from "react";

import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  //Object.keys converts the object keys to array
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      //maps and returns arrays with number of values::[[1], [1,2], []]
      return (
        [...Array(props.ingredients[ingKey])]
          //assigns the burger component to the array element::[[comp], [comp1,comp2],[]]
          .map((_, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />
          })
      );
    })
    .reduce((acc, curr) => {
      //adds the array element previous value with current value::[[comp], [comp1], [comp2]]
      return acc.concat(curr);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }
  //console.log(transformedIngredients);
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
