import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.ORDER_PROCESS:
      return updateObject(state, { loading: true });

    case actionTypes.ORDER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
      });

    case actionTypes.ORDER_FAILURE:
      return updateObject(state, { loading: false });

    case actionTypes.RESET_PURCHASED:
      return updateObject(state, { purchased: false });

    //fetch orders
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orderData, loading: false });

    case actionTypes.FETCH_ORDERS_FAILURE:
      return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS:
      return updateObject(state, { loading: true });

    default:
      return state;
  }
};

export default reducer;
