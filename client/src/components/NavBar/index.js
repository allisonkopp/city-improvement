import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { AccessButton } from '..';
import { isLoggedIn } from '../../utils';

const LOGO = require('../../assets/images/city-logo.png');

const NavBar = _ => (
  <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
    <div className="navbar-nav collapse navbar-toggleable-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img className="logo" src={LOGO} alt="" />
        </NavLink>
        <div className="nav-items clearfix">
          {!isLoggedIn() ? (
            <></>
          ) : (
            <>
              <NavLink className="nav-item nav-link" to="/issue">
                Form
              </NavLink>
              <NavLink className="nav-item nav-link" to="/results">
                Map
              </NavLink>
              <NavLink className="nav-item nav-link" to="/results">
                Results
              </NavLink>
              <NavLink className="nav-item nav-link" to="/feed">
                Feed
              </NavLink>
              <NavLink className="nav-item nav-link" to="/about">
                About
              </NavLink>
              <NavLink className="nav-item nav-link" to="/profile">
                My Profile
              </NavLink>
            </>
          )}
        </div>
        <AccessButton />
      </div>
    </div>
  </nav>
);

export default withRouter(NavBar);
