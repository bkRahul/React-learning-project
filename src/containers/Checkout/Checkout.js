import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';
import { connect } from 'react-redux';
import * as burgerOrderActions from '../../store/actions/index';

const Checkout = props => {
  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };

  const successCheckoutHandler = () => {
    props.history.replace('/checkout/contact');
  };

  let checkout = <Redirect to="/" />;

  if (props.ings) {
    if (props.isPurchased) {
      props.resetPurchased();
      return <Redirect to="/" />;
    }
    checkout = (
      <div>
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutCancelled={cancelCheckoutHandler}
          onCheckoutSuccess={successCheckoutHandler}
        />
        <Route path={props.match.path + '/contact'} component={Contact} />
      </div>
    );
  }

  return checkout;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    isPurchased: state.order.purchased,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPurchased: () => dispatch(burgerOrderActions.resetPurchased()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
