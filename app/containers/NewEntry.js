import React, { Component } from 'react'

// Connect
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ENTRY_TYPES } from '../constants';
import { pushNotification, fetchEntryList, entrySelect, schemaItemAdd, entryFilter } from '../actions'

// Libs
import uuid from '../lib/uuid'

// Material UI
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import { blue500, yellow600, lightGreen300, white } from 'material-ui/styles/colors'
import { List } from 'material-ui/List';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import EditMenuItem from '../components/EditMenuItem.jsx';

export default class EntryList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    };

    this.handleNewEntryUpdate = this.handleNewEntryUpdate.bind(this);
    this.toggleNewEntryDialog = this.toggleNewEntryDialog.bind(this);

    this.addEntry = this.addEntry.bind(this);
  }

  handleNewEntryUpdate(name) {
    this.setState({
      name,
    });
  }

  addEntry() {
    this.toggleNewEntryDialog();
    this.props.addEntry({ name: this.state.name, type: this.props.filter });
  }

  toggleNewEntryDialog() {
    this.setState({
      open: !this.state.open
    });
  };

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
      <div style={{ alignSelf: 'center' }}>
        <RaisedButton
          onTouchTap={this.toggleNewEntryDialog}
          icon={<ContentAdd />}
          secondary={true}
          style={{ minWidth: '40px', ...this.props.style }} />
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
      </div>
    )
  }
}

EntryList.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

EntryList.propTypes = {
  addEntry: React.PropTypes.func,
  filter: React.PropTypes.string,
  style: React.PropTypes.obj,
};

EntryList.defaultProps = {
  addEntry: () => {},
  filter: 'type',
  style: {},
};


function mapStateToProps(state) {
  return {
    filter: state.schema.filter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addEntry: (entry) => schemaItemAdd({ id: uuid(), ...entry }),
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList)
