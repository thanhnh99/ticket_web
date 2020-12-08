import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import styled from 'styled-components';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import DefaultHeader from '../../../../layout/defaultLayout/DefaultHeader';
import ChooseTicketComponent from '../components/chooseTicketComponent';
import PaymentTicket from '../components/paymentTicket'
import { WHITE, RED } from '../../../../configs/colors';
import Footer from '../../../auth/commons/Footer';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginLeft: theme.spacing(1),
    },
    instructions: {
      marginTop: 0,
      marginBottom: 0,
    },
  }),
);
const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
function getSteps() {
  return ['booking.chooseTicket', 'booking.pay', 'booking.done'];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 1:
      return <ChooseTicketComponent />;
    case 2:
      return < PaymentTicket/>;
    default:
      return 'Unknown stepIndex';
  }
}

const ChooseTicket: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

 
  return (
    <>
      <DefaultHeader />
      <div
        style={{
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
          color: WHITE,
        }}
      >
        <Container>
          <Line>
            <div>
              <div style={{ padding: '16px 0 16px 0' }}>
                <Typography variant="h5">Minishow Ngô Đồng - Nguyễn Hồng Nhung</Typography>
              </div>
              <div style={{ padding: '0px 0 16px 0' }}>
                <Typography style={{ paddingBottom: 4 }} variant="body2">
                  Phòng trà không tên - 112 Lê Thánh Tôn, Phường Bến Thành, Quận 1, Thành Phố Hồ Chí
                  Minh
                </Typography>
                <Typography variant="body2">Friday, 27 November 2020, 8:00 PM+0700</Typography>
              </div>
            </div>
            <div>Thời gian đặt vé</div>
          </Line>
        </Container>
      </div>

      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography>
                  <FormattedMessage id={label} />
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <div style={{marginBottom: 16}}>
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {activeStep === 1 ? (<Button variant="contained"   fullWidth
            color="secondary"
            style={{ height: '40px', marginTop: '20px', width: 300 }} onClick={handleNext}>
            <Typography variant='button'>
                <FormattedMessage id='next'/>
            </Typography>
            </Button>) 
            :
            (<Button variant="contained"   fullWidth
            color="secondary"
            style={{ height: '40px', marginTop: '20px', width: 300, backgroundColor: RED }} onClick={handleNext}>
            <Typography variant='button'>
                <FormattedMessage id='paymentMomo'/>
            </Typography>
            </Button>)
            
        }
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default ChooseTicket;
