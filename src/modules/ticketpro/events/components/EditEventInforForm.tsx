import * as React from 'react';
import { useFormik } from 'formik';
import { Typography } from '@material-ui/core';
import {
    Row,
    Col,
    snackbarSetting,
    PageWrapper,
    PageContainer,
    Wrapper
} from '../../../common/components/elements';
import LoadingButton from '../../../common/components/LoadingButton';
import FormControlAutoComplete from '../../../common/components/FormControlAutoComplete';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { SingleSelect } from '../../../common/components/SingleSelect';
import { useSnackbar } from 'notistack';
import { defaultLoginForm, login, ILoginForm } from '../../../auth/redux/authThunks';
import { useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { some } from "../../../../constants";
import {
    PhotoCamera,
    Edit
} from "@material-ui/icons"

interface Props {
    params: undefined;
    onUpdateFilter(params: undefined): void;
    loading?: boolean;
}


const EditEventInforForm: React.FunctionComponent = () => {


    return (
        <>
            <PageContainer style={{
                justifyContent: 'flex-start',
            }}>
                <Col style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <img src='https://static.tkbcdn.com/Upload/cover-event.jpg'
                        style={{
                            width: '100%',
                            maxHeight: 300
                        }}
                    />
                    <Col style={{
                        position: "absolute",
                    }}>

                        <Row>
                            <a style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                boxShadow: '0 -3px 0 rgba(0, 0, 0, 0.25) inset',
                                textAlign: 'left',
                                display: 'block',
                                width: '302px',
                                margin: '0 auto',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                color: '#414B57',
                                lineHeight: '17px',
                            }}>
                                <Row style={{
                                    padding: 20
                                }}>
                                    <span>
                                        <PhotoCamera style={{ fontSize: 50 }} />
                                    </span>
                                    <Col style={{
                                        marginLeft: 50,
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            position: 'relative',
                                            top: -2,
                                        }}>
                                            Tải ảnh bìa lên
                                    </div>
                                        <div style={{
                                            fontSize: 11,
                                        }}>
                                            <span>Kích thước tối ưu: </span>
                                            <span>1560 x 600px (Không lớn hơn 1MB)</span>
                                        </div>
                                    </Col>
                                </Row>
                            </a>
                        </Row>
                    </Col>
                </Col>

                <Col>
                    <Col style={{ width: '100%' }}>
                        <Row style={{ paddingTop: 50 }}>
                            <Edit style={{ fontSize: 30 }} />
                            <textarea
                                placeholder="Tên sự kiện"
                                maxLength={250}
                                style={{
                                    color: '#27313D',
                                    fontSize: '1.62em',
                                    fontWeight: 700,
                                    fontFamily: "Roboto Slab",
                                    // padding-left: 0!important;
                                    // display: block;
                                    width: '100%',
                                    resize: 'none',
                                    height: 70,
                                }}
                            >

                            </textarea>
                        </Row>
                    </Col>
                </Col>
            </PageContainer>
        </>
    )
};

export default EditEventInforForm;
