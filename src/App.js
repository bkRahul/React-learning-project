import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/LogOut";
import * as authActions from "./store/actions/index";

class App extends React.Component {
  componentDidMount() {
    this.props.loginOnLoad();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Switch>
              {this.props.isAuth ? (
                <>
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/auth" component={Auth} />
                  <Route path="/logout" component={LogOut} />
                  <Route path="/" exact component={BurgerBuilder} />
                  <Redirect to="/" />
                </>
              ) : (
                <>
                  <Route path="/auth" component={Auth} />
                  <Route path="/" exact component={BurgerBuilder} />
                  <Redirect to="/" />
                </>
              )}
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginOnLoad: () => dispatch(authActions.checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
