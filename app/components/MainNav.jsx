import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import { getProfile, getIdToken } from '../lib/auth0';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      profile: getProfile(),
      isLoggedIn: !!getIdToken(),
      platform: 'flexsites',
    }
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <SelectField
            value={this.state.platform}
            style={{alignSelf: 'center'}}
            onChange={() => {}}>
            <MenuItem value={'flexsites'} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </SelectField>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label={`Sign ${this.state.isLoggedIn ? 'Out' : 'In'}`} secondary={true} onTouchTap={this.props.login} />
          <Avatar
            src={get(this, 'state.profile.picture')}
            style={{alignSelf: 'center'}}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

