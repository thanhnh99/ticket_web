import { Button, Dialog, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducers';
import { logout } from '../../auth/redux/authThunks';
import { Row } from './elements';
import { setAuthError } from '../redux/reducer';

const mapStateToProps = (state: AppState) => {
  return {
    router: state.router,
    authErrorMsg: state.common.authErrorMsg,
  };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const AuthProblemDialog: React.FC<Props> = (props) => {
  const { dispatch, authErrorMsg } = props;
  return (
    <Dialog
      open={!!authErrorMsg}
      PaperProps={{ style: { padding: '24px 24px 12px', maxWidth: 250 } }}
    >
      <Typography variant="subtitle1">
        <FormattedMessage id="attention" />
      </Typography>
      <Typography variant="body2" style={{ margin: '12px 0px 16px 0px' }}>
        {authErrorMsg}
      </Typography>
      <Row style={{ justifyContent: 'center' }}>
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          style={{ padding: 8, minWidth: 100 }}
          onClick={() => {
            dispatch(logout());
            dispatch(setAuthError(''));
          }}
        >
          <FormattedMessage id="logout" />
        </Button>
      </Row>
    </Dialog>
  );
};

export default connect(mapStateToProps)(AuthProblemDialog);
