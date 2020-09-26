import { push } from 'connected-react-router';
import { get, remove, set } from 'js-cookie';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ACCESS_TOKEN } from '../../auth/constants';
import { API_PATHS } from '../../../configs/API';
import { some, SUCCESS_CODE } from '../../../constants';
import { AppState, clearStoreAfterLogout } from '../../../redux/reducers';
import { setUserData } from '../../account/redux/accountReducer';
import { fetchThunk } from '../../common/redux/thunk';
import { inAction, out, setValidatingToken, setAuthenticating } from './authReducer';

export interface ILoginData {
  email: string;
  password: string;
}

export const defaultLoginData: ILoginData = {
  email: '0999888777',
  password: '123456',
};
export interface IFirstLoginData {
  username: string;
  password: string;
  confirmPassword: string;
}

export const defaultFirstLoginData: IFirstLoginData = {
  username: '',
  password: '',
  confirmPassword: '',
};
export interface IChangePasswordData {
  password: string;
  confirmPassword: string;
}

export const defaultChangePasswordData: IChangePasswordData = {
  password: '',
  confirmPassword: '',
};
export interface IRegisterData {
  companyName: string;
  companySize: number | null;
  contactPersonName: string;
  email: string;
  phone: string;
  referenceContactPhone: string;
}

export const defaultRegisterData: IRegisterData = {
  companyName: '',
  companySize: null,
  contactPersonName: '',
  phone: '',
  email: '',
  referenceContactPhone: '',
};

export function authIn(
  userData: some,
  skipSaga: boolean = false,
): ThunkAction<void, AppState, null, Action<string>> {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(setUserData(userData));
    if (!state.auth.auth) {
      dispatch(inAction(skipSaga));
    }
  };
}

export function validateAccessToken(
  periodic = false,
): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    let prevAccessToken = get(ACCESS_TOKEN);
    let first = true;
    const fn = async (force = false) => {
      const accessToken = get(ACCESS_TOKEN);
      const state = getState();
      if (accessToken) {
        if (first || prevAccessToken !== accessToken || force) {
          first = false;
          dispatch(setValidatingToken(true));
          try {
            const json = await dispatch(fetchThunk(`${API_PATHS.validateAccessToken}`, 'get'));
            if (json && json.code === SUCCESS_CODE) {
              dispatch(authIn(json.data));
              prevAccessToken = accessToken;
            } else if (getState().auth.auth) {
              dispatch(out());
              remove(ACCESS_TOKEN);
              dispatch(setUserData());
              dispatch(
                push({
                  pathname: '/',
                }),
              );
            }
          } finally {
            dispatch(setValidatingToken(false));
          }
        }
      } else if (state.auth.auth) {
        dispatch(out());
      }
    };
    if (periodic) {
      setInterval(fn, 1000);
    } else {
      fn(true);
    }
  };
}

export function login(
  data: ILoginData,
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(setAuthenticating(true));
    try {
      const json = await dispatch(fetchThunk(API_PATHS.login, 'post', JSON.stringify(data)));
      if (json?.code === SUCCESS_CODE) {
        set(ACCESS_TOKEN, json.data.accessToken);
        dispatch(validateAccessToken());
        return json;
      }
      return json;
    } finally {
      dispatch(setAuthenticating(false));
    }
  };
}

export function logout(): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    remove(ACCESS_TOKEN);
    batch(() => {
      dispatch(out());
      dispatch(clearStoreAfterLogout());
    });
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
}
