import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
import { GREEN, GREEN_50 } from '../../../../configs/colors';
import { Col } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultForgotPass, IForgotPass } from '../../redux/authThunks';

interface Props {
  loading: boolean;
  note: string;
  onVerify: (data: IForgotPass) => void;
}

const ForgotPasswordForm: React.FunctionComponent<Props> = (props: Props) => {
  const { loading, onVerify, note } = props;
  const intl = useIntl();

  const forgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'emailInvalid' }))
      .required(intl.formatMessage({ id: 'required' }))
      .trim(),
  });

  const formik = useFormik({
    initialValues: defaultForgotPass,
    onSubmit: values => {
      onVerify(values);
    },
    validationSchema: forgotPasswordSchema,
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
            formik.errors.email && formik.submitCount > 0 ? formik.errors.email : undefined
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
        >
          <FormattedMessage id="confirm" />
        </LoadingButton>
        {note && (
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
            {note}
          </Typography>
        )}
      </Col>
    </form>
  );
};

export default ForgotPasswordForm;
