/* eslint-disable no-unused-vars */
import { ActionType, createAction, getType } from 'typesafe-actions';
import { some } from '../../../constants';

export interface AccountState {
  readonly userData?: string;
}

export const setUserData = createAction('account/setUserData', (data?: some) => ({ data }))();

export const DEFAULT_ACCOUNT_STATE = {};
const actions = {
  setUserData,
};

type ActionT = ActionType<typeof actions>;

export default function reducer(
  state: AccountState = DEFAULT_ACCOUNT_STATE,
  action: ActionT,
): AccountState {
  switch (action.type) {
    case getType(setUserData):
      return { ...state, userData: action.payload.data };
    default:
      return state;
  }
}
