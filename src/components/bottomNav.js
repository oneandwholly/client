import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class BottomNav extends Component {

  render() {
    if (this.props.auth.authenticated) {
      return (
        <div>
          <button><Link to='/'>home</Link></button>
          <button><Link to='/explore'>explore</Link></button>
          <button><Link to='/create'>create</Link></button>
          <button><Link to='/accounts/activity'>activity</Link></button>
          <button><Link to='/'>profile</Link></button>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(BottomNav);
