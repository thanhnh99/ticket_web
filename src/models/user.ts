export interface IUserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  address: string;
}

export const defaultUserInfo: IUserInfo = {
  name: '',
  email: '',
  phoneNumber: '',
  dob: '',
  address: '',
};
