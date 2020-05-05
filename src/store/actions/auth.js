import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBv3D6-M9NkFA7uJbzhkypKGnMwpx0HXbc";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBv3D6-M9NkFA7uJbzhkypKGnMwpx0HXbc";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        dispatch(authFailure(error.response.data.error.message));
      });
  };
};

export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
