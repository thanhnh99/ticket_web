import { Button, Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { some } from '../../../constants';
import { Col, Row } from '../../common/components/elements';
import LoadingIcon from '../../common/components/LoadingIcon';

interface Props {
  data?: some;
  onClose(): void;
}

const NotificationDialog: React.FunctionComponent<Props> = (props) => {
  const { data, onClose } = props;

  //   const fetchNotification = React.useCallback(() => {
  //     setData(fakeNotificationDialog);
  //   }, []);

  //   React.useEffect(() => {
  //     fetchNotification();
  //   }, [fetchNotification]);
  return (
    <div>
      <Dialog
        onClose={onClose}
        open={!!data}
        PaperProps={{ style: { maxWidth: 879, maxHeight: 'calc(100vh-32px)', minHeight: 64 } }}
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" style={{ padding: '22px 24px 0px', flex: 1 }}>
            <FormattedMessage id="notification" />
          </Typography>
          <IconButton onClick={onClose} style={{ padding: 12 }}>
            <CloseIcon />
          </IconButton>
        </Row>
        <DialogContent>
          <Typography variant="h6" color="primary" style={{ margin: '6px 0px 12px' }}>
            {data?.promotion}
          </Typography>
          <Typography variant="body2">{data?.date}</Typography>
          <img
            src={data?.pic}
            alt=""
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              margin: '16px 0px 24px',
            }}
          />
          <Col>
            {data ? (
              <>
                {data?.detail.map((v: some, index: number) => (
                  <Typography variant="body2" key={index} style={{ marginBottom: 12 }}>
                    {v.context}
                  </Typography>
                ))}
                {data?.note.map((v: some, index: number) => (
                  <Typography variant="body2" key={index} style={{ marginBottom: 12 }}>
                    {v.context}
                  </Typography>
                ))}
              </>
            ) : (
              <LoadingIcon style={{ height: 320 }} />
            )}
          </Col>
        </DialogContent>
        <Button
          autoFocus
          style={{ minWidth: 114, margin: '16px 24px', alignSelf: 'center' }}
          color="secondary"
          variant="contained"
          disableElevation
          onClick={onClose}
        >
          <FormattedMessage id="close" />
        </Button>
      </Dialog>
    </div>
  );
};
export default NotificationDialog;
