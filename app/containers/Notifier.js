import React, { Component } from 'react'

// Connect
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { popNotification } from '../actions';

// Material UI
import Snackbar from 'material-ui/Snackbar';

class Notifier extends Component {

  constructor(props) {
    super(props);

    this.state = {
      current: { message: '' },
      open: false,
    }
    this.close = this.close.bind(this);
  }

  open(notification) {
    this.setState({
      current: notification,
      open: true,
    })
  }

  close() {
    if (this.props.list.length > 1) {
      this.open(this.props.list[1])
    }
    this.props.pop();
    this.setState({
      current: { message: '' },
      open: false,
    });
  }

  componentWillReceiveProps(props) {
    if (props.list.length) {
      console.log('LIST', props.list);
      this.open(props.list[0])
    }
  }

  render() {

    // if (!this.state.current) return (<div></div>);

    return (
      <Snackbar
        open={this.state.open}
        message={this.state.current.message}
        action="undo"
        bodyStyle={{ backgroundColor: '#000' }}
        autoHideDuration={this.state.current.timeout || 3000}
        onRequestClose={this.close}
      />
    )
  }
}

Notifier.propTypes = {
  pop: React.PropTypes.func,
  list: React.PropTypes.array,
};

Notifier.defaultProps = {
  pop: () => {},
  list: [],
};


function mapStateToProps(state) {
  return {
    list: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pop: popNotification,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier)
