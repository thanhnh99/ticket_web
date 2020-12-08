import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row } from '../../../common/components/elements';
import ResetPasswordForm from './ResetPasswordForm';
import { IResetPasswordData } from '../../redux/authThunks';
import Banner from '../../commons/Banner';
import Footer from '../../commons/Footer';

interface Props {
  onVerify: (data: IResetPasswordData) => void;
  loading: boolean;
}

const ResetPasswordDesktop = (props: Props) => {
  const { onVerify, loading } = props;
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
          <ResetPasswordForm onVerify={onVerify} loading={loading} />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default ResetPasswordDesktop;
