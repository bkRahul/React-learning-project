import React, { Component } from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as fetchOrdersAction from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

class Orders extends Component {
  componentDidMount() {
//    console.log("Orders is mounted")
    this.props.onFetchOrders(this.props.idToken, this.props.userId);
  }

//   componentDidUpdate() {
//    console.log("orders is updated")
// //    this.props.onFetchOrders();
//   }

  render() {
    let orders = <Spinner />;

    if (!this.props.isLoading) {
      //console.log(this.props.orders)
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.loading,
    idToken: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (idToken, userId) => dispatch(fetchOrdersAction.fetchOrders(idToken, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
