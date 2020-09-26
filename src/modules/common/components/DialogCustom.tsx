/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogProps, Divider, IconButton } from '@material-ui/core';
import IconClose from '@material-ui/icons/CloseOutlined';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export interface DialogCustomProps extends DialogProps {
  open: boolean;
  onClose(): void;
  onAction?: () => void;
  titleLabel?: React.ReactNode;
  buttonLabel?: string;
  footerContent?: React.ReactNode;
}

const DialogCustom: React.FC<DialogCustomProps> = (props) => {
  const {
    open,
    onClose,
    onExited,
    titleLabel,
    buttonLabel,
    children,
    PaperProps,
    footerContent,
    onAction,
    ...rest
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          minWidth: 280,
        },
        elevation: 5,
        ...PaperProps,
      }}
      maxWidth="lg"
      onExited={onExited}
      {...rest}
    >
      {titleLabel && <div style={{ padding: 16 }}>{titleLabel}</div>}
      <IconButton
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          padding: '8px',
        }}
        onClick={onClose}
      >
        <IconClose />
      </IconButton>
      <Divider />
      {children}
      <Divider />
      {footerContent || (
        <DialogActions style={{ padding: 16, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ padding: '0px 32px' }}
            onClick={onAction || onClose}
            disableElevation
          >
            <FormattedMessage id={buttonLabel || 'accept'} />
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DialogCustom;
