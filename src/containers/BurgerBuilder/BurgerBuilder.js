import React, { useEffect, useState } from 'react';

import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

const BurgerBuilder = props => {
  const [purchasing, setPurchasingstate] = useState(false);

  const { onInitIngredients } = props;
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    let sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasingstate(true);
    } else {
      props.onSetAuthRedirect('/checkout');
      //redirect the user to authenticate if not logged in
      props.history.push({
        pathname: '/auth',
      });
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasingstate(false);
  };

  const purchaseContinueHandler = () => {
    props.history.push({
      pathname: '/checkout',
    });
  };

  const disabledInfo = {
    ...props.ings,
  };
  //returns true or false if key is 0
  for (const key in disabledInfo) {
    if (disabledInfo.hasOwnProperty(key)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
  }

  let orderSum,
    burger = <Spinner />;

  if (props.error) {
    burger = <p>Sorry Ingredients could not be loaded</p>;
  }

  if (props.ings) {
    orderSum = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
      />
    );

    // if (state.isLoading) {
    //   orderSum = <Spinner />;
    // }

    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onAddIngredient}
          ingredientRemoved={props.onDeleteIngredient}
          disabledBtn={disabledInfo}
          totalPrice={props.tprice}
          purchasable={updatePurchaseState(props.ings)}
          purchasing={purchaseHandler}
          isAuth={props.isAuth}
        />
      </Aux>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} clicked={purchaseCancelHandler}>
        {orderSum}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    tprice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.idToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onDeleteIngredient: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onSetAuthRedirect: path =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
