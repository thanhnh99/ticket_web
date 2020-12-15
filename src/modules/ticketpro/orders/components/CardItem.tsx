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
import { some } from '../../../../constants';

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

interface Props {
  data?: some;
}

const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const CardItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [listActiveTicket, setListActiveTicket] = React.useState<some | undefined>(undefined)
  const { data } = props;
 
const activeTicket = () => {
    const listTicket = data?.map((booking: some) => 
      { return booking.event.isActive === true }
    ); 
    setListActiveTicket(listTicket)
}

React.useEffect(() => {
    activeTicket()
    console.log(listActiveTicket);
}, []) 
  
  return (
      <>
    
    </>
  );
};

export default CardItem;
