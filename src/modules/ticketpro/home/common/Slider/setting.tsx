import { IconButton } from '@material-ui/core';
import icPrev from '@material-ui/icons/NavigateBefore';
import icNext from '@material-ui/icons/NavigateNext';
import React from 'react';
import { BROWN } from '../../../../../configs/colors';
import {
  MIN_TABLET_WIDTH_NUM,
  MOBILE_WIDTH_NUM,
  some,
  TABLET_WIDTH_NUM,
} from '../../../../../constants';
import styles from './slick.module.scss';

const ArrowNext = ({ Icon, className, style, onClick }: some) => {
  const replaceClass = className.replace('slick-arrow', '');
  const isDisable = replaceClass.indexOf('slick-disabled') !== -1;
  return (
    <IconButton
      className={replaceClass}
      style={{
        ...style,
        zIndex: 100,
        right: '-34px',
        padding: '3px',
        position: 'absolute',
      }}
      onClick={onClick}
      disabled={isDisable}
    >
      <Icon style={{ color: !isDisable ? BROWN : undefined }} />
    </IconButton>
  );
};

const ArrowBack = ({ Icon, className, style, onClick }: some) => {
  const replaceClass = className.replace('slick-arrow', '');
  const isDisable = replaceClass.indexOf('slick-disabled') !== -1;
  return (
    <IconButton
      className={replaceClass}
      style={{
        ...style,
        zIndex: 100,
        position: 'absolute',
        left: '-34px',
        padding: '3px',
      }}
      disabled={isDisable}
      onClick={onClick}
    >
      <Icon style={{ color: !isDisable ? BROWN : undefined }} />
    </IconButton>
  );
};

export const slideSettings = (slides?: number, className?: string) => {
  return {
    className: className || styles.recentSearch,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    // variableWidth: true,
    nextArrow: <ArrowNext Icon={icNext} />,
    prevArrow: <ArrowBack Icon={icPrev} />,
    responsive: [
      {
        breakpoint: TABLET_WIDTH_NUM,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: MIN_TABLET_WIDTH_NUM,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: MOBILE_WIDTH_NUM,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
};
