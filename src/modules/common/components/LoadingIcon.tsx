/* eslint-disable no-unused-vars */
import { CircularProgress, CircularProgressProps, PropTypes } from '@material-ui/core';
import React from 'react';

interface Props extends CircularProgressProps {
  loadingColor?: PropTypes.Color;
}
interface State {}
class LoadingIcon extends React.PureComponent<Props, State> {
  render() {
    const { children, loadingColor, style, ...rest } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          height: 320,
          ...style,
        }}
      >
        <CircularProgress
          size={48}
          color={loadingColor || loadingColor === 'default' ? 'primary' : rest.color}
          {...rest}
        />
      </div>
    );
  }
}
export default LoadingIcon;
