import { Button, Card, Container, Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import { some } from '../../../../constants';
import { ReactComponent as IconPaymentSuccess } from '../../../../svg/payment_success.svg';
import Link from '../../../common/components/Link';


interface Props extends WrappedComponentProps {
    data: some;
    msg?: string;
    isMobile?: boolean;
}

const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileTopupSuccessBox: React.FunctionComponent<Props> = props => {
    const { msg, isMobile } = props;
    return (
        <Container style={{ marginTop: '8%' }}>
            <Typography variant="h5">{msg || <FormattedMessage id="Thành công" />}</Typography>
            <Card
                elevation={2}
                style={{
                    padding: '32px',
                    margin: '24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <IconPaymentSuccess style={{ marginBottom: '30px', width: '104px', height: '104px' }} />
                <Typography
                    variant="body2"
                    style={{
                        textAlign: 'center',
                    }}
                >

                    <FormattedMessage
                        id="Giao dịch thành công"
                    />

                </Typography>
                <div style={{ width: '100%', margin: '12px 0px 20px 0px' }}>
                    <Divider />
                </div>
                <div>
                    <Line style={{ marginBottom: '20px' }}>
                        <Typography variant="body2">
                            <FormattedMessage id="Bạn có thể xem lại nội dung đơn hàng trong mục Quản lý!" />
                        </Typography>

                    </Line>
                </div>
                {!isMobile && (
                    <Line style={{ marginTop: '50px' }}>
                        <Link to="/">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                style={{ width: '260px', marginRight: '30px' }}
                                disableElevation
                            >
                                <FormattedMessage id="Quản lý đơn hàng" />
                            </Button>
                        </Link>
                        <Link to={`/`}>
                            <Button variant="outlined" size="large" style={{ width: '260px' }}>
                                <Typography variant="button" color="textSecondary">
                                    <FormattedMessage id="Về trang chủ" />
                                </Typography>
                            </Button>
                        </Link>
                    </Line>
                )}
            </Card>
        </Container>
    );
};

export default MobileTopupSuccessBox;
