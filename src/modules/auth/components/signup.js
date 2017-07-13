import React, { Component } from 'react';

class Signup extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.showSignin();
  }

  render() {
    return (
      <div>
        <div>sign UP</div>
        <button onClick={this.handleClick.bind(this)}>signin</button>
      </div>
    );
  }
}

export default Signup;
