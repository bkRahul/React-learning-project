import React, { Component } from "react";

import Modal from "../components/UI/Modal/Modal";
import Aux from "./Auxillary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class withErrorHandler extends Component {

    constructor(props) {
      super(props);
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({
          error: error
        });
      });
    }

    state = {
      error: null
    };

componentWillUnmount() {
  axios.interceptors.request.eject();
  axios.interceptors.response.eject();
}

    errorHandler = () => {
      this.setState({
        error: null
      });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} clicked={this.errorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
