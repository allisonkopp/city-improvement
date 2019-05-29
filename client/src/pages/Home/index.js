import React from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';

const Home = _ => (
  <div className="main container text-xs-center text-container">
    <div>
      <h1 className="display-3">City Improvement</h1>
      <p className="lead">Help to improve your city!</p>
      <div>
        <NavLink className="btn btn-primary-outline btn-lg" to="/register">
          Get Started
        </NavLink>
        <NavLink className="btn btn-primary-outline btn-lg" to="/about">
          Learn More
        </NavLink>
      </div>
    </div>
  </div>
);

export default Home;
