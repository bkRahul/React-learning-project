import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Contact from "./Contact/Contact";
import { connect } from "react-redux";
import * as burgerOrderActions from "../../store/actions/index";

class Checkout extends Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  successCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact");
  };

  render() {
    let checkout = <Redirect to="/" />;

    if (this.props.ings) {
      if(this.props.isPurchased) {
        this.props.resetPurchased()
        return <Redirect to="/" />;
      }
      checkout = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.cancelCheckoutHandler}
            onCheckoutSuccess={this.successCheckoutHandler}
          />
          <Route
            path={this.props.match.path + "/contact"}
            component={Contact}
          />
        </div>
      );
    }

    return checkout;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    isPurchased: state.order.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPurchased: () => dispatch(burgerOrderActions.resetPurchased())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
