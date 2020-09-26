import { InputAdornment, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
import { ReactComponent as MobileIcon } from '../../../../svg/ic_mobile.svg';
import { ReactComponent as ProviderIcon } from '../../../../svg/ic_provider_code.svg';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultForgotPass, IForgotPass } from '../../pages/ForgotPassword';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { validNumberRegex } from '../../../../models/regex';

interface Props {
  loading: boolean;
  onGetOTP(values: IForgotPass): void;
}

const GetOTPForm = (props: Props) => {
  const { loading, onGetOTP } = props;
  const intl = useIntl();

  const storeSchema = yup.object().shape({
    caCode: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
    username: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
  });

  const formik = useFormik({
    initialValues: defaultForgotPass,
    onSubmit: (values) => {
      onGetOTP({ ...values, caCode: values.caCode.trim() });
    },
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ margin: '32px' }}>
      <Typography variant="h6" style={{ fontWeight: 500, textAlign: 'center' }}>
        <FormattedMessage id="auth.forgotPassword" />
      </Typography>

      <Typography variant="body2" style={{ marginTop: '24px' }}>
        <FormattedMessage id="auth.forgotPasswordNote" />
      </Typography>

      <FormControlTextField
        id="caCode"
        formControlStyle={{ width: '100%', marginTop: '18px' }}
        label={<FormattedMessage id="agencyCode" />}
        placeholder={intl.formatMessage({ id: 'enterAgencyCode' })}
        value={formik.values.caCode}
        onChange={formik.handleChange}
        inputProps={{
          maxLength: 100,
          style: {
            width: '100%',
          },
          autoComplete: 'off',
        }}
        startAdornment={
          <InputAdornment position="end">
            <ProviderIcon />
          </InputAdornment>
        }
        optional
        errorMessage={
          formik.errors.caCode && formik.touched.caCode ? formik.errors.caCode : undefined
        }
      />

      <FormControlTextField
        id="username"
        formControlStyle={{ width: '100%', marginTop: '18px' }}
        label={<FormattedMessage id="phoneNumber" />}
        placeholder={intl.formatMessage({ id: 'enterPhoneNumber' })}
        value={formik.values.username}
        onChange={(e) =>
          (validNumberRegex.test(e.target.value) || !e.target.value) && formik.handleChange(e)
        }
        inputProps={{
          maxLength: 100,
          style: {
            width: '100%',
          },
          autoComplete: 'off',
        }}
        startAdornment={
          <InputAdornment position="end">
            <MobileIcon />
          </InputAdornment>
        }
        optional
        errorMessage={
          formik.errors.username && formik.touched.username ? formik.errors.username : undefined
        }
      />

      <LoadingButton
        style={{ marginTop: '24px' }}
        type="submit"
        variant="contained"
        color="secondary"
        loading={loading}
        disableElevation
        fullWidth
      >
        <FormattedMessage id="continue" />
      </LoadingButton>
    </form>
  );
};

export default GetOTPForm;
