import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { GREY_900 } from '../../../../configs/colors';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "0px 24px 0 24px",
        borderRadius: 8
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

export default function SimpleCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent style={{flex: 1}}>
                <Line style={{ alignItems: 'center' }}>
                    <Line>
                        <Typography style={{ fontWeight: 600, minWidth: 90 }} >
                            <FormattedMessage id="nameEvent"/>&#x0003A;
                    </Typography>
                    </Line>
                &nbsp;
                   <Line>
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            Nhã nhạc cung đình Huế
                    </Typography>
                    </Line>
                </Line>
                <Line style={{ alignItems: 'center' }}>
                    <Line>
                        <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                        <FormattedMessage id="timeEvent"/>&#x0003A;
                    </Typography>
                </Line>
                &nbsp;
                   <Line>
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            08/12/2020 22:25:31
                    </Typography>
                    </Line>
                </Line>
                <Line>
                    <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                        <FormattedMessage id="contacts"/>
                    </Typography>
                </Line>
                <Line style={{display: 'flex', paddingLeft: 16}}>
                    <Line>
                        <FormattedMessage id="phoneNumber"/>&#x0003A;
                        &nbsp; 
                        <Typography style={{ color: GREY_900 }} variant="body2">
                        0398980033
                        </Typography>
                    </Line>
                    <Line style={{paddingLeft: 24}}>
                    <FormattedMessage id="auth.email"/>&#x0003A;
                        &nbsp; 
                        <Typography style={{ color: GREY_900 }} variant="body2">
                        anhnt@vnu.edu.vn
                        </Typography>
                    </Line>
                </Line>

                <Line>
                    <Typography style={{ fontWeight: 600, minWidth: 90 }}>
                        <FormattedMessage id="auth.accountInfo"/>
                    </Typography>
                </Line>
                <Line style={{display: 'flex', paddingLeft: 16}}>
                    <Line>
                        <FormattedMessage id="accountHolder"/>&#x0003A;
                        &nbsp; 
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            Phạm Hoàng Nam
                        </Typography>
                    </Line>
                    <Line style={{paddingLeft: 24}}>
                    <FormattedMessage id="accountNumber"/>&#x0003A;
                    &nbsp; 
                        <Typography style={{ color: GREY_900 }} variant="body2">
                        21512321789
                        </Typography>
                    </Line>
                </Line>
                <Line style={{display: 'flex', paddingLeft: 16}}>
                    <Line>
                        <FormattedMessage id="bankName"/>&#x0003A;
                        &nbsp; 
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            Ngân hàng BIDV
                        </Typography>
                    </Line>
                    <Line style={{paddingLeft: 24}}>
                    <FormattedMessage id="branchBankName"/>&#x0003A;
                    &nbsp; 
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            Cầu Giấy
                        </Typography>
                    </Line>
                </Line>

                <Line style={{ alignItems: 'center' }}>
                    <Line>
                        <Typography style={{ fontWeight: 600, minWidth: 90, marginLeft: 2 }}>
                        <FormattedMessage id="placeEvent"/>&#x0003A;
                        </Typography>   
                    </Line>
                &nbsp;
                   <Line>
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            36 My Khe 4, My Khe Ward, Son Tra District
                        </Typography>
                    </Line>
                </Line>
               
            </CardContent>
            <CardActions>
                <Button style={{
                    padding: '8px 16px',
                    width: '140px',
                    height: '30px',
                    boxShadow: 'none',
                }}
                    color="secondary"
                    variant="contained" >
                        <FormattedMessage id="approve"/>
                    </Button>
                <Button style={{
                    padding: '8px 16px',
                    width: '140px',
                    height: '30px',
                    boxShadow: 'none',
                }}
                    color="primary"
                    variant="contained">
                        <FormattedMessage id="cancel"/>
                    </Button>
            </CardActions>
        </Card>
    );
}