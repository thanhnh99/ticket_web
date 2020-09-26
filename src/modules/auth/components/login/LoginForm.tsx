import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { set } from 'js-cookie';
import { BLUE } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { AppState } from '../../../../redux/reducers';
import { Col, Row, snackbarSetting } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { RawLink } from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';
// eslint-disable-next-line no-unused-vars
import { authIn, defaultLoginData, ILoginData } from '../../redux/authThunks';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/API';
import { SUCCESS_CODE } from '../../../../constants';
import { ACCESS_TOKEN } from '../../constants';

interface Props {}

// eslint-disable-next-line no-unused-vars
const LoginForm: React.FunctionComponent<Props> = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  // eslint-disable-next-line no-unused-vars
  const [loading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeSchema = yup.object().shape({
    email: yup
      .string()
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
    async (values: ILoginData) => {
      const json = await dispatch(
        fetchThunk(
          API_PATHS.login,
          'post',
          JSON.stringify({ password: values.password, user_name: values.email }),
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        set(ACCESS_TOKEN, json.access_token);
        dispatch(authIn(json.data));
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting((key) => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const formik = useFormik({
    initialValues: defaultLoginData,
    onSubmit: (values) => {
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
          id="email"
          formControlStyle={{ width: 250, marginTop: 48 }}
          label={<FormattedMessage id="email" />}
          placeholder={intl.formatMessage({ id: 'enterEmail' })}
          value={formik.values.email}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.email && formik.touched.email ? formik.errors.email : undefined
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
            formik.errors.password && formik.touched.password ? formik.errors.password : undefined
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
      </Col>
    </form>
  );
};

export default LoginForm;
