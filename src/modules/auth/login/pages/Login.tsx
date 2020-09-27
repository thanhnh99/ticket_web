import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import LoginDesktop from '../components/LoginDesktop';

interface Props {}
const Login = (props: Props) => {
  const intl = useIntl();
    return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({ id: 'login' })}</title>
      </Helmet>
      <LoginDesktop />;
    </div>
  );
};

export default Login;
