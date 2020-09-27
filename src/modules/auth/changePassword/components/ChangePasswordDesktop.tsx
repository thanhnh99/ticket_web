import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row } from '../../../common/components/elements';
import ChangePasswordForm from './ChangePasswordForm';
import Banner from '../../commons/Banner';
import Footer from '../../commons/Footer';

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
          <Banner contentId="auth.bannerChangePassword" />
          <ChangePasswordForm />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default ChangePasswordDesktop;
