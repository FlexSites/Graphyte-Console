import React, { Component } from 'react'

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEntry, removeEntry, fetchEntryList, persistEntry, pushNotification } from '../actions'
import { push } from 'react-router-redux';

// Libs
import brace from 'brace';
import AceEditor from 'react-ace';
import { parse } from 'graphql/language';
import { get, set } from 'object-path';
import 'brace/mode/java';

// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Definition from 'material-ui/svg-icons/action/description';
import Cloud from 'material-ui/svg-icons/file/cloud';
import FlipToBack from 'material-ui/svg-icons/action/flip-to-back';
import { yellow700, cyan500, white, darkBlack, fullBlack, grey800, grey900, grey100, grey700, grey500, orange500, green500 } from 'material-ui/styles/colors';

// Components
import CodeEditor from '../components/CodeEditor.jsx';
import FloatingMenu from '../containers/FloatingMenu';
import EntryList from '../containers/EntryList';

export class EntryEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: {},
      possibleResolves: [],
      currentTab: 'definition',
    };

    this.persistEntry = this.persistEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.handleDefChange = this.onChange.bind(this, 'definition');
    this.handleResChange = function (key, value){
      this.onChange(`resolve.${this.state.entry.name}.${key}`, value);
    }.bind(this);
    this.handleMockChange = this.onChange.bind(this, 'mock');
  }

  handleTabChange(value) {
    if (this.state.currentTab === 'definition' && value === 'resolver') {
      let possibleResolves = getFields(this.state.entry, this.props.notify);
      if (!possibleResolves.length) return;
      this.setState({
        possibleResolves,
      });
    }
    this.setState({
      currentTab: value,
    });
  }

  onChange(prop, value) {
    let newEntry = JSON.parse(JSON.stringify(this.state.entry));
    set(newEntry, prop, value);
    set(newEntry, 'modified', true);
    this.props.updateEntry(newEntry);
    console.log('on change', newEntry);
    this.setState({
      entry: newEntry,
    })
  }

  removeEntry() {
    this.props.removeEntry(this.state.entry);
  }

  persistEntry() {
    this.props.persistEntry(this.state.entry);
  }

  componentWillMount() {
    this.props.fetchList();
  }

  componentWillReceiveProps(props) {
    this.setState({
      entry: props.entry,
    })
  }

  isActive(tab) {
    let parts = this.props.location.pathname.split('/');
    if (!tab && parts.length !== 4) return true;
    return tab === parts[parts.length - 1];
  }

  render() {
    let resolves = get(this.state.entry, ['resolve', this.state.entry.name], {});
    return (
      <div style={{ display: 'flex' }}>
        <FloatingMenu />
        <EntryList />
        <div style={{ width: '100%' }}>
          <Toolbar style={{ backgroundColor: get(this, 'context.muiTheme.palette.accent1Color') }}>
            <ToolbarGroup firstChild={true}>
              <ToolbarTitle text={this.state.entry.name} style={{ fontWeight: '100', marginLeft: '10px' }} />
            </ToolbarGroup>
            <ToolbarGroup lastChild={true}>
              <div style={{ alignSelf: 'center' }}>
                <FlatButton icon={<Definition />} label="Definition" primary={!this.isActive()} onTouchTap={() => this.props.push(`/edit/${this.state.entry.id}`)}/>
                <FlatButton icon={<Cloud />} label="Resolver" primary={!this.isActive('resolve')} onTouchTap={() => this.props.push(`/edit/${this.state.entry.id}/resolve`)}/>
                <FlatButton icon={<FlipToBack />} label="Mock" primary={!this.isActive('mock')} onTouchTap={() => this.props.push(`/edit/${this.state.entry.id}/mock`)}/>
              </div>
            </ToolbarGroup>
          </Toolbar>
          {this.props.children}
        </div>
      </div>
    )
  }
}

EntryEditor.propTypes = {
  entry: React.PropTypes.object,
  fetchEntry: React.PropTypes.func,
  persistEntry: React.PropTypes.func,
  removeEntry: React.PropTypes.func,
  updateEntry: React.PropTypes.func,
};

EntryEditor.defaultProps = {
  list: {},
  fetchEntry: () => {},
  persistEntry: () => {},
  removeEntry: () => {},
  updateEntry: () => {},
};


function getFields({ definition, name }, notify) {
  if (!definition || !name) return [];
  let doc;
  try { doc = parse(`type ${name} { ${definition} }`); }
  catch(ex) {
    notify({ message: 'Invalid GraphQL' });
    console.error('Invalid GraphQL', ex); return [];
  }
  return get(doc, 'definitions.0.fields', [])
    .map(({ name, type }) => ({ name: name.value, ...getType(type) }));
}

function getType(field, isRequired, isList) {
  let { kind, type, name } = field;
  if (kind === 'NamedType') return { type: name.value, isRequired, isList };
  if (kind === 'ListType') return getType(type, isRequired, true);
  if (kind === 'NonNullType') return getType(type, true, isList);
}

EntryEditor.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    entry: (state.schema.list || []).find(entry => entry.id === state.schema.selected) || {},
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    notify: pushNotification,
    persistEntry: persistEntry,
    removeEntry: removeEntry,
    fetchList: fetchEntryList,
    push,
    updateEntry,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryEditor)
