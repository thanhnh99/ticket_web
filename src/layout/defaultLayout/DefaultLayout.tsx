import { Container, useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_100 } from '../../configs/colors';
import { ROUTES, ROUTES_TAB } from '../../configs/routes';
import { MUI_THEME } from '../../configs/setupTheme';
import { Col, PageWrapper } from '../../modules/common/components/elements';
import LoadingIcon from '../../modules/common/components/LoadingIcon';
import { AppState } from '../../redux/reducers';
import { flatRoutes, getListRoutesActivate } from '../utils';
import DefaultAside from './DefaultAside';
import DefaultHeader from './DefaultHeader';

const mapStateToProps = (state: AppState) => {
  return {
    userData: state.account.userData,
  };
};

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const DefaultLayout: React.FunctionComponent<Props> = (props) => {
  const { dispatch, userData } = props;
  const location = useLocation();
  const [openSideBar, setOpenSideBar] = React.useState(true);
  const matches = useMediaQuery(MUI_THEME.breakpoints.up('md'));

  React.useEffect(() => {
    setOpenSideBar(matches);
  }, [matches]);

  React.useEffect(() => {
    // return () => {
    //   document.getElementById('zendesk')?.remove();
    //   const elements = document.getElementsByClassName('zopim');
    //   while (elements?.length > 0) {
    //     elements?.[0].parentNode?.removeChild(elements[0]);
    //   }
    // };
  }, [dispatch]);

  const listRoutes = React.useMemo(() => {
    return getListRoutesActivate(flatRoutes(ROUTES_TAB), userData?.roleGroup?.role);
  }, [userData]);

  return (
    <>
      <PageWrapper style={{ background: GREY_100, flexDirection: 'row' }}>
        <DefaultAside
          open={openSideBar}
          onClose={() => {
            setOpenSideBar(!openSideBar);
          }}
        />
        <Col
          style={{
            flex: 1,
            minHeight: '100vh',
            overflow: 'hidden',
          }}
        >
          <DefaultHeader />
          <Container
            style={{
              paddingTop: 16,
              maxWidth: 'none',
              flex: 1,
              padding: '16px 24px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <React.Suspense fallback={<LoadingIcon style={{ marginTop: 240 }} />}>
              <Switch location={location}>
                {listRoutes.map(
                  (route, index) =>
                    route.component && (
                      <Route
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                      />
                    ),
                )}
                <Redirect to={ROUTES.notFound404} />
              </Switch>
            </React.Suspense>
          </Container>
          {/* <DefaultFooter /> */}
        </Col>
      </PageWrapper>
    </>
  );
};

export default connect(mapStateToProps)(DefaultLayout);
