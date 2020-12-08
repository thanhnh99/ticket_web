import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row } from '../../../common/components/elements';
import Banner from '../../commons/Banner';
import Footer from '../../commons/Footer';
import { IForgotPass } from '../../redux/authThunks';
import ForgotPasswordForm from './ForgotPasswordForm';

interface Props {
  loading: boolean;
  note: string;
  onVerify: (data: IForgotPass) => void;
}
const ForgotPasswordDesktop = (props: Props) => {
  const { loading, onVerify, note } = props;
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
          <ForgotPasswordForm loading={loading} onVerify={onVerify} note={note} />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default ForgotPasswordDesktop;
