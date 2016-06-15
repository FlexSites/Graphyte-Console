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
import NewEntryButton from './NewEntry';

import EditMenuItem from '../components/EditMenuItem.jsx';

export default class EntryList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredList: [],
      open: false,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  shouldComponentUpdate(props, state) {
    return props.filter !== this.props.filter
      || props.selected !== this.props.selected
      || props.list.length !== this.props.list.length
  }

  componentWillMount() {
    this.props.fetchList();
  }

  onSelect(id) {
    if (!id) return;
    this.setState({
      selected: id,
    });
    this.props.onSelect(id);
  }

  render() {

    let drawerStyle = {
      top: '56px',
      height: 'calc(100% - 56px)',
    };

    return (
      <Drawer open={true} containerStyle={drawerStyle}>
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
        <NewEntryButton style={{ margin: '10px', width: 'calc(100% - 20px)' }} />
      </Drawer>
    )
  }
}

EntryList.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

EntryList.propTypes = {
  filter: React.PropTypes.string,
  list: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  entryFilter: React.PropTypes.func,
  selected: React.PropTypes.string,
  notify: React.PropTypes.func,
};

EntryList.defaultProps = {
  filter: 'type',
  list: [],
  onSelect: () => {},
  entryFilter: () => {},
  notify: () => {},
};


function mapStateToProps(state) {
  return {
    filter: state.schema.filter,
    list: state.schema.list,
    selected: state.schema.selected,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    entryFilter,
    notify: pushNotification,
    onSelect: entrySelect,
    fetchList: fetchEntryList,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList)
