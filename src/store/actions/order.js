import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const orderProcess = () => {
    return {
      type: actionTypes.ORDER_PROCESS
    };
  };

export const orderSuccess = (id, orderData) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const orderFailure = (error) => {
  return {
    type: actionTypes.ORDER_FAILURE,
    error: error
  };
};

export const takeOrder = orderData => {
  return dispatch => {
    dispatch(orderProcess());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        console.log(response.data)
        dispatch(orderSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(orderFailure(error));
      });
  };
};

export const resetPurchased = () => {
  return {
    type: actionTypes.RESET_PURCHASED
  };
};

//fetch orders
export const fetchOrdersSuccess = orderData => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orderData: orderData
  }
};

export const fetchOrdersFailure = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  }
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(orderProcess());
    axios
      .get("/orders.json")
      .then(response => {
        console.log(response.data);
        let fetchedOrders = [];
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            fetchedOrders.push({...response.data[key], id: key });
          }
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
        console.log(fetchedOrders);
      })
      .catch(error => {
        dispatch(fetchOrdersFailure(error));
      });
  };
};