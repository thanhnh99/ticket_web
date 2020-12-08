import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as LogoOne } from '../../../svg/logo_one.svg';

interface Props {}

const AuthHeader = (props: Props) => {
  return (
    <>
      <LogoOne style={{ marginBottom: '64px' }} />
      <Typography variant="h4" style={{ fontWeight: 'normal' }} color="textSecondary">
        <FormattedMessage id="webPortal" />
      </Typography>
    </>
  );
};

export default AuthHeader;
