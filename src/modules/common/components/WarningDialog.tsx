import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReactComponent as IconWarning } from '../../../svg/ic_warning.svg';
import DialogCustom, { DialogCustomProps } from './DialogCustom';
import { Col, Row } from './elements';

interface Props extends DialogCustomProps {
  onAccept(): void;
  onDenies?: () => void;
  messageContent?: React.ReactNode;
}

const WarningDialog: React.FunctionComponent<Props> = (props) => {
  const {
    children,
    footerContent,
    onAccept,
    onDenies,
    messageContent,
    PaperProps,
    ...rest
  } = props;
  return (
    <DialogCustom
      {...rest}
      PaperProps={{ ...PaperProps, style: { minWidth: 500, ...PaperProps?.style } }}
      footerContent={
        footerContent || (
          <Row style={{ justifyContent: 'center', padding: 16 }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: 12, minWidth: 108 }}
              onClick={onAccept}
              disableElevation
            >
              <FormattedMessage id="accept" />
            </Button>
            <Button
              variant="outlined"
              style={{ marginRight: 12, minWidth: 92 }}
              onClick={() => {
                onDenies ? onDenies() : rest.onClose();
              }}
            >
              <FormattedMessage id="reject" />
            </Button>
          </Row>
        )
      }
    >
      {children || (
        <Col
          style={{
            padding: '16px',
            minHeight: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconWarning />
          <Typography
            variant="subtitle1"
            style={{
              marginBottom: 16,
            }}
          >
            <FormattedMessage id="announce" />
          </Typography>
          {messageContent}
        </Col>
      )}
    </DialogCustom>
  );
};

export default WarningDialog;
