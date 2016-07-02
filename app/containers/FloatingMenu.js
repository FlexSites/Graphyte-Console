import React, { Component } from 'react'

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeEntry, persistEntry, duplicateEntry } from '../actions'

// Material UI
import FloatingActionButton from 'material-ui/FloatingActionButton';

// Icons
import Save from 'material-ui/svg-icons/content/save';
import Copy from 'material-ui/svg-icons/content/content-copy';
import Delete from 'material-ui/svg-icons/action/delete';

import { darkBlack } from 'material-ui/styles/colors';

class FloatingMenu extends Component {
  constructor(props) {
    super(props);

    this.persist = () => {
      return this.props.persistEntry(this.props.entry);
    }

    this.remove = () => {
      return this.props.removeEntry(this.props.entry);
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', zIndex: 999, position: 'fixed', bottom: '20px', right: '20px' }}>
        <FloatingActionButton
          secondary={true}
          onTouchTap={this.remove}
          mini={true}
          style={{ margin: '0 8px 10px' }}
          iconStyle={{ fill: darkBlack }}>
          <Delete />
        </FloatingActionButton>

        <FloatingActionButton
          secondary={true}
          onTouchTap={this.persist}
          mini={true}
          style={{ margin: '0 8px 10px' }}
          iconStyle={{ fill: darkBlack }}>
          <Copy />
        </FloatingActionButton>

        <FloatingActionButton
          secondary={true}
          onTouchTap={this.persist}
          iconStyle={{ fill: darkBlack }}>
          <Save />
        </FloatingActionButton>
      </div>
    );
  }
}


FloatingMenu.propTypes = {
  entry: React.PropTypes.object,
  fetchEntry: React.PropTypes.func,
  persistEntry: React.PropTypes.func,
  removeEntry: React.PropTypes.func,
  updateEntry: React.PropTypes.func,
};

FloatingMenu.defaultProps = {
  persistEntry: () => {},
  removeEntry: () => {},
  duplicateEntry: () => {},
};

FloatingMenu.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    entry: (state.schema.list || []).find((entry) => entry.id === state.schema.selected),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    duplicateEntry,
    persistEntry,
    removeEntry,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatingMenu)
