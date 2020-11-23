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
    displayName: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'emailInvalid' }))
      .trim()
      .required(intl.formatMessage({ id: 'required' })),
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
          id="displayName"
          formControlStyle={{ flex: 1 }}
          label={<FormattedMessage id="tên hiển thị" />}
          placeholder='Nhập tên hiển thị'
          value={formik.values.displayName}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
          }}
         
        />
      </Row>

      <Row style={{ marginBottom: 12 }}>
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
            formik.values.confirmPassword && formik.submitCount > 0
              ? ''
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
