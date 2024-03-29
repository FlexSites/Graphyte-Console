import { render } from 'react-dom';
import app from './app';
import { getProfile, getIdToken } from './lib/auth0';
import { set } from 'object-path';


// let token = localStorage.getItem('userToken')
// console.log(token)
// if (token) {
//   try {
//     if (Date.now() > parseInt(JSON.parse(atob(token.split('.')[1])).exp) * 1000) {
//       throw new Error('Unauthorized');
//     }
//     console.log(window.__INITIAL_STATE__);
//     window.__INITIAL_STATE__.idToken = token;
//     console.log(window.__INITIAL_STATE__);
//   } catch(ex) {
//     localStorage.removeItem('userToken')
//   }
// }

window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || {};

set(window.__INITIAL_STATE__, 'auth.profile', getProfile());
set(window.__INITIAL_STATE__, 'auth.token', getIdToken());

render(
  app(window.__INITIAL_STATE__),
  document.getElementById('mount')
)

