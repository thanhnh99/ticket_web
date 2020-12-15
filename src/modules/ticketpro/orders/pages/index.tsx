import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AppState } from '../../../../redux/reducers';
import { some, SUCCESS_CODE } from '../../../../constants';
import { API_PATHS } from '../../../../configs/API';
import { fetchThunk } from '../../../common/redux/thunk';
import { GREY_900 } from '../../../../configs/colors';

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  dir?: string;
  index: any;
  value: any;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const convertToDateTime = (unixtimestamp: any) => {
  // Convert timestamp to milliseconds
  const date = new Date(unixtimestamp * 1000);

  // Year
  const year = date.getFullYear();

  // Month
  const month = date.getMonth();

  // Day
  const day = date.getDate();

  // Hours
  const hours = date.getHours();

  // Minutes
  const minutes = `0${date.getMinutes()}`;

  // Seconds
  const seconds = `0${date.getSeconds()}`;

  // Display date time in MM-dd-yyyy h:m:s format
  const convdataTime = `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(
    -2,
  )}`;
  return convdataTime;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 24px 0 24px',
    borderRadius: 8,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

interface Props {}

const FullWidthTabs: React.FC<Props> = (prop) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // eslint-disable-next-line no-undef
  const [myBooking, setMyBooking] = React.useState<some | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const fetchMyBooking = React.useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.myBooking, 'get'));
    if (json?.statusCode === SUCCESS_CODE) {
      console.log(json.data);

      setMyBooking(json.data);
    }
    setLoading(false);
  }, [dispatch]);

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  React.useEffect(() => {
    fetchMyBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container style={{ width: '100%' }}>
        <Typography variant="h4" style={{ fontWeight: 600, marginBottom: 16 }}>
          <FormattedMessage id="ordersManagement" />
        </Typography>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={<FormattedMessage id="ordersed" />} {...a11yProps(0)} />
            <Tab label={<FormattedMessage id="denyOrders" />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {myBooking
              ?.filter((booking: some) => {
                return booking?.status === 'RESERVED';
              })
              .map((booking: some, index: number) => (
                <div key={index} style={{ marginTop: 16 }}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="nameEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {booking?.event.name}
                          </Typography>
                        </Line>
                      </Line>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="timeStartEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {convertToDateTime(booking?.event.startTime)}
                          </Typography>
                        </Line>
                      </Line>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="timeFinishEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {convertToDateTime(booking?.event.endTime)}
                          </Typography>
                        </Line>
                      </Line>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="placeEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {booking?.event.fullAddress}
                          </Typography>
                        </Line>
                      </Line>
                    </CardContent>
                    <div>
                      <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                      >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                          Thông tin chi tiết vé
                        </DialogTitle>
                        <DialogContent dividers>
                          <CardContent>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="nameEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {booking?.event.name}
                                </Typography>
                              </Line>
                            </Line>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="timeStartEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {convertToDateTime(booking?.event.startTime)}
                                </Typography>
                              </Line>
                            </Line>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="timeFinishEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {convertToDateTime(booking?.event.endTime)}
                                </Typography>
                              </Line>
                            </Line>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="placeEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {booking?.event.fullAddress}
                                </Typography>
                              </Line>
                            </Line>
                          </CardContent>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleClose} color="primary">
                            Đóng
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    <CardActions>
                      <Button
                        style={{
                          padding: '8px 16px',
                          width: '140px',
                          height: '30px',
                          boxShadow: 'none',
                        }}
                        onClick={handleClickOpen}
                        color="secondary"
                        variant="contained"
                      >
                        Xem chi tiết
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {myBooking
              ?.filter((booking: some) => {
                return booking?.status === 'FAILED';
              })
              .map((booking: some, index: number) => (
                <div key={index} style={{ marginTop: 16 }}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="nameEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {booking?.event.name}
                          </Typography>
                        </Line>
                      </Line>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="timeStartEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {convertToDateTime(booking?.event.startTime)}
                          </Typography>
                        </Line>
                      </Line>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="timeFinishEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {convertToDateTime(booking?.event.endTime)}
                          </Typography>
                        </Line>
                      </Line>
                      <Line style={{ alignItems: 'center' }}>
                        <Line>
                          <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                            <FormattedMessage id="placeEvent" />
                            &#x0003A;
                          </Typography>
                        </Line>
                        &nbsp;
                        <Line>
                          <Typography style={{ color: GREY_900 }} variant="body2">
                            {booking?.event.fullAddress}
                          </Typography>
                        </Line>
                      </Line>
                    </CardContent>
                    <div>
                      <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                      >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                          Thông tin chi tiết vé
                        </DialogTitle>
                        <DialogContent dividers>
                          <CardContent>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="nameEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {booking?.event.name}
                                </Typography>
                              </Line>
                            </Line>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="timeStartEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {convertToDateTime(booking?.event.startTime)}
                                </Typography>
                              </Line>
                            </Line>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="timeFinishEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {convertToDateTime(booking?.event.endTime)}
                                </Typography>
                              </Line>
                            </Line>
                            <Line style={{ alignItems: 'center' }}>
                              <Line>
                                <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                                  <FormattedMessage id="placeEvent" />
                                  &#x0003A;
                                </Typography>
                              </Line>
                              &nbsp;
                              <Line>
                                <Typography style={{ color: GREY_900 }} variant="body2">
                                  {booking?.event.fullAddress}
                                </Typography>
                              </Line>
                            </Line>
                          </CardContent>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleClose} color="primary">
                            Đóng
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    <CardActions>
                      <Button
                        style={{
                          padding: '8px 16px',
                          width: '140px',
                          height: '30px',
                          boxShadow: 'none',
                        }}
                        onClick={handleClickOpen}
                        color="secondary"
                        variant="contained"
                      >
                        Xem chi tiết
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
          </TabPanel>
        </SwipeableViews>
      </Container>
    </>
  );
};
export default FullWidthTabs;
