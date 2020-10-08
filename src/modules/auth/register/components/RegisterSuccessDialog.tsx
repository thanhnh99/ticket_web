import { Button, DialogActions, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import DialogCustom from '../../../common/components/DialogCustom';
import { Row } from '../../../common/components/elements';
import { GREY_500 } from '../../../../configs/colors';

interface Props {
  open: boolean;
  onClose: () => void;
  content?: string;
}
const RegisterSuccessDialog: React.FC<Props> = props => {
  const { open, onClose, content } = props;
  return (
    <DialogCustom
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: 500 } }}
      titleLabel={
        <Typography variant="subtitle1">
          <FormattedMessage id="account.registerSuccess" />
        </Typography>
      }
      buttonLabel="accept"
      footerContent={
        <DialogActions style={{ padding: 16, justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ padding: '4px 32px' }}
            disableElevation
            onClick={() => onClose()}
          >
            <Typography variant="body2">
              <FormattedMessage id="accept" />
            </Typography>
          </Button>
        </DialogActions>
      }
    >
      <Typography variant="body2" style={{ color: GREY_500, padding: '23px 16px' }}>
        {content}
      </Typography>
    </DialogCustom>
  );
};

export default RegisterSuccessDialog;
