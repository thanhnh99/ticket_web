import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
import FormControlTextField from '../../../common/components/FormControlTextField';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultChangePasswordData } from '../../redux/authThunks';

interface Props {}
const ChangePasswordForm: React.FC<Props> = () => {
  const intl = useIntl();
  const storeSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
    confirmPassword: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .oneOf(
        [yup.ref('password'), null],
        intl.formatMessage({ id: 'auth.passwordConfirmNotMatch' }),
      ),
  });
  const formik = useFormik({
    initialValues: defaultChangePasswordData,
    onSubmit: () => {},
    validationSchema: storeSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: '36px 120px 36px 30px', width: 250 }}>
        <Typography variant="h5">
          <FormattedMessage id="passwordSetting" />
        </Typography>
        <FormControlTextField
          id="password"
          fullWidth
          formControlStyle={{ marginTop: 48, marginRight: 0 }}
          label={<FormattedMessage id="auth.newPassword" />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          onChange={formik.handleChange}
          value={formik.values.password}
          inputProps={{
            maxLength: 50,
            style: {
              width: '100%',
            },
            autoComplete: 'off',
          }}
          type="password"
          errorMessage={
            formik.errors.password && formik.touched.password ? formik.errors.password : undefined
          }
        />
        <FormControlTextField
          id="confirmPassword"
          fullWidth
          formControlStyle={{ marginTop: 12, marginRight: 0 }}
          label={<FormattedMessage id="auth.confirmPassword" />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
            style: {
              width: '100%',
            },
            autoComplete: 'off',
          }}
          type="password"
          errorMessage={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : undefined
          }
        />
        <LoadingButton
          style={{ minWidth: 160, marginTop: 16 }}
          type="submit"
          size="large"
          variant="contained"
          color="secondary"
          disableElevation
        >
          <FormattedMessage id="confirm" />
        </LoadingButton>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
