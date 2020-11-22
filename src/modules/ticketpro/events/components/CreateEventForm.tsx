import * as React from 'react';
import { useFormik } from 'formik';
import { Typography } from '@material-ui/core';
<<<<<<< HEAD
import { FormattedMessage, useIntl } from 'react-intl';
import { Col} from '../../../common/components/elements';
import LoadingButton from '../../../common/components/LoadingButton';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { SingleSelect } from '../../../common/components/SingleSelect';
=======
import { Row, Col, snackbarSetting } from '../../../common/components/elements';
import LoadingButton from '../../../common/components/LoadingButton';
import FormControlAutoComplete from '../../../common/components/FormControlAutoComplete';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { SingleSelect } from '../../../common/components/SingleSelect';
import { useSnackbar } from 'notistack';
import { defaultLoginForm, login, ILoginForm } from '../../../auth/redux/authThunks';
import { useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { some } from "../../../../constants";
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d

interface Props {
    params: undefined;
    onUpdateFilter(params: undefined): void;
    loading?: boolean;
}


const CreateEventForm: React.FunctionComponent = () => {
<<<<<<< HEAD
    const intl = useIntl();
=======

    const intl = useIntl();
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
    const defaultCreateEventForm = {
        eventName: '',
        locationName: '',
        location: '',
        eventType: [
            { number: 1, value: 'âm nhạc' },
            { number: 2, value: 'Thể thao' },
        ]
    };

<<<<<<< HEAD
    const formik = useFormik({
        initialValues: defaultCreateEventForm,
        onSubmit: values => {
          
        }
    });

=======
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

    let eventOption: some = [{ "1": "hello" }];

>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
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
<<<<<<< HEAD
=======
                    // label={<FormattedMessage id="auth.newPassword" />}
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
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
<<<<<<< HEAD
=======
                    // label={<FormattedMessage id="auth.newPassword" />}
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
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
<<<<<<< HEAD
          
=======
                // errorMessage={
                //   formik.errors.password && formik.submitCount > 0 ? formik.errors.password : undefined
                // }
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
                />
                <FormControlTextField
                    id="password"
                    fullWidth
                    formControlStyle={{ width: 550, marginLeft: 36, marginRight: 36 }}
<<<<<<< HEAD
=======
                    // label={<FormattedMessage id="auth.newPassword" />}
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
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
<<<<<<< HEAD
=======
                    // value={formik.values.positionId}
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
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
