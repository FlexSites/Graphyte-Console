import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import 'brace/theme/tomorrow_night';


export default class DefinitionEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name ? this.props.name : `editor-${Math.random().toString().split('.')[1]}`
    }
  }

  render() {
    return (
      <AceEditor
        mode={this.props.mode}
        theme="tomorrow_night"
        value={this.props.value}
        onChange={this.props.onChange}
        name={this.state.name}
        height={this.props.height}
        width="100%"
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}


DefinitionEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  mode: PropTypes.string,
  height: PropTypes.string,
};

DefinitionEditor.defaultProps = {
  value: '',
  mode: 'javascript',
  height: '400px',
};
