import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

function Nav() {
  return (
    <div className='navBar'>
      {/* <img src="" height='175px' alt='logo'/> */}
      <div className="navContent">
        <h1 className='tagLine'>pullup</h1>
        <div className="links">
          <Link to="/" className="link">home</Link>
          <Link to="/feed" className="link">feed</Link>
          <Link to="/events" className="link">explore events</Link> 
          <Link to="/collab" className="link">collab</Link> 
          <Link to="/community" className="link">community</Link> 
          <Link to="/profile" className="link">profile</Link>
          <Link to="/logout" className="link">logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;

// conditional, if user is not logged in, display only login or sign up icon
// if user is logged in, display feed, explore events, collaborate, community, profile, logout