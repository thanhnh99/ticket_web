import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row } from '../../../common/components/elements';
import Footer from '../Footer';
import FirstLoginForm from './FirstLoginForm';

const FirstLoginDesktop = () => {
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
          {/* <Banner contentId="auth.bannerFirstLogin" /> */}
          <FirstLoginForm />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default FirstLoginDesktop;
