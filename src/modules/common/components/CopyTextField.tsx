import React from 'react';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FormattedMessage } from 'react-intl';
import { snackbarSetting, Row } from './elements';
import FormControlTextField, { FormControlTextFieldProps } from './FormControlTextField';
import { ORANGE } from '../../../configs/colors';

interface Props extends FormControlTextFieldProps {
  message?: React.ReactNode;
}
const CopyTextField: React.FC<Props> = (props) => {
  const { value, inputProps, message, ...rest } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Row style={{ flexWrap: 'wrap' }}>
      <FormControlTextField
        disabled
        value={value}
        inputProps={{
          ...inputProps,
          style: { color: ORANGE, ...inputProps?.style },
        }}
        {...rest}
      />
      <CopyToClipboard
        text={value as string}
        onCopy={(textValue: string, v: boolean) => {
          if (textValue && v) {
            enqueueSnackbar(
              textValue.length > 50 ? `${textValue.slice(0, 50)}...` : textValue,
              snackbarSetting((key) => closeSnackbar(key), { color: 'success' }),
            );
          }
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          style={{ minWidth: '140px', marginTop: 4 }}
          disableElevation
          size="large"
        >
          <FormattedMessage id="copy" />
        </Button>
      </CopyToClipboard>
    </Row>
  );
};

export default CopyTextField;
