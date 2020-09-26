/* eslint-disable no-unused-vars */
import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultRegisterData, IRegisterData } from '../../redux/authThunks';

export interface Props {
  loading: boolean;
  onRegister(data: IRegisterData): void;
}

const RegisterForm: React.FunctionComponent<Props> = (props) => {
  const { loading } = props;
  const intl = useIntl();

  const formik = useFormik({
    initialValues: defaultRegisterData,
    onSubmit: () => {},
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ margin: '32px 12px 0 32px' }}>
      <Typography variant="h5" style={{ marginBottom: 24 }}>
        <FormattedMessage id="register" />
      </Typography>

      <Row style={{ marginBottom: 12 }}>
        <FormControlTextField
          id="companyName"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.companyName" />}
          placeholder={intl.formatMessage({ id: 'auth.enterCompanyName' })}
          value={formik.values.companyName}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
            style: {
              width: '100%',
            },
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.companyName && formik.touched.companyName
              ? formik.errors.companyName
              : undefined
          }
        />
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <FormControlTextField
          id="contactPersonName"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.contactPersonName" />}
          placeholder={intl.formatMessage({ id: 'auth.enterContactPersonName' })}
          value={formik.values.contactPersonName}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
            style: {
              width: '100%',
            },
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.contactPersonName && formik.touched.contactPersonName
              ? formik.errors.contactPersonName
              : undefined
          }
        />
        <FormControlTextField
          id="email"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.email" />}
          placeholder={intl.formatMessage({ id: 'auth.enterEmail' })}
          value={formik.values.email}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
            style: {
              width: '100%',
            },
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.email && formik.touched.email ? formik.errors.email : undefined
          }
        />
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <FormControlTextField
          id="phone"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.phone" />}
          placeholder={intl.formatMessage({ id: 'auth.enterPhone' })}
          value={formik.values.phone}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
            style: {
              width: '100%',
            },
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.phone && formik.touched.phone ? formik.errors.phone : undefined
          }
        />
        <FormControlTextField
          id="referenceContactPhone"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.referenceContactPhone" />}
          placeholder={intl.formatMessage({ id: 'auth.enterPhone' })}
          value={formik.values.referenceContactPhone}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
            style: {
              width: '100%',
            },
            autoComplete: 'off',
          }}
          optional
        />
      </Row>

      <LoadingButton
        style={{ minWidth: 200 }}
        type="submit"
        variant="contained"
        color="secondary"
        loading={loading}
        disableElevation
      >
        <FormattedMessage id="auth.register" />
      </LoadingButton>
    </form>
  );
};

export default RegisterForm;
