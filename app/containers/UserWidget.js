import React, { Component } from 'react';

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn, signOut } from '../actions';
import { isAuthenticated } from '../reducers/selectors'

// Material UI
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

// Libs
import { get } from 'object-path';


export default class MainNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let avatarProps = {
      src: get(this, 'props.profile.picture'),
      icon: (<Person />),
    };

    return (
      <IconMenu
        iconButtonElement={<IconButton style={{ padding: 0 }}><Avatar {...avatarProps} /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        style={{ margin: '4px' }}
      >
        <MenuItem primaryText="Sign out" onTouchTap={this.props.signOut} />
      </IconMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    isAuthenticated: isAuthenticated(state),
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
