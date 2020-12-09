import {
  createStyles,
  IconButton,
  Switch,
  Tab,
  Tabs,
  Theme,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { AlertProps } from '@material-ui/lab/Alert';
import { OptionsObject, SnackbarMessage } from 'notistack';
import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import { GREY, GREY_100, GREY_500, PRIMARY } from '../../../configs/colors';

export const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${GREY_100};
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${GREY_100};
`;

export const Wrapper = styled.div`
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 300ms;
  min-width: 100%;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export function snackbarSetting(
  closeSnackbar: (key: string) => void,
  alertProps?: AlertProps,
  alertTitle?: React.ReactNode,
) {
  return {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    preventDuplicate: true,
    autoHideDuration: 3000,
    // persist: true,
    content: (key: string, msg: SnackbarMessage) => (
      <Alert
        style={{ minWidth: '240px' }}
        onClose={() => closeSnackbar(key)}
        severity={alertProps?.color}
        {...alertProps}
      >
        {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
        <Typography variant="body2" color="inherit">
          {msg}
        </Typography>
      </Alert>
    ),
  } as OptionsObject;
}

export const IconButtonStyled = withStyles({
  root: {
    stroke: GREY_500,
    '&:hover': {
      stroke: PRIMARY,
    },
  },
})(IconButton);

export const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    border: `0.5px solid ${GREY_500}`,
    color: theme.palette.text.primary,
    fontSize: theme.typography.caption.fontSize,
    borderRadius: 0,
    boxSizing: 'border-box',
    fontWeight: 'normal',
  },
}))(Tooltip);

interface DateMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  placeholder: string;
}

export const DateMaskCustomRange = (props: DateMaskCustomProps) => {
  const { inputRef, placeholder, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholder={placeholder}
      guide={false}
      // placeholderChar="\u2000"
      keepCharPositions
    />
  );
};

export const DateMaskCustomSingle = (props: DateMaskCustomProps) => {
  const { inputRef, placeholder, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      placeholder={placeholder}
      guide={false}
    />
  );
};
export const RenderTag = (value: any[], e: any, label?: string) => {
  return (
    <Tooltip title={value.map((v) => (label ? v[label] : v.name)).join(', ')}>
      <Typography
        variant="body2"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: 150,
          paddingLeft: 8,
        }}
      >
        {value.map((v) => (label ? v[label] : v.name)).join(', ')}
      </Typography>
    </Tooltip>
  );
};

export const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.grey[500],
    },
    checked: {},
  }),
)(Switch);

export const AntSwitchLarge = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 20,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '&$checked': {
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 16,
      height: 16,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: 20 / 2,
      opacity: 1,
      backgroundColor: theme.palette.grey[500],
    },
    checked: {},
  }),
)(Switch);

export const CustomTabs = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${GREY}`,
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 4,
  },
}))(Tabs);

export const CustomTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 500,
  },
  selected: {
    color: theme.palette.primary.main,
  },
}))(Tab);