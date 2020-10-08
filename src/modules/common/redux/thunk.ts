import { get } from 'js-cookie';
import { sha256 } from 'js-sha256';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { some, TOKEN } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { ACCESS_TOKEN, APP_KEY, APP_ID, VERSION } from '../../auth/constants';
import { setAuthError, setNetworkError } from './reducer';

export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: string | FormData,
  auth = true,
  fallbackResponse?: some, // if given, will not retry at all and return this
  getBlob = false, // if given, response will return blob type instead of json data
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    while (true) {
      const { deviceId } = getState().auth;
      const controller = new AbortController();
      const { signal } = controller;

      const AppHash = Buffer.from(
        sha256(`${new Date().getTime() / 1000 - ((new Date().getTime() / 1000) % 300)}:${APP_KEY}`),
        'hex',
      ).toString('base64');

      setTimeout(() => {
        controller.abort();
      }, 30000);

      let res;
      try {
        let headers;
        if (url.includes('/api/tripi') || url.includes('https://dev-api.tripi.vn')) {
          headers = {
            'Content-Type': 'application/json',
            'Accept-Language': getState().intl.locale.substring(0, 2),
            login_token: `${get(ACCESS_TOKEN)}`,
            deviceInfo: 'Tripi_One',
            deviceId,
          };
        } else {
          headers = {
            'Content-Type': 'application/json',
            'Accept-Language': getState().intl.locale.substring(0, 2),
            // 'login-token': '35025438-8f61-4ea9-8cec-c0367d2b46cf' || `${get(TOKEN)}`,
            'login-token': `${get(ACCESS_TOKEN)}`,
            'user-agent': '',
            appHash: AppHash,
            appId: APP_ID,
            version: VERSION,
            caid: '21',
            'device-info': 'Tripi_One',
            'device-id': deviceId,
          };
        }

        if (body instanceof FormData) {
          delete headers['Content-Type'];
        }

        if (!auth || !get(ACCESS_TOKEN)) {
          delete headers['login-token'];
        }
        res = await fetch(url, {
          method,
          body,
          headers,
          signal,
          cache: 'no-store',
        });
      } catch (_) {}
      if (res !== undefined) {
        if (res.status === 401) {
          dispatch(setAuthError(await res.text()));
          return {};
        }
        if (res.status === 200 && res.ok) {
          return !getBlob ? await res.json() : await res.blob();
        }
        return fallbackResponse;
      }
      if (fallbackResponse) {
        return fallbackResponse;
      }

      let hasInternet = true;
      try {
        await fetch('https://tripi.vn', { mode: 'no-cors' });
      } catch (_) {
        hasInternet = false;
      }
      dispatch(setNetworkError(hasInternet ? 'serverProblem' : 'unstableNetwork', true));
      do {
        await new Promise((resolve) => setTimeout(resolve, 350));
        if (!getState().common.openErrorDialog) {
          break;
        }
      } while (getState().common.networkErrorMsg);
      if (!getState().common.openErrorDialog) {
        break;
      }
      continue;
    }
    return {};
  };
}
