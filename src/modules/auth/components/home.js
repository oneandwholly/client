import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.signoutUser();
  }

  render() {
    return <div>
      <button onClick={this.handleClick.bind(this)}>signout</button>
      <div>List</div>
    </div>
  }
}

export default connect(null, actions)(Home);
