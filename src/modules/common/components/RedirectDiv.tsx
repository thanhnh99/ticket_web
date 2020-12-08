import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducers';
import { goBackAction } from '../redux/reducer';

interface Props {}
const RedirectDiv: React.FC<Props> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  React.useEffect(() => {
    dispatch(goBackAction());
  });
  return null;
};
export default RedirectDiv;
