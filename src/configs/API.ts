/* eslint-disable no-unused-vars */
import { DEV } from '../constants';

enum APIServices {
  account,
}

function getBaseUrl(service: APIServices) {
  if (service === APIServices.account) {
    return DEV ? '/api/account/' : 'https://caportal-dev.tripi.vn';
  }
  return null;
}

export const API_PATHS = {
  login: `${getBaseUrl(APIServices.account)}/account/loginV2`,
  validateAccessToken: `${getBaseUrl(APIServices.account)}/account/validateAccessToken`,
  uploadImage: `${getBaseUrl(APIServices.account)}/uploadImage`,
};
