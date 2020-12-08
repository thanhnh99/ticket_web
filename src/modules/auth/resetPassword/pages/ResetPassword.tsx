import { useSnackbar } from 'notistack';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import queryString from 'query-string';
import { API_PATHS } from '../../../../configs/API';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { snackbarSetting } from '../../../common/components/elements';
import RedirectDiv from '../../../common/components/RedirectDiv';
import { fetchThunk } from '../../../common/redux/thunk';
import { IResetPasswordData } from '../../redux/authThunks';
import ResetPasswordDesktop from '../components/ResetPasswordDesktop';

interface Props {}
const ResetPassword: React.FC<Props> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const getActionData = React.useMemo(() => {
    if (location.search) {
      const parsed = queryString.parse(location.search) as any;
      return parsed?.hashKey;
    }
    return null;
  }, [location.search]);

  const verifyData = React.useCallback(
    async (data: IResetPasswordData) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(
          API_PATHS.resetPassword,
          'put',
          JSON.stringify({
            password: data.password,
            token: getActionData,
          }),
        ),
      );
      if (json.code === SUCCESS_CODE) {
        enqueueSnackbar(
          json.message,
          snackbarSetting((key) => closeSnackbar(key)),
        );
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting((key) => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar, getActionData],
  );

  if (!getActionData) {
    return <RedirectDiv />;
  }

  return <ResetPasswordDesktop onVerify={verifyData} loading={loading} />;
};

export default ResetPassword;
