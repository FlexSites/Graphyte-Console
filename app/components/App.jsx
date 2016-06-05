/* global Auth0Lock:false */

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import brace from 'brace';
import { get, set } from 'object-path';
import AceEditor from 'react-ace';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import EntryList from '../containers/EntryList';
import MainNav from '../containers/MainNav'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Save from 'material-ui/svg-icons/content/save';
import Copy from 'material-ui/svg-icons/content/content-copy';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import EntryActions from './EntryActions.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MenuItem from 'material-ui/MenuItem';
import CodeEditor from './CodeEditor.jsx';
import ResolveEditor from './ResolveEditor.jsx';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { getIdToken, showLogin } from '../lib/auth0';
import { parse } from 'graphql/language';
import {fade} from 'material-ui/utils/colorManipulator';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { yellow700, cyan500, white, darkBlack, fullBlack, grey800, grey900, grey100, grey700, grey500, orange500, lightGreenA700 } from 'material-ui/styles/colors';

import 'brace/theme/tomorrow_night';

class App extends Component {

  constructor(props) {
    super(props)

    this.props.fetchList();

    this.state = {
      entry: this.props.entry,
    }

    this.onEditName = this.onEditName.bind(this);
    this.saveEntry = this.saveEntry.bind(this);

    this.handleDefChange = this.onChange.bind(this, 'definition');
    this.handleResChange = function (key, value){
      this.onChange(`resolve.${this.state.entry.name}.${key}`, value);
    }.bind(this);
    this.handleMockChange = this.onChange.bind(this, 'mock');
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(event, index, value) {
    return this.onChange('type', value);
  }

  onEditName(value) {
    this.state.entry.name = value;
    this.setState({
      entry: this.state.entry,
    })
  }

  getChildContext() {
    return {muiTheme: getMuiTheme({
      palette: {
        primary1Color: fade(grey800, 0.75),
        primary2Color: grey700,
        primary3Color: grey500,
        accent1Color: lightGreenA700,
        accent2Color: grey900,
        accent3Color: grey500,
        textColor: white,
        alternateTextColor: grey100,
        canvasColor: fade(grey800, 0.5),
        borderColor: grey900,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: grey800,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
        alert1Color: yellow700,
        secondary1Color: cyan500,
      }
    })};
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

  componentWillMount() {
    //Extending function defined in step 2.
    // ...
    this.setState({idToken: getIdToken()})
  }

  componentWillReceiveProps(props) {
    this.setState({
      entry: props.entry,
    })
  }

  render() {

    let paperStyle = {
      margin: '10px 0',
    };

    let resolves = (this.state.entry.resolve || {})[this.state.entry.name] || {};

    let possibleResolves = getFields(this.state.entry);

    if (!getIdToken()) {
      showLogin();
    }

    return (
      <div style={{ paddingLeft: '256px', height: '100%', position: 'relative' }}>
        <MainNav login={showLogin} />

        <Tabs>
          <Tab label="Definition">
            <CodeEditor mode="java" onChange={this.handleDefChange} value={this.state.entry.definition} height="1000px" />
          </Tab>
          <Tab label="Resolver">
            {(possibleResolves || []).map(({ name, type, isRequired, isList }, idx) => {
              console.log('right before render method!!!', name, type, isRequired, isList);
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
          <Tab label="Mock">
            <h1>TODO: Add mock UI</h1>
          </Tab>
        </Tabs>

        <EntryList
          list={this.props.list}
          onSelect={this.props.entrySelect}
           />

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

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

App.propTypes = {
  children: PropTypes.element,
  fetchList: PropTypes.func.isRequired,
  list: PropTypes.array,
  entry: PropTypes.object,
  addEntry: React.PropTypes.func,
  entrySelect: React.PropTypes.entrySelect,
}

App.defaultProps = {
  entry: { entry: { type: '', resolve: {}, mock: '' } },
  list: [],
  entrySelect: () => {},
}

App.displayName = 'App'

export default App

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
