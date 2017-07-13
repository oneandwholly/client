import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './home';
import Signup from './signup';
import Signin from './signin';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = { show: 'signup' };
    this.showSignup = this.showSignup.bind(this);
    this.showSignin = this.showSignin.bind(this);
  }

  showSignup() {
    this.setState({ show: 'signup' });
  }

  showSignin() {
    this.setState({ show: 'signin' });
  }

  render() {
    console.log('auth', this.props.auth, 'show', this.state.show)
    if(this.props.auth.authenticated) {
      return <Home />
    } else {
      switch(this.state.show) {
        case 'signup':
          return <Signup showSignin={this.showSignin} />
        case 'signin':
          return <Signin showSignup={this.showSignup} />
      }
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Auth);
