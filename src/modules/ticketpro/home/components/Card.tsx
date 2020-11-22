import Card from '@material-ui/core/Card';
import { push } from 'connected-react-router';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useDispatch} from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Button } from '@material-ui/core';
import { some } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { ROUTES } from '../../../../configs/routes';

interface Props {
  listTicket: some;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MediaCard: React.FunctionComponent<Props> = (props) => {
  const { listTicket } = props;
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  return (
    <>
      {listTicket.map((item: some, index: some) => (
       <Button onClick={
        () =>
          dispatch(
            push({
              pathname: ROUTES.booking.ticketDetail
            }),
          )
      }>
         <Card
          className={classes.root}
          style={{ marginBottom: '10px', marginLeft: '8px', borderRadius: '7px' }}
        >
          <CardActionArea style={{ width: '260px', padding: '8px 8px' }}>
            <CardMedia className={classes.media} image={item.img} style={{ borderRadius: '7px' }} />
            <CardContent>
              <Typography gutterBottom variant="subtitle2" component="h3">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.time}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.category}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
       </Button>
      ))}
    </>
  );
};

export default MediaCard;
