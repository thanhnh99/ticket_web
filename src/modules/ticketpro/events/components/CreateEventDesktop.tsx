import React from 'react';
import { Paper } from '@material-ui/core';
import { Row, PageContainer } from '../../../common/components/elements';
import CreateEventForm from './CreateEventForm';
<<<<<<< HEAD
import BackgroundImage from '../../../../assets/background/create_event_background.jpg'
=======
import back_ground_image from '../../../../assets/background/create_event_background.jpg'
import Footer from '../../../auth/commons/Footer';
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d

interface Props {}
const CreateEventDesktop = (props: Props) => {
  return (
<<<<<<< HEAD
    <PageContainer style={{ backgroundImage:`url(${BackgroundImage})`}}>
=======
    <PageContainer style={{ backgroundImage:`url(${back_ground_image})`}}>
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
      <Row style={{ justifyContent: 'flex-start'}}>
        <Paper
          elevation={4}
          style={{
            display: 'flex',
            overflow: 'hidden',
          }}
        >
            <CreateEventForm/>
        </Paper>
      </Row>
    </PageContainer>
  );
};

export default CreateEventDesktop;
