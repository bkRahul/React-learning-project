import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Contact from "./Contact/Contact";
import { connect } from "react-redux";

class Checkout extends Component {
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
          ingredients={this.props.ings}
          onCheckoutCancelled={this.cancelCheckoutHandler}
          onCheckoutSuccess={this.successCheckoutHandler}
        />
        <Route path={this.props.match.path + "/contact"} component={Contact} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    tprice: state.totalPrice
  };
};

export default connect(mapStateToProps, null)(Checkout);
