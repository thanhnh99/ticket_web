import { createAction, ActionType, getType } from 'typesafe-actions';
import moment from 'moment';

export interface IntlState {
  readonly locale: string;
}

const setLocaleAction = createAction('setLocale', (locale: string) => ({
  locale,
}))();

export const setLocale = (locale: string) => {
  moment.locale(locale);
  return setLocaleAction(locale);
};

const actions = { setLocale };

type Action = ActionType<typeof actions>;

export default function reducer(state: IntlState = { locale: 'vi' }, action: Action) {
  switch (action.type) {
    case getType(setLocaleAction):
      return { ...state, locale: action.payload.locale };
    default:
      return state;
  }
}
