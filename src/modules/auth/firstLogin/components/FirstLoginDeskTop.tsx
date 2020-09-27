import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row } from '../../../common/components/elements';
import Banner from '../../commons/Banner';
import Footer from '../../commons/Footer';
import FirstLoginForm from './FirstLoginForm';

interface Props {}
const FirstLoginDesktop = (props: Props) => {
  return (
    <PageContainer>
      <Row
        style={{
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={4}
          style={{
            display: 'flex',
          }}
        >
          <Banner contentId="auth.bannerFirstLogin" />
          <FirstLoginForm />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default FirstLoginDesktop;
