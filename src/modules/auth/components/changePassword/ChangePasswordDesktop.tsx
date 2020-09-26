import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row } from '../../../common/components/elements';
import Banner from '../Banner';
import Footer from '../Footer';
import ChangePasswordForm from './ChangePasswordForm';

interface Props {}
const ChangePasswordDesktop = (props: Props) => {
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
          <Banner contentId="auth.bannerForgotPassword" />
          <ChangePasswordForm />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default ChangePasswordDesktop;
