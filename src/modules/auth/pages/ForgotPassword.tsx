import React from 'react';
import ForgotPasswordDesktop from '../components/forgotPassword/ForgotPasswordDesktop';

export interface IForgotPass {
  caCode: string;
  username: string;
}

export interface IVerifyPassword {
  otp: string;
  password: string;
  confirmPassword: string;
}

export const defaultForgotPass: IForgotPass = {
  caCode: '',
  username: '',
};

export const defaultVerifyPass: IVerifyPassword = {
  otp: '',
  password: '',
  confirmPassword: '',
};

export type ForgotStep = 'otp' | 'changePass';
interface Props {}
const Login = (props: Props) => {
  return <ForgotPasswordDesktop />;
};

export default Login;
