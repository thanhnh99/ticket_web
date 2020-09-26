import { go, push } from 'connected-react-router';
import { LocationDescriptorObject } from 'history';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { ROUTES_ALL } from '../../../configs/routes';
import { some } from '../../../constants';
import { comparePathName, getCurrentRole, getListRoutesContain } from '../../../layout/utils';
import { SelectItem } from '../../../models/object';
import { Role } from '../../../models/permission';
import { AppState } from '../../../redux/reducers';

export interface CommonState {
  networkErrorMsg: string;
  errorMessage: string;
  authErrorMsg: string;
  openErrorDialog: boolean;
}

export const setOpenErrorDialog = createAction('common/setOpenErrorDialog', (val: boolean) => ({
  val,
}))();
export const setNetworkError = createAction(
  'common/setNetworkError',
  (val: string, open: boolean) => ({ val, open }),
)();

export const setAuthError = createAction('common/setAuthError', (val: string) => ({ val }))();
export const setErrorMessage = createAction('common/setErrorMessage', (val: string) => ({ val }))();

export function isHasPermission(
  permission?: Role[] | string,
): ThunkAction<boolean, AppState, null, Action<string>> {
  return (dispatch, getState) => {
    const state = getState();
    const { account } = state;
    return getCurrentRole(permission, account.userData?.roleGroup?.role);
  };
}

export function goBackAction(
  step: number = 1,
): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const state = getState();
    const { router } = state;
    const listRoutes = getListRoutesContain(ROUTES_ALL, router.location.pathname).reverse();

    let backAble = false;
    if (listRoutes[step] && router?.location?.state) {
      Object.entries(router?.location?.state).forEach((v) => {
        if (comparePathName(v[0], listRoutes[1].path)) {
          backAble = (router?.location?.state as some)[`${v[0]}`];
        }
      });
    }

    if (backAble) {
      dispatch(go(-step));
    } else if (listRoutes.length > 1) {
      dispatch(push({ pathname: listRoutes[1]?.path, state: router.location.state }));
    } else if (
      router?.location?.state &&
      Object.entries(router?.location?.state as SelectItem).length > 0
    ) {
      dispatch(go(-step));
    } else {
      dispatch(push({ pathname: '/', state: router.location.state }));
    }
  };
}

export function goToAction(
  location: LocationDescriptorObject,
): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const state = getState();
    const { router } = state;
    dispatch(
      push({
        ...location,
        state: {
          ...router.location.state,
          [`${router.location.pathname}`]: true,
          ...location.state,
        },
      }),
    );
  };
}

const actions = {
  setOpenErrorDialog,
  setNetworkError,
  setErrorMessage,
  setAuthError,
};

type ActionT = ActionType<typeof actions>;

export default function reducer(
  state: CommonState = {
    openErrorDialog: false,
    networkErrorMsg: '',
    errorMessage: '',
    authErrorMsg: '',
  },
  action: ActionT,
): CommonState {
  switch (action.type) {
    case getType(setOpenErrorDialog):
      return { ...state, openErrorDialog: action.payload.val };
    case getType(setErrorMessage):
      return { ...state, errorMessage: action.payload.val };
    case getType(setNetworkError):
      return {
        ...state,
        networkErrorMsg: action.payload.val,
        openErrorDialog: action.payload.open,
      };
    case getType(setAuthError):
      return { ...state, authErrorMsg: action.payload.val };
    default:
      return state;
  }
}
