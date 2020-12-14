import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import CardItem from '../../admin/components/CardItemApproval'
import { CircularProgress } from '@material-ui/core'
import { Action } from 'redux';
import { snackbarSetting } from '../../../common/components/elements';
import { useSnackbar } from 'notistack';
import Axios from 'axios';
import { API_PATHS } from '../../../../configs/API'
import { get } from 'js-cookie';
import { ACCESS_TOKEN } from '../../../auth/constants';
import { some, SUCCESS_CODE } from '../../../../constants';
import CardItemApproved from '../components/CardItemApproved';

interface TabPanelProps {
    // eslint-disable-next-line react/require-default-props
    children?: React.ReactNode;
    // eslint-disable-next-line react/require-default-props
    dir?: string;
    index: any;
    value: any;
}

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

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const convertToDateTime = (unixtimestamp: any) => {
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp * 1000);
    // Year
    var year = date.getFullYear();
    // Month
    var month = date.getMonth();
    // Day
    var day = date.getDate();
    // Hours
    var hours = date.getHours();
    // Minutes
    var minutes = "0" + date.getMinutes();
    // Seconds
    var seconds = "0" + date.getSeconds();
    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime;
}

export default function ApprovalManagement() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [listEvent, setListEvent] = React.useState<some[]>([]);
    const [listEventApproved, setListEventApproved] = React.useState<some[]>([]);

    React.useEffect(() => {
        console.log(listEvent);
    })

    const getEvent = async () => {
        await Axios.get(API_PATHS.getEvent,
            {
                headers: {
                    'Authorization': `Bearer ${get(ACCESS_TOKEN)}`
                }
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.statusCode == SUCCESS_CODE) {
                    setListEvent(
                        response.data.data.map(element => {
                            return (
                                {
                                    categoryId: element.categoryId,
                                    city: element.city,
                                    coverImageUrl: element.coverImageUrl,
                                    description: element.description,
                                    fullAddress: element.fullAddress,
                                    endSellingTime: convertToDateTime(element.endSellingTime),
                                    id: element.id,
                                    isBroadcasting: element.isBroadcasting,
                                    isPopular: element.isPopular,
                                    mapImageUrl: element.mapImageUrl,
                                    name: element.name,
                                    startSellingTime: convertToDateTime(element.startSellingTime),
                                    startTime: convertToDateTime(element.startTime)
                                }
                            )
                        })
                    )
                    setListEventApproved(
                        response.data.data.filter(element => {
                            if(element.isBroadcasting)
                            return (
                                {
                                    categoryId: element.categoryId,
                                    city: element.city,
                                    coverImageUrl: element.coverImageUrl,
                                    description: element.description,
                                    fullAddress: element.fullAddress,
                                    endSellingTime: convertToDateTime(element.endSellingTime),
                                    id: element.id,
                                    isBroadcasting: element.isBroadcasting,
                                    isPopular: element.isPopular,
                                    mapImageUrl: element.mapImageUrl,
                                    name: element.name,
                                    startSellingTime: convertToDateTime(element.startSellingTime),
                                    startTime: convertToDateTime(element.startTime)
                                }
                            )
                        })
                    )
                }
                else {
                    setLoading(false);
                    enqueueSnackbar(
                        response.data.message,
                        snackbarSetting(key => closeSnackbar(key), {
                            color: 'error',
                        }),
                    );
                }
                setLoading(false);
            }
            )
    }

    React.useEffect(() => {
        getEvent();
    }, [])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <>
           
            <Container style={{width: '100%' }}>
                <Typography variant="h4" style={{ fontWeight: 600, marginBottom: 16 }}>
                    <FormattedMessage id='approvalManagement' />
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
                        <Tab label={<FormattedMessage id="newApprovalEvent"/>} {...a11yProps(0)} />
                        <Tab label={<FormattedMessage id="acceptApprovalEvent"/>} {...a11yProps(1)} />
                        <Tab label={<FormattedMessage id="denyApprovalEvent"/>} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <CardItem listEvent={listEvent} loading={loading}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        Sự kiện đã phê duyệt
                        <CardItemApproved listEvent={listEventApproved} loading={loading}/>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Sự kiện đã bị hủy
                    </TabPanel>
                </SwipeableViews>
            </Container>
           
        </>


    );
}