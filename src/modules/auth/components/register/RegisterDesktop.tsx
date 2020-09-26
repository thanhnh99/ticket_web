import { Paper } from '@material-ui/core';
import * as React from 'react';
import { PageContainer } from '../../../common/components/elements';
import { IRegisterData } from '../../redux/authThunks';
import Banner from '../Banner';
import Footer from '../Footer';
import RegisterForm from './RegisterForm';

export interface Props {
  loading: boolean;
  onRegister(data: IRegisterData): void;
}

const RegisterDesktop = (props: Props) => {
  const { loading, onRegister } = props;

  return (
    <PageContainer>
      <Paper
        elevation={4}
        style={{
          height: 500,
          display: 'flex',
        }}
      >
        <Banner contentId="account.bannerRegister" />
        <RegisterForm loading={loading} onRegister={onRegister} />
      </Paper>
      <Footer />
    </PageContainer>
  );
};

export default RegisterDesktop;
