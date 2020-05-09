import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as authActions from "../../store/actions/index";

//import withErrorHandler from "../../hoc/withErrorHandler";
//import axios from "axios";

class Auth extends Component {
  state = {
    auth: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  checkValidity = (value, rules) => {
    //console.log(value, rules);
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (e, id) => {
    const updatedAuth = {
      //  copies this.state.auth as a new object
      ...this.state.auth,
      //  update the single control [email]
      [id]: {
        //  copies this.state.auth[email]
        ...this.state.auth[id],
        //  updates the properties
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.auth[id].validation
        ),
        touched: true,
      },
    };
    //  updates auth state with updated updatedAuth
    this.setState({
      auth: updatedAuth,
    });
  };

  authHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.auth.email.value,
      this.state.auth.password.value,
      this.state.isSignUp
    );
  };

  toggleLAuthHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.auth) {
      if (this.state.auth.hasOwnProperty(key)) {
        //get the name and element config part of object
        formElementsArray.push({ id: key, config: this.state.auth[key] });
      }
    }
    //console.log(formElementsArray);
    //  {id: "email", config: {this.state.auth["email"]}
    let form = (
      <form onSubmit={this.authHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={(e) => {
                this.inputChangeHandler(e, formElement.id);
              }}
            />
          );
        })}
        <Button btnType="Success">
          {this.state.isSignUp ? "Sign Up" : "Log In"}
        </Button>
        <br />
        <p onClick={this.toggleLAuthHandler}>
          {this.state.isSignUp
            ? "Already a user? Log In"
            : "Not a user? Sign Up Now"}
        </p>
      </form>
    );

    if (this.props.isLoading) {
      form = <Spinner />;
    }

    let errorMsg = null;

    if (this.props.error) {
      errorMsg = <p>{this.props.error}</p>;
    }
    return (
      <div className={classes.Auth}>
        {this.props.isAuth ? <Redirect to={this.props.authRedirectPath} /> : ""}
        {errorMsg}
        <h2>Burger Builder</h2>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.idToken,
    buildingBurger: state.burgerBuilder.buildingBurger,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //  on submit action
    onAuth: (email, password, isSignUp) =>
      dispatch(authActions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) =>
      dispatch(authActions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
