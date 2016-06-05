import { signIn } from '../actions';
import { AUTH_TOKEN, AUTH_HOST } from '../constants';

const Lock = new Auth0Lock(AUTH_TOKEN, AUTH_HOST);

export default Lock;

export function getProfile() {
  try { return JSON.parse(localStorage.getItem('profile')); }
  catch(ex) {}
  return {};
}

export function showLogin() {
  return Lock.show({
    closable: false,
  }, (err, profile, token) => {
    if (err) console.error(err);
    localStorage.profile = JSON.stringify(profile);
    localStorage.userToken = token;
  })
}

export function getIdToken() {
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
    console.log('[Auth] No token.');
    return null;
  }
  if (Date.now() > parseInt(JSON.parse(atob(idToken.split('.')[1])).exp) * 1000) {
    console.log('[Auth] JWT Expired.');
    return null;
  }
  return idToken;
}
