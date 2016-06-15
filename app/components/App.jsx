import React, { Component, PropTypes } from 'react'

// Libs
import muiTheme from '../services/Theme';

// Containers
import MainNav from '../components/MainNav.jsx'
import Notifier from '../containers/Notifier';

export default class App extends Component {
  getChildContext() {
    return { muiTheme };
  }

  render() {
    return (
      <div>
        <MainNav />
        {this.props.children}
        <Notifier />
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
