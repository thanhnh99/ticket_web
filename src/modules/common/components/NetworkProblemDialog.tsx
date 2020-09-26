import { Button, Dialog, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../../redux/reducers';
import { Row } from './elements';
import { setNetworkError, setOpenErrorDialog } from '../redux/reducer';

const mapStateToProps = (state: AppState) => {
  return {
    router: state.router,
    networkErrorMsg: state.common.networkErrorMsg,
    openErrorDialog: state.common.openErrorDialog,
  };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: Dispatch;
}

const NetworkProblemDialog: React.FC<Props> = (props) => {
  const { dispatch, networkErrorMsg, openErrorDialog } = props;
  return (
    <Dialog
      open={openErrorDialog && !!networkErrorMsg}
      PaperProps={{ style: { padding: '24px 24px 12px', maxWidth: 250 } }}
    >
      <Typography variant="subtitle1">
        <FormattedMessage id="attention" />
      </Typography>
      <Typography variant="body2" style={{ margin: '12px 0px 16px 0px' }}>
        {networkErrorMsg && <FormattedMessage id={networkErrorMsg} />}
      </Typography>
      <Row style={{ justifyContent: 'center' }}>
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          style={{ padding: 8, marginRight: 24, minWidth: 100 }}
          onClick={() => dispatch(setNetworkError('', true))}
        >
          <FormattedMessage id="retry" />
        </Button>
        <Button
          disableElevation
          variant="outlined"
          style={{ padding: 8, minWidth: 100 }}
          onClick={() => {
            dispatch(setOpenErrorDialog(false));
          }}
        >
          <FormattedMessage id="back" />
        </Button>
      </Row>
    </Dialog>
  );
};

export default connect(mapStateToProps)(NetworkProblemDialog);
