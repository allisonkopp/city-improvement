import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = _ => (
  <div className="main container text-xs-center">
    <h1 className="display-3">City Improvement</h1>
    <p className="lead">Help to improve your city!</p>
    <NavLink className="btn btn-info-outline btn-lg" to="/register">
      Get Started
    </NavLink>
  </div>
);

export default Home;
