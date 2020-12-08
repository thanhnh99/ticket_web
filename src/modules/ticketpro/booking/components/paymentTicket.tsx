import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import { GREY_700, GREY_100, GREY_500 } from '../../../../configs/colors';

interface Props {}

export const Row = styled.div`
  display: flex;
  align-items: center;
`;
export const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootForm: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '28vw',
      },
    },
    root: {
      color: GREY_500,
      fontSize: 'inherit',
      marginRight: 4,
    },
  }),
);
const PaymentTicket: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Container style={{ display: 'flex' }}>
        <div style={{ flex: 9 }}>
          <div>
            <Typography variant="subtitle1">
              <FormattedMessage id="infoUserReceive" />
            </Typography>
          </div>
          <form className={classes.rootForm} noValidate autoComplete="off">
            <div>
              <Line>
                <TextField required id="LastName" label="Họ" />
                <TextField required id="standard-input" label="Tên" />
              </Line>
              <Line>
                <TextField required id="email" label="Email" />
                <TextField required id="emailAgain" label="Nhập lại email" />
              </Line>
              <Line>
                <TextField required id="phone" label="Số điện thoại" />
              </Line>
            </div>
          </form>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ flex: 4 }}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              boxShadow:
                '0px 1px 3px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.12), 0px 0px 2px rgba(0,0,0,0.14)',
              padding: '16px',
            }}
          >
            <Line style={{ paddingBottom: 8 }}>
              <Typography variant="subtitle1">THÔNG TIN NGƯỜI NHẬN VÉ</Typography>
            </Line>
            <div>
              <Line style={{ paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon className={classes.root} />
                  <Typography variant="subtitle2" style={{ color: GREY_500 }}>
                    Họ và tên
                  </Typography>
                </div>
                <div>
                  <Typography style={{ color: GREY_500 }} variant="body2">
                    Nguyễn Thế Anh
                  </Typography>
                </div>
              </Line>
              <Line style={{ paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MailOutlineOutlinedIcon className={classes.root} />
                  <Typography variant="subtitle2" style={{ color: GREY_500 }}>
                    Email
                  </Typography>
                </div>
                <div>
                  <Typography style={{ color: GREY_500 }} variant="body2">
                    Nguyentheanh17071998@gmail.com
                  </Typography>
                </div>
              </Line>
              <Line style={{ paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon className={classes.root} />
                  <Typography variant="subtitle2" style={{ color: GREY_500 }}>
                    Điện thoại
                  </Typography>
                </div>
                <div>
                  <Typography style={{ color: GREY_500 }} variant="body2">
                    0387870022
                  </Typography>
                </div>
              </Line>
              <Line>
                <Typography variant="subtitle1">THÔNG TIN ĐẶT VÉ</Typography>
              </Line>

              <Line style={{ paddingTop: 8 }}>
                <div>
                  <Typography variant="subtitle2" style={{ color: GREY_700 }}>
                    <FormattedMessage id="ticket.type" />
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" style={{ color: GREY_700 }}>
                    <FormattedMessage id="ticket.total" />
                  </Typography>
                </div>
              </Line>
              <Line style={{ paddingTop: 8 }}>
                <div>
                  <Typography variant="body2" style={{ color: GREY_500 }}>
                    Vé người lớn
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" style={{ color: GREY_500 }}>
                    1000000 &nbsp;
                    <FormattedMessage id="currency" />
                  </Typography>
                </div>
              </Line>
            </div>
          </div>
          <Line
            style={{
              backgroundColor: GREY_700,
              borderRadius: '4px',
              boxShadow:
                '0px 1px 3px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.12), 0px 0px 2px rgba(0,0,0,0.14)',
              padding: '16px',
            }}
          >
            <div>
              <Typography variant="subtitle2" style={{ color: GREY_100 }}>
                Tổng số tiền
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" style={{ color: GREY_100 }}>
                1600000 &nbsp;
                <FormattedMessage id="currency" />
              </Typography>
            </div>
          </Line>
        </div>
      </Container>
      <Container>
        <div>
          <div style={{ marginTop: 16 }}>
            <Typography variant="subtitle1">
              <FormattedMessage id="typePayment" />
            </Typography>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PaymentTicket;
