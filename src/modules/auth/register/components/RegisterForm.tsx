import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { AppState } from '../../../../redux/reducers';
import { Row } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import LoadingButton from '../../../common/components/LoadingButton';
import { goBackAction } from '../../../common/redux/reducer';
import { defaultRegisterData, IRegisterData } from '../../redux/authThunks';
import RegisterSuccessDialog from './RegisterSuccessDialog';

export interface Props {
  loading: boolean;
  onRegister: (data: IRegisterData) => void;
  dialogContent: string;
}

const RegisterForm: React.FunctionComponent<Props> = (props) => {
  const { loading, onRegister, dialogContent } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();

  const storeSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' })),

    representative: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'emailInvalid' }))
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
    referrerPhone: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
    representativePhone: yup.string().trim().notRequired(),
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
    initialValues: defaultRegisterData,
    onSubmit: (values) => {
      onRegister(values);
    },
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ margin: '24px 12px 20px 32px', flex: 1 }}>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        <FormattedMessage id="register" />
      </Typography>

      <Row style={{ marginBottom: 12 }}>
        <FormControlTextField
          id="name"
          formControlStyle={{ flex: 2 }}
          label={<FormattedMessage id="auth.companyName" />}
          placeholder={intl.formatMessage({ id: 'auth.enterCompanyName' })}
          value={formik.values.name}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.name && formik.submitCount > 0 ? formik.errors.name : undefined
          }
        />
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <FormControlTextField
          id="address"
          formControlStyle={{ flex: 2 }}
          optional
          label={<FormattedMessage id="address" />}
          placeholder={intl.formatMessage({ id: 'enterAddress' })}
          value={formik.values.address}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 255,
          }}
        />
        <FormControlTextField
          id="taxCode"
          formControlStyle={{ flex: 1 }}
          optional
          label={<FormattedMessage id="taxCode" />}
          placeholder={intl.formatMessage({ id: 'enterTaxCode' })}
          value={formik.values.taxCode}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
          }}
        />
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <Row style={{ flex: 2, marginRight: 24 }}>
          <FormControlTextField
            id="representative"
            formControlStyle={{ flex: 1 }}
            label={<FormattedMessage id="auth.contactPersonName" />}
            placeholder={intl.formatMessage({ id: 'auth.enterContactPersonName' })}
            value={formik.values.representative}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 255,
            }}
            errorMessage={
              formik.errors.representative && formik.submitCount > 0
                ? formik.errors.representative
                : undefined
            }
          />
          <FormControlTextField
            id="referrerPhone"
            formControlStyle={{ flex: 1, margin: 0 }}
            label={<FormattedMessage id="auth.phone" />}
            placeholder={intl.formatMessage({ id: 'auth.enterPhone' })}
            value={formik.values.referrerPhone}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 15,
            }}
            errorMessage={
              formik.errors.referrerPhone && formik.submitCount > 0
                ? formik.errors.referrerPhone
                : undefined
            }
          />
        </Row>
        <FormControlTextField
          id="email"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.email" />}
          placeholder={intl.formatMessage({ id: 'auth.enterEmail' })}
          value={formik.values.email}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
          }}
          errorMessage={
            formik.errors.email && formik.submitCount > 0 ? formik.errors.email : undefined
          }
        />
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <FormControlTextField
          id="representativePhone"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.referenceContactPhone" />}
          placeholder={intl.formatMessage({ id: 'auth.enterPhone' })}
          value={formik.values.representativePhone}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
          }}
          optional
          errorMessage={
            formik.errors.representativePhone && formik.submitCount > 0
              ? formik.errors.representativePhone
              : undefined
          }
        />
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <FormControlTextField
          id="password"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="password" />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          value={formik.values.password}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
            autoComplete: 'new-password',
          }}
          type="password"
          errorMessage={
            formik.errors.password && formik.submitCount > 0 ? formik.errors.password : undefined
          }
        />
        <FormControlTextField
          id="confirmPassword"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="auth.confirmPassword" />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 15,
            autoComplete: 'new-password',
          }}
          type="password"
          errorMessage={
            formik.errors.confirmPassword && formik.submitCount > 0
              ? formik.errors.confirmPassword
              : undefined
          }
        />
      </Row>

      <LoadingButton
        style={{ minWidth: 200 }}
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        loading={loading}
        disableElevation
      >
        <FormattedMessage id="auth.register" />
      </LoadingButton>
      <RegisterSuccessDialog
        open={!!dialogContent}
        onClose={() => {
          dispatch(goBackAction());
        }}
        content={dialogContent}
      />
    </form>
  );
};

export default RegisterForm;
