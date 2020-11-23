import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import CreateEventDesktop from '../components/CreateEventDesktop';

interface Props {}
const CreateEvent = (props: Props) => {
  const intl = useIntl();
    return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({ id: 'Create event' })}</title>
      </Helmet>
      <CreateEventDesktop />;
    </div>
  );
};

export default CreateEvent;
