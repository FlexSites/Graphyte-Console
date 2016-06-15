import { createAction } from 'redux-actions';
import { SIGN_IN, SIGN_OUT } from '../constants';
import { push } from 'react-router-redux';

export const signIn = ({ profile, token, returnTo = '/' }) => (dispatch) => {
  localStorage.setItem('profile', JSON.stringify(profile));
  localStorage.setItem('userToken', token);
  dispatch(signInSuccess({ profile, token }));
  dispatch(push(returnTo));
}

export const signOut = () => (dispatch) => {
  localStorage.removeItem('profile');
  localStorage.removeItem('userToken');
  dispatch(signOutSuccess());
  dispatch(push('/'))
}

export const signInSuccess = createAction(SIGN_IN);

export const signOutSuccess = createAction(SIGN_OUT, () => {
  console.log('called signout successJ!!!!!');
  return {};
});
