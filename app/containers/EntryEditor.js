import React, { Component } from 'react'

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEntry, removeEntry, fetchEntryList, persistEntry, pushNotification } from '../actions'
import { push } from 'react-router-redux';

// Libs
import { get } from 'object-path';

// Material UI
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Definition from 'material-ui/svg-icons/action/description';
import Cloud from 'material-ui/svg-icons/file/cloud';
import FlipToBack from 'material-ui/svg-icons/action/flip-to-back';

// Components
import FloatingMenu from '../containers/FloatingMenu';
import EntryList from '../containers/EntryList';

export class EntryEditor extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchList();
  }

  isActive(tab) {
    let parts = this.props.location.pathname.split('/');
    if (!tab && parts.length !== 4) return true;
    return tab === parts[parts.length - 1];
  }

  render() {
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
    persistEntry,
    removeEntry,
    fetchList: fetchEntryList,
    push,
    updateEntry,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryEditor)
