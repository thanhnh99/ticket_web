/* eslint-disable no-unused-vars */
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';

interface Props {}

const Footer = (props: Props) => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      style={{ marginTop: 24, textAlign: 'center' }}
    >
      <FormattedMessage id="footer.license" />
    </Typography>
  );
};

export default Footer;
