import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducers';
import RegisterDesktop from '../components/RegisterDesktop';
import { IRegisterData } from '../../redux/authThunks';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/API';
import { SUCCESS_CODE } from '../../../../constants';
import { snackbarSetting } from '../../../common/components/elements';
import axios from 'axios';
const mapStateToProps = (state: AppState) => ({ validatingToken: state.auth.validatingToken });

interface Props {}

const Register = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [dialogContent, setDialogContent] = React.useState('');

  const onRegister = React.useCallback(
    async (values: IRegisterData) => {
      setLoading(true);
      console.log(JSON.stringify(values))
      const json = await dispatch(fetchThunk(API_PATHS.register, 'post', JSON.stringify(values)));
      console.log(json)
      if (json?.statusCode === SUCCESS_CODE) {
        console.log(json);
        setDialogContent(json.message);
      } else {
        enqueueSnackbar(
          "error",
          snackbarSetting((key) => closeSnackbar(key), {
            color: 'error',
          }),
        );
        console.log(json)
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'register' })}</title>
      </Helmet>
      <RegisterDesktop loading={loading} onRegister={onRegister} dialogContent={dialogContent} />
    </>
  );
};

export default connect(mapStateToProps)(Register);
