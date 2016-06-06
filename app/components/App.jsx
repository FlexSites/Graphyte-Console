import React, { Component, PropTypes } from 'react'

// Libs
import muiTheme from '../services/Theme';

// Containers
import EntryEditor from '../containers/EntryEditor';
import EntryList from '../containers/EntryList';
import MainNav from '../components/MainNav.jsx'

export default class App extends Component {
  getChildContext() {
    return { muiTheme };
  }

  render() {
    return (
      <div style={{ paddingLeft: '256px', height: '100%', position: 'relative' }}>
        <MainNav />
        <EntryEditor />
        <EntryList />
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

App.propTypes = {
  children: PropTypes.element,
}
