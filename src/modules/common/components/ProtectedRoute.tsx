/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { ROUTES } from '../../../configs/routes';

interface Props extends RouteProps {
  auth: boolean;
}

const ProtectedRoute: React.SFC<Props> = (props) => {
  const { auth, ...restProps } = props;
  // const from = (props.location && `${props.location.pathname}${props.location.search}`) || '/';
  const state = props.location && props.location.state;

  if (auth) {
    return <Route {...restProps} />;
  }

  return (
    <Redirect
      to={{
        state,
        pathname: `${ROUTES.login}`,
        search: '',
      }}
    />
  );
};

export default ProtectedRoute;
