import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About, Login, Profile, Register, Error, Issue, Result } from './pages';
import { NavBar, AuthRoute } from './components';
// import axios from 'axios';

class App extends Component {
  state = { issues: [] };

  render() {
    return (
      <>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/issue" component={Issue} />
        <Route exact path="/results" component={Result} />
        <Route exact path="/error" component={Error} />
        <AuthRoute exact path="/profile" component={Profile} />
      </>
    );
  }
}

export default App;
