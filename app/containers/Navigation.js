import React, { Component } from 'react';

import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Material UI
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Build from 'material-ui/svg-icons/action/build';
import Code from 'material-ui/svg-icons/action/code';
import Eye from 'material-ui/svg-icons/action/visibility';
import Apps from 'material-ui/svg-icons/navigation/apps';

export default class Navigation extends Component {
  render() {
    return (
      <div style={{ alignSelf: 'center' }}>
        <FlatButton label="Documentation" icon={<Code />} onTouchTap={() => this.props.push('/docs')} />
        <FlatButton label="Editor" icon={<Edit />} onTouchTap={() => this.props.push('/')} />
        <FlatButton label="Preview" icon={<Eye />} onTouchTap={() => this.props.push('/preview')} />
        <FlatButton label="Platforms" icon={<Apps />} />
      </div>
    );
  }
}


Navigation.propTypes = {
};

Navigation.defaultProps = {
};


function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
