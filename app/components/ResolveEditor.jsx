import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import CodeEditor from './CodeEditor.jsx';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Code from 'material-ui/svg-icons/action/code';
import List from 'material-ui/svg-icons/action/list';
import Report from 'material-ui/svg-icons/content/report';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { red700, yellow600 } from 'material-ui/styles/colors';
import { get } from 'object-path';
import Subheader from 'material-ui/Subheader';
const DEFAULT_COLOR = '#ccc';

class StateIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let color = this.props.active ? this.props.color : DEFAULT_COLOR;

    return (
      <Avatar size={30} icon={this.props.icon} backgroundColor={color} style={{ margin: '0 5px', alignSelf: 'center'}} />
    );
  }
}

export default class ResolveEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    let toolbar = (
      <Toolbar onTouchTap={this.toggle.bind(this)} style={{ cursor: 'pointer', borderBottom: 'solid 1px #000' }}>
        <ToolbarGroup>
          <ToolbarTitle text={this.props.field} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <Subheader style={{ alignSelf: 'center' }}>{this.props.type}</Subheader>
          <ToolbarSeparator style={{ backgroundColor: '#000'}} />
          <StateIcon color={get(this, 'context.muiTheme.palette.accent1Color', DEFAULT_COLOR)} icon={<Code />} active={this.props.value} />
          <StateIcon color={get(this, 'context.muiTheme.palette.alert1Color', DEFAULT_COLOR)} icon={<Report />} active={this.props.isRequired} />
          <StateIcon color={get(this, 'context.muiTheme.palette.secondary1Color', DEFAULT_COLOR)} icon={<List />} active={this.props.isList} />
          <IconButton touch={true}>
            <NavigationExpandMoreIcon />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );

    if (!this.state.open) return toolbar;

    return (
      <div>
        {toolbar}
        <CodeEditor
          value={this.props.value}
          onChange={this.props.onChange}
          height="200px"
        />
      </div>
    )
  }
};

ResolveEditor.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}
