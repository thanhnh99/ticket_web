
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import CreateEventInfo from '../components/CreateEventInfo';
import CreateEventTimeType from '../components/CreateEventTimeType';
import Setting from '../components/Setting';
import PaymentInfo from '../components/PaymentInfo';

interface Props {
    match: any,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
    }),
);

function getSteps() {
    return ['Thông tin sự kiện', 'Thời gian và loại vé', 'Cài đặt', 'Thông tin thanht toán'];
}

function getStepContent(
    step: number,
    eventName: string,
    location: string,
    address: string,
    type: string,
    setEventNameInput: any,
    setLocationInput: any,
    setAddressInput: any,
    setCityInput: any,
    setStartTinmeInput: any,
    setEndTimeInput: any,
    setEventTypeInput: any,
    setDescriptionInput: any,
) {
    switch (step) {
        case 0:
            return (
                <>
                    <CreateEventInfo
                        eventName={eventName}
                        location={location}
                        address={address}
                        type={type}
                    // passEventName={setEventNameInput}
                    // passEventName={setLocationInput}
                    // passEventName={setAddressInput}
                    // passEventName={setCityInput}
                    // passsetDescription={setDescriptionInput}
                    // passEventTypeInput={ }
                    />
                </>
            )
        case 1:
            return (
                <>
                    <CreateEventTimeType />
                </>
            );
        case 2:
            return (
                <>
                    <Setting />
                </>
            )
        case 3:
            return (
                <>
                    <PaymentInfo />
                </>
            )
        default:
            return 'Unknown step';
    }
}

const VerticalLinearStepper: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const { eventName, location, address, type } = props.match.params;
    const steps = getSteps();
    const [eventNameInput, setEventNameInput] = React.useState("");
    const [locationInput, setLocationInput] = React.useState("");
    const [addressInput, setAddressInput] = React.useState("");
    const [cityInput, setCityInput] = React.useState("");
    const [startTimeInput, setStartTinmeInput] = React.useState("");
    const [endTimeInput, setEndTimeInput] = React.useState("");
    const [eventTypeInput, setEventTypeInput] = React.useState("");
    const [descriptionInput, setDescriptionInput] = React.useState("");

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Container className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{
                                getStepContent(
                                    index,
                                    eventName,
                                    location,
                                    address,
                                    type,
                                    setEventNameInput,
                                    setLocationInput,
                                    setAddressInput,
                                    setCityInput,
                                    setStartTinmeInput,
                                    setEndTimeInput,
                                    setEventTypeInput,
                                    setDescriptionInput,
                                )}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Trở lại
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp tục'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
                </Paper>
            )}
        </Container>
    );
}

export default VerticalLinearStepper;