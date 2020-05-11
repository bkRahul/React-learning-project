import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  //send token, userId as payload to reducer
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
  //to dispatch async action return  function with dispatch as argument (redux thunk)
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
        //console.log(response);
        //get total expire Date by adding current time in ms and expire time in ms
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        //console.log(expirationDate);
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        //set token, userId as payload to reducer
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        //disptch auto logout after token expires
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch((error) => {
        //console.log(error.response.data.error.message);
        dispatch(authFailure(error.response.data.error.message));
      });
  };
};

//check token expire time action
export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

//logout action
export const authLogout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

//redirect action
export const setAuthRedirectPath = (path) => {
  //send path as payload to reducer
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

//check user auth action
export const checkAuthState = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    const userId = localStorage.getItem("userId");
    //convert stored string expiration date to object
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (!idToken) {
      dispatch(authLogout());
    } else {
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(idToken, userId));
        //pass expiration date and current date in seconds
        dispatch(checkAuthTimeOut( (expirationDate.getTime() - new Date().getTime()) / 1000));        
      }
    }
  };
};
