import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../utils';
import { NavDropdown } from 'react-bootstrap';

const AccessButton = props => {
  const handleLogout = _ => {
    sessionStorage.removeItem('sessionToken');
    props.history.push('/');
  };
  return isLoggedIn() ? (
    <button className="btn btn-info pull-md-right" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    // <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //   <NavDropdown.Item>
    //     <NavLink to="/profile" />
    //   </NavDropdown.Item>
    //   <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
    // </NavDropdown>
    <NavLink className="btn btn-info pull-md-right" to="/login">
      Login
    </NavLink>
  );
};

export default withRouter(AccessButton);
