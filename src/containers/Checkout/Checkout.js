import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Contact from "./Contact/Contact";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  UNSAFE_componentWillMount() {
    //console.log(this.props);
    //get query from url search
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;

    //convert query entries into object
    for (let param of query.entries()) {
      // add to object ['salad', '1']
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
    console.log(this.state)
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  successCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.cancelCheckoutHandler}
          onCheckoutSuccess={this.successCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact"}
          render={(props) => <Contact ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />}
        />
      </div>
    );
  }
}

export default Checkout;
