import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../utils';

const AccessButton = props => {
  const handleLogout = _ => {
    sessionStorage.removeItem('sessionToken');
    props.history.push('/');
  };
  return isLoggedIn() ? (
    <>
      <NavLink className="nav-item nav-link" to="/profile">
        My Profile
      </NavLink>
      <button className="btn btn-primary pull-md-right" onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <NavLink className="nav-item nav-link" to="/register">
        Sign Up
      </NavLink>
      <NavLink className="nav-item nav-link" to="/login">
        {/* <NavLink className="btn btn-primary pull-md-right" to="/login"> */}
        Login
      </NavLink>
    </>
  );
};

export default withRouter(AccessButton);
