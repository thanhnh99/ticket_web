import * as React from 'react';
import { useFormik } from 'formik';
import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Col } from '../../../common/components/elements';
import LoadingButton from '../../../common/components/LoadingButton';
import FormControlTextField from '../../../common/components/FormControlTextField';
import SingleSelect from '../../../common/components/SingleSelect';

interface Props {
    params: undefined;
    onUpdateFilter(params: undefined): void;
    loading?: boolean;
}


const CreateEventForm: React.FunctionComponent = () => {

    const intl = useIntl();
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const defaultCreateEventForm = {
        eventName: '',
        locationName: '',
        location: '',
        eventType: [
            { number: 1, value: 'âm nhạc' },
            { number: 2, value: 'Thể thao' },
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
                    formControlStyle={{ width: 550, marginLeft: 36, marginRight: 36 }}
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
                />
                <SingleSelect
                    onSelectOption={(value: any) => {
                        formik.setFieldValue('positionId', value);
                    }}
                    formControlStyle={{ width: 550, marginLeft: 36, marginRight: 36, marginBottom: 36 }}
                    getOptionLabel={value => value.name}
                    options={[
                        { id: undefined, name: intl.formatMessage({ id: 'Âm nhạc' }) },
                        { id: undefined, name: intl.formatMessage({ id: 'Thể thao' }) },
                        { id: undefined, name: intl.formatMessage({ id: 'Sách' }) },
                        { id: undefined, name: intl.formatMessage({ id: 'Ngoài trời' }) },
                    ]}
                    optional
                />
                <LoadingButton
                    style={{ minWidth: 160 }}
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