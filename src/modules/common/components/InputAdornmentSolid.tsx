import { InputAdornment, InputAdornmentProps } from '@material-ui/core';
import * as React from 'react';
import { GREY_300, GREY_100 } from '../../../configs/colors';

interface Props extends Omit<InputAdornmentProps, 'position'> {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  position?: 'end' | 'start';
}

const InputAdornmentSolid = (props: Props) => {
  const { children, position, style, ...rest } = props;

  return (
    <InputAdornment
      position={position || 'end'}
      style={{
        minHeight: 38,
        textAlign: 'center',
        padding: '0 12px',
        background: GREY_100,
        borderLeft: position === 'start' ? undefined : `1px solid ${GREY_300}`,
        borderRight: position === 'start' ? `1px solid ${GREY_300}` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </InputAdornment>
  );
};

export default InputAdornmentSolid;
