/* global Auth0Lock:false */

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import brace from 'brace';
import { set } from 'object-path';
import AceEditor from 'react-ace';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import List from './List.jsx';
import MainNav from '../containers/MainNav'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
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
import DefinitionEditor from './DefinitionEditor.jsx';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Lock, { getIdToken } from '../lib/auth0';

import 'brace/theme/tomorrow_night';

const BLANK_ENTRY = { entry: { type: '', resolve: {}, mock: '' } };

class App extends Component {

  constructor(props) {
    super(props)

    this.state = BLANK_ENTRY;
    this.props.fetchList();

    this.lock = Lock;
    this.showLogin = this.lock.show.bind(this.lock)
    this.selectEntry = this.selectEntry.bind(this)
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

  selectEntry(id) {
    this.setState({ entry: this.props.list.find((item) => item.id === id) || BLANK_ENTRY });
  }

  showLogin() {
    return this.lock.show({
      closable: false,
    }, (err, profile, token) => {
      if (err) console.error(err);
      localStorage.profile = profile;
      localStorage.userToken = token;
    })
  }

  onEditName(value) {
    this.state.entry.name = value;
    this.setState({
      entry: this.state.entry,
    })
  }

  getChildContext() {
    return {muiTheme: getMuiTheme()};
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

  render() {

    let paperStyle = {
      margin: '10px 0',
    };

    let resolves = (this.state.entry.resolve || {})[this.state.entry.name] || {};

    let possibleResolves = (this
      .state
      .entry
      .definition || '')
      .split('\n')
      .map(
        ln => ln
          .split(/[:(]/)[0]
          .trim()
      )
      .filter(val => !!val);

    return (
      <div style={{ paddingLeft: '256px', height: '100%', position: 'relative' }}>
        <MainNav login={this.showLogin} />

        <Tabs>
          <Tab label="Definition">
            <DefinitionEditor onChange={this.handleDefChange} value={this.state.entry.definition} />
          </Tab>
          <Tab label="Resolver">
            <Grid fluid={true}>
              {(possibleResolves || []).map((key, idx) => {
                return (
                  <Paper style={paperStyle} zDepth={1} rounded={false} key={key}>
                    <Toolbar>
                      <ToolbarGroup>
                        <ToolbarTitle text={key} />
                      </ToolbarGroup>
                      {
                        resolves[key] ? (<div></div>) : (<ToolbarGroup lastChild={true}>
                        <IconButton touch={true} onTouchTap={() => this.handleResChange(key, '// stuff')}>
                          <NavigationExpandMoreIcon />
                        </IconButton>
                      </ToolbarGroup>)
                      }
                    </Toolbar>
                    {resolves[key] ? (<AceEditor
                      mode="javascript"
                      theme="tomorrow_night"
                      value={resolves[key]}
                      onChange={(val) => this.handleResChange(key, val)}
                      width="100%"
                      height="200px"
                      name={`UNIQUE_ID_OF_DIV_${idx}`}
                      editorProps={{$blockScrolling: true}}
                    />) : (<div></div>)}
                  </Paper>
                );
              })}
            </Grid>
          </Tab>
          <Tab label="Mock">
            <h1>TODO: Add mock UI</h1>
          </Tab>
        </Tabs>



        <List
          selected={this.state.entry.id}
          list={this.props.list}
          onRowClick={this.selectEntry}
          onEditName={this.onEditName}
           />
        <FloatingActionButton
          secondary={true}
          onTouchTap={this.props.addEntry}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <ContentAdd />
        </FloatingActionButton>

        <EntryActions saveEntry={this.saveEntry} style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 999, paddingLeft: '256px', width: '100%' }}/>
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
  addEntry: React.PropTypes.func,
}

App.defaultProps = {
  list: [],
}

App.displayName = 'App'

export default App
