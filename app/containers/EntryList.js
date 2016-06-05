import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from '../lib/uuid'

import List from '../components/List.jsx'
import { selectEntry, addEntry, entryFilter } from '../actions'


function mapStateToProps(state) {
  return {
    filter: state.schema.filter,
    list: state.schema.list,
    selected: state.schema.selected,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    entryFilter: (value) => {
      console.log('entry filter called!!!', value);
      return entryFilter(value);
    },
    selectEntry,
    addEntry: () => addEntry({ id: uuid() }),
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
