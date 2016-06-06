import React, { PropTypes, Component } from 'react';

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn, signOut } from '../actions';

// Material UI
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

// Libs
import { getProfile, getIdToken } from '../lib/auth0';
import { get } from 'object-path';


export default class MainNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profile: getProfile(),
      isLoggedIn: !!getIdToken(),
    }
  }

  render() {
    let signIn = (<FlatButton label="Sign In" secondary={true} onTouchTap={this.props.signIn} />)
    let signOut = (<FlatButton label="Sign Out" secondary={true} onTouchTap={this.props.signOut} />)

    let avatarProps = {
      src: get(this, 'state.profile.picture'),
      style: { marginLeft: '10px', alignSelf: 'center' },
      icon: (<Person />)
    };

    return (
      <div style={{ alignSelf: 'center', display: 'flex' }}>
        { this.state.isLoggedIn ? signOut : signIn }
        <Avatar {...avatarProps} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn,
    signOut,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav)
