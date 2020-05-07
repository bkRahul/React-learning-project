import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios
        .get("/ingredient.json")
        .then(response => {
          //    console.log(response);
          dispatch(setIngredients(response.data))
        })
        .catch(error => {
              console.log(error)
          dispatch(fetchIngredientsFailed())
        });
    }
}