import { DEV } from '../constants';

enum APIServices {
  account,
  one,
}

function getBaseUrl(service: APIServices) {
  // if (service === APIServices.one) {
  //   return DEV ? '/api/one/' : '';
  // }
  return 'https://tickme.herokuapp.com';
}

export const API_PATHS = {
  // Account
  register: `${getBaseUrl(APIServices.one)}/register`,
  verify: `${getBaseUrl(APIServices.one)}/public/accounts/verify`,
  forgotPassword: (email: string) =>
    `${getBaseUrl(APIServices.one)}/public/accounts/passwords/forgot?email=${email}`,
  resetPassword: `${getBaseUrl(APIServices.one)}/public/accounts/passwords/reset`,
  login: `${getBaseUrl(APIServices.one)}/login`,
  firstLogin: `${getBaseUrl(APIServices.one)}/public/accounts/passwords/first-login`,
  accountBrief: `${getBaseUrl(APIServices.one)}/accounts/brief`,
  getCategory: `${getBaseUrl(APIServices.one)}/category`,
  getEvent: `${getBaseUrl(APIServices.one)}/event`,
  booking: `${getBaseUrl(APIServices.one)}/booking`,
};
