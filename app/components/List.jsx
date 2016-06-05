import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { lightGreen300, white } from 'material-ui/styles/colors'
import EditMenuItem from './EditMenuItem.jsx';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import MenuItem from 'material-ui/MenuItem';
import { ENTRY_TYPES } from '../constants';
import SelectField from 'material-ui/SelectField';
import { get } from 'object-path';

export default class SchemaList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredList: [],
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(id) {
    if (!id) return;
    this.setState({
      selected: id,
    });
    this.props.onSelect(id);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should!!!', nextProps.list.length !== this.props.list.length);
  //   return nextProps.list.length !== this.props.list.length;
  // }

  // filter(entryType = 'type', list = []) {
  //   if (this.state.entryType === entryType) return;
  //   console.log('filter', entryType, list);
  //   let filtered = (list || this.props.list).filter(entry => entryType === entry.type);
  //   console.log('filtered', filtered);
  //   this.setState({
  //     entryType,
  //     filteredList: filtered,
  //   });
  //   if (filtered.length) {
  //     console.log({
  //       entryType,
  //       filteredList: filtered,
  //       selected: filtered[0].id,
  //     });
  //     if (filtered[0].id !== this.state.selected) {
  //       this.props.onSelect(filtered[0].id);
  //       this.setState({
  //         selected: filtered[0].id,
  //       });
  //     }

  //   }
  // }

  // componentWillReceiveProps(props) {
  //   this.filter(this.state.entryType, props.list);
  // }

  render() {
    return (
      <Drawer open={true}>
        <div style={{ padding: '0 15px' }}>
          <SelectField value={this.props.filter} onChange={(e, idx, value) => this.props.entryFilter(value)} fullWidth={true} floatingLabelText="Entry Type">
            {ENTRY_TYPES.map((type) => (<MenuItem key={type} value={type.toLowerCase()} primaryText={type} />))}
          </SelectField>
        </div>

        <List>
          {
            this.props.list
              .filter(entry => entry.type === this.props.filter)
              .map((item) => {
                console.log('item selected', item.name, this.props.selected === item.id)
                return (
                  <EditMenuItem
                    key={item.id}
                    value={item.name}
                    subText={item.type}
                    onTouchTap={() => this.onSelect(item.id)}
                    onChange={this.props.onEditName}
                    isSelected={this.props.selected === item.id} />
                )
              }
              )
          }
        </List>
        {this.props.selected}----
      </Drawer>
    )
  }
}

SchemaList.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

SchemaList.propTypes = {
  filter: React.PropTypes.string,
  list: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  entryFilter: React.PropTypes.func,
  onAdd: React.PropTypes.func,
  selected: React.PropTypes.string,
};

SchemaList.defaultProps = {
  filter: 'type',
  list: [],
  onSelect: () => {},
  onAdd: () => {},
  entryFilter: () => {},
};
