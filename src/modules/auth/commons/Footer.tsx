import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

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
