import * as actionTypes from "../actions";

const INGREDIENT_PRICES = {
    lettuce: 0.2,
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };

const initialState = {
  ingredients: {
    lettuce: 1,
    bacon: 0,
    salad: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
    default:
      return state;
  }
};

export default reducer;
