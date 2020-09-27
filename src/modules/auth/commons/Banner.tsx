/* eslint-disable react/require-default-props */
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import TripOneBg from '../../../svg/bg_banner.svg';
import TripOneBgLogin from '../../../svg/bg_banner_login.png';
import { ReactComponent as LogoOne } from '../../../svg/logo_one_white.svg';

interface Props {
  contentId?: string;
  isLogin?: boolean;
}

const Banner = (props: Props) => {
  const { contentId, isLogin } = props;
  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${isLogin ? TripOneBgLogin : TripOneBg})`,
        minHeight: 500,
        width: 369,
        padding: '100px 28px',
        backgroundSize: 'cover',
      }}
    >
      <LogoOne style={{ width: 140, height: 46, marginBottom: 16 }} />
      {contentId && (
        <Typography variant="body2" style={{ color: 'white' }}>
          <FormattedMessage id={contentId} />
        </Typography>
      )}
    </div>
  );
};

export default Banner;
