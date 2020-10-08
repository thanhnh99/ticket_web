import { createStyles, fade, InputBase, makeStyles, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import NumberFormat from 'react-number-format';
import { BLACK, GREY_100, GREY_500, RED } from '../../../configs/colors';

export const useStylesForm = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      // marginTop: theme.spacing(0.5),
      // marginBottom: theme.spacing(0.5),
      marginRight: theme.spacing(3.75),
    },
    select: {
      minWidth: '200px',
      maxWidth: '200px',
      '&:focus': {
        borderRadius: '4px',
      },
      '&:invalid': {
        color: fade(BLACK, 0.4),
      },
      '& option': {
        color: theme.palette.text.primary,
      },
    },
    bootstrap: {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      '& .MuiInputBase-input': {
        padding: '3px 6px !important',
        fontSize: '14px',
      },
      '& .MuiOutlinedInput-root': {
        minHeight: 40,
        '& fieldset': {},
        '&:hover fieldset': {
          borderColor: '#ced4da',
        },
        '&.Mui-focused fieldset': {
          borderWidth: '1px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-disabled': {
          background: GREY_100,
          color: GREY_500,
        },
      },
    },
  }),
);

export const redMark = <span style={{ color: RED }}>*</span>;

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 40,
      padding: 0,
      border: '1px solid #ced4da',
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      overflow: 'hidden',
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      fontSize: theme.typography.body2.fontSize,
      padding: '8px',
    },
    focused: {
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    error: {
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.error.main,
    },
    disabled: {
      backgroundColor: GREY_100,
      color: 'black',
    },
  }),
)(InputBase);

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
    />
  );
}
export function NumberFormatCustom2(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
}
