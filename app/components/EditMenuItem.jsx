import React, { Component } from 'react';
import { lightGreen300, white } from 'material-ui/styles/colors'
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Memory from 'material-ui/svg-icons/hardware/memory';
import HardwareDeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';
import Blur from 'material-ui/svg-icons/image/blur-on';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600, orange500, lightGreenA700} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import {fade} from 'material-ui/utils/colorManipulator';
import { get } from 'object-path';
import muiThemeable from 'material-ui/styles/muiThemeable';

const DEFAULT_COLOR = '#ccc';

export default class EditMenuItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
    };
  }

  componentWillMount() {
    this.getIcon(this.props.subText);

    this.setState({
      style: {
        backgroundColor: this.props.isSelected ? this.backgroundColor : null
      }
    });
  }


  getIcon(type) {
    let icon = (<Memory />);
    let color = get(this, 'context.muiTheme.palette.accent1Color', DEFAULT_COLOR);

    if (type === 'schema') {
      icon = (<HardwareDeveloperBoard />)
      color = get(this, 'context.muiTheme.palette.primary2Color', DEFAULT_COLOR);
    } else if (type === 'scalar') {
      icon = (<Blur />)
      color = get(this, 'context.muiTheme.palette.primary3Color', DEFAULT_COLOR);
    }

    this.backgroundColor = fade(color, 0.2)
    this.icon = (<Avatar icon={icon} backgroundColor={color} />);
  }

  componentWillReceiveProps(props) {

    this.getIcon(props.subText);
    this.setState({
      style: {
        backgroundColor: props.isSelected ? this.backgroundColor : null
      }
    });
  }

  render() {
    let textNode = (<span style={{ fontWeight: 'bold', fontSize: '11px' }}>{this.props.subText.toUpperCase()}</span>);

    let props = {
      primaryText: this.props.value,
      secondaryText: textNode,
      onTouchTap: this.props.onTouchTap,
      style: this.state.style,
      leftAvatar: this.icon,
    };

    if (this.props.modified) props.rightIcon = (<ActionInfo style={{ fill: get(this, 'context.muiTheme.palette.alert1Color') }} />);

    return (
      <ListItem
        {...props}
      />
    )
  }
}

EditMenuItem.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

EditMenuItem.propTypes = {
  value: React.PropTypes.string,
  onTouchTap: React.PropTypes.func,
  isSelected: React.PropTypes.bool,
  style: React.PropTypes.object,
};

EditMenuItem.defaultProps = {
  value: '',
  onTouchTap: () => {},
  isSelected: false,
  style: {},
};
