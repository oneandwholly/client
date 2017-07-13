import React, { Component } from 'react';
import { connect } from 'react-redux';
import Welcome from './welcome';

class Auth extends Component {
  render() {
    console.log('auth', this.props.auth)
    if(!this.props.auth.authenticated) {
      return <Welcome />
    } else {
      return <div>you are authorized</div>
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Auth);
