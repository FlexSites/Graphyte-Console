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

export default class SchemaList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: {},
    };
  }

  render() {
    return (
      <Drawer open={true}>
          <AppBar
            title="Graphyte.io"
            />

          <div style={{ padding: '0 15px' }}>
            <SelectField value={this.state.entry.type} onChange={(...args) => {console.log(args, 'type changed')}} fullWidth={true} floatingLabelText="Entry Type">
              {ENTRY_TYPES.map((type) => (<MenuItem key={type} value={type.toLowerCase()} primaryText={type} />))}
            </SelectField>
          </div>

          <List>
            {
              this.props.list.map((item) => {
                console.log('got stuff', item.name);
                let style = {};
                let children = item.name;
                return (
                  <EditMenuItem
                    key={item.id}
                    value={item.name}
                    subText={item.type}
                    onTouchTap={() => this.props.onRowClick(item.id)}
                    onChange={this.props.onEditName}
                    isSelected={this.props.selected === item.id} />
                );
              })
            }
          </List>
      </Drawer>
    )
  }
}

SchemaList.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

SchemaList.propTypes = {
  list: React.PropTypes.array,
  onRowClick: React.PropTypes.func,
  selected: React.PropTypes.string,
  onEditName: React.PropTypes.func,
};

SchemaList.defaultProps = {
  list: [],
  onRowClick: () => {},
  onEditName: () => {},
};
