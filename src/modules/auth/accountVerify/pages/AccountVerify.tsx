import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/API';
import { PURPLE } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { Row } from '../../../common/components/elements';
import Link from '../../../common/components/Link';
import LoadingIcon from '../../../common/components/LoadingIcon';
import { fetchThunk } from '../../../common/redux/thunk';

const mapStateToProps = (state: AppState) => ({ validatingToken: state.auth.validatingToken });

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const AccountVerify = (props: Props) => {
  const { dispatch } = props;
  const [content, setContent] = React.useState('');
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const intl = useIntl();
  const location = useLocation();

  const verifyData = React.useCallback(async () => {
    if (location.search) {
      const json = await dispatch(fetchThunk(`${API_PATHS.verify}${location.search}`, 'get'));
      if (json.code === SUCCESS_CODE) {
        setIsSuccessful(true);
        setContent(json.message);
      } else {
        setContent(json?.message);
      }
    }
  }, [dispatch, location.search]);

  React.useEffect(() => {
    verifyData();
  }, [location.search, verifyData]);

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'auth.verify' })}</title>
      </Helmet>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="subtitle1" style={{ color: PURPLE, padding: '32px 0' }}>
          {content || <FormattedMessage id="auth.verifying" />}
        </Typography>
        {!content && <LoadingIcon />}
        {content && (
          <Link to={{ pathname: isSuccessful ? ROUTES.login : ROUTES.register }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              style={{ padding: '4px 32px' }}
              disableElevation
            >
              <Typography variant="body2">
                <FormattedMessage
                  id={isSuccessful ? 'account.backToLogin' : 'account.backToRegister'}
                />
              </Typography>
            </Button>
          </Link>
        )}
      </Row>
    </>
  );
};

export default connect(mapStateToProps)(AccountVerify);
