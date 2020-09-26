import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducers';
import RegisterDesktop from '../components/register/RegisterDesktop';

// eslint-disable-next-line react/require-default-props
const mapStateToProps = (state: AppState) => ({ validatingToken: state.auth.validatingToken });

interface Props extends ReturnType<typeof mapStateToProps> {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const Register = (props: Props) => {
  const intl = useIntl();
  const { validatingToken } = props;
  const [loading] = useState(false);

  const onRegister = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Registering');
  }, []);

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'register' })}</title>
      </Helmet>
      <RegisterDesktop loading={loading || validatingToken} onRegister={onRegister} />
    </>
  );
};

export default connect(mapStateToProps)(Register);
