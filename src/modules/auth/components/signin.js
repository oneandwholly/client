import React, { Component } from 'react';

class Signin extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.showSignup();
  }

  render() {
    return (
      <div>
        <div>sign IN</div>
        <button onClick={this.handleClick.bind(this)}>signup</button>
      </div>
    );
  }
}

export default Signin;
