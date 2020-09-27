import { push, replace } from 'connected-react-router';
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
import { ROUTES } from '../../../configs/routes';
import { goToAction, goBackAction } from '../../common/redux/reducer';

export interface ILoginForm {
  userName: string;
  password: string;
}

export const defaultLoginForm: ILoginForm = {
  userName: 'lastromeo1996bn@gmail.com',
  password: '123456',
};
export interface IFirstLoginForm {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const defaultFirstLoginForm: IFirstLoginForm = {
  password: '',
  newPassword: '',
  confirmNewPassword: '',
};
export interface IChangePasswordForm {
  password: string;
  confirmPassword: string;
}

export const defaultChangePasswordForm: IChangePasswordForm = {
  password: '',
  confirmPassword: '',
};

export interface IResetPasswordData {
  password: string;
  confirmPassword: string;
}

export const defaultResetPasswordData: IChangePasswordForm = {
  password: '',
  confirmPassword: '',
};
export interface IRegisterData {
  name: string;
  companySizeRange: some | null;
  representative: string;
  email: string;
  referrerPhone: string;
  representativePhone: string;
  password: string;
  confirmPassword: string;
  address: string;
  taxCode: string;
}

export const defaultRegisterData: IRegisterData = {
  name: '',
  companySizeRange: null,
  representative: '',
  referrerPhone: '',
  email: '',
  representativePhone: '',
  password: '',
  confirmPassword: '',
  address: '',
  taxCode: '',
};

export interface IForgotPass {
  email: string;
}

export const defaultForgotPass: IForgotPass = {
  email: '',
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
            const json = await dispatch(fetchThunk(`${API_PATHS.accountBrief}`, 'get'));
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
  data: ILoginForm,
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(setAuthenticating(true));
    try {
      const json = await dispatch(fetchThunk(API_PATHS.login, 'post', JSON.stringify(data), false));
      if (json?.code === SUCCESS_CODE) {
        json.data.accessToken && set(ACCESS_TOKEN, json.data.accessToken);
        if (json.data.firstLogin) {
          dispatch(
            goToAction({
              pathname: ROUTES.firstLogin,
            }),
          );
        } else {
          dispatch(validateAccessToken());
        }
      }
      return json;
    } finally {
      dispatch(setAuthenticating(false));
    }
  };
}

export function firstLogin(
  data: IFirstLoginForm,
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(setAuthenticating(true));
    try {
      const json = await dispatch(
        fetchThunk(
          API_PATHS.firstLogin,
          'put',
          JSON.stringify({
            oldPassword: data.password,
            newPassword: data.newPassword,
          }),
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        remove(ACCESS_TOKEN);
        dispatch(goBackAction());
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
