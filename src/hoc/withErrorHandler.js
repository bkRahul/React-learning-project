import React from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxillary';
import useHttpErrorHandler from '../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorHandler] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} clicked={errorHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
