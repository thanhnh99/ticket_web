import { DEV } from '../constants';

enum APIServices {
  account,
  one,
}

function getBaseUrl(service: APIServices) {
  if (service === APIServices.one) {
    return DEV ? '/api/one/' : 'https://gate.dev.tripi.vn/tripione';
  }
  return null;
}

export const API_PATHS = {
  // Account
  register: `${getBaseUrl(APIServices.one)}/public/accounts/register`,
  verify: `${getBaseUrl(APIServices.one)}/public/accounts/verify`,
  forgotPassword: (email: string) =>
    `${getBaseUrl(APIServices.one)}/public/accounts/passwords/forgot?email=${email}`,
  resetPassword: `${getBaseUrl(APIServices.one)}/public/accounts/passwords/reset`,
  login: `${getBaseUrl(APIServices.one)}/public/accounts/login`,
  firstLogin: `${getBaseUrl(APIServices.one)}/public/accounts/passwords/first-login`,
  accountBrief: `${getBaseUrl(APIServices.one)}/accounts/brief`,
};
