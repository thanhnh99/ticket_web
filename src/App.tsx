/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import 'moment/locale/vi';
import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { ROUTES, URL_PATH } from './configs/routes';
import AuthProblemDialog from './modules/common/components/AuthProblemDialog';
import LoadingIcon from './modules/common/components/LoadingIcon';
import NetworkProblemDialog from './modules/common/components/NetworkProblemDialog';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import RedirectRoute from './modules/common/components/RedirectRoute';
import { AppState } from './redux/reducers';
import DefaultLayout from './layout/defaultLayout/DefaultLayout';
import './scss/svg.scss';

const Login = React.lazy(() => import('./modules/auth/pages/Login'));
const Register = React.lazy(() => import('./modules/auth/pages/Register'));

const FirstLogin = React.lazy(() => import('./modules/auth/pages/FirstLogin'));
const ForgotPassword = React.lazy(() => import('./modules/auth/pages/ForgotPassword'));

const ChangePassword = React.lazy(() => import('./modules/auth/pages/ChangePassword'));


function mapStateToProps(state: AppState) {
  return {
    router: state.router,
    auth: state.auth,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<Props> = (props) => {
  const { auth } = props;
  return (
    <>
      <NetworkProblemDialog />
      <AuthProblemDialog />{' '}
      <React.Suspense fallback={<LoadingIcon />}>
        <Switch>
          <RedirectRoute auth={auth.auth} path={ROUTES.forgotPass} component={ForgotPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.register} component={Register} />
          <RedirectRoute auth={auth.auth} path={ROUTES.firstLogin} component={FirstLogin} />
          <RedirectRoute auth={auth.auth} path={ROUTES.changePassword} component={ChangePassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.login} component={Login} />
          <ProtectedRoute auth={auth.auth} strict path={URL_PATH} component={DefaultLayout} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default connect(mapStateToProps)(App);
