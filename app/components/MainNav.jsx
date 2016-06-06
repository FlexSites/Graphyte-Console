import React, { PropTypes, Component } from 'react';

// Material UI
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

// Libs
import { get } from 'object-path';

// Smart Components
import PlatformSelect from '../containers/PlatformSelect';
import UserWidget from '../containers/UserWidget';

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
        <ToolbarGroup>
          <PlatformSelect />
        </ToolbarGroup>
        <ToolbarGroup>
          <UserWidget />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

MainNav.contextTypes = {
  muiTheme:PropTypes.object.isRequired,
};
