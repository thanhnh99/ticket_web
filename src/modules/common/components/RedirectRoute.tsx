import React from 'react';
// eslint-disable-next-line no-unused-vars
import { RouteProps, Route, Redirect } from 'react-router';

interface Props extends RouteProps {
  auth: boolean;
}

const RedirectRoute: React.SFC<Props> = (props) => {
  // staleless function component
  const { auth, ...restProps } = props;

  if (auth) {
    let from = '/';
    const state = props.location && props.location.state;

    if (props.location) {
      const params = new URLSearchParams(props.location.search);
      const fromParamValue = params.get('from');
      if (fromParamValue) {
        from = fromParamValue;
      }
    }

    const url = new URL(`${window.location.origin}${from}`);

    return <Redirect to={{ state, pathname: url.pathname, search: url.search }} />;
  }
  return <Route {...restProps} />;
};

export default RedirectRoute;
