import React, { Component } from 'react'

// Lib
import { get } from 'object-path';

// Connect
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ENTRY_TYPES } from '../constants';
import { entryFilter } from '../actions'
import { push } from 'react-router-redux';

// Material UI
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import List from 'material-ui/List';

// Containers
import NewEntryButton from '../containers/NewEntry';

// Components
import EditMenuItem from '../components/EditMenuItem.jsx';

export class EntryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list,
    };
  }

  shouldComponentUpdate(props) {
    return props.filter !== this.props.filter
      || props.selected !== this.props.selected
      || props.list.length !== this.props.list.length
  }

  onSelect(id) {
    if (!id) return;
    this.props.push(`/edit/${id}`);
  }

  componentWillReceiveProps(props) {
    let foundSelected = false;
    let selected = props.selected;

    let list = props
      .list
      .filter(entry => {
        let matched = entry.type === props.filter;
        if (matched && entry.id === selected) foundSelected = true;
        return matched;
      })
      .sort((a, b) => b.name <= a.name ? 1 : -1)

    // Didn't find current entry.
    if (!foundSelected) {

      // Select first filtered entry
      this.onSelect(list[0].id);
    }

    this.setState({
      list,
    });
  }

  render() {

    let drawerStyle = {
      minWidth: '256px',
      backgroundColor: get(this, 'context.muiTheme.palette.canvasColor'),
    };

    return (
      <div style={drawerStyle}>
        <div style={{ padding: '0 15px' }}>
          <SelectField value={this.props.filter} onChange={(e, idx, value) => this.props.entryFilter(value)} fullWidth={true} floatingLabelText="Entry Type">
            {ENTRY_TYPES.map((type) => (<MenuItem key={type} value={type.toLowerCase()} primaryText={type} />))}
          </SelectField>
        </div>

        <List>
          {
            this.state.list
              .map((item) => (
                <EditMenuItem
                  key={item.id}
                  value={item.name}
                  subText={item.type}
                  modified={item.modified}
                  onTouchTap={() => this.onSelect(item.id)}
                  onChange={this.props.onEditName}
                  isSelected={this.props.selected === item.id} />
                )
              )
          }
        </List>
        <NewEntryButton style={{ margin: '10px', width: 'calc(100% - 20px)' }} />
      </div>
    )
  }
}

EntryList.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

EntryList.propTypes = {
  filter: React.PropTypes.string,
  list: React.PropTypes.array,
  entryFilter: React.PropTypes.func,
  selected: React.PropTypes.string,
};

EntryList.defaultProps = {
  filter: 'type',
  list: [],
  entryFilter: () => {},
};


function mapStateToProps(state) {
  return {
    filter: state.schema.filter,
    list: state.schema.list,
    selected: state.schema.selected,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    entryFilter,
    push,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList)
