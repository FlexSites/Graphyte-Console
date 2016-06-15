import React, { PropTypes, Component } from 'react';

// Material UI
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';

// Libs
import { get } from 'object-path';

// Smart Components
import PlatformSelect from '../containers/PlatformSelect';
import UserWidget from '../containers/UserWidget';
import Logo from '../static/logo.svg';

export default class MainNav extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getBackgroundColor();
  }

  getBackgroundColor() {
    this.setState({
      styles: {
        backgroundColor: get(this, 'context.muiTheme.palette.primary1Color', '#f00'),
      }
    })
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconButton>
            <img src={Logo} width="24" height="24" />
          </IconButton>
          <ToolbarTitle text="Graphyte" />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <PlatformSelect />
          <UserWidget />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

MainNav.contextTypes = {
  muiTheme:PropTypes.object.isRequired,
};
