import { Paper } from '@material-ui/core';
import * as React from 'react';
import { PageContainer } from '../../../common/components/elements';
import { IRegisterData } from '../../redux/authThunks';
import RegisterForm from './RegisterForm';
import Banner from '../../commons/Banner';
import Footer from '../../commons/Footer';

export interface Props {
  loading: boolean;
  onRegister: (data: IRegisterData) => void;
  dialogContent: string;
}

const RegisterDesktop = (props: Props) => {
  const { loading, onRegister, dialogContent } = props;

  return (
    <PageContainer>
      <Paper
        elevation={4}
        style={{
          display: 'flex',
          minWidth: 958,
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <Banner contentId="account.bannerRegister" />
        <RegisterForm loading={loading} onRegister={onRegister} dialogContent={dialogContent} />
      </Paper>
      <Footer />
    </PageContainer>
  );
};

export default RegisterDesktop;
