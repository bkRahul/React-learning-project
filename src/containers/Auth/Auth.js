import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import { checkValidity } from '../../utility/utility';

//import withErrorHandler from "../../hoc/withErrorHandler";
//import axios from "axios";

const Auth = props => {
  const [auth, setAuth] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath('/');
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangeHandler = (e, id) => {
    const updatedAuth = {
      //  copies auth as a new object
      ...auth,
      //  update the single control [email]
      [id]: {
        //  copies auth[email]
        ...auth[id],
        //  updates the properties
        value: e.target.value,
        valid: checkValidity(e.target.value, auth[id].validation),
        touched: true,
      },
    };
    //  updates auth state with updated updatedAuth
    setAuth(updatedAuth);
  };

  const authHandler = event => {
    event.preventDefault();
    props.onAuth(auth.email.value, auth.password.value, isSignUp);
  };

  const toggleLAuthHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElementsArray = [];
  for (const key in auth) {
    if (auth.hasOwnProperty(key)) {
      //get the name and element config part of object
      formElementsArray.push({ id: key, config: auth[key] });
    }
  }
  //console.log(formElementsArray);
  //  {id: "email", config: {auth["email"]}
  let form = (
    <form onSubmit={authHandler}>
      {formElementsArray.map(formElement => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={e => {
              inputChangeHandler(e, formElement.id);
            }}
          />
        );
      })}
      <Button btnType="Success">{isSignUp ? 'Sign Up' : 'Log In'}</Button>
      <br />
      <p onClick={toggleLAuthHandler}>
        {isSignUp ? 'Already a user? Log In' : 'Not a user? Sign Up Now'}
      </p>
    </form>
  );

  if (props.isLoading) {
    form = <Spinner />;
  }

  let errorMsg = null;

  if (props.error) {
    errorMsg = <p>{props.error}</p>;
  }
  return (
    <div className={classes.Auth}>
      {props.isAuth ? <Redirect to={props.authRedirectPath} /> : ''}
      {errorMsg}
      <h2>Burger Builder</h2>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.idToken,
    buildingBurger: state.burgerBuilder.buildingBurger,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //  on submit action
    onAuth: (email, password, isSignUp) =>
      dispatch(authActions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: path =>
      dispatch(authActions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
