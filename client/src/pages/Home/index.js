import React from 'react';
import './Home.css';
import { isLoggedIn } from '../../utils';
import { NavLink } from 'react-router-dom';

const Home = _ => (
  <div className="main-background">
    <div className="main container text-xs-center home-container">
      <div className="text-container">
        <h1 className="display-3">City Improvement</h1>
        <p className="lead">Help to improve your city!</p>
        <div className="btn-container">
          <NavLink className="btn btn-primary btn-lg" to={isLoggedIn ? '/issue' : '/register'}>
            Get started
          </NavLink>
          <NavLink className="btn btn-primary btn-lg" to="/about">
            Find out more
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
