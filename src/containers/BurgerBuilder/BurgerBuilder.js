import React, { PureComponent } from "react";

import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import withErrorHandler from "../../hoc/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  lettuce: 0.2,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends PureComponent {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: true,
    purchasing: false,
    isLoading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredient.json")
      .then(response => {
        //    console.log(response);
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        //    console.log(error)
        this.setState({
          error: true
        });
      });
  }

  updatePurchaseState = ingredients => {
    let sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  };

  addIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    //convert the object to array =>  ["bacon=2", "cheese=0", "lettuce=1"]
    for (let i in this.state.ingredients) {
      if (this.state.ingredients.hasOwnProperty(i)) {
        //encode the uri and push it to query
        queryParams.push(
          encodeURIComponent(i) +
            "=" +
            encodeURIComponent(this.state.ingredients[i])
        );
      }
    }
    queryParams.push('price='+ this.state.totalPrice); 
    //console.log(queryParams);
    const queryString = queryParams.join("&");
    //console.log(queryString);

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    //returns true or false if key is 0
    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    let orderSum,
      burger = <Spinner />;

    if (this.state.error) {
      burger = <p>Sorry Ingredients could not be loaded</p>;
    }

    if (this.state.ingredients) {
      orderSum = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );

      if (this.state.isLoading) {
        orderSum = <Spinner />;
      }

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientsHandler}
            ingredientRemoved={this.removeIngredientsHandler}
            disabledBtn={disabledInfo}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        >
          {orderSum}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
