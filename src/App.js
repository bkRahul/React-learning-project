import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import LogOut from './containers/Auth/LogOut';
import * as authActions from './store/actions/index';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const BurgerBuilder = React.lazy(() => {
  return import('./containers/BurgerBuilder/BurgerBuilder');
});

const App = props => {
  const { loginOnLoad } = props;

  useEffect(() => {
    loginOnLoad();
  }, [loginOnLoad]);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact render={props => <BurgerBuilder {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />

        <Route path="/logout" component={LogOut} />

        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginOnLoad: () => dispatch(authActions.checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
