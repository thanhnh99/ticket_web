import { Paper } from '@material-ui/core';
import React from 'react';
import { Row, PageContainer } from '../../../common/components/elements';
import Footer from '../Footer';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordDesktop = () => {
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
          <ForgotPasswordForm />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default ForgotPasswordDesktop;
