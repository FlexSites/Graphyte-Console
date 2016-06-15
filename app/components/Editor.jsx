import React, { Component } from 'react'

// Containers
import EntryEditor from '../containers/EntryEditor';
import EntryList from '../containers/EntryList';

export default class App extends Component {
  render() {
    return (
      <div style={{ paddingLeft: '256px', height: '100%', position: 'relative' }}>
        <EntryEditor />
        <EntryList />
      </div>
    )
  }
}
