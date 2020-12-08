import React from 'react';
import { Paper } from '@material-ui/core';
import { Row, PageContainer } from '../../../common/components/elements';
import LoginForm from './LoginForm';
import Banner from '../../commons/Banner';
import Footer from '../../commons/Footer';

interface Props {}
const LoginDesktop = (props: Props) => {
  return (
    <PageContainer>
      <Row style={{ justifyContent: 'center' }}>
        <Paper
          elevation={4}
          style={{
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <Banner contentId="auth.bannerLogin" isLogin />
          <LoginForm />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default LoginDesktop;
