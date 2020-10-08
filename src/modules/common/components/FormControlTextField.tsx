/* eslint-disable no-unused-vars */
import { FormControl, FormHelperText, InputBaseProps, InputLabel } from '@material-ui/core';
import React from 'react';
import { BootstrapInput, redMark, useStylesForm } from './Form';
import { MIN_WIDTH_FORM } from './utils';

export interface FormControlTextFieldProps extends InputBaseProps {
  id?: string;
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  errorMessage?: string;
  optional?: boolean;
  focused?: boolean;
}

const FormControlTextField = (props: FormControlTextFieldProps) => {
  const classes = useStylesForm();
  const {
    id,
    label,
    formControlStyle,
    errorMessage,
    optional,
    focused,
    value,
    fullWidth,
    ...rest
  } = props;

  return (
    <FormControl
      focused={focused}
      className={classes.margin}
      style={{ minWidth: MIN_WIDTH_FORM, ...formControlStyle }}
      error={focused ? false : !!errorMessage}
      fullWidth
    >
      {label && (
        <InputLabel shrink htmlFor={id}>
          {label}
          {!optional && <> &nbsp;{redMark}</>}
        </InputLabel>
      )}
      <BootstrapInput
        id={id}
        value={value || ''}
        {...rest}
        error={focused ? false : !!errorMessage}
      />
      <FormHelperText id={id} style={{ minHeight: 20 }}>
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};

export default FormControlTextField;
