/* global firebase:false firebaseui:false */

import React, { Component } from 'react';

// Libs
import { get } from 'object-path';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Material UI
import SvgIcon from 'material-ui/SvgIcon';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import { showLogin } from '../lib/auth0';
import { push } from 'react-router-redux';
import { signIn } from '../actions/auth';

// var config = {
//   apiKey: "AIzaSyAVB9JacannbGEhE5jqzBOmCqr9oOx-7K4",
//   authDomain: "project-7877601521875513749.firebaseapp.com",
//   databaseURL: "https://project-7877601521875513749.firebaseio.com",
//   storageBucket: "project-7877601521875513749.appspot.com",
// };
// var app = firebase.initializeApp(config);

// export const authenticated = (nextState, replace) => {
//   console.log('user!!!', firebase.User());
//   if (!firebase.User()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }
// var uiConfig = {
//   'signInSuccessUrl': '/',
//   'signInOptions': [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Terms of service url.
//   'tosUrl': '<your-tos-url>',
// };

// // Initialize the FirebaseUI Widget using Firebase.
// var auth = app.auth();
// var ui = new firebaseui.auth.AuthUI(auth);
// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);

// var provider = new firebase.auth.GoogleAuthProvider();

// firebase.auth().onAuthStateChanged((nextOrObserver, opt_error, opt_completed) => {
//   console.log('auth changed', nextOrObserver, opt_error, opt_completed);
// })

// firebase
//   .auth()
//   .signInWithPopup(provider)
//   .then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;

//     console.log('crazy stuff', token, user);
//     // ...
//   })
//   .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;

//     console.log('bad things happened', errorCode, errorMessage, email, credential);
//     // ...
//   });

let providers = [
  'Google',
  'Facebook',
  'Twitter',
  'Github',
];

let buttons = providers.map((provider) => {
  let icon = (<img src={`https://www.gstatic.com/firebasejs/staging/3.0.0/auth/images/${provider.toLowerCase()}.svg`} width="24" height="24" />)
  return (<ListItem key={provider} primaryText={`Sign in with ${provider}`} leftIcon={icon} />)
})


export default class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    showLogin({
      container: 'login-box'
    }, (err, profile, token) => {
      if (!err) this.props.signIn({ profile, token });
    })
  }

  render() {

    let boxStyle = {
      margin: '15px auto',
      width: '300px',
    };

    return (
      <div id="login-box" style={boxStyle}></div>
    );
  }
}

LoginForm.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

function mapStateToProps({ auth: { profile, token } }) {
  return {
    profile,
    token,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
