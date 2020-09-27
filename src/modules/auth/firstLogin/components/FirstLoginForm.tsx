import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { Col, snackbarSetting } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultFirstLoginForm, firstLogin, IFirstLoginForm } from '../../redux/authThunks';

interface Props {}

const FirstLoginForm: React.FunctionComponent<Props> = props => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
    newPassword: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
    confirmNewPassword: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .oneOf(
        [yup.ref('newPassword'), null],
        intl.formatMessage({ id: 'auth.passwordConfirmNotMatch' }),
      ),
  });

  const onLogin = useCallback(
    async (data: IFirstLoginForm) => {
      const json = await dispatch(firstLogin(data));
      if (json.code === SUCCESS_CODE) {
        enqueueSnackbar(
          intl.formatMessage({ id: 'firstLoginSuccess' }),
          snackbarSetting(key => closeSnackbar(key), {
            color: 'success',
          }),
        );
      } else {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, intl],
  );

  const formik = useFormik({
    initialValues: defaultFirstLoginForm,
    onSubmit: values => {
      onLogin(values);
    },
    validationSchema: storeSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: '36px 40px 36px 30px' }}>
        <Typography variant="h5">
          <FormattedMessage id="passwordSetting" />
        </Typography>
        <Col>
          <FormControlTextField
            id="password"
            formControlStyle={{ width: 250, marginTop: 48, marginRight: 0 }}
            label={<FormattedMessage id="oldPassword" />}
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            value={formik.values.password}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 100,
              autoComplete: 'off',
            }}
            type="password"
            errorMessage={
              formik.errors.password && formik.submitCount > 0 ? formik.errors.password : undefined
            }
          />
          <FormControlTextField
            id="newPassword"
            formControlStyle={{ width: 250, marginTop: 12 }}
            label={<FormattedMessage id="newPassword" />}
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 50,
              autoComplete: 'new-password',
            }}
            type="password"
            errorMessage={
              formik.errors.newPassword && formik.submitCount > 0
                ? formik.errors.newPassword
                : undefined
            }
          />
          <FormControlTextField
            id="confirmNewPassword"
            formControlStyle={{ width: 250, marginTop: 12, marginRight: 0 }}
            label={<FormattedMessage id="confirmNewPassword" />}
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 50,
              autoComplete: 'new-password',
            }}
            type="password"
            errorMessage={
              formik.errors.confirmNewPassword && formik.submitCount > 0
                ? formik.errors.confirmNewPassword
                : undefined
            }
          />

          <LoadingButton
            style={{ width: 250, marginTop: 26 }}
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            disableElevation
            loading={loading}
          >
            <FormattedMessage id="changePassword" />
          </LoadingButton>
        </Col>
      </div>
    </form>
  );
};

export default FirstLoginForm;
