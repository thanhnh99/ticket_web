import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/API';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { snackbarSetting } from '../../../common/components/elements';
import { fetchThunk } from '../../../common/redux/thunk';
import { IForgotPass } from '../../redux/authThunks';
import ForgotPasswordDesktop from '../components/ForgotPasswordDesktop';

interface Props {}
const ForgotPassword = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [note, setNote] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onVerify = useCallback(
    async (data: IForgotPass) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.forgotPassword(data.email)));
      if (json?.code === SUCCESS_CODE) {
        setNote(json.message);
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  return <ForgotPasswordDesktop loading={loading} onVerify={onVerify} note={note} />;
};

export default ForgotPassword;
