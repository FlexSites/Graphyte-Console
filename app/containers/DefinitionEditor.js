import React, { Component } from 'react'

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEntry } from '../actions'

// Components
import CodeEditor from '../components/CodeEditor.jsx';

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
