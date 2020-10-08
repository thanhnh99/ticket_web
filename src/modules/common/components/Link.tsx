import { Tooltip } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { getCurrentRole } from '../../../layout/utils';
import { AppState } from '../../../redux/reducers';
import { Role } from '../../../models/permission';

export const RawLink = styled(RouterLink)`
  text-decoration: none;
  color: unset;
`;

const mapStateToProps = (state: AppState) => {
  return {
    router: state.router,
    userData: state.account.userData,
  };
};

interface Props extends LinkProps, ReturnType<typeof mapStateToProps> {
  dispatch: Dispatch;
  permission?: Role[];
  tooltip?: React.ReactNode;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}

const Link = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    children,
    router,
    userData,
    dispatch,
    to,
    permission,
    tooltip,
    placement,
    ...rest
  } = props;

  const getPropsTo = React.useMemo(() => {
    if (typeof to === 'object') {
      return {
        ...to,
        state: {
          ...router.location.state,
          [`${router.location.pathname}`]: true,
          ...to.state,
        },
      };
    }
    return {
      pathname: to as string,
      state: { ...router.location.state, [`${router.location.pathname}`]: true },
    };
  }, [router.location.pathname, router.location.state, to]);

  const isSufficientRole = React.useMemo(() => {
    const check = getCurrentRole(permission || getPropsTo.pathname, userData?.roleGroup?.role);
    return check;
  }, [getPropsTo.pathname, permission, userData]);

  if (!isSufficientRole) {
    return null;
  }
  return (
    <Tooltip title={tooltip || ''} placement={placement || 'top'}>
      <RawLink to={getPropsTo as any} {...rest}>
        {children}
      </RawLink>
    </Tooltip>
  );
});

export default connect(mapStateToProps)(Link);
