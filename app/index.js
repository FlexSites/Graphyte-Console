import React from 'react';
import ReactDOM from 'react-dom';
import app from './app.js';
import { set } from 'object-path';
import { getProfile, getIdToken } from './lib/auth0';

window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || {};

set(window.__INITIAL_STATE__, 'auth.profile', getProfile());
set(window.__INITIAL_STATE__, 'auth.token', getIdToken());

ReactDOM.render(app(window.__INITIAL_STATE__), document.getElementById('root'));
