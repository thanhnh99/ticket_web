import { go } from 'connected-react-router';
import { Breadcrumbs, Typography } from '@material-ui/core';
import ArrowRightRounded from '@material-ui/icons/ArrowRightRounded';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ROUTES_ALL } from '../../configs/routes';
import { some } from '../../constants';
import { Row } from '../../modules/common/components/elements';
import Link from '../../modules/common/components/Link';
import { isHasPermission } from '../../modules/common/redux/reducer';
import { AppState } from '../../redux/reducers';
import {
  getAllRoutesContain,
  getCurrentRoute,
  getListRoutesContain,
  comparePathName,
} from '../utils';

interface Props {
  style?: React.CSSProperties;
  disableNextStep?: boolean;
}

const BookingBreadcrumbs: React.FC<Props> = (props) => {
  const { style, disableNextStep } = props;
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;

  const state = location.state as { [key: string]: any };

  const isActive = React.useMemo(() => {
    return dispatch(isHasPermission(pathname));
  }, [dispatch, pathname]);

  const getList = React.useMemo(() => {
    return disableNextStep
      ? getListRoutesContain(ROUTES_ALL, pathname)
      : getAllRoutesContain(ROUTES_ALL, pathname);
  }, [disableNextStep, pathname]);

  const getCurrentIndex = React.useMemo(() => {
    return getList.findIndex((v) => v.path && comparePathName(pathname, v.path));
  }, [getList, pathname]);

  const getCurrent = React.useMemo(() => {
    return getCurrentRoute(pathname, ROUTES_ALL);
  }, [pathname]);

  const isBackAble = React.useCallback(
    (value: some): any => {
      let check = false;
      state &&
        Object.entries(state).forEach((v) => {
          if (comparePathName(v[0], value.path)) {
            check = state && state[`${v[0]}`];
          }
        });
      return check;
    },
    [state],
  );

  const getTitle = React.useMemo(() => {
    return getCurrent?.title || getCurrent?.name;
  }, [getCurrent]);

  if (!isActive || getCurrent?.disableBreadcrumb || !getCurrent) {
    return (
      <>
        <Helmet>
          <title>{getTitle && intl.formatMessage({ id: getTitle })}</title>
        </Helmet>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getTitle && intl.formatMessage({ id: getTitle })}</title>
      </Helmet>
      <Breadcrumbs separator={<ArrowRightRounded />} style={{ padding: '24px 24px 16px', ...style }}>
        {getList.map((v: some, index: number) => (
          <Row key={index}>
            {index < getCurrentIndex ? (
              <>
                {v.path || !v.isModule ? (
                  <>
                    {isBackAble(v) ? (
                      <>
                        <Typography
                          variant="body2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => dispatch(go(-v.backStep))}
                        >
                          {(v.title || v.name) && <FormattedMessage id={v.name || v.title} />}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Link
                          to={{
                            pathname: v.path,
                            state: { ...state, [`${v.path}`]: true },
                          }}
                        >
                          <Typography variant="body2">
                            {(v.title || v.name) && <FormattedMessage id={v.name || v.title} />}
                          </Typography>
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      {(v.title || v.name) && <FormattedMessage id={v.name || v.title} />}
                    </Typography>
                  </>
                )}
              </>
            ) : (
              <>
                <Typography
                  variant="body2"
                  className="breadcrumb"
                  color={index === getCurrentIndex ? undefined : 'textSecondary'}
                >
                  {(v.title || v.name) && <FormattedMessage id={v.name || v.title} />}
                </Typography>
              </>
            )}
          </Row>
        ))}
      </Breadcrumbs>
    </>
  );
};

export default BookingBreadcrumbs;
