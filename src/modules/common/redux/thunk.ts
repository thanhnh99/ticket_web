import { get } from 'js-cookie';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { some, CA_ID } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { ACCESS_TOKEN } from '../../auth/constants';
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
      const controller = new AbortController();
      const { signal } = controller;
      setTimeout(() => {
        controller.abort();
      }, 30000);

      let res;
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Accept-Language': getState().intl.locale.substring(0, 2),
          login_token: `${get(ACCESS_TOKEN)}`,
          deviceInfo: 'MyTour-flight-web',
          caId: `${CA_ID}`,
        };

        if (body instanceof FormData) {
          delete headers['Content-Type'];
        }
        if (!auth || !get(ACCESS_TOKEN)) {
          delete headers.login_token;
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
          return null;
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
    return null;
  };
}
