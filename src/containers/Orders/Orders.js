import React, { Component } from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as fetchOrdersAction from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
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
    isLoading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrdersAction.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
