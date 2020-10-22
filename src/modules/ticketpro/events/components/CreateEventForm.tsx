import * as React from 'react';
import { useFormik } from 'formik';
import { Typography } from '@material-ui/core';
import { Row, Col, snackbarSetting } from '../../../common/components/elements';
import LoadingButton from '../../../common/components/LoadingButton';
import FormControlAutoComplete from '../../../common/components/FormControlAutoComplete';
import FormControlTextField from '../../../common/components/FormControlTextField';
import FormControlSelect from '../../../common/components/FormControlSelect';
import { useSnackbar } from 'notistack';
import { defaultLoginForm, login, ILoginForm } from '../../../auth/redux/authThunks';
import { useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props { }


const CreateEventForm: React.FunctionComponent<Props> = () => {

    const intl = useIntl();
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const defaultCreateEventForm = {
        eventName: '',
        locationName: '',
        location: '',
        eventType: [
            {number: 1, value: 'âm nhạc'},
            {number: 2, value: 'Thể thao'},
        ]
    };

    const onLogin = React.useCallback(
        () => {

        },
        [closeSnackbar, dispatch, enqueueSnackbar],
    );

    const formik = useFormik({
        initialValues: defaultCreateEventForm,
        onSubmit: values => {
            onLogin();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} >
            <Col>
                <Typography variant="h5" 
                style={{ 
                    backgroundColor: '#dedede', 
                    padding: 20,
                    textAlign: 'center', 
                    fontWeight: 'bold' 
                    }}>
                    <FormattedMessage id="Create Event" />
                </Typography>
                <FormControlTextField
                    id="password"
                    fullWidth
                    formControlStyle={{ width: 550, marginTop: 20, marginLeft: 36, marginRight: 36 }}
                    // label={<FormattedMessage id="auth.newPassword" />}
                    placeholder={intl.formatMessage({ id: 'Tên sự kiện' })}
                    onChange={formik.handleChange}
                    value={formik.values.eventName}
                    inputProps={{
                        maxLength: 50,
                        style: {
                            width: '100%',
                        },
                        autoComplete: 'off',
                    }}
                    type="text"
                />
                <FormControlTextField
                    id="password"
                    fullWidth
                    formControlStyle={{ width: 550, marginLeft: 36, marginRight: 36 }}
                    // label={<FormattedMessage id="auth.newPassword" />}
                    placeholder={intl.formatMessage({ id: 'Tên địa điểm' })}
                    onChange={formik.handleChange}
                    value={formik.values.locationName}
                    inputProps={{
                        maxLength: 50,
                        style: {
                            width: '100%',
                        },
                        autoComplete: 'off',
                    }}
                    type="text"
                // errorMessage={
                //   formik.errors.password && formik.submitCount > 0 ? formik.errors.password : undefined
                // }
                />
                <FormControlTextField
                    id="password"
                    fullWidth
                    formControlStyle={{ width: 550, marginLeft: 36, marginRight: 36, marginBottom: 36 }}
                    // label={<FormattedMessage id="auth.newPassword" />}
                    placeholder={intl.formatMessage({ id: 'Địa chỉ' })}
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    inputProps={{
                        maxLength: 50,
                        style: {
                            width: '100%',
                        },
                        autoComplete: 'off',
                    }}
                    type="text"
                // errorMessage={
                //   formik.errors.password && formik.submitCount > 0 ? formik.errors.password : undefined
                // }
                />
                {/* <FormControlSelect options={defaultCreateEventForm.eventType}/> */}
                <LoadingButton
                    style={{ minWidth: 160}}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disableElevation
                >
                    <FormattedMessage id="Create" />
                </LoadingButton>
            </Col>
        </form>
    );
};

export default CreateEventForm;
