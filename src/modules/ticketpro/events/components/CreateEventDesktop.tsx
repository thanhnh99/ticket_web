import React from 'react';
import { PageContainer } from '../../../common/components/elements';
import CreateEventForm from './CreateEventForm';

import BackgroundImage from '../../../../assets/background/create_event_background.jpg'

interface Props { }

const CreateEventDesktop = (props: Props) => {
  return (

    <PageContainer style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <CreateEventForm />
    </PageContainer>
  );
};

export default CreateEventDesktop;
