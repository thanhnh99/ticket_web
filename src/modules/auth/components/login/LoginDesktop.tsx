import React from 'react';
import { Paper } from '@material-ui/core';
import { Row, PageContainer } from '../../../common/components/elements';
import LoginForm from './LoginForm';
import Footer from '../Footer';

interface Props {}
const LoginDesktop = (props: Props) => {
  return (
    <PageContainer>
      <Row style={{ justifyContent: 'center' }}>
        <Paper
          elevation={4}
          style={{
            display: 'flex',
          }}
        >
          {/* <Banner contentId="auth.bannerFirstLogin" /> */}
          <LoginForm />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default LoginDesktop;
