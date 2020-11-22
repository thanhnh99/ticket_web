import React from 'react';
import { Paper } from '@material-ui/core';
import { Row, PageContainer } from '../../../common/components/elements';
import CreateEventForm from './CreateEventForm';
import BackgroundImage from '../../../../assets/background/create_event_background.jpg'

interface Props {}
const CreateEventDesktop = (props: Props) => {
  return (
    <PageContainer style={{ backgroundImage:`url(${BackgroundImage})`}}>
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
