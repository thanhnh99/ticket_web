import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { some } from '../../../../constants';
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
  return (
    <>
      {listTicket.map((item: some, index: number) => (
        <Link key={index} to={`${ROUTES.booking.ticketDetail}/${item.id}`} style={{textDecoration: 'none'}}>
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
        </Link>
      ))}
    </>
  );
};

export default MediaCard;
