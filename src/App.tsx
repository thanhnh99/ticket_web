import 'moment/locale/vi';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ROUTES } from './configs/routes';
import { validateAccessToken } from './modules/auth/redux/authThunks';
import AuthProblemDialog from './modules/common/components/AuthProblemDialog';
import LoadingIcon from './modules/common/components/LoadingIcon';
import NetworkProblemDialog from './modules/common/components/NetworkProblemDialog';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import RedirectRoute from './modules/common/components/RedirectRoute';
import { AppState } from './redux/reducers';
import './scss/slickOverride.scss';
import './scss/svg.scss';
import './scss/tripiOne.scss';

const Login = React.lazy(() => import('./modules/auth/login/pages/Login'));
const Register = React.lazy(() => import('./modules/auth/register/pages/Register'));
const AccountVerify = React.lazy(() => import('./modules/auth/accountVerify/pages/AccountVerify'));

const FirstLogin = React.lazy(() => import('./modules/auth/firstLogin/pages/FirstLogin'));
const ForgotPassword = React.lazy(
  () => import('./modules/auth/forgotPassword/pages/ForgotPassword'),
);

const ChangePassword = React.lazy(
  () => import('./modules/auth/changePassword/pages/ChangePassword'),
);

const CreateEvent = React.lazy(
  () => import('./modules/ticketpro/events/pages/CreateEvent'),
);

const TicketDetail = React.lazy(() => import('./modules/ticketpro/ticketDetail/pages/TicketDetail'))

const ChooseTicket = React.lazy(() => import('./modules/ticketpro/booking/pages/chooseTicket')) 

const DefaultLayout = React.lazy(() => import('./layout/defaultLayout/DefaultLayout'));



function mapStateToProps(state: AppState) {
  return {
    router: state.router,
    auth: state.auth,
  };
}

interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<Props> = (props) => {
  const { auth } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  React.useEffect(() => {
    dispatch(validateAccessToken());
  }, [dispatch]);

  return (
    <>
      <NetworkProblemDialog />
      <AuthProblemDialog />{' '}
      <React.Suspense fallback={<LoadingIcon style={{ marginTop: 240 }} />}>
        <Switch>
          <RedirectRoute auth={auth.auth} path={ROUTES.forgotPass} component={ForgotPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.register} component={Register} />
          <RedirectRoute auth={auth.auth} path={ROUTES.verify} component={AccountVerify} />
          <RedirectRoute auth={auth.auth} path={ROUTES.firstLogin} component={FirstLogin} />
          <RedirectRoute auth={auth.auth} path={ROUTES.changePassword} component={ChangePassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.login} component={Login} />

          <ProtectedRoute exact auth={auth.auth} path={`${ROUTES.booking.chooseTicket }/:id`} component={ChooseTicket}/>
          <ProtectedRoute exact auth={auth.auth} path={ROUTES.createEvent} component={CreateEvent} />
          <ProtectedRoute exact auth={auth.auth} path={`${ROUTES.booking.ticketDetail  }/:id`} component={TicketDetail}/>
          
          <ProtectedRoute auth={auth.auth} path="/" component={DefaultLayout} />
      
        </Switch>
      </React.Suspense>
    </>
  );
};

export default connect(mapStateToProps)(App);
