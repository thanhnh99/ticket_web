import { go, push, replace } from 'connected-react-router';
import { LocationDescriptorObject } from 'history';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/API';
import { ROUTES_TAB } from '../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../constants';
import { comparePathName, getCurrentRole, getListRoutesContain } from '../../../layout/utils';
import { SelectItem } from '../../../models/object';
import { AppState } from '../../../redux/reducers';
import {
  approvalStatusOptions,
  fakeInvoiceStatus,
  generalCompanySize,
  paymentStatusOptions,
  roleOptions,
  transactionsStatusData,
  transactionsTypeData,
  tripApprovalStatusOptions,
} from './constants';
import { fetchThunk } from './thunk';

export interface CommonState {
  networkErrorMsg: string;
  errorMessage: string;
  authErrorMsg: string;
  openErrorDialog: boolean;
  generalCompanySize: some[];
  invoiceStatus: SelectItem[];
  transactionsTypeData: SelectItem[];
  transactionsStatusData: SelectItem[];
  departmentOptions: SelectItem[];
  positionOptions: SelectItem[];
  roleOptions: some[];
  approvalStatusOptions: SelectItem[];
  tripApprovalStatusOptions: SelectItem[];
  paymentStatusOptions: SelectItem[];
  generalFlight: { OTAs?: some[]; agencies?: some[]; airlines: some[]; ticketclass: some[] };
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
export const setGeneralCompanySize = createAction(
  'common/setGeneralCompanySize',
  (val: some[]) => ({
    val,
  }),
)();
export const setInvoicesStatus = createAction('common/setInvoicesStatus', (val: SelectItem[]) => ({
  val,
}))();

export const setTransactionsTypeData = createAction(
  'common/setTransactionsTypeData',
  (val: SelectItem[]) => ({ val }),
)();

export const setTransactionsStatusData = createAction(
  'common/setTransactionsStatusData',
  (val: SelectItem[]) => ({ val }),
)();
export const setDepartmentOptions = createAction(
  'common/setDepartmentOptions',
  (val: SelectItem[]) => ({
    val,
  }),
)();
export const setPositionOptions = createAction(
  'common/setPositionOptions',
  (val: SelectItem[]) => ({
    val,
  }),
)();
export const setApprovalStatusOptions = createAction(
  'common/setApprovalStatusOptions',
  (val: SelectItem[]) => ({
    val,
  }),
)();
export const setTripApprovalStatusOptions = createAction(
  'common/setTripApprovalStatusOptions',
  (val: SelectItem[]) => ({
    val,
  }),
)();
export const setPaymentStatusOptions = createAction(
  'common/setPaymentStatusOptions',
  (val: SelectItem[]) => ({
    val,
  }),
)();
export const setRoleOptions = createAction('common/setRoleOptions', (val: some[]) => ({
  val,
}))();
export const setGeneralFlight = createAction(
  'common/setGeneralFlight',
  (val: { OTAs: some[]; agencies: some[]; airlines: some[]; ticketclass: some[] }) => ({
    val,
  }),
)();

export function isHasPermission(
  permission?: string[] | string,
): ThunkAction<boolean, AppState, null, Action<string>> {
  return (dispatch, getState) => {
    const state = getState();
    const { account } = state;
    return getCurrentRole(account.userData?.roleInfo?.permissions);
  };
}
export function goBackAction(
  step: number = 1,
): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const state = getState();
    const { router } = state;
    const listRoutes = getListRoutesContain([...ROUTES_TAB], router.location.pathname).reverse();
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

export function goToReplace(
  location: LocationDescriptorObject,
): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const state = getState();
    const { router } = state;
    dispatch(
      replace({
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
  setGeneralCompanySize,
  setInvoicesStatus,
  setTransactionsTypeData,
  setDepartmentOptions,
  setPositionOptions,
  setRoleOptions,
  setGeneralFlight,
  setApprovalStatusOptions,
  setTripApprovalStatusOptions,
  setPaymentStatusOptions,
};

type ActionT = ActionType<typeof actions>;

export default function reducer(
  state: CommonState = {
    openErrorDialog: false,
    networkErrorMsg: '',
    errorMessage: '',
    authErrorMsg: '',
    generalCompanySize,
    invoiceStatus: fakeInvoiceStatus,
    transactionsTypeData,
    transactionsStatusData,
    departmentOptions: [],
    positionOptions: [],
    roleOptions,
    approvalStatusOptions,
    tripApprovalStatusOptions,
    paymentStatusOptions,
    generalFlight: { airlines: [], ticketclass: [], OTAs: [], agencies: [] },
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
    case getType(setGeneralCompanySize):
      return { ...state, generalCompanySize: action.payload.val };
    case getType(setInvoicesStatus):
      return { ...state, invoiceStatus: action.payload.val };
    case getType(setTransactionsTypeData):
      return { ...state, transactionsTypeData: action.payload.val };
    case getType(setDepartmentOptions):
      return { ...state, departmentOptions: action.payload.val };
    case getType(setPositionOptions):
      return { ...state, positionOptions: action.payload.val };
    case getType(setRoleOptions):
      return { ...state, roleOptions: action.payload.val };
    case getType(setGeneralFlight):
      return { ...state, generalFlight: action.payload.val };
    case getType(setApprovalStatusOptions):
      return { ...state, approvalStatusOptions: action.payload.val };
    case getType(setTripApprovalStatusOptions):
      return { ...state, tripApprovalStatusOptions: action.payload.val };
    case getType(setPaymentStatusOptions):
      return { ...state, paymentStatusOptions: action.payload.val };
    default:
      return state;
  }
}
