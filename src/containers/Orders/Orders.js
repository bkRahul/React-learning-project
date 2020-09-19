import React, { useEffect } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as fetchOrdersAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

const Orders = props => {
  const { onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(props.idToken, props.userId);
  }, [onFetchOrders, props.idToken, props.userId]);

  let orders = <Spinner />;

  if (!props.isLoading) {
    //console.log(this.props.orders)
    orders = props.orders.map(order => {
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
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.loading,
    idToken: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (idToken, userId) =>
      dispatch(fetchOrdersAction.fetchOrders(idToken, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
