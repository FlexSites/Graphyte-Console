import React, { PropTypes, Component } from 'react';

// Material UI
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

// Libs
import { get } from 'object-path';

// Smart Components
import NavigationMenu from '../containers/Navigation';
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
            <img src={Logo} width="32" height="34" />
          </IconButton>
          <ToolbarTitle text="Graphyte" style={{ fontWeight: '100', marginLeft: '5px' }} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <NavigationMenu />
          <UserWidget />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

MainNav.contextTypes = {
  muiTheme:PropTypes.object.isRequired,
};
