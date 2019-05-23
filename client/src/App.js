import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About, Login, Profile, Register, Error, Issue, Result } from './pages';
import { NavBar, AuthRoute } from './components';
// import axios from 'axios';

class App extends Component {
  state = { issues: [] };

  // addIssue = async formData => {
  //   await axios.post('/issue/create', formData);
  //   console.log('this is my form data', formData);
  // };

  // handleUpload = file => {
  //   console.log('file', file);
  //   axios
  //     .post('/issue/upload', file)
  //     .then(response => {
  //       console.log(response);
  //       const secureUrl = response.data.secure_url;
  //       console.log(secureUrl);
  //       return secureUrl;
  //     })
  //     .catch(err => console.error(err));
  // };

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
