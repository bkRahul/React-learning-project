import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/index';

const LogOut = props => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(authActions.authLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(LogOut);
