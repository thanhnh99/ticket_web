import {
  Button,
  Dialog,
  DialogActions,
  // eslint-disable-next-line no-unused-vars
  DialogProps,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import IconClose from '@material-ui/icons/CloseOutlined';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props extends DialogProps {
  open: boolean;
  onClose(): void;
  onAccept(): void;
  titleLabel?: React.ReactNode;
  onReject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  onExited?: () => void;
}

const ConfirmDialog: React.FC<Props> = (props) => {
  const {
    open,
    onClose,
    onExited,
    onAccept,
    titleLabel,
    onReject,
    acceptLabel,
    rejectLabel,
    children,
    ...rest
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          minWidth: 420,
        },
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
      <DialogActions style={{ padding: 16, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          style={{ minWidth: 108, marginRight: 12 }}
          onClick={onAccept}
          disableElevation
        >
          <FormattedMessage id={acceptLabel || 'accept'} />
        </Button>
        {onReject && (
          <Button
            variant="outlined"
            size="medium"
            style={{ minWidth: 108 }}
            onClick={onReject}
            disableElevation
          >
            <Typography variant="body2" color="textSecondary">
              <FormattedMessage id={rejectLabel || 'reject'} />
            </Typography>
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
