import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PROCESS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ORDER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
      };
    case actionTypes.ORDER_FAILURE:
      return {
        ...state,
        loading: false
      };
    case actionTypes.RESET_PURCHASED:
      return {
        ...state,
        purchased: false
      };
    //fetch orders
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orderData,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_ORDERS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
