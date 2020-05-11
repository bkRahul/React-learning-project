import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./Contact.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as burgerOrderActions from "../../../store/actions/index";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler";
import { checkValidity, updateObject } from "../../../utility/utility";

class Contact extends Component {
  state = {
    formIsValid: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      // email: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "email",
      //     placeholder: "Your Email"
      //   },
      //   value: "",
      //   validation: {
      //     required: true
      //   },
      //   valid: false,
      //   touched: false
      // },

      // doorNum: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "text",
      //     placeholder: "Door No."
      //   },
      //   value: "",
      //   validation: {
      //     required: true
      //   },
      //   valid: false,
      //   touched: false
      // },
      // street: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "text",
      //     placeholder: "Street Address"
      //   },
      //   value: "",
      //   validation: {
      //     required: true
      //   },
      //   valid: false,
      //   touched: false
      // },
      // postalCode: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "text",
      //     placeholder: "Pin Code"
      //   },
      //   value: "",
      //   validation: {
      //     required: true,
      //     minLength: 5,
      //     maxLength: 5
      //   },
      //   valid: false,
      //   touched: false
      // },
      payment: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "cash", displayValue: "Cash" },
            { value: "card", displayValue: "Card" },
            { value: "upi", displayValue: "UPI" },
          ],
        },
        value: "cash",
        validation: {},
        valid: true,
      },
    },
  };

  orderHandler = (e) => {
    e.preventDefault();
    //console.log(this.props.ingredients);
    const formData = {};
    for (const formElement in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElement)) {
        //create a new object with only name and value
        //formData[name] = this.state.orderForm[name].value
        formData[formElement] = this.state.orderForm[formElement].value;
      }
    }
    //  console.log(formData);

    const order = {
      ingredients: this.props.ings,
      price: this.props.tprice,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.idToken);
  };

  inputChangeHandler = (e, id) => {
    //    console.log(e.target.value);
    //refactored code
    const updatedFormElement = updateObject(this.state.orderForm[id], {
      touched: true,
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state.orderForm[id].validation),
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [id]: updatedFormElement
    });

    // original code
    // const updatedOrderForm = { ...this.state.orderForm };
    // const updatedFormElement = { ...updatedOrderForm[id] };

    // updatedFormElement.touched = true;
    // updatedFormElement.value = e.target.value;
    // updatedFormElement.valid = this.checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // );
    // updatedOrderForm[id] = updatedFormElement;

    //console.log(updatedFormElement);
    let formValid = true;
    for (const id in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(id)) {
        formValid = updatedOrderForm[id].valid && formValid;
      }
    }
    //console.log(formValid)
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formValid,
    });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        //get the name and element config part of object
        formElementsArray.push({ id: key, config: this.state.orderForm[key] });
      }
    }
    //console.log(formElementsArray);
    let form = (
      <form onSubmit={this.orderHandler}>
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
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.isLoading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h2>Enter your Contact Data</h2>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tprice: state.burgerBuilder.totalPrice,
    isLoading: state.order.loading,
    idToken: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, idToken) =>
      dispatch(burgerOrderActions.takeOrder(orderData, idToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Contact, axios));
