/* eslint-disable no-unused-vars */
import { Button, CircularProgress, PropTypes } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

interface Props extends ButtonProps {
  loading?: boolean;
  loadingColor?: PropTypes.Color;
}
interface State {}
class LoadingButton extends React.PureComponent<Props, State> {
  render() {
    const { children, loading, loadingColor, onClick, disableRipple, ...rest } = this.props;
    return (
      <Button
        {...rest}
        disabled={rest.disabled || loading}
        onClick={!loading ? onClick : undefined}
        disableRipple={loading ? true : disableRipple}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ opacity: loading ? 0.5 : 1 }}>{children}</div>
          {loading && (
            <CircularProgress
              size={24}
              color={loadingColor || rest.color === 'default' ? 'primary' : rest.color}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </div>
      </Button>
    );
  }
}
export default LoadingButton;
