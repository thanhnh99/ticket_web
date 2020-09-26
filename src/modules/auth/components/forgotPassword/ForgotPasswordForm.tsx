import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { GREEN, GREEN_50 } from '../../../../configs/colors';
import { AppState } from '../../../../redux/reducers';
import { fakeUserData } from '../../../account/constant';
import { Col } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import LoadingButton from '../../../common/components/LoadingButton';
import { authIn, defaultLoginData, ILoginData } from '../../redux/authThunks';

interface Props {}

const ForgotPasswordForm: React.FunctionComponent<Props> = () => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [showNote, setShowNote] = React.useState(false);
  const [loading] = React.useState(false);
  const storeSchema = yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'emailInvalid' }))
      .required(intl.formatMessage({ id: 'required' }))
      .trim(),
    password: yup.string().trim(),
  });

  const onLogin = useCallback(
    async (data: ILoginData) => {
      //   const json = await dispatch(login(data));
      //   if (json?.code === SUCCESS_CODE) {
      //   } else {
      //     enqueueSnackbar(
      //       json.message,
      //       snackbarSetting(key => closeSnackbar(key), {
      //         color: 'error',
      //       }),
      //     );
      //   }
      dispatch(authIn(fakeUserData));
    },
    [dispatch],
  );

  const formik = useFormik({
    initialValues: defaultLoginData,
    onSubmit: (values) => {
      onLogin(values);
    },
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: 400 }}>
      <Col style={{ padding: '36px 30px' }}>
        <Typography variant="h5">
          <FormattedMessage id="forgotPassword" />
        </Typography>
        <FormControlTextField
          id="email"
          fullWidth
          formControlStyle={{ marginTop: 48, width: 250 }}
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
        <LoadingButton
          style={{ width: 160, marginRight: 32, marginTop: 16 }}
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
          loading={loading}
          onClick={() => setShowNote(!showNote)}
        >
          <FormattedMessage id="confirm" />
        </LoadingButton>
        {showNote && (
          <Typography
            variant="body2"
            style={{
              marginTop: 24,
              padding: '12px 16px',
              color: GREEN,
              maxWidth: 310,
              background: GREEN_50,
            }}
          >
            <FormattedMessage id="auth.forgotPasswordNote2" />
          </Typography>
        )}
      </Col>
    </form>
  );
};

export default ForgotPasswordForm;
