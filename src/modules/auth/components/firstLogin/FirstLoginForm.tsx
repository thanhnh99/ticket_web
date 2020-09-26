import { Checkbox, Typography } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
// import { useDispatch } from 'react-redux';
// import { Action } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
// import { AppState } from '../../../../redux/reducers';
import { BLUE, ORANGE } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { Row } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { RawLink } from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultFirstLoginData } from '../../redux/authThunks';

interface Props {}

const FirstLoginForm: React.FunctionComponent<Props> = () => {
  const intl = useIntl();
  // const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading] = React.useState(false);
  const storeSchema = yup.object().shape({
    username: yup
      .string()
      .required(intl.formatMessage({ id: 'required' }))
      .trim(),
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
    initialValues: defaultFirstLoginData,
    onSubmit: () => {},
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: '36px 40px 36px 30px' }}>
        <Typography variant="h5">
          <FormattedMessage id="passwordSetting" />
        </Typography>
        <FormControlTextField
          id="username"
          formControlStyle={{ width: 530, marginTop: 48, marginRight: 0 }}
          label={<FormattedMessage id="auth.name" />}
          placeholder={intl.formatMessage({ id: 'auth.enterName' })}
          value={formik.values.username}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 100,
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.username && formik.touched.username ? formik.errors.username : undefined
          }
        />
        <Row style={{ justifyContent: 'space-between' }}>
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
          <FormControlTextField
            id="confirmPassword"
            formControlStyle={{ width: 250, marginTop: 12, marginRight: 0 }}
            label={<FormattedMessage id="auth.confirmPassword" />}
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 50,
              autoComplete: 'new-password',
            }}
            type="password"
            errorMessage={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />
        </Row>
        <Row style={{ marginTop: 14 }}>
          <Checkbox
            defaultChecked
            checkedIcon={<CheckBoxIcon style={{ color: ORANGE }} />}
            style={{ padding: 0, marginRight: 10 }}
          />
          <Typography variant="body2">
            <FormattedMessage id="auth.agreeWith" />
          </Typography>
          &nbsp;
          <RawLink to={ROUTES.login} style={{ color: BLUE }}>
            <Typography variant="body2">
              <FormattedMessage id="auth.rules" />
            </Typography>
          </RawLink>
        </Row>
        <LoadingButton
          style={{ minWidth: 160, marginTop: 26 }}
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
          loading={loading}
        >
          <FormattedMessage id="login" />
        </LoadingButton>
      </div>
    </form>
  );
};

export default FirstLoginForm;
