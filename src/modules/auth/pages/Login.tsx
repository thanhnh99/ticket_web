import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import LoginDesktop from '../components/login/LoginDesktop';
import { validateAccessToken } from '../redux/authThunks';
import { AppState } from '../../../redux/reducers';

interface Props {}
const Login = (props: Props) => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  React.useEffect(() => {
    dispatch(validateAccessToken());
  }, [dispatch]);
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
