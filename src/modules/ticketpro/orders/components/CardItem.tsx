import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { GREY_900 } from '../../../../configs/colors';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: 'flex',
        justifyContent: 'space-between',
        padding: "0px 24px 0 24px"
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
            <CardContent>
                <Line style={{ alignItems: 'center' }}>
                    <Line>
                        <Typography style={{ fontWeight: 600 }} >
                            Tên sự kiện:
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
                        <Typography style={{ fontWeight: 600 }}>
                            Thời gian diễn ra:
                    </Typography>
                    </Line>
                &nbsp;
                   <Line>
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            08/12/2020 22:25:31
                    </Typography>
                    </Line>
                </Line>
                <Line style={{ alignItems: 'center' }}>
                    <Line>
                        <Typography style={{ fontWeight: 600 }}>
                            Địa điểm:
                    </Typography>
                    </Line>
                &nbsp;
                   <Line>
                        <Typography style={{ color: GREY_900 }} variant="body2">
                            36 My Khe 4, My Khe Ward, Son Tra District, Phước Mỹ, Đà Nẵng, Việt Nam
                        </Typography>
                    </Line>
                </Line>
            </CardContent>
            <CardActions>
                <Button style={{
                    padding: '8px 16px',
                    width: '150px',
                    height: '30px',
                    boxShadow: 'none',
                }}
                    color="secondary"
                    variant="contained" >Xem chi tiết</Button>
                <Button style={{
                    padding: '8px 16px',
                    width: '150px',
                    height: '30px',
                    boxShadow: 'none',
                }}
                    color="primary"
                    variant="contained">Hủy</Button>
            </CardActions>
        </Card>
    );
}
