import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import AceEditor from 'react-ace';

import 'brace/theme/tomorrow_night';


export default class DefinitionEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper zDepth={1} rounded={false}>
        <AceEditor
          mode="java"
          theme="tomorrow_night"
          value={this.props.value}
          onChange={this.onChange}
          name="definition-editor"
          width="100%"
          editorProps={{$blockScrolling: true}}
        />
      </Paper>
    );
  }
}


DefinitionEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

DefinitionEditor.defaultProps = {
  value: '',
};
