import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { lightGreen300, white } from 'material-ui/styles/colors'
import EditMenuItem from './EditMenuItem.jsx';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import MenuItem from 'material-ui/MenuItem';
import { ENTRY_TYPES } from '../constants';
import SelectField from 'material-ui/SelectField';
import { get } from 'object-path';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class SchemaList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredList: [],
      open: false,
    };

    this.onSelect = this.onSelect.bind(this);
    this.handleNewEntryUpdate = this.handleNewEntryUpdate.bind(this);
    this.toggleNewEntryDialog = this.toggleNewEntryDialog.bind(this);

    this.addEntry = this.addEntry.bind(this);
  }

  handleNewEntryUpdate(value) {
    console.log('update value', value);
    this.setState({
      newEntryName: value
    });
  }

  addEntry() {
    console.log('new entry called!');
    this.toggleNewEntryDialog();
    this.props.addEntry({ name: this.state.newEntryName, type: this.props.filter });
  }

  toggleNewEntryDialog() {
    this.setState({
      open: !this.state.open
    });
  };

  onSelect(id) {
    if (!id) return;
    this.setState({
      selected: id,
    });
    this.props.onSelect(id);
  }

  render() {

    const actions = [
      <RaisedButton
        label="Create"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.addEntry}
      />,
    ]

    return (
      <Drawer open={true}>

        <Toolbar style={this.state.styles} >
          <ToolbarGroup>
            <ToolbarTitle text="Graphyte" />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton onTouchTap={this.toggleNewEntryDialog} icon={<ContentAdd />} secondary={true} style={{ minWidth: '40px' }} />
          </ToolbarGroup>
        </Toolbar>
        <div style={{ padding: '0 15px' }}>
          <SelectField value={this.props.filter} onChange={(e, idx, value) => this.props.entryFilter(value)} fullWidth={true} floatingLabelText="Entry Type">
            {ENTRY_TYPES.map((type) => (<MenuItem key={type} value={type.toLowerCase()} primaryText={type} />))}
          </SelectField>
        </div>

        <List>
          {
            this.props.list
              .filter(entry => entry.type === this.props.filter)
              .map((item) => {
                return (
                  <EditMenuItem
                    key={item.id}
                    value={item.name}
                    subText={item.type}
                    onTouchTap={() => this.onSelect(item.id)}
                    onChange={this.props.onEditName}
                    isSelected={this.props.selected === item.id} />
                )
              }
              )
          }
        </List>
          <Dialog
            title="New Entry"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.toggleNewEntryDialog}
            contentStyle={{ maxWidth: '300px' }}
          >
            <TextField floatingLabelText="Name" onChange={(e) => this.handleNewEntryUpdate(e.target.value)} />
          </Dialog>
      </Drawer>
    )
  }
}

SchemaList.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

SchemaList.propTypes = {
  filter: React.PropTypes.string,
  list: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  entryFilter: React.PropTypes.func,
  addEntry: React.PropTypes.func,
  selected: React.PropTypes.string,
};

SchemaList.defaultProps = {
  filter: 'type',
  list: [],
  onSelect: () => {},
  addEntry: () => {console.log('crappy one called')},
  entryFilter: () => {},
};
