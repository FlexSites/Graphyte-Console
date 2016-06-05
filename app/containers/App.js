import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from '../lib/uuid'

import App from '../components/App.jsx'
import { fetchSchemaList, saveSchemaItem, entrySelect, schemaItemAdd } from '../actions'


function mapStateToProps(state) {
  return {
    list: state.schema.list,
    entry: (state.schema.list || []).find(entry => entry.id === state.schema.selected) || {},
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchList: fetchSchemaList,
    entrySelect: entrySelect,
    saveEntry: saveSchemaItem,
    addEntry: () => schemaItemAdd({ id: uuid() }),
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
