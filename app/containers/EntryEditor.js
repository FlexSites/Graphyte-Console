import React, { Component } from 'react'

// Connect
import { connect } from 'react-redux'
import { fetchSchemaEntry, saveEntry } from '../actions'

// Libs
import brace from 'brace';
import AceEditor from 'react-ace';
import { parse } from 'graphql/language';
import { get, set } from 'object-path';
import 'brace/mode/java';

// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Save from 'material-ui/svg-icons/content/save';
import Copy from 'material-ui/svg-icons/content/content-copy';
import { yellow700, cyan500, white, darkBlack, fullBlack, grey800, grey900, grey100, grey700, grey500, orange500, green500 } from 'material-ui/styles/colors';

// Components
import CodeEditor from '../components/CodeEditor.jsx';
import ResolveEditor from '../components/ResolveEditor.jsx';

export class EntryEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: {},
      possibleResolves: [],
      currentTab: 'definition',
    };

    this.saveEntry = this.saveEntry.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.handleDefChange = this.onChange.bind(this, 'definition');
    this.handleResChange = function (key, value){
      this.onChange(`resolve.${this.state.entry.name}.${key}`, value);
    }.bind(this);
    this.handleMockChange = this.onChange.bind(this, 'mock');
  }

  handleTabChange(value) {
    if (this.state.currentTab === 'definition' && value === 'resolver') {
      let possibleResolves = getFields(this.state.entry);
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
    set(this.state.entry, prop, value);
    this.setState({
      entry: this.state.entry,
    })
  }

  saveEntry() {
    this.props.saveEntry(this.state.entry);
  }

  componentWillReceiveProps(props) {
    this.setState({
      entry: props.entry,
    })
  }

  render() {
    let resolves = get(this.state.entry, ['resolve', this.state.entry.name], {});
    return (
      <div>
        <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
          <Tab label="Definition" value="definition">
            <CodeEditor mode="java" onChange={this.handleDefChange} value={this.state.entry.definition} height="1000px" />
          </Tab>
          <Tab label="Resolver" value="resolver">
            {(this.state.possibleResolves).map(({ name, type, isRequired, isList }, idx) => {
              return (
                <ResolveEditor
                  key={idx}
                  onChange={(val) => this.handleResChange(name, val)}
                  field={name}
                  type={type}
                  value={resolves[name]}
                  isRequired={isRequired}
                  isList={isList} />
              );
            })}
          </Tab>
          <Tab label="Mock" value="mock">
            <h1>TODO: Add mock UI</h1>
          </Tab>
        </Tabs>

        <FloatingActionButton
          secondary={true}
          onTouchTap={this.saveEntry}
          mini={true}
          iconStyle={{ fill: darkBlack }}
          style={{ position: 'fixed', bottom: '90px', right: '28px' }}>
          <Copy />
        </FloatingActionButton>

        <FloatingActionButton
          secondary={true}
          onTouchTap={this.saveEntry}
          iconStyle={{ fill: darkBlack }}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Save />
        </FloatingActionButton>
      </div>
    )
  }
}

EntryEditor.propTypes = {
  entry: React.PropTypes.object,
  fetchEntry: React.PropTypes.func,
  saveEntry: React.PropTypes.func,
};

EntryEditor.defaultProps = {
  list: {},
  fetchEntry: () => {},
  saveEntry: () => {},
};


function getFields({ definition, name }) {
  if (!definition || !name) return [];
  let doc;
  try { doc = parse(`type ${name} { ${definition} }`); }
  catch(ex) { console.error('Invalid GraphQL', ex); return []; }
  return get(doc, 'definitions.0.fields', [])
    .map(({ name, type }) => ({ name: name.value, ...getType(type) }));
}

function getType(field, isRequired, isList) {
  let { kind, type, name } = field;
  if (kind === 'NamedType') return { type: name.value, isRequired, isList };
  if (kind === 'ListType') return getType(type, isRequired, true);
  if (kind === 'NonNullType') return getType(type, true, isList);
}



function mapStateToProps(state) {
  return { entry: (state.schema.list || []).find(entry => entry.id === state.schema.selected) || {}, }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEntry: (id) => dispatch(fetchSchemaEntry(id)),
    saveEntry: (id) => dispatch(saveEntry(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryEditor)
