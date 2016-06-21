/* global Auth0Lock:false */

import { AUTH_TOKEN, AUTH_HOST } from '../constants';

const Lock = new Auth0Lock(AUTH_TOKEN, AUTH_HOST);

export default Lock;

export function getProfile() {
  try {
    return JSON.parse(localStorage.getItem('profile'));
  } catch (ex) { console.error('Cannot retrieve profile', ex) }
  return {};
}

export function isAuthenticated() {
  return getIdToken() !== null;
}

export const authenticated = (...args) => {
  if (args.length === 3) args.unshift({});
  let [ , nextState, replace ] = args;
  let isAuth = isAuthenticated();
  let nextIsLogin = nextState.location.pathname === '/login';
  if (!isAuth && !nextIsLogin) {
    console.log('redirect to login', isAuth, nextIsLogin);
    replace({
      pathname: '/login',
      state: { returnTo: nextIsLogin ? '/' : nextState.location.pathname },
    });
  } else if (isAuth && nextIsLogin) {
    console.log('redirect to root', isAuth, nextIsLogin)
    replace({
      pathname: '/',
      state: {},
    });
  }
}

export function showLogin(options = {}, cb) {
  return Lock.show({
    closable: false,
    ...options,
  }, cb);
}

export function getIdToken() {
  try {
    var idToken = localStorage.getItem('userToken');
    var authHash = Lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.error('auth error');
        return null;
      }
    }
    if (!idToken) {
      console.warn('[Auth] No token.');
      return null;
    }
    if (!isTokenValid(idToken)) {
      console.warn('[Auth] JWT Expired.');
      return null;
    }
    return idToken;
  } catch (ex) { return null }
}

export function isTokenValid(token) {
  try {
    if (Date.now() <= parseInt(JSON.parse(atob(token.split('.')[1])).exp) * 1000) {
      return true;
    }
  } catch (ex) { console.error('Cannot parse token', ex); }

  console.warn('[Auth] JWT Expired.');
  return false;
}
