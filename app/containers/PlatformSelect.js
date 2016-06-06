import React, { PropTypes, Component } from 'react';

// Connect
import { connect } from 'react-redux'
import { platformSelect, fetchPlatformList } from '../actions';
import { bindActionCreators } from 'redux'

// Material UI
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

export class PlatformSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchList();
  }

  shouldComponentUpdate(props, state) {
    return props.list.length !== this.props.list.length || props.selected !== this.props.selected;
  }

  render() {
    console.log('PlatformSelect Render');
    if (!this.props.list.length) return (<Subheader>Loading...</Subheader>);
    return (
      <SelectField
        value={this.props.selected}
        style={{alignSelf: 'center'}}
        floatingLabelText="Platform"
        onChange={(e, idx, value) => this.props.onSelect(value)}>
        {this.props.list.map(({ id, name }) => {
          return <MenuItem key={id} value={id} primaryText={name} />
        })}
        <MenuItem key="add-new-platform" value="add-new-platform" primaryText="Create New Platform" />
      </SelectField>
    );
  }
}

PlatformSelect.propTypes = {
  list: PropTypes.array,
};

PlatformSelect.defaultProps = {
  list: [],
};

function mapStateToProps(state) {
  return {
    list: state.platform.list,
    selected: state.platform.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSelect: (id) => platformSelect(id),
    fetchList: fetchPlatformList,
  }, dispatch);
}

// Exporting smart component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformSelect)
