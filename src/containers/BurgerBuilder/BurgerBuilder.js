import React, { PureComponent } from "react";

import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import withErrorHandler from "../../hoc/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends PureComponent {
  state = {
    totalPrice: 0,
    purchasing: false,
    isLoading: false,
    error: false
  };

  // componentDidMount() {
  //   axios
  //     .get("/ingredient.json")
  //     .then(response => {
  //       //    console.log(response);
  //       this.setState({
  //         ingredients: response.data
  //       });
  //     })
  //     .catch(error => {
  //       //    console.log(error)
  //       this.setState({
  //         error: true
  //       });
  //     });
  // }

  updatePurchaseState = ingredients => {
    let sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    return sum > 0;
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
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
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

    if (this.props.ings) {
      orderSum = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );

      if (this.state.isLoading) {
        orderSum = <Spinner />;
      }

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onDeleteIngredient}
            disabledBtn={disabledInfo}
            totalPrice={this.props.tprice}
            purchasable={this.updatePurchaseState(this.props.ings)}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    tprice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onDeleteIngredient: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
