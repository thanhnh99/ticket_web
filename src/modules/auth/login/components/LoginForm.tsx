import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { BLUE } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { AppState } from '../../../../redux/reducers';
import { Col, Row, snackbarSetting } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { RawLink } from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultLoginForm, login, ILoginForm } from '../../redux/authThunks';
import { SUCCESS_CODE } from '../../../../constants';

interface Props {}

const LoginForm: React.FunctionComponent<Props> = props => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const loading = useSelector((state: AppState) => state.auth.authenticating);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeSchema = yup.object().shape({
    userName: yup
      .string()
      // .email(intl.formatMessage({ id: 'emailInvalid' }))
      .required(intl.formatMessage({ id: 'required' }))
      .trim(),
    password: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
  });

  const onLogin = useCallback(
    async (values: ILoginForm) => {
      const json = await dispatch(login(values));
      json?.message &&
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: json.code === SUCCESS_CODE ? 'success' : 'error',
          }),
        );
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const formik = useFormik({
    initialValues: defaultLoginForm,
    onSubmit: values => {
      onLogin(values);
    },
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: '36px 30px' }}>
      <Col>
        <Typography variant="h5">
          <FormattedMessage id="login" />
        </Typography>
        <FormControlTextField
          id="userName"
          formControlStyle={{ width: 250, marginTop: 48 }}
          label={<FormattedMessage id="email" />}
          placeholder={intl.formatMessage({ id: 'enterEmail' })}
          value={formik.values.userName}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.userName && formik.submitCount > 0 ? formik.errors.userName : undefined
          }
        />

        <FormControlTextField
          id="password"
          formControlStyle={{ width: 250, marginTop: 12 }}
          label={<FormattedMessage id="password" />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          value={formik.values.password}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
            autoComplete: 'new-password',
          }}
          type="password"
          errorMessage={
            formik.errors.password && formik.submitCount > 0 ? formik.errors.password : undefined
          }
        />
        <Row style={{ marginTop: '16px' }}>
          <LoadingButton
            style={{ minWidth: 160, marginRight: 32 }}
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            disableElevation
            loading={loading}
          >
            <FormattedMessage id="login" />
          </LoadingButton>
          <RawLink to={ROUTES.forgotPass}>
            <Typography variant="body2" style={{ color: BLUE }}>
              <FormattedMessage id="forgotPasswordNote" />
            </Typography>
          </RawLink>
        </Row>
        <RawLink to={ROUTES.register} style={{ color: BLUE, marginTop: 16 }}>
          <Typography variant="body2">
            <FormattedMessage id="register" />
          </Typography>
        </RawLink>
      </Col>
    </form>
  );
};

export default LoginForm;
