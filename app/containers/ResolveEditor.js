import React, { Component } from 'react'

// Connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEntry, pushNotification } from '../actions'

// Libs
import { parse } from 'graphql/language';
import { get, set } from 'object-path';
import 'brace/mode/java';

// Components
import ResolveEditor from '../components/ResolveEditor.jsx';

export class EntryEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: {},
      possible: getFields(this.props.entry, this.props.notify) || [],
    };

    this.handleResChange = function (key, value){
      this.onChange(`resolve.${this.state.entry.name}.${key}`, value);
    }.bind(this);
  }

  onChange(prop, value) {
    let newEntry = JSON.parse(JSON.stringify(this.state.entry));
    set(newEntry, prop, value);
    set(newEntry, 'modified', true);
    this.props.updateEntry(newEntry);
    this.setState({
      entry: newEntry,
    })
  }

  componentWillReceiveProps(props) {
    console.log('will', props);
    this.setState({
      possible: getFields(props.entry, this.props.notify) || [],
    })
  }

  render() {
    let resolves = get(this.state.entry, ['resolve', this.state.entry.name], {});
    return (
      <div>
        {(this.state.possible).map(({ name, type, isRequired, isList }, idx) => {
          return (
            <ResolveEditor
              key={idx}
              onChange={(val) => this.handleResChange(name, val)}
              field={name}
              type={type}
              value={resolves[name]}
              isRequired={isRequired}
              isList={isList} />
          );
        })}
      </div>
    )
  }
}

EntryEditor.propTypes = {
  entry: React.PropTypes.object,
  updateEntry: React.PropTypes.func,
};

EntryEditor.defaultProps = {
  list: {},
  fetchEntry: () => {},
  persistEntry: () => {},
  removeEntry: () => {},
  updateEntry: () => {},
};


function getFields({ definition, name }, notify) {
  if (!definition || !name) return [];
  let doc;
  try {
    doc = parse(`type ${name} { ${definition} }`);
  } catch (ex) {
    notify({ message: 'Invalid GraphQL' });
    console.error('Invalid GraphQL', ex); return [];
  }
  return get(doc, 'definitions.0.fields', [])
    .map(({ name, type }) => ({ name: name.value, ...getType(type) }));
}

function getType(field, isRequired, isList) {
  let { kind, type, name } = field;
  if (kind === 'NamedType') return { type: name.value, isRequired, isList };
  if (kind === 'ListType') return getType(type, isRequired, true);
  if (kind === 'NonNullType') return getType(type, true, isList);
  return field;
}

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
    updateEntry: (resolver) => updateEntry({ resolver }),
    notify: pushNotification,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryEditor)
