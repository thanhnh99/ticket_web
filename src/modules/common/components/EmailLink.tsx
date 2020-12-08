/* eslint-disable no-unused-vars */
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { BLUE } from '../../../configs/colors';

interface Props {
  value: string;
}

const EmailLink = ({ value, ...rest }: Props) => {
  return (
    <a href={`mailto:${value}`} style={{ color: BLUE, textDecoration: 'none' }} {...rest}>
      {value}
    </a>
  );
};

export default EmailLink;
