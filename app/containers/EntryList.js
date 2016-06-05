import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from '../lib/uuid'

import List from '../components/List.jsx'
import { selectEntry, schemaItemAdd, entryFilter } from '../actions'


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
    addEntry: (entry) => {
      return schemaItemAdd({ id: uuid(), ...entry })
    },
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
