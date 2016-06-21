import React, { Component } from 'react'

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEntry, removeEntry, fetchSchemaEntry, persistEntry, pushNotification } from '../actions'

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
import ResolveEditor from '../components/ResolveEditor.jsx';
import FloatingMenu from '../containers/FloatingMenu';
import MockEditor from '../containers/MockEditor';

export class EntryEditor extends Component {
  render() {
    return (
      <CodeEditor mode="java" {...this.props} height="1000px" />
    )
  }
}

EntryEditor.propTypes = {
  value: React.PropTypes.string,
  updateEntry: React.PropTypes.func,
};

EntryEditor.defaultProps = {
  value: '',
  updateEntry: () => {},
};

EntryEditor.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

function getDefinition({ schema: { list = [], selected } }) {
  let entry = list
    .find(entry => entry.id === selected)
  return (entry || {}).definition;
}

function mapStateToProps(state) {
  return {
    value: getDefinition(state),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onChange: (definition) => updateEntry({ definition }),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryEditor)
