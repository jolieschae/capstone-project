import React, { useContext } from 'react';
import { MyContext } from "./MyProvider";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './nav.css'

function Nav() {
  const { handleLogout } = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <div className='navBar'>
      <div className="navContent">
        <h1 className='tagLine'>pullup</h1>
        <div className="links">
          <Link to="/" className="link">home</Link>
          <Link to="/feed" className="link">feed</Link>
          <Link to="/post" className="link">post</Link>
          <Link to="/events" className="link">explore events</Link> 
          <Link to="/collab" className="link">collab</Link> 
          <Link to="/community" className="link">community</Link> 
          <Link to="/profile" className="link">profile</Link>
          <Link onClick={handleLogoutClick} to="/login" className="link">logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;